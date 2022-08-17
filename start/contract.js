/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/

// const on = require('@metamask/onboarding')

const forwarderOrigin = 'http://localhost:9010'

// import MetaMaskOnboarding from '@metamask/onboarding'

// const currentUrl = new URL(window.location.href)
// const forwarderOrigin = currentUrl.hostname === 'localhost'
//   ? 'http://localhost:9010'
//   : undefined



const getAccountsButton = document.getElementById('getAccounts');
const getAccountsResult = document.getElementById('getAccountsResult');
const onboardButton = document.getElementById('connectButton');

const initialize = () => {




const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};


//This will start the onboarding proccess
const onClickInstall = () => {
  onboardButton.innerText = 'Onboarding in progress';
  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
};

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};

  const MetaMaskClientCheck = () => {
   
    if(!isMetaMaskInstalled()) { 
      onboardButton.innerText = 'Click here to Install MetaMask'
      onboardButton.disabled = false;
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      // onboardButton.disabled = true;
    }else { 
      onboardButton.innerText = 'connect'
       //When the button is clicked we call this function to connect the users MetaMask Wallet
    onboardButton.onclick = onClickConnect;
    //The button is now enabled
    onboardButton.disabled = false;
    }


  };

  getAccountsButton.addEventListener('click', async() => { 
    try {
      const accounts = await ethereum.request({method: 'eth_accounts'}) ; 
      getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts' ;
    }catch(err) {
      console.error(err);
    }

  });





  MetaMaskClientCheck();




} ; 
window.addEventListener('DOMContentLoaded', initialize)
