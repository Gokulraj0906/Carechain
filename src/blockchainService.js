import { ethers } from 'ethers';

const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 
const contractABI = [   
  "function addData(string memory data) public",
  "function getRecords(address patientAddress) public view returns (string memory, uint256, string memory)",
  "function grantPermission(address patientAddress) public",
  "function revokePermission(address patientAddress) public",
];

let contract;

export const getContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum); 
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  } else {
    console.error("Please install MetaMask!");
  }
};

export const getPatientData = async (patientAddress) => {
  const contract = await getContract();
  try {
    const data = await contract.getRecords(patientAddress);
    
    const [name, age, medicalHistory] = data;
    return { name, age, medicalHistory };
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
};

export const addPatientData = async (patientData) => {
  const contract = await getContract();
  try {
    const tx = await contract.addData(patientData);
    console.log("Transaction sent: ", tx);

    const receipt = await tx.wait();
    console.log("Transaction mined: ", receipt);
    return receipt;
  } catch (error) {
    console.error("Error adding patient data:", error);
    return null;
  }
};
