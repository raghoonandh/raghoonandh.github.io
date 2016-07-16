
var fixturestable = d3.selectAll('#fixturestable')
  					  .append('svg')
  					  .attr("viewBox", "0 0 300 180")

                   fixturestable.append('rect')
                              .attr('x', 70)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('fill','red')
                  fixturestable.append('text')
                               .attr('x',70)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next GW')
                   fixturestable.append('rect')
                              .attr('x', 100)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('fill','blue')
                  fixturestable.append('text')
                               .attr('x',100)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next 3 GWs')
                   fixturestable.append('rect')
                              .attr('x', 130)
                              .attr('y', 0)
                              .attr('height',8)
                              .attr('width',25)
                              .attr('fill','orange')
                  fixturestable.append('text')
                               .attr('x',130)
                               .attr('y',4)
                               .attr('dy','0.37em')
                               .attr('class', 'header')
                               .text('Next 6 GWs')


var height = 160
d3.csv("mock.csv", function(error, data) {
    // data.forEach(function(d) {
    //     d['1gw'] = +d['1gw'];  
    // });
  
    data.sort(function(a,b) {
          return d3.ascending(+a['1gw'], +b['1gw']);
      });

    console.log(data);

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
		                    				.attr('y', 10)
		                    				.attr('height', 5)
		                    				.attr('width', 5)
		                    				.attr('fill', "tomato")

                                rectsgw1.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['1gw'])) })

                             var rectsgw3 = groups.append("rect")
                                .attr('x',x1+30)
                                .attr('y', 10 )
                                .attr('height', 5)
                                .attr('width', 5)
                                .attr('fill', "teal")

                                rectsgw3.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['3gw'])) })
                             
                             var rectsgw6 = groups.append("rect")
                                .attr('x',x1+60)
                                .attr('y', 10 )
                                .attr('height', 5)
                                .attr('width', 5)
                                .attr('fill', "darkorange")

                                rectsgw6.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['6gw'])) })




		                    		groups.append('text')
		                    			  .attr('x',x)
		                    			  .attr('y', function(d){ return yScale(parseInt(d['3gw']))+2 })
		                    			  .attr('dy','0.40em')
		                    			  .attr('fill','steelblue')
		                    			  .attr('class','club')
		                    			  .text(function(d){return d.club})



});

