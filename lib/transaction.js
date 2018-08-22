/**
 * 
 * @param {com.github.blockchain_sysu.extpt.Transfer} tx
 * @transaction
 */
async function transferProcessor(tx) {
  let fromWallet = tx.from.wallet;
  let toWallet = tx.to.wallet;
  // TODO add boundary check
  fromWallet.points -= tx.points;
  toWallet.points += tx.points;

  const assetRegistry = getAssetRegistry("com.github.blockchain_sysu.extpt.Wallet");
  await assetRegistry.updateAll([fromWallet, toWallet]);

  // TODO generate events
}

/**
 * @param {com.github.blockchain_sysu.extpt.Generate} tx
 * @transaction
 */
async function generateProcessor(tx) {
  let wallet = tx.manager.wallet;
  wallet.points += tx.points;
  const assetRegistry = getAssetRegistry("com.github.blockchain_sysu.extpt.Wallet");
  await assetRegistry.update(wallet);
}
