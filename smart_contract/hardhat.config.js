/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

