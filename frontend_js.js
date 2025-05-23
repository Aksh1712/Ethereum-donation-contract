// Contract ABI - Replace with your deployed contract ABI
const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "DonationReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newTopDonor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TopDonorsUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawal",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "donorContributions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "donorNames",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "donationsPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_donor",
                "type": "address"
            }
        ],
        "name": "getDonorInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTopDonors",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "donorAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalDonated",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct DonationContract.Donor[3]",
                "name": "",
                "type": "tuple[3]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasDonated",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pauseDonations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "topDonors",
        "outputs": [
            {
                "internalType": "address",
                "name": "donorAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "totalDonated",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDonations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDonors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpauseDonations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawPartial",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

// Contract address - Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Default Hardhat localhost address

// Global variables
let web3;
let contract;
let userAccount;

// DOM elements
const connectBtn = document.getElementById('connectBtn');
const connectionStatus = document.getElementById('connectionStatus');
const donationForm = document.getElementById('donationForm');
const donateBtn = document.getElementById('donateBtn');
const donateText = document.getElementById('donateText');
const donateLoading = document.getElementById('donateLoading');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await checkMetaMaskConnection();
    setupEventListeners();
    await loadContractAddress();
});

// Load contract address from JSON file (if deployed)
async function loadContractAddress() {
    try {
        const response = await fetch('./contract-address.json');
        if (response.ok) {
            const data = await response.json();
            CONTRACT_ADDRESS = data.contractAddress;
        }
    } catch (error) {
        console.log('Using default contract address');
    }
}

// Check MetaMask connection
async function checkMetaMaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateConnectionStatus(true);
                await initializeContract();
                await loadContractData();
            }
        } catch (error) {
            console.error('Error checking connection:', error);
        }
    } else {
        showError('MetaMask is not installed. Please install MetaMask to use this DApp.');
    }
}

// Connect to MetaMask
async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            web3 = new Web3(window.ethereum);
            updateConnectionStatus(true);
            await initializeContract();
            await loadContractData();
            showSuccess('Successfully connected to MetaMask!');
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            showError('Failed to connect to MetaMask. Please try again.');
        }
    }
}

// Initialize contract
async function initializeContract() {
    try {
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Listen for contract events
        contract.events.DonationReceived()
            .on('data', (event) => {
                console.log('Donation received:', event);
                loadContractData();
                showSuccess(`New donation received from ${event.returnValues.name}!`);
            })
            .on('error', console.error);

        contract.events.TopDonorsUpdated()
            .on('data', (event) => {
                console.log('Top donors updated:', event);
                loadTopDonors();
            })
            .on('error', console.error);
            
    } catch (error) {
        console.error('Error initializing contract:', error);
        showError('Failed to initialize contract. Please check the contract address.');
    }
}

// Update connection status
function updateConnectionStatus(connected) {
    if (connected) {
        connectionStatus.className = 'connection-status connected';
        connectionStatus.innerHTML = `
            <div>Connected: ${userAccount.substring(0, 6)}...${userAccount.substring(38)}</div>
        `;
        donateBtn.disabled = false;
    } else {
        connectionStatus.className = 'connection-status disconnected';
        connectionStatus.innerHTML = `
            <div>MetaMask Not Connected</div>
            <button id="connectBtn" class="connect-btn">Connect MetaMask</button>
        `;
        donateBtn.disabled = true;
        
        // Re-attach event listener to new connect button
        document.getElementById('connectBtn').addEventListener('click', connectMetaMask);
    }
}

// Load contract data
async function loadContractData() {
    if (!contract) return;
    
    try {
        // Load basic stats
        const totalDonations = await contract.methods.totalDonations().call();
        const totalDonors = await contract.methods.totalDonors().call();
        const contractBalance = await contract.methods.getContractBalance().call();
        
        // Update UI
        document.getElementById('totalDonations').textContent = `${web3.utils.fromWei(totalDonations, 'ether')} ETH`;
        document.getElementById('totalDonors').textContent = totalDonors;
        document.getElementById('contractBalance').textContent = `${web3.utils.fromWei(contractBalance, 'ether')} ETH`;
        
        // Load user contribution
        if (userAccount) {
            const userContribution = await contract.methods.donorContributions(userAccount).call();
            document.getElementById('userContribution').textContent = `${web3.utils.fromWei(userContribution, 'ether')} ETH`;
        }
        
        // Load top donors
        await loadTopDonors();
        
    } catch (error) {
        console.error('Error loading contract data:', error);
        showError('Failed to load contract data. Please check your connection.');
    }
}

// Load top donors
async function loadTopDonors() {
    if (!contract) return;
    
    try {
        const topDonors = await contract.methods.getTopDonors().call();
        
        for (let i = 0; i < 3; i++) {
            const donor = topDonors[i];
            const nameElement = document.getElementById(`donor${i + 1}Name`);
            const amountElement = document.getElementById(`donor${i + 1}Amount`);
            const addressElement = document.getElementById(`donor${i + 1}Address`);
            
            if (donor.donorAddress !== '0x0000000000000000000000000000000000000000' && donor.totalDonated > 0) {
                nameElement.textContent = donor.name || 'Anonymous';
                amountElement.textContent = `${web3.utils.fromWei(donor.totalDonated, 'ether')} ETH`;
                addressElement.textContent = `${donor.donorAddress.substring(0, 6)}...${donor.donorAddress.substring(38)}`;
            } else {
                nameElement.textContent = 'No donations yet';
                amountElement.textContent = '0 ETH';
                addressElement.textContent = '';
            }
        }
    } catch (error) {
        console.error('Error loading top donors:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    connectBtn.addEventListener('click', connectMetaMask);
    
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await makeDonation();
    });
    
    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                userAccount = accounts[0];
                updateConnectionStatus(true);
                loadContractData();
            } else {
                userAccount = null;
                updateConnectionStatus(false);
            }
        });
        
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }
}

// Make donation
async function makeDonation() {
    const name = document.getElementById('donorName').value;
    const amount = document.getElementById('donationAmount').value;
    
    if (!name || !amount || amount <= 0) {
        showError('Please enter a valid name and donation amount.');
        return;
    }
    
    if (!contract || !userAccount) {
        showError('Please connect your wallet first.');
        return;
    }
    
    try {
        // Update UI for loading state
        setDonationLoading(true);
        hideMessages();
        
        const amountWei = web3.utils.toWei(amount, 'ether');
        
        // Estimate gas
        const gasEstimate = await contract.methods.donate(name).estimateGas({
            from: userAccount,
            value: amountWei
        });
        
        // Send transaction
        const result = await contract.methods.donate(name).send({
            from: userAccount,
            value: amountWei,
            gas: Math.floor(gasEstimate * 1.2) // Add 20% buffer
        });
        
        console.log('Donation successful:', result);
        showSuccess(`Thank you ${name}! Your donation of ${amount} ETH has been recorded.`);
        
        // Reset form
        document.getElementById('donorName').value = '';
        document.getElementById('donationAmount').value = '';
        
        // Reload data
        await loadContractData();
        
    } catch (error) {
        console.error('Donation failed:', error);
        if (error.code === 4001) {
            showError('Transaction was rejected by user.');
        } else if (error.message.includes('insufficient funds')) {
            showError('Insufficient funds for this transaction.');
        } else {
            showError('Donation failed. Please try again.');
        }
    } finally {
        setDonationLoading(false);
    }
}

// Set donation loading state
function setDonationLoading(loading) {
    if (loading) {
        donateBtn.disabled = true;
        donateText.style.display = 'none';
        donateLoading.style.display = 'inline-block';
    } else {
        donateBtn.disabled = false;
        donateText.style.display = 'inline';
        donateLoading.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Show success message
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Hide all messages
function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// Auto refresh data every 30 seconds
setInterval(() => {
    if (contract && userAccount) {
        loadContractData();
    }
}, 30000);