import { expect } from "chai";
import { ethers } from "hardhat";import { CopyApp } from "../typechain-types";
;

function tokens(n){
    return ethers.utils.parseUnits(n.toString(), 'ether')
}



describe("CopyApp", function() {
    let copy_app: CopyApp;
    let deployer: { address: any; };
    let user: { address: any; };

    this.beforeEach(async function(){
        [deployer, user] = await ethers.getSigners();
        // Deploying the Contract
        const CopyApp = await ethers.getContractFactory("CopyApp");
        copy_app = await CopyApp.deploy("testing", "*");


        const transaction = await copy_app.connect(deployer).createChannel("general", tokens(1))
        await transaction.wait();
    });


    describe("Deployment", function (){

        it("set name in copy app", async function(){
            // Fetching name
            let name = await copy_app.name();
            // Checking name
            expect(name).to.equal("testing");
        });

        it("set symbol in copy app", async () => {
            // Fetching symbol
            let sym = await copy_app.symbol();
            // Checking symbol
            expect(sym).to.equal("*");
        });


        it("check the owner",async () => {
            let sender = await copy_app.owner();
            expect(sender).to.equal(deployer.address);
        })


        it("Creation of the general channel",async () => {
            let channel = await copy_app.getChannel(1);
            expect(channel.name).to.equal("general");
            expect(channel.id).to.equal(1);
            expect(channel.cost).to.equal(tokens(1));
        })
    });


    describe("Checking of joining the channel is valid or miniting an nft", function(){
        this.beforeEach(async () => {

            let transaction = await copy_app.connect(user).mint(1, {value: tokens(1)});
            await transaction.wait();
        })

        it("check if the user is able to connect",async () => {
            let connection = await copy_app.totalSupply();
            expect(connection).to.equal(1);
        })

        it("check if the transection is successfull",async () => {
            let amt  = await ethers.provider.getBalance(copy_app.address)
            expect(amt).to.equal(tokens(1))
        })

    });

    describe("Withdrawing", () => {
        const ID = 1
        const AMOUNT = ethers.utils.parseUnits("1", 'ether')
        let balanceBefore
    
        beforeEach(async () => {
          balanceBefore = await ethers.provider.getBalance(deployer.address)
    
          let transaction = await copy_app.connect(user).mint(ID, { value: AMOUNT })
          await transaction.wait()
    
          transaction = await copy_app.connect(deployer).withdraw()
          await transaction.wait()
        })
    
        it('Updates the owner balance', async () => {
          const balanceAfter = await ethers.provider.getBalance(deployer.address)
          expect(balanceAfter > balanceBefore)
        })
    
        it('Updates the contract balance', async () => {
          const result = await ethers.provider.getBalance(copy_app.address)
          expect(result).to.equal(0)
        })
      })

});