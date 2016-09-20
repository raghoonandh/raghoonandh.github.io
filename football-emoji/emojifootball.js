
var w = 600
var h = 580
formation = [3,4,2]
var svg = d3.select('#emojifootball')
			.append('svg')
			.attr('width', 600)
			.attr('height', h)


				 svg.append("svg:image")
  					.attr("xlink:href", 'img/football-field.svg')
  					.attr("width", 600)
 					.attr("height", h)
  					.attr("x", 10)
  					.attr("y", 0);



           svg.append("svg:image")
            .attr("xlink:href", 'img/good.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x",  150 )
            .attr("y", h/4);

            svg.append('text')
            .attr("x",  140 )
            .attr("y", h/4+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Bellerin')


           svg.append("svg:image")
            .attr("xlink:href", 'img/goal.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 450 )
            .attr("y", h/4);

             svg.append('text')
            .attr("x",  440 )
            .attr("y", h/4+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Nacho')

          svg.append("svg:image")
            .attr("xlink:href", 'img/angry.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 250 )
            .attr("y", h/4);

            svg.append('text')
            .attr("x",  240 )
            .attr("y", h/4+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Mustafi')

        svg.append("svg:image")
            .attr("xlink:href", 'img/average.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 350 )
            .attr("y", h/4);

            svg.append('text')
            .attr("x",  340 )
            .attr("y", h/4+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Koscieny')

           svg.append("svg:image")
            .attr("xlink:href", 'img/better.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x",  150 )
            .attr("y", h/2);

          svg.append('text')
            .attr("x",  140 )
            .attr("y", h/2+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Walcott')


           svg.append("svg:image")
            .attr("xlink:href", 'img/smooth.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 450 )
            .attr("y", h/2);

            svg.append('text')
            .attr("x",  440 )
            .attr("y", h/2+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Sanchez')

          svg.append("svg:image")
            .attr("xlink:href", 'img/worried.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 250 )
            .attr("y", h/2);

          svg.append('text')
            .attr("x",  240 )
            .attr("y", h/2+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Ozil')

        svg.append("svg:image")
            .attr("xlink:href", 'img/stress.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 350 )
            .attr("y", h/2);

        svg.append('text')
            .attr("x",  340 )
            .attr("y", h/2+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Ramsey')

           svg.append("svg:image")
            .attr("xlink:href", 'img/belowaverage.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 250 )
            .attr("y", h/1.5);

          svg.append('text')
            .attr("x",  240 )
            .attr("y", h/1.5+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Giroud')


        svg.append("svg:image")
            .attr("xlink:href", 'img/goal.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", 350 )
            .attr("y", h/1.5);

      svg.append('text')
            .attr("x",  340 )
            .attr("y", h/1.5+25)
            .attr('dy', '0.37em')
            .classed('player', true)
            .text('Welback')
