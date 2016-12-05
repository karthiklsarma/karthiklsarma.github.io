var showUsers = function(ids, mytopic){

	d3.selectAll("svg > *").remove();
  d3.selectAll(".w3-btn").remove();
	d3.selectAll(".Posts").remove();
  d3.select("#second").remove();
  d3.select("#mainback").remove();
  d3.select("body")
  .insert("div",":first-child")
  .attr("id","first")
  .append("input")
  .attr("type", "button")
  .attr("class","w3-btn")
  .attr("value", "Back")
  .attr("onclick", "showAnswer("+ids[0]+",mytopic)");

  d3.select("#first")
  .append("a")
  .attr("href", "./index.html")
  .attr("class","w3-btn")
  .html("Home");

	var maxReputation = function(dat){ return d3.max(dat, function(d){return +d.Reputation})};
	var maxViews = function(dat){ return d3.max(dat, function(d){return +d.Views})};
	var maxUpvotes = function(dat){ return d3.max(dat, function(d){return +d.UpVotes})};
	var maxDownvotes = function(dat){ return d3.max(dat, function(d){return +d.DownVotes})};
	d3.csv("./users/answers_users.csv", function(data){
		data = data.filter(function(d){ for(i=1;i<ids.length;i++){ if(d.Id == ids[i]){return true;}} return false;});
    drawWeb(data,maxReputation(data),maxViews(data),maxUpvotes(data),maxDownvotes(data));
	});
}

var showAnswer = function(questionId, recv_topics){
  d3.selectAll("svg > *").remove();
  d3.selectAll(".Posts").remove();
  d3.selectAll(".w3-btn").remove();
  d3.selectAll("p").remove();
  d3.selectAll("svg").attr("width","0px").attr("height","0px");
  d3.select("#body").html("");
  d3.select("#first").remove();
  d3.select("#mainback").remove();
	userids = [];
  userids[0]=questionId;
	var margin = {top: 40, right: 20, bottom: 30, left: 40},
    	width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

	var formatPercent = d3.format("");

	// var x = d3.scale.ordinal()
	//    .rangeRoundBands([0, width], .1);

   	var x = d3.scaleBand()
    	.rangeRound([0,width], 0.1);

	var y = d3.scaleLinear()
    	.range([height, 0]);

	var xAxis = d3.axisBottom()
    	.scale(x);

	var yAxis = d3.axisLeft()
    	.scale(y)
    	.tickFormat(formatPercent);

      
	var tip = d3.tip()
  	.attr('class', 'd3-tip')
  	.offset([-10, 0])
  	.html(function(d) {
    		return "<strong>Number of Comments:</strong> <span style='color:red'>" + d.CommentCount + "</span>";
  	})

	var svg = d3.select("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);
	d3.csv("./Answer/answers.csv", type, function(error, data) {

           mytopic = recv_topics;
	         data = data.filter(function(d){ return d.ParentId==questionId;});
	
           if(data.length==0){
                        d3.select("body")
                        .insert("div",":first-child")
                        .attr("id","second")
                        .append("input")
                        .attr("type", "button")
                        .attr("class","w3-btn")
                        .attr("value", "Back")
                        .attr("onclick", "viewGraph(mytopic)");

                        d3.select("#second")
                        .append("a")
                        .attr("href", "./index.html")
                        .attr("class","w3-btn")
                        .html("Home");

                        d3.select("#second")
                          .append("p")
                          .text("No answers for this post");

                        window.scrollTo(0, 0);
           }else{

	         data.forEach(function(d){userids.push(d.OwnerUserId);});

            d3.select("body")
            .insert("div",":first-child")
            .attr("id","second")
            .append("input")
            .attr("type", "button")
            .attr("class","w3-btn")
            .attr("value", "Show User Stat")
            .attr("onclick", "showUsers(userids,mytopic)");

            d3.select("#second")
            .append("input")
            .attr("type", "button")
            .attr("class","w3-btn")
            .attr("value", "Back")
            .attr("onclick", "viewGraph(mytopic)");

            d3.select("#second")
            .append("a")
            .attr("href", "./index.html")
            .attr("class","w3-btn")
            .html("Home");
            
  	       x.domain(data.map(function(d) { return d.Id; }));
  	       y.domain([0, d3.max(data, function(d) { return d.Score; })]);

  	       svg.append("g")
      	     .attr("class", "x axis")
      	     .attr("transform", "translate(0," + height + ")")
      	     .call(xAxis);

  	       svg.append("g")
      	     .attr("class", "y axis")
      	     .call(yAxis)
    	       .append("text")
      	     .attr("transform", "rotate(-90)")
      	     .attr("y", 6)
      	     .attr("dy", ".71em")
      	     .style("text-anchor", "end")
      	     .text("Score");

  	       svg.selectAll(".bar")
      	     .data(data)
    	       .enter().append("rect")
      	     .attr("class", "bar")
      	     .attr("x", function(d) { return x(d.Id); })
      	     .attr("width", x.bandwidth())
      	     .attr("y", function(d) { return y(d.Score); })
      	     .attr("height", function(d) { return height - y(d.Score); })
      	     .on('mouseover', function(d){
		              tip.show;
		              d3.selectAll(".Posts").remove();
		              var content = "<p>Answer: " + d.Body + "<br>";
		              svg.attr("height","500");
		              d3.select("body").append("div")
		                .attr("class", "Posts")
		                .html(content);
	           })
             .on('mouseout', tip.hide)
	         }});

	function type(d) {
  		d.Score = +d.Score;
  		return d;
	}
}