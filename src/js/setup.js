define([
    'data/data01',
    'plot'
], function (dataset, Plot) {

    return {

        init: function () {


            console.log('Set up plots ************  ' + new Date()); // You're up and running and this is the time  

            this.metadata = dataset["meta01"][0];
            this.dataset = dataset["plot01"]; // make this scale

            //console.log(this.metadata);
 
            var Plot1 = new Plot(this.metadata,this.dataset);

            return true;
        }
    };
});
