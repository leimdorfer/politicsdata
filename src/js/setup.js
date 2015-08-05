define([
    'bootstrap',
    'data/data01',
    'views',
    'plot'
], function (jq, dataset, Views, Plot) { // 

    return {

        init: function () {

            console.log('Set up ************  ' + new Date()); // You're up and running and this is the time  
            ////////////////////////////////////////////////////////////////////////////////////////////////

            var $ = jq.$;
            var pubsub = jq.pubsub;

            var View = new Views();


            pubsub.on('choiceMade', function () {

                console.log('1: The user chose a graph');

                switch (View.plotToShow) {
                    case 'plot01':

                        console.log(View.plotToShow);
                        
                        this.metadata = dataset["meta01"][0];
                        this.dataset = dataset["plot01"]; // make this scale better
             
                        var Plot1 = new Plot(this.metadata,this.dataset);

                        View.makePanelVisible('plots')

                        break;

                    case 'plot02':
                        
                        console.log('no data yet')

                        break;
                }

            });

            return true;
        }
    };
});
