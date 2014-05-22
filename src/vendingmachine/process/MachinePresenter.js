/**
 * Created by Naver on 2014-04-14.
 */

nts.VendingMachine.Presenter = jindo.$Class({
    $init: function (oVendingMachineView) {
        this._oView = oVendingMachineView;
        this._oMachine = new nts.VendingMachine.Machine();
        this._oBeverage = new nts.VendingMachine.Beverage();
        this._oView.shuffle();
    },

    onCoin: function (nCoinValue) {
        if (this._oMachine.getCurrentMachineMoney() + nCoinValue <= 3000) {
            this._oMachine.increaseMoney(nCoinValue);

            this.updateConsoleDisplay(nCoinValue + ' 원을 자판기에 넣었습니다.');
            this.updateMachineDisplay();

        } else {
            this.updateConsoleDisplay('투입 금액이 3000원을 초과할 수 없습니다.')

        }
    },

    onBill: function (nBillValue) {
        if (this._oMachine.getCurrentMachineMoney() + nBillValue <= 3000) {
            if (this._oMachine.getBillCount() < 2) {
                this._oMachine.addBillCount();
                this._oMachine.increaseMoney(nBillValue);

                this.updateConsoleDisplay(nBillValue + ' 원을 자판기에 넣었습니다.');
                this.updateMachineDisplay();

            } else {
                this.updateConsoleDisplay('허용된 지폐 수 초과되었습니다.');

            }
        } else {
            this.updateConsoleDisplay('투입 금액이 3000원을 초과할 수 없습니다.')

        }
    },

    onBeverage: function (nItemSlot, sBeverageName, nItemPrice) {
        if (this._oBeverage.isSlotEnough(nItemSlot)) {
            if (this._oMachine.getCurrentMachineMoney() >= nItemPrice) {
                this._oBeverage.decreaseSlotBeverage(nItemSlot);
                this._oMachine.decreaseMoney(nItemPrice);

                this.updateConsoleDisplay(sBeverageName + ' 음료를 뽑았습니다.');
                this.updateMachineDisplay();

                // BeverageSlot change
                if (this._oBeverage.isSlotEmpty(nItemSlot)) {
                    this.updateItemDisplay(nItemSlot);
                }

            } else {
                this.updateConsoleDisplay('투입 금액이 부족합니다.');

            }
        } else {
            this.updateConsoleDisplay('해당 상품은 품절 되었습니다.');

        }
    },

    onReturn: function () {
        var returnMoney = this._oMachine.onReturn();
        this.updateMachineDisplay();
        return returnMoney;
    },

    updateItemDisplay: function (nItemIndex) {
        this._oView.showSoldItemDisplay(nItemIndex);
    },

    updateMachineDisplay: function () {
        this._oView.update(this._oMachine.getCurrentMachineMoney());
    },

    update: function () {
        oWalletView.update();
    },

    updateConsoleDisplay: function (sMessage) {
        this._oView.showConsoleDisplay(sMessage);
    }
});