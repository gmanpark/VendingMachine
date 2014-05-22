nts.VendingMachine.Util = jindo.$Class({
    $init: function(htOption){
        this._utilOption = htOption;
    },

    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // swap
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    convertToInteger: function (sValue) {
        var sValue = sValue;
        return parseInt(sValue.replace(/[^0-9]+/g, ''), 10);
    }
});