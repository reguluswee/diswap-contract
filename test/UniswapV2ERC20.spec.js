const { expect } = require("chai");
const { ethers } = require("hardhat");

//npx hardhat test ./test/swap_test_weth.js --network polygonMumbai

describe("UniswapV2ERC20", function () {
    
    async function deploy() {
        [owner, other] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("ERC20");
        token = await Token.deploy(ethers.utils.parseEther("10000000000000"));
    
        return { token, owner, other };
    }

    describe("start", function () {

        it("name, symbol, decimals, totalSupply, balanceOf", async function () {

            const { token, owner, other } = await loadFixture(deploy);
      
            const name = await token.name();
            expect(name).to.equal("Uniswap V2");
            expect(await token.symbol()).to.equal("UNI-V2");
            expect(await token.decimals()).to.equal(18);
            expect(await token.totalSupply()).to.equal(ethers.utils.parseEther("10000"));
            expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("10000"));

          });

          it("approve", async function () {

            const { token, owner, other } = await loadFixture(deploy);

            await expect(token.approve(other.address, ethers.utils.parseEther("10")))
              .to.emit(token, "Approval")
              .withArgs(owner.address, other.address, ethers.utils.parseEther("10"));
            expect(await token.allowance(owner.address, other.address)).to.equal(ethers.utils.parseEther("10"));
          });
        
          it("transfer", async function () {
            const { token, owner, other } = await loadFixture(deploy);

            await expect(token.transfer(other.address, ethers.utils.parseEther("10")))
              .to.emit(token, "Transfer")
              .withArgs(owner.address, other.address, ethers.utils.parseEther("10"));
            expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("9990"));
            expect(await token.balanceOf(other.address)).to.equal(ethers.utils.parseEther("10"));
          });

          it('transfer:fail', async function() {

            const { token, owner, other } = await loadFixture(deploy);

            await expect(token.transfer(other.address, TOTAL_SUPPLY.add(1))).to.be.reverted // ds-math-sub-underflow
            await expect(token.connect(other).transfer(wallet.address, 1)).to.be.reverted // ds-math-sub-underflow

          })
        
          it('transferFrom', async function() {

            const { token, owner, other } = await loadFixture(deploy);

            await token.approve(other.address, TEST_AMOUNT)
            await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
              .to.emit(token, 'Transfer')
              .withArgs(wallet.address, other.address, TEST_AMOUNT)
            expect(await token.allowance(wallet.address, other.address)).to.eq(0)
            expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
            expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
          })
        
          it('transferFrom:max', async function() {

            const { token, owner, other } = await loadFixture(deploy);

            await token.approve(other.address, MaxUint256)
            await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
              .to.emit(token, 'Transfer')
              .withArgs(wallet.address, other.address, TEST_AMOUNT)
            expect(await token.allowance(wallet.address, other.address)).to.eq(MaxUint256)
            expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
            expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
          })
        
          it('permit', async function() {

            const { token, owner, other } = await loadFixture(deploy);

            const nonce = await token.nonces(wallet.address)
            const deadline = MaxUint256
            const digest = await getApprovalDigest(
              token,
              { owner: wallet.address, spender: other.address, value: TEST_AMOUNT },
              nonce,
              deadline
            )
        
            const { v, r, s } = ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(wallet.privateKey.slice(2), 'hex'))
        
            await expect(token.permit(wallet.address, other.address, TEST_AMOUNT, deadline, v, hexlify(r), hexlify(s)))
              .to.emit(token, 'Approval')
              .withArgs(wallet.address, other.address, TEST_AMOUNT)
            expect(await token.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
            expect(await token.nonces(wallet.address)).to.eq(bigNumberify(1))

          })
    })

  
  });