define([
    'bootstrap',
    'data/data01',
    'views',
    'plot'
], function (jq, dataset, Views, Plot) { // 

    return {

        init: function () {

            console.log('Set up ****** ' + new Date()); // You're up and running and this is the time  
            //////////////////////////////////////////////////////////////////////////////////////////

            var $ = jq.$;
            var pubsub = jq.pubsub;

            var View = new Views();

            console.log(dataset['data']);

            this.metadata = dataset['meta']['cols'];
            this.dataset = dataset['data']; 



            pubsub.on('choiceMade', function () {

                console.log('The user made a choice');

                switch (View.plotToShow) {
                    case 'plot01':

                        //console.log(View.plotToShow);
                        
                        this.dataColumnsForPlot = {
                            'names':0,
                            'x':1,
                            'y':2,
                            'results':4
                        }; // Which columns of data do you want on axis and infopanel

                        View.makePanelVisible('plots')

                        break;

                    case 'plot02':
                        
                        console.log('no data yet')

                        break;

                    case 'backToChoices':

                        View.makePanelVisible('choices')

                        break;
                }

            });

            pubsub.on('loadplot',function(){

                this.plot = new Plot(
                    dataset['meta']['cols'],
                    dataset['data'],
                    this.dataColumnsForPlot
                );

            });

            pubsub.on('unloadplot',function(){

                this.plot.removeAll(); // BUG This stops the subsequant loadplot from working!! FIX NEEDED.

            });


            return true;
        }
    };
});
