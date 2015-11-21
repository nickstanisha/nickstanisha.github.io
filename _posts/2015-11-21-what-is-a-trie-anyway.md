---
layout: post
title: What is a Trie Anyway?
---

So I'm reviewing data structures and I've found some good implementation examples in Python for most of the big ones. However, try as I might, I couldn't find a good example of a trie implemented in Python that used object-oriented principles. Several examples that I did find recommended using a list of lists, or a dictionary of dictionaries to represent a trie. I found those to be too sloppy and hard to read, so I made this.

<script src="https://gist.github.com/nickstanisha/733c134a0171a00f66d4.js"></script>

I hope that people will be able to use it as an example of a trie that, although it is written in Python, shows the same sort of approach that someone would use in a language like C++ or Java.

That's not to say I didn't get a _little bit_ of help from Python's built-in data structures.  Because a trie is actually a tree (whoever names these things is a terrible, terrible person) and not a full-fledged graph, I didn't need to encode the full concept of an "edge."  Rather, I just encoded the concept of a "child" by giving each node a dictionary object called "children" where the keys are letters and the values are identifiers for the child objects of each node.

I focused mostly on the start_with_prefix capability, so my nodes' "data" objects are copies of the full string if the string is a word and "None" otherwise.  However, they could feasibly be anything. Storing data this way prevents me from having to climb back up the tree (or remember where I am in the tree) to reconstruct the full word in Trie.start_with_prefix().

[Here](https://gist.github.com/nickstanisha/733c134a0171a00f66d4) is a link to the full Gist.