---
layout: post
title: 2015 NFL season visualized
---

Lately I've been obsessed with [fivethirtyeight](http://fivethirtyeight.com/)'s sports coverage.  Their projects range from complex interactive data products like  [CARMELO](http://projects.fivethirtyeight.com/carmelo/) (which attempts to probabilistically forecast the career of NBA players by identifying predictive statistics and comparing current players with players from history with similar statistics) to short studies like [this one](http://fivethirtyeight.com/datalab/the-cubs-cant-take-the-mets-heat/) which shows that fast pitchers are more effective in October, and that fast balls were particularly effective against the Cubs during this year's Leauge Championship series.

But what I'd like to talk about today is fivethirtyeight's application of the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system), which was developed to rank chess players, to the 2015 NFL season.  Here's a quick summary of Elo:

* In head-to-head competition, the winning party takes some points from the losing party
* An "upset" results in the winning party taking more points from the losing party than if the favored party had won
* When a favorite wins, they receive less points than if they had beaten a more evenly matched competitor (it's not as impressive to beat up on weaker opponents)
* Elo is self-correcting because if it has a team ranked too low, they will quickly move up by beating better teams

Fivethirtyeight has [tweaked](http://fivethirtyeight.com/datalab/introducing-nfl-elo-ratings/) the Elo system slightly to apply it to the NFL.  In their system, the point difference is also used to award Elo points, and corrections are made to account for the NFL's "off season" (which doesn't really exist in chess).  I think Elo offers a more-fair-than-most comparison between teams, so I was excited to dig into it.  That's why I've written a Python script that scrapes the values from their [NFL predictions](http://projects.fivethirtyeight.com/2015-nfl-predictions/) page, allowing me to check out the data as it gets updated.

I hope to make several posts with this data, but for now I thought I'd just try to see which NFL teams are getting better and which NFL teams are getting worse (or put another way: which teams were ranked too low or too high at the start of the season).  To do that, I've plotted each team's Elo rating and estimated probability of making the playoffs as a function of weeks.


<style type="text/css">
#elo_chart{ 
	margin: auto;
	font: 10px sans-serif;
	width: 800px;
}
#playoff_chart{
	margin: auto;
	font: 10px sans-serif;
	width: 800px;
}

.axis path,
.axis line, 
.axis1 path,
.axis1 line {
  fill: none;
  stroke: #E6E7E8;
  shape-rendering: crispEdges;
}

.x.axis path, .x.axis1 path {
  display: none;
}

.line {
  fill: none;
  stroke-width: 1.5px;
}

.legend-box {
  cursor: pointer;  
}
</style>

<div id="elo_chart"></div>
<script src="/js/d3.js"></script>
<script src="/js/NFL/NFL_Line_Charts.js"></script>
<script>
d3.csv("/data/NFL/elo.csv", function(error, data) { 
	draw_chart(data, "Elo Rating", "elo_chart", [1150,1850], false)
});
</script>

<div id="playoff_chart"></div>
<script>
d3.csv("/data/NFL/playoffs.csv", function(error, data) {
	draw_chart(data, "Probability of making playoffs", "playoff_chart", [0, 100], true)
});
</script>

My apologies, avid readers, for these incomplete graphs.  FiveThirtyEight decided to add playoff statistics during week 12, which changed their page's HTML and caused my web scraper to not function properly. By the time I noticed, I had already missed a few weeks of data and decided to just leave it as-is. FYI, [the Broncos beat the Panthers in Superbowl 50](http://nickstanisha.github.io/2016/02/09/decisive-plays-in-superbowl-50.html).  Below you can find my commentary from when I originally made this post during week 6.

#### Week 6 commentary (Elo)
If we ignore for a minute the fact that most lines on this graph are pretty erratic (because the NFL season is short, each game is worth quite a few Elo points, so ratings can fluctuate pretty dramatically with a single win or loss) you can see some trends emerging.  Seattle seems to be on the most severe downward-trend this season (having fallen 65 points since the start of the season) after coming off back-to-back Superbowl appearances.  They are still above average, but it appears that they might have been over-rated from the start.  Meanwhile, Cincinnati is proving itself week after week, having already climbed 107 points (keep in mind that they also started the season above the league average of 1500).  And finally, the Patriots are almost on pace with their undefeated 2007 season, and have a chance to approach [Greatest-of-all-Time](http://fivethirtyeight.com/datalab/new-england-patriots-are-almost-on-pace-to-be-the-greatest-of-all-time/) levels in their Elo ranking.


#### Week 6 commenary (Playoffs)
This graph is kind of neat because you can truly see the trade-offs that constantly occur between teams that are ranked 2nd and 3rd in their division (see Pittsburgh and Baltimore for example).  As strong-but-not-division-winning football teams approach the end of the season, every step forward for one team becomes a step back for the other.















