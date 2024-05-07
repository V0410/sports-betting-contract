import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BettingModule = buildModule("BettingModule", (m) => {
  const paymentToken = "0xb46584e0efdE3092e04010A13f2eAe62aDb3b9F0"

  const betting = m.contract("Betting", [paymentToken]);

  return { betting };
});

export default BettingModule;
