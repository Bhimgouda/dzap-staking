# Dzap

Only Valid URL - https://domain.com/0x64DE202c43c0C2F666222E8bF327eA1f280d9948 (As it doesn't have any home page or other tokens for staking)

1. Designed the UI as specified.
2. Users can connect using their MetaMask on the Polygon Mumbai testnet (or any supported chains).
3. Fetching and displaying user staking details from the contract (APY, total staked, etc.).
4. Users can stake and unstake their staking positions.
5. Users can add more funds to their existing position.
6. Showing users' current rewards from the contract.
7. Used Wagmi & Viem for contract interactions.
8. Matched the UI as specified. (To be honest, I am not a CSS expert, and I rarely work with it).
9. I have done Proper error handling wherever needed and the UX is user-friendly

## I have gone the extra mile

1. I have kept the design multichain, allowing for easy scalability to multiple chains by adding chains to the supported chains.json config file.
2. Similarly, I have designed the system to be modular and scalable, enabling the addition of tokens (with different decimal places) to the stakingTokens.json config file (or a database). The frontend will be able to handle staking for all such tokens.
