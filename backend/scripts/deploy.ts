import { ethers } from "hardhat";

function tokens(n){
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  let copy_app: CopyApp;
  let deployer: { address: any; };

  [deployer] = await ethers.getSigners();
  // Deploying the Contract
  const CopyApp = await ethers.getContractFactory("CopyApp");
  copy_app = await CopyApp.deploy("testing", "*");

  await copy_app.deployed();

  console.log("Deployed Copy App Contract at: "+copy_app.address);

  let Channels = ["general", "intro", "Testing"];
  let Cost = [tokens(1), tokens(0), tokens(0.25)]

  for(let i = 0; i < Channels.length; i++){
    let transaction = await copy_app.connect(deployer).createChannel(Channels[i], Cost[i]);
    transaction.wait();

    console.log("Channel created "+Channels[i]);
  }

  const network = await ethers.getDefaultProvider().getNetwork();
  console.log(network.chainId);
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
