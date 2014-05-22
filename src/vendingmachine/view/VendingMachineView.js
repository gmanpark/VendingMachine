/**
 * Created by Naver on 2014-04-14.
 */
nts.VendingMachine.View = jindo.$Class({
    $init: function () {
        this._oPresenter = new nts.VendingMachine.Presenter(this);
        this.activate();
    },

    _onActivate: function () {
        this._cachedFunction();
        this._attachEvent();
    },

    _cachedFunction: function () {
        this._fnSelectItem = function (e) {
            var elDelegate = e.delegatedElement;

            var nBeveragePrice = Util.convertToInteger(elDelegate.innerText);
            var sBeverageName = elDelegate.querySelector('.blind').innerHTML;;
            var nBeverageSlot = oVendingMachineView._searchItemSlot(elDelegate);

            oVendingMachineView._oPresenter.onBeverage(nBeverageSlot, sBeverageName, nBeveragePrice);
        };

        this._fnOnReturn = function () {
            var nReturnMoney = oVendingMachineView._oPresenter.onReturn();
            oWalletView.onReturn(nReturnMoney);
            oVendingMachineView.showConsoleDisplay(nReturnMoney + ' 원이 반환되었습니다.');
        };

        this._fnCoinDrop = function (welDropabbleCoin) {
            var nDropCoin = Util.convertToInteger(welDropabbleCoin.innerHTML);

            if (oVendingMachineView._isCoin(nDropCoin)) {
                oVendingMachineView._oPresenter.onCoin(nDropCoin);
            }
        };

        this._fnBillDrop = function (welDroppableBill) {
            var nDropBill = Util.convertToInteger(welDroppableBill.innerHTML);

            if (oVendingMachineView._isBill(nDropBill)) {
                oVendingMachineView._oPresenter.onBill(nDropBill);
            }
        };
    },

    _attachEvent: function () {
        jindo.$Element('_product_area').delegate('mousedown', 'li', this._fnSelectItem);
        jindo.$Element('_btn_money_return').attach('mousedown', this._fnOnReturn);
        this.oDropCoinArea = new nts.Component.DropArea('.insert_coin', '._drag_able').attach({onDrop: this._fnCoinDrop});
        this.oDropBillArea = new nts.Component.DropArea('.insert_papermoney', '._drag_able').attach({onDrop: this._fnBillDrop});
    },

    showSoldItemDisplay: function (nItemIndex) {
        var elSelectedBeverage = $$("li[class^=item]")[nItemIndex];
        var elSpan = document.createElement('span');

        elSpan.className = 'soldout_msg';
        elSpan.innerText = '품절';
        elSelectedBeverage.appendChild(elSpan);
        elSelectedBeverage.className += ' disable_buy';
        elSelectedBeverage.childNodes[1].disabled = true;
        elSelectedBeverage.childNodes[1].className = 'disable_buy';
    },

    update: function (nValue) {
        $$('.insert > span')[0].textContent = nValue;
    },

    showConsoleDisplay: function (sMessage) {
        var elMessage = document.createElement('div');
        elMessage.className = 'message';
        elMessage.innerHTML = sMessage;

        var elConsole = document.getElementById('_console_area');
        elConsole.appendChild(elMessage);
        elConsole.scrollTop = elConsole.scrollHeight;
    },

    shuffle: function () {
        var aShuffleBeverages = Util.shuffle($$("li[class^=item]"));
        var elParent = $$(".product_area>ul")[0];

        for (var nCount = 0; nCount < elParent.childElementCount; nCount++) {
            var elBeverage = aShuffleBeverages.pop();
            elParent.appendChild(elBeverage);
        }
    },

    _searchItemSlot: function (elDelegate) {
        var nItemIndex = 0;

        while (elDelegate.parentElement.children[nItemIndex] != elDelegate) {
            nItemIndex += 1;
        }
        return nItemIndex;
    },

    _isCoin: function (nDropMoney) {
        return nDropMoney < 1000;
    },

    _isBill: function (nDropMoney) {
        return nDropMoney >= 1000;
    },

    _onDeactivate: function () {
        jindo.$Element('_product_area').undelegate('mousedown', 'li', this._fnSelectItem);
        jindo.$Element('_btn_money_return').detach('mousedown', this._fnOnReturn);
        this.oDropCoinArea.deactivate();
        this.oDropBillArea.deactivate();
    }

}).extend(jindo.UIComponent);