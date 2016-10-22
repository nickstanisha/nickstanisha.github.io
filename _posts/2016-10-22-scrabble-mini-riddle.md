---
layout: post
title: Scrabble Mini Riddle
---

A graph search solution to this week's scrabble-related riddle from [fivethirtyeight](https://fivethirtyeight.com/features/this-challenge-will-boggle-your-mind/).

_"What is the longest word you can build in a game of Scrabble one letter at a time? That is, starting with a valid two-letter word, how long a word can you build by playing one letter at a time on either side to form a valid three-letter word, then a valid four-letter word, and so on? (For example, HE could become THE, then THEM, then THEME, then THEMES, for a six-letter result.)"_

You can see how I tackled this problem [here](https://gist.github.com/nickstanisha/c419b70f2201378ade98f92aaca9d299). To summarize: storing valid scrabble words in a directed graph connecting words of length _N_ to words of length _N+1_ makes it very easy to build long words using simple graph search algorithms. The most time-consuming portion of this riddle was finding an adequate list of scrabble words. Using [this list of english words](https://github.com/dwyl/english-words) I was able to find a 10-letter result, but using [TWL06](https://www.wordgamedictionary.com/twl06/download/twl06.txt) ([wiki](https://en.wikipedia.org/wiki/Official_Tournament_and_Club_Word_List)), the longest result was 9 letters long.

These are the longest solutions I could find for this riddle. Below is a web applet that allows you to construct words in this manner interactively.

```
la -> las -> lass -> lassi -> lassis -> classis -> classism -> classisms
la -> las -> lass -> lassi -> lassis -> classis -> classist -> classists
la -> las -> lass -> lassi -> lassie -> lassies -> glassies -> glassiest
la -> lap -> laps -> lapse -> elapse -> relapse -> relapser -> relapsers
in -> pin -> ping -> aping -> raping -> craping -> scraping -> scrapings
at -> eat -> eath -> heath -> sheath -> sheathe -> sheather -> sheathers
is -> ais -> rais -> raise -> raiser -> raisers -> praisers -> upraisers
```

<style>
  .active{
    background-color: #aec7e8 !important;
  }

  .btn-default {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 15px;
  }

  .word-container{
    width: 100%;
    overflow-y: hidden;
    overflow-x: scroll !important;
    white-space: nowrap;
    height: 70px;
    text-align: center;
    vertical-align: middle;
  }

</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="https://nickstanisha.github.io/js/bootstrap.min.js"></script>
<script src="../../../js/scrabble/word_explorer.js"></script>

<div id="word-explorer" style="width: 100%">
  <div id="2-letter-words" class="word-container"></div>
  <div id="3-letter-words" class="word-container"></div>
  <div id="4-letter-words" class="word-container"></div>
  <div id="5-letter-words" class="word-container"></div>
  <div id="6-letter-words" class="word-container"></div>
  <div id="7-letter-words" class="word-container"></div>
  <div id="8-letter-words" class="word-container"></div>
  <div id="9-letter-words" class="word-container"></div>
</div>
