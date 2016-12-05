//Data
var drawWeb = function(data, maxReputation, maxViews, maxUpVotes, maxDownVotes){
		var w = 150,
		h = 150;
 
 	d3.selectAll("svg").attr("width","0px").attr("height","0px");
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
d3.select("#body").append("div").attr("id",myId).append("p").text(c.DisplayName+":");
RadarChart.draw(id, d, mycfg);
})
};