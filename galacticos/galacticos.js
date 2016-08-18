
var leaguetable = d3.selectAll('#leaguetable')
              .append('svg')
              .attr("viewBox", "0 0 400 600")

d3.csv("galacticos.csv", function(error, data) {

     data.sort(function(a,b) {
          return d3.descending(+a['total'], +b['total']);
      });
   
   var widthscale = d3.scale.linear()
                       .domain([0, d3.max(data, function (d) { return +d['gw']})])
                       .rangeRound([0, 100]);

     var groups = leaguetable.selectAll("g")
                              .data(data)
                              .enter()

     var header  =   leaguetable.append('g')

                     header.append('rect')
                           .attr('x', 20)
                           .attr('y', 0)
                           .attr('height', 20)
                           .attr('width', 350)
                           .attr('class', 'relegation' )

                           header.append('text')
                          .attr('x', 50)
                          .attr('y', 10)
                          .attr('dy', '0.37em')
                          .text('Player')
                          .attr('class', 'header')

                          header.append('text')
                          .attr('x', 200)
                          .attr('y', 10)
                          .attr('dy', '0.37em')
                          .text('Gameweek')
                          .classed('header', true)

                          header.append('text')
                          .attr('x', 310)
                          .attr('y', 10)
                          .attr('dy', '0.37em')
                          .text('Total')
                          .attr('class', 'header')


        var rects = groups.append('rect')
                          .attr('x', 20)
                          .attr('y', function(d,i){return i*25 + 25})
                          .attr('height', 20)
                          .attr('width', 350)
                          .attr('class', function(d,i){ return getcolorclass(i) })

                          groups.append('text')
                          .attr('x', 30)
                          .attr('y', function(d,i){return i*25 + 25+10})
                          .attr('dy', '0.37em')
                          .attr('class', 'player')
                          .text(function(d,i){return i+1 + '.'})

                          groups.append('text')
                          .attr('x', 50)
                          .attr('y', function(d,i){return i*25 + 25+10})
                          .attr('dy', '0.37em')
                          .attr('class', 'player')
                          .text(function(d){return d.player})

                           groups.append('text')
                          .attr('x', 320)
                          .attr('y', function(d,i){return i*25 + 25+10})
                          .attr('dy', '0.37em')
                          .attr('class', 'player')
                          .text(function(d){return d.total})

         var pointsrect  =  groups.append('rect')
                                  .attr('x', '200')
                                  .attr('y', function(d,i){return i*25 + 25+5} )
                                  .attr('height', '10')
                                  .attr('width', 0)
                                  .attr('class', 'ptsbar')
                                  
                                  pointsrect.transition()
                                            .delay(function(d,i){return i*80+200})
                                            .duration(4000)
                                            .attr("width", function(d){return widthscale(+d['gw'])})
                              


        function getcolorclass(pos)
        {
          if (pos< 4)
          {
            return 'championsleague'
          }
          else if (pos>16)
          {
            return 'relegation'
          }
          else
          {
            return 'average'
          }
        }                  
})