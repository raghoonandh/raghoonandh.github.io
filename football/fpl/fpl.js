
var fixturestable = d3.selectAll('#fixturestable')
  					  .append('svg')
  					  .attr("viewBox", "0 0 300 600")

var height = 180
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
                   		 .rangeRound([10, height]);
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
                                .attr('x',x1+20)
                                .attr('y', 10 )
                                .attr('height', 5)
                                .attr('width', 5)
                                .attr('fill', "teal")

                                rectsgw3.transition()
                                .delay(function(d,i){return i*40})
                                .duration(2000)
                                .attr("y", function(d){ return yScale(parseInt(d['3gw'])) })
                             
                             var rectsgw6 = groups.append("rect")
                                .attr('x',x1+40)
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

