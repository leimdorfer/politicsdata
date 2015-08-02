define(
    ['lib/d3.v3','colors'], function (ignore, colors) {

    Plot = function (metadata,dataset) { 

        //Use global d3
        this.metadata = metadata;
        this.dataset = dataset;
        
        this.Colors = new colors(); //console.log(this.Colors.forThisParty("CON"))
        

        this.drawDropdown();
        this.drawInfopanel();
        this.drawSVG();
        this.addDataToPlot(this.dataset);
        this.drawDotSelector();

        this.selectedConstituency = "None";

    };

    Plot.prototype = {

        //PUBLIC

        returnConstituencyList: function(){

            this.ddLabels=[];
            this.ddOptions=[];

            for (var i=0; i<this.dataset.length; i++){

                this.ddLabels[i]=this.dataset[i][0];
                this.ddOptions[i]=i;
            };

        },

        drawSVG: function(){

            //Width and height
            this.w = 624;
            this.h = 425;
            this.padding = 70;

            //Create SVG element
            this.svg = d3.select("#plot_content")
                .append("svg")
                .attr("width", this.w)
                .attr("height", this.h);

        },

        drawInfopanel: function(){
            this.infopanel = d3.select("#info_panel")
                .append("div")
                .attr("class", "infopanel");  //Assign "infopanel" class

            this.infopanel.text("Plot data loading shortly...");
        },

        drawDropdown: function(){

            //console.log(this.dataset);
            var thisPlot = this;

            this.returnConstituencyList();

            var labels = this.ddLabels;
            var options = this.ddOptions;

            // Build the dropdown menu
            this.dropdown = d3.select("#selectordd")
                .append("select")
                .attr("class", "dd")
                .selectAll("option")
                .data(options)
                .enter()
                .append("option")
                // Provide available text for the dropdown options
                .text(function(d) {return labels[d];})
                

            d3.select("select")
                .on("change", function() {

                    key = this.selectedIndex; //console.log(key); //
                    console.log(thisPlot.ddLabels[key]);

                    thisPlot.selectedConstituency = thisPlot.ddLabels[key];
                });
        },

        drawDotSelector: function(){

            var thisPlot = this;

            this.dotSelector = thisPlot.svg.append("circle")
                .style("stroke", "transparent")
                .style("fill", "transparent");

        },

        youClickedTheRightDot: function(constituency){

            //var thisPlot = this;

            if(constituency===this.selectedConstituency){
                return true;
            } else return false;

        },

        pointClicked: function(thisData,thisDot){

            var thisPlot = this;

            if( this.youClickedTheRightDot(thisData[0]) ){

                var msg = "Yes. That is: ";

            } else  var msg = "No. You clicked: ";
            
            //thisPlot.infopanel.text(thisData[0]); [ "Aldershot", 63.8,  14901, "CON"]

            var tx = msg + thisData[0] + ": " + thisData[3] + " majority of " + thisData[2] + ". Turnout: " + thisData[1] + "%"

            // var infoblock = thisPlot.infopanel.append("p")
            // .attr("class", "resultblock");
            thisPlot.infopanel.attr("class", "resultblock");

            thisPlot.infopanel.style("border-color", function(d) {
                var partyColor = thisPlot.Colors.forThisParty(thisData[3]); // fill colour from the result field
                return partyColor;
            });

            thisPlot.infopanel.text(tx);

            thisPlot.dotSelected(thisDot);
            //thisPlot.dotSelected(thisDot);

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
                .domain([0, d3.max(this.dataset, function(d) { return (d[2]/1000); })]) // NOTE: majority is now in thousands!!
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
                  return yScale((d[2]/1000)); // TO DO: majority is now in thousands!! make this scale by pulling scale from metadata
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
                  return thisPlot.pointClicked(d,this); // send rown of data and svg element to "clicked" method.
                });

                //Create X axis
                thisPlot.svg.append("g")
                  .attr("class", "x axis")  //Assign "axis" class
                  .attr("transform", "translate(0," + (this.h - this.padding) + ")")
                  .call(xAxis);

                //Create Y axis
                thisPlot.svg.append("g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(" + this.padding + ",0)")
                  .call(yAxis);

                d3.select(".x.axis") 
                    .append("text")
                    .text(this.metadata[1]) 
                    .attr("x", (this.w / 2) - this.padding)
                    .attr("y", this.padding / 1.5);

                d3.select(".y.axis") 
                    .append("text")
                    .text(this.metadata[2] + " (000)") 
                    .attr("transform", "rotate (-90, -43, 0) translate(-280)");



                thisPlot.infopanel.text("Click on a dot for more info"); // data loaded instructions

        }

    };

    return Plot;
        
});

