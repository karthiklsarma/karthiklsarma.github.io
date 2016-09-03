//<!-- source:  http://bl.ocks.org/enjalot/6641917  -->
if(!d3.chart) d3.chart = {};

d3.chart.histogram = function() {
  var g;
  var data;
  var width = 400;
  var height = 400;
  var cx = 10;
  var numberBins = 3;
  var dispatch = d3.dispatch(chart, "hover");

  function chart(container) {
    g = container;

    update();
  }
  chart.update = update;
  function update() {

    var hist = d3.layout.histogram()
    .value(function(d) { return d.tag })
    .range([0, d3.max(data, function(d){ return d.tag }) ])
    .bins(numberBins);
    var layout = hist(data);

    var maxLength = d3.max(layout, function(d) { return d.length });
    var widthScale = d3.scale.linear()
    .domain([0, maxLength])
    .range([0, width])

    var yScale = d3.scale.ordinal()
    .domain(d3.range(numberBins))
    .rangeBands([height, 0], 0.1)

    var colorScale = d3.scale.category20();

    
    var rects = g.selectAll("rect")
    .data(layout)
    
    rects.enter().append("rect")

    rects
    .transition()
    .attr({
      y: function(d,i) {
        return yScale(i)
      },
      x: 50,
      height: yScale.rangeBand(),
      width: function(d,i) {
        return widthScale(d.length)
      },
      fill: function(d, i) { return colorScale(i) }
    })
    rects.exit().transition().remove();


    rects.on("mouseover", function(d) {
      d3.select(this).style("fill", "orange")
      console.log("hist over", d)
      dispatch.hover(d)
    })
    rects.on("mouseout", function(d) {
      d3.select(this).style("fill", "")
      dispatch.hover([])
    })
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