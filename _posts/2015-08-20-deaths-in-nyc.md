---
layout: post
title: Deaths in NYC
---

Recently I found a publicly available dataset, available from the [city of New York](https://catalog.data.gov/dataset/new-york-city-leading-causes-of-death-ce97f), that breaks down the leading causes of death for people in NYC (collected from 2007 to 2011).  Digging around for myself, it looks like a cause of death was included in this dataset if it affected at least 5 victims in a given year.  Raw counts are given for each cause of death broken down by gender and ethnicity.

The first thing that jumped out at me with this data set was the very apparent difference between causes of death for men and women-- as seen in the graph below.  Note that in this plot, the most common cause of death ("Diseases of the Heart") was removed so that the remaining causes of death could be displayed on the same linear scale.  Heart diseases were almost equally distributed among men and women, so I didn't feel it was necessary to include them in the discussion below.

<div id="canvas" style="margin:auto"></div>
<style>
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.dot {
  stroke: #000;
}

.tooltip {
  position: absolute;
  width: auto;
  height: auto;
  pointer-events: none;
  z-index: 1001;
  font: 12px sans-serif;
  background-color: white;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  margin-right: 4px;
}
</style>
<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>

<script type="text/javascript">

var margin = {top: 20, right: 20, bottom: 100, left: 100},
    width = 700;
    height = 450;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = function(d) { return d["Percent Male"];}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d["Total Deaths"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d["Percent Male"];},
    color = d3.scale.linear()
              .domain([0,100])
              .range(["red", "blue"]);

// add the graph canvas to the body of the webpage
var svg = d3.select("div#canvas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("div#canvas").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
d3.csv("/data/nyc_deaths/percent_male.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d["Percent Male"] = +d["Percent Male"];
    d["Total Deaths"] = +d["Total Deaths"];
//    console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", 50)
      .style("text-anchor", "end")
      .text("Percent Male");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Total Deaths");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 10)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 1)
               .attr("fill", "white");
          tooltip.html("<b> "+ d["Cause of Death"] + "</b><br> " + 
                  (d["Percent Male"]).toFixed(2) + " percent male<br/> " + 
                  d["Total Deaths"] + " total deaths")
               .style("left", (d3.event.pageX + 21) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
});

</script>


In this scatter plot, each point represents a single cause of death.  The x axis shows the percentage of men affected for a given cause of death, and the y axis represents the total number of deaths attributed to that cause in NYC between 2007 and 2011.  The points are colored to show the relative mixture of female (red) and male (blue) victims.  From this chart alone, there are several noticeable differences between the genders.

* There are many causes of death that affect a disproportionate amount of men.  12 separate causes of death are at biased at least 60/40 toward men, while only 4 causes of death are biased at least 60/40 toward women.  This is especially interesting because the data showed that men and women are dying at approximately the same rate.
* There are a few clear unexplained outliers in the data.  All 15 tuberculosis deaths in the data were male (I could not find any articles describing a gender preference for tuberculosis), and all 8 deaths caused by "inhalation of solid or liquids" (which I took to mean "drowning") were female.
* All violent and accident-related deaths are heavily biased toward men, notably homicide and [suicide](ttp://blogs.scientificamerican.com/bering-in-mind/sex-and-suicide-why-do-more-men-than-women-kill-themselves/).  Other distinctly-male causes of death include alcohol-related mental disorders, liver disease (which is highly correlated with excessive alcohol consumption), drug poisonings, and general accidents.
* Way more women than men die from Alzheimer's disease.  We've known for a while now that [more women than men _get_ Alzheimer's disease](http://www.washingtonpost.com/local/with-women-perhaps-facing-higher-risk-of-alzheimers-female-scientists-unite/2014/09/03/2aa0506c-28ab-11e4-8593-da634b334390_story.html), but it's still cool to find consistent results in independently-collected data.

I expect to return to this data set at some point in the future and create some charts that also show differences between ethnicities.  Until then, this will have to do.  I created the scatter plot above using [d3.js](http://d3js.org/), you can find the full source code for creating this chart in [the Github repository I use to post to this blog](https://github.com/nickstanisha/nickstanisha.github.io/blob/master/_posts/2015-08-20-deaths-in-nyc.md)