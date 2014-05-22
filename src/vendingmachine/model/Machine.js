/**
 * Created by Naver on 2014-04-14.
 */
nts.VendingMachine.Machine = jindo.$Class({
    $init: function () {
        this._nInsertedMoney = 0;
        this._nBillCounter = 0;
    },

    getCurrentMachineMoney: function () {
        return this._nInsertedMoney;
    },

    increaseMoney: function (nMoneyValue){
      this._nInsertedMoney += nMoneyValue;
    },

    decreaseMoney: function (nMoneyValue){
      this._nInsertedMoney -= nMoneyValue;
    },

    addBillCount: function () {
        this._nBillCounter += 1;
    },

    getBillCount: function () {
        return this._nBillCounter;
    },

    onReturn: function () {
        var returnMoney = this.getCurrentMachineMoney();
        this._nInsertedMoney = 0;
        this._nBillCounter = 0;
        return returnMoney;
    }
});