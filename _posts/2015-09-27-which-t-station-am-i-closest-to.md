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
are there as a reference for the actual location of the subway station, according to my data.



<br>

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://shimz.me/example/d3js/geo_example/geo_template/topojson.v0.min.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<style type="text/css">

h1 {
	font-size:36px;
}

body {
	font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
	font-size:14px;
}

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

d3.json('/new_stops.geojson', function(pointjson){
	main(pointjson); 
});

function color_picker(d) {
	return d.properties.color;
}

function main(pointjson) {
        
	//Google Map 初期化
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(42.3601, -71.06), 
		//center: new google.maps.LatLng(36.3832, 139.0242)
	});

		
	var overlay = new google.maps.OverlayView(); //OverLayオブジェクトの作成

	//オーバレイ追加
	overlay.onAdd = function () {

		var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
		var svg = layer.append("svg");
		var svgoverlay = svg.append("g").attr("class", "AdminDivisions");
		
		//再描画時に呼ばれるコールバック    
		overlay.draw = function () {
			var markerOverlay = this;
			var overlayProjection = markerOverlay.getProjection();
	
			//Google Mapの投影法設定
			var googleMapProjection = function (coordinates) {
				var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
				var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
				return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
			}

			//母点位置情報
			var pointdata = pointjson.features;
			
			//ピクセルポジション情報
			var positions = [];

			pointdata.forEach(function(d) {		
				positions.push(googleMapProjection(d.geometry.coordinates)); //位置情報→ピクセル
			});
	
			//ボロノイ変換関数
			var polygons = d3.geom.voronoi(positions);
			
			var pathAttr ={
				"d":function(d, i) { return "M" + polygons[i].join("L") + "Z"; },
				stroke:function(d) { return color_picker(d); },
				fill:function(d) { return color_picker(d); },
				"fill-opacity":"0.15"
			};

			//境界表示
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
	
			//母点表示
			svgoverlay.selectAll("circle")
				.data(pointdata)
				.attr(circleAttr)
				.enter()
				.append("svg:circle")
				.attr(circleAttr)
	  
		};

	};

	//作成したSVGを地図にオーバーレイする
	overlay.setMap(map);
	
		
};

</script>