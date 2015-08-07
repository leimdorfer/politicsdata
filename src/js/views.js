define(['bootstrap'],
	function (jq) {

		var $ = jq.$;
		var pubsub = jq.pubsub;
    
	    Views = function () { 	    	

	        this.plotToShow = '';

	        this.attacheEventListeners();

	    }

	    Views.prototype = {

	    	attacheEventListeners:function(){

	    		thisView = this;

	    		$('.choice').on('click',function(event){

	    			var choiceClicked = $(event.target).closest('.choice');

	    			thisView.plotToShow = choiceClicked[0]['id']; //extract id from clicked choice

	    			pubsub.emit('choiceMade');

				});
	    	},

	        makePanelVisible:function(panel){

	            if(panel==='plots'){

	            	$('#choices').addClass('hide');
            		$('#plots').removeClass('hide');

					pubsub.emit('loadplot');

				} else {

					$('#plots').addClass('hide');
            		$('#choices').removeClass('hide');

            		pubsub.emit('unloadplot');

				}



	        }
	    }

	return Views;

});