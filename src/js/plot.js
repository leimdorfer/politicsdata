define(
    ['lib/d3.v3','colors'], function (ignore, colors) {

    Plot = function (dataset) { 

        //Use global d3

        this.dataset = dataset
        
        this.Colors = new colors(); //console.log(this.Colors.forThisParty("CON"))
        
        this.drawInfopanel();
        this.drawSVG();
        this.addDataToPlot(this.dataset);
        this.drawDotSelector();

    };

    Plot.prototype = {

        //PUBLIC

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

        drawInfopanel: function(){

            this.infopanel = d3.select("body")
                .append("p")
                .attr("class", "infopanel")  //Assign "infopanel" class

            this.infopanel.text("Plot data loading shortly...");
        },

        drawDotSelector: function(){

            var thisPlot = this;

            this.dotSelector = thisPlot.svg.append("circle")
                // .attr("cx", 0)
                // .attr("cy", 0)
                // .attr("r", 10)               // set the radius
                // .style("stroke-width", 2)    // set the stroke width
                .style("stroke", "transparent")
                .style("fill", "transparent");

        },

        pointClicked: function(constituency,thisDot){

            var thisPlot = this;

            //console.log(constituency);
            thisPlot.infopanel.text("You clicked: " + constituency);

            thisPlot.dotSelected(thisDot);

        },

        dotSelected: function(thisDot){

            var thisPlot = this; 

            var x = thisDot.cx.baseVal.value; // x & y values extracted from svg element
            var y = thisDot.cy.baseVal.value;

            thisPlot.dotSelector
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 10)               // set the radius
                .style("stroke-width", 2)    // set the stroke width
                .style("stroke", "black")
                .style("fill", "transparent");

        },

        addDataToPlot: function() {

            var thisPlot = this; // Scoping hack that I still don't fully understand.

            //console.log("plotting")

            var xScale = d3.scale.linear()
                .domain([0, d3.max(this.dataset, function(d) { return d[1]; })])
                .range([this.padding, this.w-this.padding*2]);

            var yScale = d3.scale.linear()
                .domain([0, d3.max(this.dataset, function(d) { return d[2]; })])
                .range([this.h-this.padding, this.padding]); //

            //Define xAxis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);  //Set rough # of ticks

              //Define Y axis
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);

            this.svg.selectAll("circle") //circle for each 
                .data(this.dataset)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                  return xScale(d[1]);
                })
                .attr("cy", function(d) {
                  return yScale(d[2]);
                })
                .attr("r", 8)               // set the radius
                .style("stroke-width", 2)    // set the stroke width
                .style("opacity", .7)      // set the element opacity
                .style("stroke", function(d){
                  return thisPlot.Colors.forThisParty(d[3]); // stroke colour from the result field - change this later?return thisPlot.Colors.forThisParty("CON");
                })     
                .style("fill", function(d){
                  return thisPlot.Colors.forThisParty(d[3]); // fill colour from the result field
                }) 
                .on("click", function(d){
                  return thisPlot.pointClicked(d[0],this);
                });

                //Create X axis
                thisPlot.svg.append("g")
                  .attr("class", "axis")  //Assign "axis" class
                  .attr("transform", "translate(0," + (this.h - this.padding) + ")")
                  .call(xAxis);

                //Create Y axis
                thisPlot.svg.append("g")
                  .attr("class", "axis")
                  .attr("transform", "translate(" + this.padding + ",0)")
                  .call(yAxis);

                thisPlot.infopanel.text("Click on a dot for more info"); // data loaded instructions

        }

    };

    return Plot;
        
});












//             Plot1.prototype = {

//                 drawSVG: function(){

//                 //Width and height
//                 this.w = 624;
//                 this.h = 425;
//                 this.padding = 50;

//                 //Create SVG element
//                 this.svg = d3.select("body")
//                     .append("svg")
//                     .attr("width", this.w)
//                     .attr("height", this.h);

//                 },

//                 addDataToPlot: function(){



//                 },

//                 drawInfopanel: function(){

//                     this.infopanel = d3.select("body")
//                         .append("p")
//                         .attr("class", "infopanel")  //Assign "axis" class

//                     this.infopanel.text("Click on a dot");
//                 },

//                 pointClicked: function(constituency){

//                   //console.log(constituency);
//                   this.infopanel.text("You clicked: " + constituency);

//                 }
//             }




