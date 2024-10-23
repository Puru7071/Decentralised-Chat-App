// scripts/deploy.js

async function main() {
    // Get the contract factory
    const ChatApp = await ethers.getContractFactory("ChatApp");

    console.log("Deploying ChatApp...");
    
    // Deploy the contract
    const chatApp = await ChatApp.deploy(); // Constructor arguments can be passed here if needed
    
    // Wait for the deployment transaction to be mined
    await chatApp.waitForDeployment();
    
    // Get the deployed contract address
    const chatAppAddress = await chatApp.getAddress();
    
    console.log("ChatApp deployed to:", chatAppAddress);
}

// Handle the deployment
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


    