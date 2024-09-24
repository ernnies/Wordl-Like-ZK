// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPlace {
    // Admin address (who can update the prices)
    address public admin;

    // Structure to store cryptocurrency data
    struct CryptoData {
        string name;
        uint256 price; // Price of the cryptocurrency
        uint256 updatedAt; // Last updated timestamp
    }

    // Mapping to store the cryptocurrency data by symbol
    mapping(string => CryptoData) public cryptoQuotes;

    // Event emitted when a price is updated
    event CryptoPriceUpdated(string symbol, uint256 price, uint256 updatedAt);

    // Modifier to restrict access to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Constructor to initialize the admin
    constructor() {
        admin = msg.sender; // Set contract deployer as admin
    }

    // Function to update the price of a cryptocurrency
    function updateCryptoPrice(string memory _symbol, string memory _name, uint256 _price) external onlyAdmin {
        // Update the price and timestamp
        cryptoQuotes[_symbol] = CryptoData({
            name: _name,
            price: _price,
            updatedAt: block.timestamp
        });

        emit CryptoPriceUpdated(_symbol, _price, block.timestamp);
    }

    // Function to get the price and last updated time of a cryptocurrency by symbol
    function getCryptoPrice(string memory _symbol) external view returns (string memory, uint256, uint256) {
        CryptoData memory crypto = cryptoQuotes[_symbol];
        return (crypto.name, crypto.price, crypto.updatedAt);
    }

    // Function to transfer admin role to a new address
    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be the zero address");
        admin = newAdmin;
    }
}
