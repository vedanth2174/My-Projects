// src/context/WalletContext.js
import React, { createContext, useState, useEffect } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Optional: persist wallet in localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setWalletAddress(storedAddress);
      setWalletConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        localStorage.setItem('walletAddress', accounts[0]);
      }
    } catch (err) {
      console.error('Wallet connection failed', err);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setWalletConnected(false);
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider
      value={{ walletConnected, walletAddress, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
