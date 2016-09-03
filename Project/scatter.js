//<!-- source:  http://bl.ocks.org/enjalot/6641917  -->
if(!d3.chart) d3.chart = {};

d3.chart.scatter = function() {
  var g;
  var data;
  var width = 400;
  var height = 400;
  var cx = 10;
  var numberBins = 2;
  var dispatch = d3.dispatch(chart, "hover");

  function chart(container) {
    g = container;

    g.append("g")
    .classed("xaxis", true)

    g.append("g")
    .classed("yaxis", true)

    update();
  }
  chart.update = update;
  function update() {
	//  alert('entered update ');
    var maxCreated = d3.max(data, function(d) { return d.postdate });
    var minCreated = d3.min(data, function(d) { return d.postdate });
	
	 var maxScore ;
	
		if (document.getElementById('concept_entropyradio').checked) {
 // alert('radio selected is color entropy ');
  maxScore = d3.max(data, function(d) { return d.normalized_concept_entropy });
 
}

if (document.getElementById('textentropyradio').checked) {
  //alert('radio selected is t4ext entropy ');
  maxScore = d3.max(data, function(d) { return d.normalized_text_entropy });
   
}

if (document.getElementById('UMASSradio').checked) {
  //alert('radio selected is umass ');
  maxScore = d3.max(data, function(d) { return d.normalized_UMASS });
   
}

if (document.getElementById('TFIDFradio').checked) {
  //alert('radio selected is tfidf ');
  maxScore = d3.max(data, function(d) { return d.normalized_TFIDF });
   
}

if (document.getElementById('polarityradio').checked) {
 // alert('radio selected is polarity ');
   maxScore = d3.max(data, function(d) { return d.normalized_polarity });
  
}

if (document.getElementById('TFMradio').checked) {
  //alert('radio selected is TFM ');
   maxScore = d3.max(data, function(d) { return d.TFMvalue });
   
}

if (document.getElementById('Comparitivenessradio').checked) {
  //alert('radio selected is competitiveness');
   maxScore = d3.max(data, function(d) { return d.Normalized_count });
   
}

   

    var colorScale = d3.scale.category20();
    var createdScale = d3.time.scale()
        .domain([minCreated, maxCreated])
        .range([cx, width])

    var commentScale = d3.scale.linear()
    .domain(d3.extent(data, function(d) { return d.TFMvalue }))
    .range([3, 15])

    var yScale = d3.scale.linear()
      .domain([-0.1, maxScore])
      .range([height, cx])
  
     var xAxis = d3.svg.axis()
    .scale(createdScale)
    .ticks(3)
    .tickFormat(d3.time.format("%x %H:%M"))

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(3)
    .orient("left")

    var xg = g.select(".xaxis")
      .classed("axis", true)
      .attr("transform", "translate(" + [0,height] + ")")
      .transition()
      .call(xAxis)

    var yg = g.select(".yaxis")
      .classed("axis", true)
      .classed("yaxis", true)
      .attr("transform", "translate(" + [cx - 5,0] + ")")
      .transition()
      .call(yAxis)

    var circles = g.selectAll("circle")
    .data(data, function(d) { return d.postid })

//accessing html from js
//alert('outside if radio selected is ');



    circles.enter()
    .append("circle")
	
	if (document.getElementById('concept_entropyradio').checked) {
  //alert('radio selected is color entropy ');
  circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.normalized_concept_entropy) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })

}

if (document.getElementById('textentropyradio').checked) {
  //alert('radio selected is t4ext entropy ');
   circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.normalized_text_entropy) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })
}

if (document.getElementById('UMASSradio').checked) {
  //alert('radio selected is umass ');
   circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.normalized_UMASS) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })
}

if (document.getElementById('TFIDFradio').checked) {
  //alert('radio selected is tfidf ');
   circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.normalized_TFIDF) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })
}

if (document.getElementById('polarityradio').checked) {
//  alert('radio selected is polarity ');
   circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.normalized_polarity) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })
}

if (document.getElementById('TFMradio').checked) {
  //alert('radio selected is TFM ');
   circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.TFMvalue) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })
}

if (document.getElementById('Comparitivenessradio').checked) {
  //alert('radio selected is competitiveness');
   circles
    .transition()
    .attr({
      cx: function(d,i) { return createdScale(d.postdate) },
      cy: function(d,i) { return yScale(d.Normalized_count) },
      r: function(d) { return commentScale(d.TFMvalue)}
    })
}

    
    circles.exit().remove()

    circles.on("mouseover", function(d) {
      d3.select(this).style("stroke", "black")
      dispatch.hover([d])
    })
    circles.on("mouseout", function(d) {
      d3.select(this).style("stroke", "")
      dispatch.hover([])
    })

    var hist = d3.layout.histogram()
    .value(function(d) { return d.tag })
    .range([0, d3.max(data, function(d){ return d.tag }) ])
    .bins(numberBins);
    var layout = hist(data);
    console.log("layout legth"+layout.length);
    for (var i = 0; i < layout.length; i++) {
      var bin = layout[i];
      g.selectAll("circle")
      .data(bin, function(d) { return d.postid })
      .style("fill", function() {  return colorScale(i) })
    }

  }

  chart.highlight = function(data) {
    var circles = g.selectAll("circle")
    .style("stroke", "")

    circles.data(data, function(d) { return d.postid })
    .style("stroke", "orange")
    .style("stroke-width", 3)
  }

  chart.data = function(value) {
    if(!arguments.length) return data;
    data = value;
    return chart;
  }
  chart.width = function(value) {
    if(!arguments.length) return width;
    width = value;
    return chart;
  }
  chart.height = function(value) {
    if(!arguments.length) return height;
    height = value;
    return chart;
  }

  return d3.rebind(chart, dispatch, "on");
}