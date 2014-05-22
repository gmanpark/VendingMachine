/**
 * Created by Naver on 2014-04-19.
 */
nts.VendingMachine.WalletPresenter = jindo.$Class({
    $init: function () {
        this._oWallet = new nts.VendingMachine.oWallet(htOption.walletMoney | 10000);
    },

    increaseMoney: function (nMoneyValue) {
        this._oWallet.increaseMoney(nMoneyValue);
        oWalletView.update(this._oWallet.getWalletMoney());
    },

    decreaseMoney: function (nDragMoney) {
        this._oWallet.decreaseMoney(nDragMoney);
        oWalletView.update(this._oWallet.getWalletMoney());
    },

    isMoneyEnough: function (nDragMoney) {
        return this._oWallet.getWalletMoney() >= nDragMoney;
    },

    update: function(){
        oWalletView.update(this._oWallet.getWalletMoney());
    }
});