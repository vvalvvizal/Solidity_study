const Counter = artifacts.require("Counter");
const CounterFactory = artifacts.require("CounterFactory");

contract("ERC-1167 CounterFactory", (accounts) => {
  const [deployer, alice, bob] = accounts;

  let implementation;
  let factory;

  beforeEach(async () => {
    implementation = await Counter.new();
    factory = await CounterFactory.new(implementation.address);
  });

  it("implementation 은 한 번만 배포되고 clone 들이 그 로직을 공유한다", async () => {
    const tx1 = await factory.createCounter(alice);
    const tx2 = await factory.createCounter(bob);

    const clone1Addr = tx1.logs[0].args.clone;
    const clone2Addr = tx2.logs[0].args.clone;

    assert.notEqual(clone1Addr, clone2Addr, "각 clone 주소는 달라야 한다");
    assert.notEqual(clone1Addr, implementation.address);

    const clone1 = await Counter.at(clone1Addr);
    const clone2 = await Counter.at(clone2Addr);

    assert.equal(await clone1.owner(), alice);
    assert.equal(await clone2.owner(), bob);
  });

  it("clone 의 상태(count)는 서로 독립적이다", async () => {
    const tx1 = await factory.createCounter(alice);
    const tx2 = await factory.createCounter(bob);

    const clone1 = await Counter.at(tx1.logs[0].args.clone);
    const clone2 = await Counter.at(tx2.logs[0].args.clone);

    await clone1.increment({ from: alice });
    await clone1.increment({ from: alice });
    await clone2.increment({ from: bob });

    assert.equal((await clone1.count()).toString(), "2");
    assert.equal((await clone2.count()).toString(), "1");
  });

  it("initialize 는 두 번 호출할 수 없다", async () => {
    const tx = await factory.createCounter(alice);
    const clone = await Counter.at(tx.logs[0].args.clone);

    try {
      await clone.initialize(bob);
      assert.fail("두 번째 initialize 는 revert 해야 한다");
    } catch (e) {
      assert.include(e.message, "already initialized");
    }
  });

  it("cloneDeterministic 의 주소는 predict 결과와 같다", async () => {
    const salt = web3.utils.keccak256("salt-1");
    const predicted = await factory.predictAddress(salt);

    const tx = await factory.createCounterDeterministic(alice, salt);
    const actual = tx.logs.find((l) => l.event === "CounterCreated").args.clone;

    assert.equal(actual.toLowerCase(), predicted.toLowerCase());
  });
});
