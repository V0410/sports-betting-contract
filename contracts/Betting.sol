// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title A contract for football result staking
/// @author Aiden, Maksym
/// @notice Handles user stakes and allows winning stakers to claim payouts 
contract Betting {
  // Payment token address
  IERC20 public paymentToken;

  // Contract owner
  address public owner;

  enum BetOption {
    HOME,
    DRAW,
    AWAY
  }

  struct Bet {
    address user;
    BetOption option;
    uint16 odd;
    uint256 betAmount;
  }

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }

  // map each fixture ID to bet results
  mapping (uint256 => Bet[]) private bets;

  constructor(address _paymentToken) {
    paymentToken = IERC20(_paymentToken);
    owner = msg.sender;
  }

  function updateOwner(address _newOwner) public onlyOwner {
    owner = _newOwner;
  }

  /// @notice Withdraw the bet
  /// @param _to: better's address
  /// @param _amount: the amount of the user's bet
  function _withdraw(address _to, uint _amount) internal {
    paymentToken.transfer(_to, _amount);
  }

  /// @notice Place the bet
  /// @param _figureId: the ID of the fixture
  /// @param _option: the result of the fixture that the user wants to bet on
  /// @param _betAmount: the amount of the user's bet
  function placeBet(uint _figureId, BetOption _option, uint8 _odd, uint _betAmount) public {
    paymentToken.transferFrom(msg.sender, address(this), _betAmount);
    bets[_figureId].push(
      Bet({ user: msg.sender, option: _option, odd: _odd, betAmount: _betAmount })
    );
  }

  function processGame(uint _figureId, BetOption _result) public onlyOwner {
    Bet[] memory betters = bets[_figureId];
    for (uint i = 0; i < betters.length; i++) {
      Bet memory better = betters[i];
      if (better.option == _result) {
        _withdraw(better.user, better.betAmount * better.odd);
      }
    }
  }
}