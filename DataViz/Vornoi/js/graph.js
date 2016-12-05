var viewGraph = function(received_topic){

        d3.selectAll("svg > *").remove();

        d3.selectAll(".Posts").remove();
        d3.selectAll(".w3-btn").remove();
        d3.selectAll("p").remove();
        d3.select("#body").html("");
        d3.select("#first").remove();
        d3.select("#mainback").remove();

        d3.select("body")
        .insert("div",":first-child")
        .attr("id","mainback")
        .append("input")
        .attr("type", "button")
        .attr("class","w3-btn")
        .attr("value", "Back")
        .attr("onclick", "mainBack(twoTopic)");

        d3.select("#mainback")
        .append("a")
        .attr("href", "./index.html")
        .attr("class","w3-btn")
        .html("Home")


		var getId = function(d) {
    				return d.V3;
		};
 
		var getPost = function(d) {
    				return d.V4;
		};
 
		var getX = function(d) {
                    x = isNaN(d.V1)?0:d.V1;
    		    return x;
		};
 
		var getY = function(d) {
                    y = isNaN(d.V2)?0:d.V2;
    		    return y;
		};

        var dest = "./Results/"+received_topic+"Result.csv";


		d3.csv(dest, function (error, root) {
			if (error){
                        d3.select("#mainback")
                          .append("p")
                          .text("No post found for these two topics");

                        window.scrollTo(0, 0);
            }else{
 
			var margin = {top: 20, right: 20, bottom: 40, left: 40},
			// This margin makes sure the two axes will not overlap,
			// making the plot more readable.
    			axesMargin = 10,
    			width = 960 - margin.left - margin.right - axesMargin,
    			height = 500 - margin.top - margin.bottom - axesMargin;
 
			// Create the SVG container in which we will draw the volcano plot
			// making sure to reserve enough space on the left and on the bottom
			// to show the axes labels. We also reserve a bit of space on the top
			// and on the right to avoid that data points on the edges will be
			// cut off from the SVG container.
			var svg = d3.select("svg")
    				.style("width", width + margin.left + margin.right)
    				.style("height", height + margin.top + margin.bottom);

			topicArray = received_topic.split("_");

        		svg.append("text")
            		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            		.attr("transform", "translate("+(margin.left/2)+","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            		.text(topicArray[1]);

        		svg.append("text")
            		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            		.attr("transform", "translate("+ (width/2) +","+(height+35+(margin.bottom/2))+")")  // centre below axis
            		.text(topicArray[0]);

			// Build a linear scale for the x-axis.
			var xScale = d3.scaleLinear().range([0, width]).domain([0,1]),
			// Build a log10 scale for the y-axis
    			yScale = d3.scaleLinear().range([0, height]).domain([1,0]);
 
			// Create the D3 axes objects.
			var xAxis = d3.axisBottom().scale(xScale),
    			yAxis = d3.axisLeft().scale(yScale);

			// We create the svg group that will contain the volcano plot and
			// we translate all the contained object
			var plot = svg.append("g")
         			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
			// It is time to draw the y axis...
			plot.append("g")
        		.attr("class", "y axis")
        		.attr("transform", "translate(5," + -axesMargin + ")")
        		.call(yAxis)
        		// ...and its label.
        		.append("text")
        		.attr("class", "label")
        		// We want to rotate the label so that it follows the axis orientation
        		.attr("transform", "rotate(-90)")
        		.attr("y", 6)
        		.attr("dy", ".71em")
        		.style("text-anchor", "end")
        		.text("Topic1");
			

			// Now the x-axis...
			plot.append("g")
        		.attr("class", "x axis")
        		.attr("transform", "translate(" + axesMargin + "," + height + ")")
        		.call(xAxis)
        		// ... end its label.
        		.append("text")
        		.attr("class", "label")
        		.attr("x", width)
        		.attr("y", -6)
        		.style("text-anchor", "end")
        		.text("Topic2");  

			var isSignificant = function(d) {
    				return !!(Math.abs(getX(d)) > 0.3 && getY(d) > 0.2);
			};

			// Let's create a group to contain all the data points, correctly spaced from the axes.
			var scatter = plot.append("g")
        			.attr("class", "scatter")
        			.attr("transform", "translate(" + axesMargin + "," +  -axesMargin + ")");
 
			// The radius and border size of each data point.
			var radius = 3, border = 2;
 
			// This is a classical example of function composition. It will return
			// the value returned by the specified accessor, scaled, and rounded.
			var getScaled = function(scale, accessor) {
    				return function (d) {
        				return scale(accessor(d));
    				}
			};

			// Finally let's draw the single data points
			var circles = scatter.selectAll("circle").data(root, getId)
        				.enter().append("circle")
        				.attr("cx", getScaled(xScale, getX))
        				.attr("cy", getScaled(yScale, getY))
        				.attr("r", radius)
        				.classed("significant", isSignificant)
					.on("click", function(d){
						showAnswer(getId(d),received_topic);
					 })
					.on("mouseover", function(d){
							d3.selectAll(".Posts").remove();
						    	var content = "<p>Post: " + getPost(d) + "<br>";
							svg.attr("height","500");
							d3.select("body").append("div")
							.attr("class", "Posts")
							.html(content);

					});

			d3.selection.prototype.moveToFront = function() {
    							return this.each(function(){
        						this.parentNode.appendChild(this);
    							});
			};

			circles.each(function(d) {
    					var content = topicArray[0]+" similarity: " + getX(d) + "<br>" +
        					      topicArray[1]+" similarity: " + getY(d) + "</p>";

    					new Opentip(this, content, {
        				background: "white",
        				borderColor: "darkgray",
        				borderWidth: 2,
        				delay: 0.25,
        				hideDelay: 0,
        				shadow: false,
        				stem: 'center bottom',
        				target: true,
        				targetJoint: 'center top',
        				tipJoint: 'center bottom',
        				showOn: "mouseenter",
        				hideOn: "mouseleave"
    					});
				
				});

		}});
        window.scrollTo(0, 0);
};