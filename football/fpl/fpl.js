
var fixturestable = d3.selectAll('#fixturestable')
  					  .append('svg')
  					  .attr("viewBox", "0 0 300 180")

                   fixturestable.append('rect')
                              .attr('x', 70)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('fill','red')
                              .on('click', function(){ return sortgw1()}) 
                  fixturestable.append('text')
                               .attr('x',70)
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
                              .attr('fill','blue')
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
                              .attr('fill','orange')
                              .on('click', function(){ return sortgw6()}) 
                  fixturestable.append('text')
                               .attr('x',130)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next 6 GWs')
                               .on('click', function(){ return sortgw6()}) 


function sortgw6(){
    var topcirclessvg = d3.select("#fixturestable")
  topcirclessvg.selectAll('.club').remove()
  analysefixture('6gw')
}


function sortgw3(){
    var topcirclessvg = d3.select("#fixturestable")
  topcirclessvg.selectAll('.club').remove()
  analysefixture('3gw')
}


function sortgw1(){
    var topcirclessvg = d3.select("#fixturestable")
  topcirclessvg.selectAll('.club').remove()
  analysefixture('1gw')
}

analysefixture('1gw')

function analysefixture(gw)
{
var height = 160

d3.csv("mock.csv", function(error, data) {
    // data.forEach(function(d) {
    //     d['1gw'] = +d['1gw'];  
    // });
 


    data.sort(function(a,b) {
          return d3.ascending(+a[gw], +b[gw]);
      });

    var yScale = d3.scale.linear()
                   		 .domain([0, d3.max(data, function (d) { return +d['1gw']})])
                   		 .rangeRound([20, height]);
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
		                    				.attr('fill', "tomato")

                                rectsgw1.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['1gw'])) })

                             var rectsgw3 = groups.append("rect")
                                .attr('x',x1+30)
                                .attr('y', function(d,i){return gw =='1gw'? 10: yScale(parseInt(d['1gw'])) })
                                .attr('height', 5)
                                .attr('width', 5)
                                .attr('fill', "teal")

                                rectsgw3.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['3gw'])) })
                             
                             var rectsgw6 = groups.append("rect")
                                .attr('x',x1+60)
                                .attr('y', function(d,i){return gw =='1gw'? 10: yScale(parseInt(d['1gw'])) })
                                .attr('height', 5)
                                .attr('width', 5)
                                .attr('fill', "darkorange")

                                rectsgw6.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['6gw'])) })




		                var clubs =  groups.append('text')
		                    			  .attr('x',x)
		                    			  .attr('y', function(d){return yScale(parseInt(d[gw]))+2})
		                    			  .attr('dy','0.40em')
		                    			  .attr('fill','steelblue')
		                    			  .attr('class','club')
                                .attr('opacity', 0)
		                    			  .text(function(d){return d.club})


                                 clubs.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("opacity",1)



});

}