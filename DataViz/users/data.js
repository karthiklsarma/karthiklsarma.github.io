//Data
var drawWeb = function(data, maxReputation, maxViews, maxUpVotes, maxDownVotes){
		var w = 150,
		h = 150;
 
	var colorscale = d3.scaleOrdinal(d3.schemeCategory10);
    //var colorscale = d3.scale.category20b();
	//Legend titles
	var LegendOptions = ['uservalue','placeholder'];
/*
var d = [
		  [
			{axis:"Reputation",value:0.381527989},
			{axis:"Views",value:1.084155362},
			{axis:"UpVotes",value:4.862187406},
			{axis:"DownVotes",value:4.212807566},
		  ],[
			{axis:"Reputation",value:5},
			{axis:"Views",value:5},
			{axis:"UpVotes",value:5},
			{axis:"DownVotes",value:5},
		  ]
		];
*/
//Options for the Radar chart, other than default
 data.forEach(function(c){

 	var mycfg = {
  		w: w,
  		h: h,
  		maxValue: 0.6,
  		levels: 5,
  		ExtraWidthX: 300
	}

 	var d = [
		  [
			{axis:"Reputation",value:(c.Reputation==0)?0:((c.Reputation/maxReputation)*5)},
			{axis:"Views",value:(c.Views==0)?0:((c.Views/maxViews)*5)},
			{axis:"UpVotes",value:(c.UpVotes==0)?0:((c.UpVotes/maxUpVotes)*5)},
			{axis:"DownVotes",value:(c.DownVotes==0)?0:((c.DownVotes/maxDownVotes)*5)},
		  ],[
			{axis:"Reputation",value:5},
			{axis:"Views",value:5},
			{axis:"UpVotes",value:5},
			{axis:"DownVotes",value:5},
		  ]
	];
//Call function to draw the Radar chart
//Will expect that data is in %'s

dispName = c.DisplayName.split(" ");
myId = "";
for(i=0;i<dispName.length;i++){
	myId += dispName[i];
}
var id = "#"+myId;
d3.select("#body").append("div").attr("id",myId);
d3.select("#body").append("div").attr("id",myId+"2").style("position","relative").style("left","215px");
RadarChart.draw(id, d, mycfg);
////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////
/*
var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("id",c.DisplayName+"svg")
	.attr("width", w+300)
	.attr("height", h+300)
*/ 
//Create the title for the legend

var text = d3.select(id+"2").append("text")
	.attr("x", w+(w/2))
	.attr("y", h+80)
	.attr("text-anchor", "start")
	//.attr("font-size", "18px")
	.attr("font-weight", 500)
	.text(c.DisplayName);

})
};
	
	
// //Initiate Legend	
// var legend = svg.append("g")
// 	.attr("class", "legend")
// 	.attr("height", 100)
// 	.attr("width", 200)
// 	.attr('transform', 'translate(90,20)') 
// 	;
// 	//Create colour squares
// 	legend.selectAll('rect')
// 	  .data(LegendOptions)
// 	  .enter()
// 	  .append("rect")
// 	  .attr("x", w - 65)
// 	  .attr("y", function(d, i){ return i * 20;})
// 	  .attr("width", 10)
// 	  .attr("height", 10)
// 	  .style("fill", function(d, i){ return colorscale(i);})
// 	  ;
// 	//Create text next to squares
// 	legend.selectAll('text')
// 	  .data(LegendOptions)
// 	  .enter()
// 	  .append("text")
// 	  .attr("x", w - 52)
// 	  .attr("y", function(d, i){ return i * 20 + 9;})
// 	  .attr("font-size", "11px")
// 	  .attr("fill", "#737373")
// 	  .text(function(d) { return d; })
// 	  ;	