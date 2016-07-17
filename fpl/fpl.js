var colordict = {
    1: '#B71C1C',
    2: '#C62828',
    3: '#D32F2F',
    4: '#E53935',
    5: '#F44336',
    6: '#EF5350',
    7: '#E57373',
    8: '#EF9A9A',
    9: '#FFCDD2',
    10: '#FFEBEE',
    11: '#CFD8DC',
    12: '#B0BEC5',
    13: '#90A4AE',
    14 : '#78909C',
    15: '#607D8B',
    16: '#546E7A',
    17: '#455A64',
    18: '#37474F',
    19: '#263238',
    20: '#212121'
} 

function getcolor(num)
{
  return colordict[num]
}


var fixturestable = d3.selectAll('#fixturestable')
  					  .append('svg')
  					  .attr("viewBox", "0 0 240 180")

                   fixturestable.append('rect')
                              .attr('x', 70)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('class','gw1')
                              .on('click', function(){ return sortgw1()}) 
                  fixturestable.append('text')
                               .attr('x',72)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next GW')
                               .on('click', function(){ return sortgw1()}) 
                   fixturestable.append('rect')
                              .attr('x', 100)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('class','gw3')
                              .on('click', function(){ return sortgw3()}) 
                  fixturestable.append('text')
                               .attr('x',100)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next 3 GWs')
                               .on('click', function(){ return sortgw3()}) 
                   fixturestable.append('rect')
                              .attr('x', 130)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('class','gw6')
                              .on('click', function(){ return sortgw6()}) 
                  fixturestable.append('text')
                               .attr('x',130)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next 6 GWs')
                               .on('click', function(){ return sortgw6()}) 
                   fixturestable.append('line')
                               .attr('x1',160)
                               .attr('y1',4)
                               .attr('x2',170)
                               .attr('y2', 4)
                               .attr('class', 'deepstroke')
                                
                  fixturestable.append('text')
                               .attr('x',172)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'help')
                               .text('Click to Sort')
                               

                 for(i=1;i<21;i++)
                 {
                  fixturestable.append('rect')
                              .attr('x', i*6+20)
                              .attr('y', 160)
                              .attr('height',6)
                              .attr('width',6)
                              .attr('fill', getcolor(i))
                              
                 }

                  fixturestable.append('text')
                               .attr('x',20)
                               .attr('y',170)
                               .attr('dy','0.37em')
                               .attr('class', 'legend')
                               .text('Easy')
                  fixturestable.append('text')
                               .attr('x',135)
                               .attr('y',170)
                               .attr('dy','0.37em')
                               .attr('class', 'legend')
                               .text('Tough')
                            
                  
                 


function sortgw6(){
    var topcirclessvg = d3.select("#fixturestable")
  topcirclessvg.selectAll('.club').remove()
  d3.selectAll('rect').classed('faded',false)
  d3.selectAll('.gw3, .gw1').classed('faded',true)
  analysefixture('6gw')
}


function sortgw3(){
    var topcirclessvg = d3.select("#fixturestable")
  topcirclessvg.selectAll('.club').remove()
  d3.selectAll('rect').classed('faded',false)
  d3.selectAll('.gw6, .gw1').classed('faded',true)
  analysefixture('3gw')
}


function sortgw1(){
    var topcirclessvg = d3.select("#fixturestable")
  topcirclessvg.selectAll('.club').remove()
  d3.selectAll('rect').classed('faded',false)
  d3.selectAll('.gw3, .gw6').classed('faded',true)
  analysefixture('1gw')
}

analysefixture('1gw')
d3.selectAll('.gw3, .gw6').classed('faded',true)



function analysefixture(gw)
{
var height = 150

d3.csv("gameweek.csv", function(error, data) {
    // data.forEach(function(d) {
    //     d['1gw'] = +d['1gw'];  
    // });
 

    data.sort(function(a,b) {
          return d3.ascending(+a[gw], +b[gw]);
      });

    var yScale = d3.scale.linear()
                   		 .domain([0, d3.max(data, function (d) { return +d['1gw']})])
                   		 .rangeRound([10, height]);
    var x = 20
    var x1 = 80

    		var groups = fixturestable.selectAll("g")
                    				  .data(data)
                    				  .enter()
                    	              
                    	              
                    	       var rectsgw1  = groups.append("rect")
		                    				.attr('x',x1)
		                    				.attr('y',function(d,i){return gw =='1gw'? 10: yScale(parseInt(d['3gw'])) })
		                    				.attr('height', 5)
		                    				.attr('width', 5)
		                    				.attr('fill', function(d){return getcolor(+d['1gw'])})

                                rectsgw1.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d[gw])) })
                                // .attr('fill', function(d){return getcolor(+d['1gw'])})

                             var rectsgw3 = groups.append("rect")
                                .attr('x',x1+30)
                                .attr('y', function(d,i){return gw =='1gw'? 10: yScale(parseInt(d['1gw'])) })
                                .attr('height', 5)
                                .attr('width', 5)
                                 .attr('fill', function(d){return getcolor(+d['3gw'])})

                                rectsgw3.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d[gw])) })
                                
                             
                             var rectsgw6 = groups.append("rect")
                                .attr('x',x1+60)
                                .attr('y', function(d,i){return gw =='1gw'? 10: yScale(parseInt(d['1gw'])) })
                                .attr('height', 5)
                                .attr('width', 5)
                                .attr('fill', function(d){return getcolor(d['6gw'])})

                                rectsgw6.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d[gw])) })
                                // .attr('fill', function(d){return getcolor(d['6gw'])})




		                var clubs =  groups.append('text')
		                    			  .attr('x',x)
		                    			  .attr('y', function(d){return yScale(parseInt(d[gw]))+2})
		                    			  .attr('dy','0.40em')
		                    			  .attr('fill','#424242')
		                    			  .attr('class','club')
                                .attr('opacity', 0)
		                    			  .text(function(d){return d.club})


                                 clubs.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("opacity",1)



});

}