import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BettingModule = buildModule("BettingModule", (m) => {
  const paymentToken = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"

  const betting = m.contract("Betting", [paymentToken]);

  return { betting };
});

export default BettingModule;
