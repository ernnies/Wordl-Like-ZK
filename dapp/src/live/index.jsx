import { useState } from "react";
import { ethers } from "ethers";
import SuperfluidABI from "@/contract/Superfluid.json"

// Contract Address
const GDAv1ForwarderAddress = '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08'; 

// Provider setup
let provider;
if (typeof window !== "undefined" && window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
}

// Connect wallet function
export const connectWallet = async (setAccount, setMessage) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      setMessage(`Connected to ${address}`);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setMessage("Failed to connect wallet. Please try again.");
    }
  } else {
    setMessage("Please install Metamask to use this feature.");
  }
};

// Function to update cryptocurrency price
export const updateCryptoPrice = async ({ symbol, name, price, setMessage }) => {
  if (!provider) {
    setMessage("Please connect your wallet first.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(cryptoPlaceAddress, CryptoPlaceABI.abi, signer);

    // Call the smart contract's updateCryptoPrice function
    const tx = await contract.updateCryptoPrice(symbol, name, ethers.utils.parseUnits(price.toString(), "ether"));
    const receipt = await tx.wait();
    
    setMessage(`Updated price of ${name} (${symbol}) successfully at block ${receipt.blockNumber}`);
  } catch (error) {
    console.error("Error updating crypto price:", error);
    setMessage("Failed to update price. Please try again.");
  }
};

// Function to get the price of a cryptocurrency
export const getCryptoPrice = async (symbol, setCryptoData, setMessage) => {
  if (!provider) {
    setMessage("Please connect your wallet first.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(cryptoPlaceAddress, CryptoPlaceABI.abi, signer);

    // Call the getCryptoPrice function to fetch data
    const [name, price, updatedAt] = await contract.getCryptoPrice(symbol);

    setCryptoData({
      name,
      price: ethers.utils.formatUnits(price, "ether"),
      updatedAt: new Date(updatedAt * 1000).toLocaleString(),
    });
  } catch (error) {
    console.error("Error getting crypto price:", error);
    setMessage("Failed to fetch crypto price. Please try again.");
  }
};

// Function to transfer admin role
export const transferAdmin = async (newAdminAddress, setMessage) => {
  if (!provider) {
    setMessage("Please connect your wallet first.");
    return;
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(cryptoPlaceAddress, CryptoPlaceABI.abi, signer);

    // Call the transferAdmin function
    const tx = await contract.transferAdmin(newAdminAddress);
    const receipt = await tx.wait();

    setMessage(`Admin role transferred to ${newAdminAddress} successfully at block ${receipt.blockNumber}`);
  } catch (error) {
    console.error("Error transferring admin role:", error);
    setMessage("Failed to transfer admin role. Please try again.");
  }
};
