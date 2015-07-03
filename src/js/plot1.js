define([
    'lib/d3.v3',
    'data/data',
    'colors'
], function (d3 , dataset, colors) {

    return {

        init: function () {

            console.log('Plot 1 ************  ' + new Date()); // You're up and running and this is the time


            var Colors = new colors();

            console.log(Colors.forThisParty("IND"))

            Plot1 = function () { 


                this.drawSVG();

                this.drawInfopanel();

                this.addDataToPlot();


            }

            Plot1.prototype = {

                drawSVG: function(){

                //Width and height
                this.w = 624;
                this.h = 425;
                this.padding = 50;

                //Create SVG element
                this.svg = d3.select("body")
                    .append("svg")
                    .attr("width", this.w)
                    .attr("height", this.h);

                },

                addDataToPlot: function(){

                    console.log("plotting")

                    this.xScale = d3.scale.linear()
                        .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                        .range([this.padding, this.w-this.padding*2]);

                    this.yScale = d3.scale.linear()
                        .domain([0, d3.max(dataset, function(d) { return d[2]; })])
                        .range([h-this.padding, this.padding]); //

                    //Define xAxis
                    this.xAxis = d3.svg.axis()
                        .scale(this.xScale)
                        .orient("bottom")
                        .ticks(5);  //Set rough # of ticks

                      //Define Y axis
                    this.yAxis = d3.svg.axis()
                        .scale(this.yScale)
                        .orient("left")
                        .ticks(5);

                    this.svg.selectAll("circle") //circle for each 
                        .data(dataset)
                        .enter()
                        .append("circle")
                        .attr("cx", function(d) {
                          return this.xScale(d[1]);
                        })
                        .attr("cy", function(d) {
                          return this.yScale(d[2]);
                        })
                        .attr("r", 8)               // set the radius
                        .style("stroke-width", 2)    // set the stroke width
                        .style("opacity", .7)      // set the element opacity
                        .style("stroke", function(d){
                          return Colors.forThisParty(d[3]); // stroke colour from the result field - change this later?
                        })     
                        .style("fill", function(d){
                          return Colors.forThisParty(d[3]); // fill colour from the result field
                        }) 
                        .on("click", function(d){
                          return this.pointClicked(d[0]);
                        });

                        //Create X axis
                        this.svg.append("g")
                          .attr("class", "axis")  //Assign "axis" class
                          .attr("transform", "translate(0," + (this.h - this.padding) + ")")
                          .call(this.xAxis);

                        //Create Y axis
                        this.svg.append("g")
                          .attr("class", "axis")
                          .attr("transform", "translate(" + this.padding + ",0)")
                          .call(this.yAxis);

                },

                drawInfopanel: function(){

                    this.infopanel = d3.select("body")
                        .append("p")
                        .attr("class", "infopanel")  //Assign "axis" class

                    this.infopanel.text("Click on a dot");
                },

                pointClicked: function(constituency){

                  //console.log(constituency);
                  this.infopanel.text("You clicked: " + constituency);

                }
            }

            Plot1()

            return true;
        }
    };
});



////////////   TO DO Add pubsub?

            //var pubsub = news.pubsub;

            // var pageElementsView = new PageElementsView();


            // pubsub.on('overviewUpdated', function (overviewFromModel) {

            //     console.log('4: The overview has updated');

            //     // Update the content of the overview Panel
            //     // outputsView.updateOverviewPanel(overviewFromModel);

            // });

