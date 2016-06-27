
var w = 600
var h = 900
formation = [3,4,2]
var svg = d3.select('#emojifootball')
			.append('svg')
			.attr('width', 600)
			.attr('height',900)
				 svg.append("svg:image")
  					.attr("xlink:href", 'img/football-field.svg')
  					.attr("width", w)
 					.attr("height", h)
  					.attr("x", 10)
  					.attr("y", 10);

function appendleftback(svg,formation,performance)
{
           svg.append("svg:image")
            .attr("xlink:href", 'img/'+ performance +'.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", function(){return formation[0]==4? w/4.5:w/3.25 })
            .attr("y", h/3);
}

appendleftback(svg, formation, 'good')