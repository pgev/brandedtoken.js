'use strict';

const StakeHelper = require('./StakeHelper');

/**
 * Facilitator performs below tasks:
 * - approves bounty amount to GatewayComposer
 * - calls GatewayComposer.acceptStakeRequest
 */
class Facilitator {
  /**
   * Facilitator constructor object.
   *
   * @param originWeb3 Origin chain web3 address.
   * @param valueToken Value token contract address.
   * @param brandedToken Branded Token contract address.
   * @param gatewayComposer Gateway composer contract address.
   * @param facilitator Facilitator address.
   */
  constructor(originWeb3, valueToken, brandedToken, gatewayComposer, facilitator) {
    const oThis = this;

    oThis.originWeb3 = originWeb3;
    oThis.valueToken = valueToken;
    oThis.gatewayComposer = gatewayComposer;
    oThis.brandedToken = brandedToken;
    oThis.facilitator = facilitator;
  }

  /**
   * Facilitator performs below tasks:
   * - approves bounty amount to GatewayComposer
   * - calls GatewayComposer.acceptStakeRequest
   *
   * Note: Add KYC worker account/private key in web3 wallet before calling acceptStakeRequest.
   *
   * @param stakeRequestHash Stake request hash unique for each stake.
   * @param signature Signature object format:
   *                  {
   *                    messageHash: signHash,
   *                    v: vrs[0],
   *                    r: vrs[1],
   *                    s: vrs[2],
   *                    signature: signature
   *                  }
   * @param bountyInWei Bounty amount in wei's that needs to be approved.
   * @param valueTokenAbi ValueToken contract ABI.
   * @param hashLock HashLock of facilitator.
   * @param originWeb3 Origin chain web3 object.
   * @param txOptions - Tx options.
   */
  async acceptStakeRequest(stakeRequestHash, signature, bountyInWei, valueTokenAbi, hashLock, originWeb3, txOptions) {
    const oThis = this;

    const stakeHelperInstance = new StakeHelper(oThis.originWeb3, oThis.brandedToken, oThis.gatewayComposer);
    await stakeHelperInstance.approveForBounty(
      oThis.facilitator,
      bountyInWei,
      oThis.valueToken,
      valueTokenAbi,
      originWeb3
    );
    await stakeHelperInstance.acceptStakeRequest(
      stakeRequestHash,
      signature,
      oThis.facilitator,
      hashLock,
      oThis.originWeb3,
      txOptions
    );
  }
}

module.exports = Facilitator;