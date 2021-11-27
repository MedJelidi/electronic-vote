# Electronic Vote

## About

A decentralized application on the Euthereum Blockchain that allows accounts to cast electronic votes for an electronic election between more than two candidates.

## Prerequisites

[NPM](https://www.npmjs.com/) -
[Ganache](https://www.trufflesuite.com/ganache) -
[Truffle](https://trufflesuite.com/) -
[MetaMask](https://metamask.io/)

## Usage

### NPM
Enter working directory and run:
```
npm install
```
### Ganache
Create a new Ganache workspace and link the truffle project by adding truffle-config.js to the workspace.

### Truffle
Enter project directory and run:
```
truffle compile
```
```
truffle migrate
```
### MetaMask
Add the MetaMask extension to your browser, add a new network with details from Ganache workspace, then import an account from Ganache by parsing its private key in MetaMask.

Finally, run:
```
npm run dev
```

## Results

### Vote
![Vote](https://media2.giphy.com/media/pHZrb4ZscB6apHTtcT/giphy.gif)

### Add candidate
![Add](https://media0.giphy.com/media/rXQx0h3noPvcMAfCk5/giphy.gif)

### Switch Account
![Switch](https://media4.giphy.com/media/z8cOXWunrj24mFehOM/giphy.gif)
