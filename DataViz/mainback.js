var mainBack = function(twoTopics){
			d3.selectAll("svg > *").remove();
			d3.select("#mainback").remove();
			d3.selectAll(".Posts").remove();

			var svg = d3.select("svg"),
			width = +svg.attr("width");

			var format = d3.format(",d");

			var color = d3.scaleOrdinal(d3.schemeCategory20c);

			var pack = d3.pack()
			    .size([width, width])
			    .padding(1.5);

			d3.select("body")
        		.insert("div",":first-child")
        		.attr("id","mainback")
        		.append("a")
        		.attr("href", "./index.html")
        		.attr("class","w3-btn")
        		.html("Home");

			var topics = "";

			d3.csv("./Data/tags_id/tags_id.csv", function(d) {
			  d.value = +d.value;
			  if (d.value) return d;
			}, function(error, classes) {
			  if (error) throw error;

			  var root = d3.hierarchy({children: classes})
			      .sum(function(d) { return d.value; })
			      .each(function(d) {
			        if (id = d.data.id) {
			          var id, i = id.lastIndexOf(".");
			          d.id = id;
			          d.package = id.slice(0, i);
			          d.class = id.slice(i + 1);
			        }
			      });

			  var node = svg.selectAll(".node")
			    .data(pack(root).leaves())
			    .enter().append("g")
			      .attr("class", "node")
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			  node.append("circle")
			      .attr("id", function(d) { return d.id; })
			      .attr("r", function(d) { return d.value/8 + 20;})
			      .style("fill", function(d) { return color(d.package); })
			      .on("click", function(d){ topics=topics+d.id+"_";});

			  node.append("clipPath")
			      .attr("id", function(d) { return "clip-" + d.id; })
			    .append("use")
			      .attr("xlink:href", function(d) { return "#" + d.id; });

			  node.append("text")
			      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
			    .selectAll("tspan")
			    .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
			    .enter().append("tspan")
			      .attr("x", 0)
			      .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
			      .text(function(d) { return d; });

			  node.append("title")
			      .text(function(d) { return d.id + "\n" + format(d.value); });

			  firstTopic = twoTopics.substr(0,twoTopics.indexOf("_"));
			  	svg.selectAll("circle")
			  	.filter(function(d){
			  			return d.id != firstTopic;
			  	})
			  	.transition()
				.style("opacity", 0.1);

				svg.selectAll("text")
				.filter(function (d) {
				      return d.id != firstTopic;
				})
				.transition()
				.style("opacity", 0.1);

				var count = 0;
				    d3.csv("./Data/"+firstTopic+".csv", function(d){
						d.forEach(
									
							function(k){
								
								if(count<=5)
								{
									
								svg.selectAll("circle")
				    				.filter(function (b) {
											if(b.id == k.id)
											{count = count+1;
										}
											
				          	     			return k.id == b.id;
				    				})
				    				.transition()
				    				.style("opacity", 1);

				    				svg.selectAll("text")
				    				.filter(function (n) {
				          				return k.id == n.id;
				    				})
				    				.transition()
				    				.style("opacity", 1);
									}

								svg.selectAll(".node")
								.on("click", function(d){
									newTopic=firstTopic+"_"+d.id;
									viewGraph(newTopic);
								});
							}
						);
				    });

			});
}