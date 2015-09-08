---
layout: post
title: Deaths in NYC Part II
---

Just a short post today-- This is another analysis of the [city of New York](https://catalog.data.gov/dataset/new-york-city-leading-causes-of-death-ce97f) dataset I talked about in my last post (although I've only included the top 25 causes of death in this post).  I wanted to create a visualization that would allow people to explore how different causes of death affect different genders and ethnicities differently, and I think I've succeeded here (but I suppose you can judge for yourself).

All elements of the visualization are interactive and responsive to changes in any element.  For example, you can isolate causes of death by clicking on the bars in the horizontal bar chart to the right, or ethnicities by selecting the verticle bars to the left.  I like this visualization because elements of my [previous visualization](http://nickstanisha.github.io/2015/08/20/deaths-in-nyc.html) are present here in the ring chart in the top left.

<br>

<script src='/js/d3.js' type='text/javascript'></script>
<script src='/js/crossfilter.js' type='text/javascript'></script>
<script src='/js/dc.min.js' type='text/javascript'></script>
<script src='/js/jquery-1.11.3.js' type='text/javascript'></script>
<script src='/js/bootstrap.min.js' type='text/javascript'></script>

<link href='/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
<link href='/css/dc.css' rel='stylesheet' type='text/css'>

<style type="text/css"></style>

<style>
  .dc-chart g.row text {fill: black;}
  #canvas {width:800px; overflow:hidden;}
  #left-container {width:300px; float:left;}
  #right-container {width:500px; overflow:hidden;}
</style>

<div id="canvas" style="{margin-top:300px; margin-bottom:50px}">
	<div id="left-container">
		<div id="chart-ring-gender"></div>
    	<div id="bar-chart-ethnicity"></div>
    </div>
    <div id="right-container">
    	<div id="bar-chart-cause"></div>
    </div>
</div>

<script type="text/javascript">
d3.csv("/cumulative_deaths.csv", function(error, data_csv) {
  if (error) {
    console.log('Error loading CSV');
    console.log(error);
  }
  else {
    createGraphs(data_csv);
  }
});

function createGraphs(data){
  var drawLarge = false;
  var ndx = crossfilter(data);

  // ************
  // Gender pie chart
  // ************
  var genderRingChart = dc.pieChart("#chart-ring-gender");
  var genderDim = ndx.dimension(function(d) { return d.gender});
  var gender_total = genderDim.group().reduceSum(function(d) {
    return +d.count;
  })

  genderRingChart
    .width(300).height(150)
    .dimension(genderDim)
    .group(gender_total)
    .innerRadius(30);

  // ************
  // Misc
  // ************
  function AddXAxis(chartToUpdate, displayText) {
    chartToUpdate.svg()
                .append("text")
                .attr("class", "x-axis-label")
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("x", chartToUpdate.width()/2)
                .attr("y", chartToUpdate.height()-3)
                .text(displayText);
  }

  // ************
  // Cause of death bar chart
  // ************
  var causeBarChart = dc.rowChart("#bar-chart-cause");
  var causeDim = ndx.dimension(function (d) {return d.cause;});
  var causeTotal = causeDim.group().reduceSum(function (d) {
    return +Math.round(d.count);
  });

  causeBarChart
    .height(550).width(500)
    .dimension(causeDim)
    .group(causeTotal)
    .elasticX(true)
    .colors("#FF3333")
    .ordering(function (d) {return -d.value;});

  // ************
  // Ethnicity bar chart
  // ************
  var ethnicityBarChart = dc.barChart("#bar-chart-ethnicity");
  var ethnicityDim = ndx.dimension(function (d) {return d.ethnicity;});
  var ethnicityTotal = ethnicityDim.group().reduceSum(function (d) {
    return d['percent by ethnicity'];
  });

  ethnicityBarChart
    .height(400).width(300)
    .dimension(ethnicityDim)
    .group(ethnicityTotal)
    .elasticY(true)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .yAxisLabel("Percent");


  dc.renderAll();

  AddXAxis(causeBarChart, "Deaths per Year")
}
</script>
<br>

This visualization was created using [dc.js](http://dc-js.github.io/dc.js/), which natively supports the data exploration capabilities of [crossfilter.js](http://square.github.io/crossfilter/) and renders all charts and figures using [d3.js](http://d3js.org/).  You can find the source code for these posts in the [github repository](https://github.com/nickstanisha/nickstanisha.github.io) that I use to post to this blog.
