---
layout: post
title: Which T station am I closest to?
---

When making this visualization I wanted to know what it would look like if I were to take a map of Boston and choose a color for each point 
depending on which subway stop was most convenient from that point.
Luckily, a [Voronoi Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) is perfect for this sort of visualization.

Luckier still, the city of Boston has a surprisingly well-documented [API](http://www.mbta.com/rider_tools/developers/) and there are 
[many publicly available datasets](https://github.com/mbtaviz) regarding the Massachusetts Bay Transit Authority (MBTA).

The data I used for this visualization can be found [here](https://github.com/singingwolfboy/MBTA-GeoJSON).

The Google Maps layer underneath this visualization is fully interactive, so you can drag the map and click on available locations
to get more information.  As you zoom in, more subway stations will be labelled on the map.  The circles inside each polygon
are there as a reference for the actual location of the subway station, according to my data.  The colors of the circles and the polygons
indicate the color of the trains that stop at the closest station (if you are unaware, the four main Boston subway routes are the Red, 
Orange, Green, and Blue Lines).



<br>

<script src="/js/d3.js"></script>
<script src="//d3js.org/topojson.v0.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<style type="text/css">

#map_canvas {
	margin: auto;
	width: 800px;
	height: 600px;
}

.SvgOverlay {
	position: relative;
	width: 900px;
	height: 600px;           
}

.SvgOverlay svg {
	position: absolute;
	top: -4000px;
	left: -4000px;
	width: 8000px;
	height: 8000px;        
}

</style>

<div id="map_canvas"></div>

<script type="text/javascript">
"use strict";

d3.json('/data/boston_subway/new_stops.geojson', function(pointjson){
	main(pointjson); 
});

function color_picker(d) {
	return d.properties.color;
}

function main(pointjson) {
        
	//Google Map layer
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(42.3601, -71.06), 
	});

		
	var overlay = new google.maps.OverlayView();

	overlay.onAdd = function () {

		var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
		var svg = layer.append("svg");
		var svgoverlay = svg.append("g").attr("class", "AdminDivisions");
		   
		overlay.draw = function () {
			var markerOverlay = this;
			var overlayProjection = markerOverlay.getProjection();
	
			var googleMapProjection = function (coordinates) {
				var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
				var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
				return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
			}

			var pointdata = pointjson.features;
			
			var positions = [];

			pointdata.forEach(function(d) {		
				positions.push(googleMapProjection(d.geometry.coordinates));
			});
	
			var polygons = d3.geom.voronoi(positions);
			
			var pathAttr ={
				"d":function(d, i) { return "M" + polygons[i].join("L") + "Z"; },
				stroke:function(d) { return color_picker(d); },
				fill:function(d) { return color_picker(d); },
				"fill-opacity":"0.15"
			};

			svgoverlay.selectAll("path")
				.data(pointdata)
				.attr(pathAttr)
				.enter()
				.append("svg:path")
				.attr("class", "cell")
				.attr(pathAttr)
				
			var circleAttr = {
				    "cx":function(d, i) { return positions[i][0]; },
				    "cy":function(d, i) { return positions[i][1]; },
				    "r":2,
				    fill:function(d) { return color_picker(d); }		
			}
	
			svgoverlay.selectAll("circle")
				.data(pointdata)
				.attr(circleAttr)
				.enter()
				.append("svg:circle")
				.attr(circleAttr)
	  
		};

	};

	overlay.setMap(map);
	
		
};

</script>