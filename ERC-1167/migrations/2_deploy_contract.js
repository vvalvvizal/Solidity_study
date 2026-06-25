const Counter = artifacts.require("Counter");
const CounterFactory = artifacts.require("CounterFactory");

module.exports = async function (deployer, network, accounts) {
  // 1) implementation(원본 로직 컨트랙트)을 한 번만 배포한다.
  await deployer.deploy(Counter);
  const implementation = await Counter.deployed();

  // 2) factory 는 implementation 주소를 알고 있어야 clone 을 찍어낼 수 있다.
  await deployer.deploy(CounterFactory, implementation.address);
  const factory = await CounterFactory.deployed();

  console.log("Counter implementation:", implementation.address);
  console.log("CounterFactory:        ", factory.address);

  // 3) 데모: clone 두 개를 만들어 본다.
  const tx1 = await factory.createCounter(accounts[0]);
  const tx2 = await factory.createCounter(accounts[1]);

  const clone1 = tx1.logs.find((l) => l.event === "CounterCreated").args.clone;
  const clone2 = tx2.logs.find((l) => l.event === "CounterCreated").args.clone;

  console.log("Clone #1:", clone1, "owner:", accounts[0]);
  console.log("Clone #2:", clone2, "owner:", accounts[1]);
};
