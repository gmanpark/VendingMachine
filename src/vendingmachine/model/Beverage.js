/**
 * Created by Naver on 2014-04-19.
 */
nts.VendingMachine.Beverage = jindo.$Class({
    $init: function () {
        this.aBeverageStock = this.generateBeverageSlot(htOption.beverageSlot | 8);
    },

    decreaseSlotBeverage: function(nSlot){
        this.aBeverageStock[nSlot] -= 1;
    },

    isSlotEnough: function(nSlot){
        return  this.aBeverageStock[nSlot] >= 1;
    },

    isSlotEmpty: function(nSlot){
        return  this.aBeverageStock[nSlot] == 0;
    },

    generateBeverageSlot: function (nSlotCount) {
        var aItemSlot = [];

        for (var count = 0; count < nSlotCount; count++) {
            aItemSlot.push(Math.ceil(Math.random() * 3));
        }

        return aItemSlot;
    }
});