const Donations = artifacts.require('Donations');
const assert = require('assert');

contract('Donations', (accounts) => {
  const DONOR = accounts[1];
  const AMOUNT = web3.utils.toWei('0.1', 'ether');
  const MESSAGE = 'Merci pour votre don';

  it('should allow a user to make a donation', async () => {
    const instance = await Donations.deployed();
    await instance.makeDonation(MESSAGE, { from: DONOR, value: AMOUNT });

    const donation = await instance.donations(0);

    assert.equal(donation.donor, DONOR, 'The donor address should match');
    assert.equal(donation.amount, AMOUNT, 'The donation amount should match');
    assert.equal(donation.message, MESSAGE, 'The donation message should match');
  });

  it('should allow the owner to withdraw the contract balance', async () => {
    const instance = await Donations.deployed();
    const initialBalance = await web3.eth.getBalance(instance.address);

    await instance.withdrawBalance({ from: accounts[0] });

    const finalBalance = await web3.eth.getBalance(instance.address);

    assert.equal(finalBalance, 0, 'The contract balance should be zero after withdrawal');
  });
});
