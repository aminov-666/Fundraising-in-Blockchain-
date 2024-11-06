// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {
    address public owner = msg.sender;

    struct Donation {
        uint256 amount;
        address donor;
        string message;
    }

    Donation[] public donations;

    event DonationReceived(address indexed donor, uint256 amount, string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function makeDonation(string memory _message) external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        Donation memory newDonation;
        newDonation.amount = msg.value;
        newDonation.donor = msg.sender;
        newDonation.message = _message;
        
        donations.push(newDonation);
        
        emit DonationReceived(msg.sender, msg.value, _message);
    }

    function withdrawBalance() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
