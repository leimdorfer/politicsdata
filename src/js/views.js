define(['bootstrap'],
	function (jq) {

		var $ = jq.$;
		var pubsub = jq.pubsub;
    
	    Views = function () { 	    	

/*	        this.panels = {

	            'p01': {
	               'element':$('#options'),
	               'visible':true
	            },
	            'p02': {
	               'element':$('#plots'),
	               'visible':false
	            }
	        }*/
	        this.plotToShow = '';

	        this.attacheEventListeners();

	    }

	    Views.prototype = {

	    	attacheEventListeners:function(){

	    		thisView = this;

	    		$('.content').on('click',function(event){

	    			var choiceClicked = $(event.target).closest('.choice');

	    			thisView.plotToShow = choiceClicked[0]['id']; //extract id from clicked choice

	    			pubsub.emit('choiceMade');

				});

	    	},

	        makePanelVisible:function(panel){

	        	console.log('makePanelVisible');

	            console.log(panel);

	            if(panel==='choices'){

						$('plots').addClass('hide');
	            		$('choices').removeClass('hide');
						

					} else {

						$('choices').addClass('hide');
	            		$('plots').removeClass('hide');

					}

	        }
	    }

	return Views;

});