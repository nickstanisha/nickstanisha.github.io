---
layout: post
title: Top 10 Home Run Leaders Analysis
---

About a week ago, I saw [this post](https://www.reddit.com/r/dataisbeautiful/comments/49d9m3/xpost_from_rbaseball_visualizing_the_historical/) on the subreddit [/r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful). 
After watching Redditor FDTAEV's animation, I found myself wishing there was a visualization better suited for comparing the careers of baseball players who found themselves in the top 10 home run leaders. 
So using [the same data](http://www.seanlahman.com/baseball-archive/statistics/), I set out to make one.

Examining each player's home runs accumulated as a function of time is a good place to start making that comparison. 
In the chart below, every line represents the total accumulated home runs by all players who, at one point or another, found themselves in the top 10 home run leaders (by my count, there are 90 such players).

<img align="center" src="/img/post/homeruns/spaced_out_trajectories.png" alt="Home run trajectories">

This chart can show us quite a few things. 
First and foremost, seeing Babe Ruth hit home runs at the rate that he was able to would have been absolutely mind blowing. 
Before Babe Ruth, the all-time home run leader had put up less than 150 home runs over the course of his entire career. 
Watching Babe Ruth put up over 30 home runs per season on average over the course of his career would have seemed super human.

Second, all of our current top 10 home run leaders have come from three distinct classes: Ruth from the 1920s, Hank Aaron, Willie Mays, and Frank Robinson from the 1960s, and the rest from a class that begins in the early/mid '90s and continues to today. 
However, as we can see by plotting each player's home run trajectory as a function of their time in the league, even modern-day sluggers aren't out pacing the likes of Babe Ruth and Hank Aaron by _that much_, if at all.

<img align="center" src="/img/post/homeruns/home_run_trajectories.png" alt="Home run trajectories vs seasons">

## Performance By Season
Since the career-long trajectory of the top 10 home run leaders looks so similar, I thought it might also be interesting to do a direct comparison of their average performance by season. 
The chart below shows that Barry Bonds has had the single most prolific season among top 10 home run hitters. Interestingly, #2 Hank Aaron's best season is ranked 10th when compared to everyone else's best season.

<img align="center" src="/img/post/homeruns/home_run_seasons.png" alt="Best Seasons">

However, Babe Ruth had the highest median home runs per season through his career.

<img align="center" src="/img/post/homeruns/home_run_seasons_med.png" alt="Most Consistent">

## Who's Next?
Judging simply from the number of current top 10 home run hitters whose careers have unfolded over the last ~20 years, it seems like it wouldn't be unreasonable to expect a currently active player to one day break Barry Bonds' all-time home run record. Based on current home run data, who is on pace to be that player?

<img margin="auto" src="/img/post/homeruns/slope_table.png" alt="Home Run Rate Table">

It looks like the smart money might be on Albert Pujols who has acquired homeruns at a higher average rate over his career than anyone else in MLB history, and is still 7 seasons behind Bonds' career length. Jose Abreu, although certainly impressive, will probably not surpass Bonds' record because his 2 years in the MLB don't reflect his actual career length (he actually began playing baseball in the Cuban National Series in 2005).

Finally, I need to once again point out Babe Ruth who, despite his career beginning over 100 years ago, is _still_ ranked 8th in average home runs per season (with over 22 seasons). Even if his all time record has been surpassed by Barry Bonds, Hank Aaron, and possibly Albert Pujols, it has never been shattered the way that [Steph Curry is poised to shatter the NBAs 3 point record this season](http://fivethirtyeight.com/features/steph-curry-is-on-pace-to-hit-102-home-runs/). I would wonder if it's even possible to average, for instance, 50 home runs per season against today's pitchers, but who knows?