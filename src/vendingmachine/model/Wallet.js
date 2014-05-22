/**
 * Created by Naver on 2014-04-14.
 */
nts.VendingMachine.oWallet = jindo.$Class({
    $init: function (nAmount) {
        this._nWalletMoney = nAmount;
    },

    increaseMoney: function (nMoneyValue) {
        this._nWalletMoney += nMoneyValue;
    },

    decreaseMoney: function (nMoneyValue) {
            this._nWalletMoney -= nMoneyValue;
    },

    getWalletMoney: function () {
        return this._nWalletMoney;
    }
});