/**
 * @param {com.github.blockchain_sysu.extpt.Transfer} tx
 * @transaction
 */
async function transferProcessor(tx) {
    let fromWallet = tx.from.wallet;
    let toWallet = tx.to.wallet;
    if (fromWallet.points < tx.points)
        throw new Error("No enough points");
    fromWallet.points -= tx.points;
    toWallet.points += tx.points;

    const assetRegistry = await getWalletRegistry();
    await assetRegistry.updateAll([fromWallet, toWallet]);
}

/**
 * @param {com.github.blockchain_sysu.extpt.Generate} tx
 * @transaction
 */
async function generateProcessor(tx) {
    let wallet = tx.manager.wallet;
    wallet.points += tx.points;
    const assetRegistry = await getWalletRegistry();
    await assetRegistry.update(wallet);
}

async function getWalletRegistry() {
    return getAssetRegistry("com.github.blockchain_sysu.extpt.Wallet");
}
