/**
 * Created by Naver on 2014-04-19.
 */

nts.VendingMachine.WalletView = jindo.$Class({
    $init: function(){
        this.oWalletPresenter = new nts.VendingMachine.WalletPresenter();
        this.activate();
    },

    _onActivate: function(){
        this._attachEvent();
    },

    _attachEvent: function(){
        this.oDragArea = new nts.Component.DragArea('._drag_able').attach({
            onDrag: function (welDraggableMoney) {
                var nDragMoney = Util.convertToInteger(welDraggableMoney.childNodes[0].innerHTML);

                if(oWalletView.isPossibleDrag(nDragMoney)){
                    oWalletView.oWalletPresenter.decreaseMoney(nDragMoney);

                }else{
                    oVendingMachineView.updateConsoleDisplay('돈이 부족합니다.');
                    this._bIsDragging = false;

                }
            }
        });
    },

    showWalletDisplay: function(nMoneyValue){
        $$('.my_money > span')[0].textContent = nMoneyValue;
    },

    isPossibleDrag: function(nDragMoney){
        return this.oWalletPresenter.isMoneyEnough(nDragMoney);
    },

    onReturn: function(nReturnMoney){
        this.oWalletPresenter.increaseMoney(nReturnMoney);
    },

    _onDeactivate: function(){
        this.oDragArea.deactivate();
    }

}).extend(jindo.UIComponent);