import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEtherumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
}

export const TransactionProvider = ({ children }) => {
  const emptyFormData = { addressTo: '', amount: '', message: '', keyword: '' };
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState(emptyFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactons();
      }
      else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
      throw new Error("No etherum object.");
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No etherum object.");
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask');

      const { addressTo, amount, message, keyword } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);
      const transactionContract = getEtherumContract();

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      setFormData(emptyFormData);
    } catch (error) {
      console.log(error);
      alert('Transaction Failed');
      throw new Error("No etherum object.");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
