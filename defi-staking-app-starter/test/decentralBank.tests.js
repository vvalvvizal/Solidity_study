/* eslint-disable no-undef */

const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

contract("decentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    await rwd.transfer(decentralBank.address, tokens("1000000"));

    //모의 테더 100개를 은행->고객으로 제공

    await tether.transfer(customer, tokens("100"), {
      from: owner,
    });
    //console.log("customer", customer);
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("Reward Token", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });
    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield Farming", async () => {
    it("rewards tokens for staking", async () => {
      let result;
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallert balance before staking"
      );

      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });

      await decentralBank.depositTokens(tokens("100"), { from: customer });

      //check updated balance of customer
      //예금을 한 후 사용자 잔액

      result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens("0"));

      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), tokens("100"));

      //Is staking Update
      result = await decentralBank.isStaking(customer);
      assert.equal(result.toString(), "true");

      //issue Tokens
      await decentralBank.issueTokens({ from: owner });

      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      //unstaking
      await decentralBank.unstakeTokens({ from: customer });

      //check unstaking balances
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet balances after unstaking"
      );

      result = await tether.balanceOf(decentralBank.address);
      assert.equal(result.toString(), tokens("0"));

      //Is staking Update
      result = await decentralBank.isStaking(customer);
      assert.equal(result.toString(), "false");
    });
  });
});
