define([
    'data/data01',
    'plot'
], function (dataset, Plot) {

    return {

        init: function () {


            console.log('Set up plots ************  ' + new Date()); // You're up and running and this is the time  

            this.dataset = dataset["plot01"]; // make this scale

            console.log(this.dataset);
 
            var Plot1 = new Plot(this.dataset);

            return true;
        }
    };
});
