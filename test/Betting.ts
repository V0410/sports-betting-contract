import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Betting Contract", function () {
  async function deployBettingContractFixture() {
    const paymentToken = "0xb46584e0efdE3092e04010A13f2eAe62aDb3b9F0" //PePe Coin

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Betting_Factory = await hre.ethers.getContractFactory("Betting");
    const Betting = await Betting_Factory.deploy(paymentToken);

    return { owner, Betting, otherAccount, paymentToken };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, Betting } = await loadFixture(deployBettingContractFixture);

      expect(await Betting.owner()).to.equal(owner.address);
    });
  });

  describe("Place bet", function () {
    it("Should place bet", async function () {
      const { Betting, otherAccount } = await loadFixture(deployBettingContractFixture);
      const figureId = 1;
      const decimal = 18;
      const betAmount = 100 * 10 ** decimal;
      const odd = 1.8 * 100;
      Betting.connect(otherAccount).placeBet(figureId, "HOME", odd, betAmount);
    });

    it("Withdraw", async function () {
      const { Betting, owner } = await loadFixture(deployBettingContractFixture);
      const figureId = 1;
      Betting.connect(owner).processGame(figureId, "HOME");
    });
  });
});