var fixturestable = d3.selectAll('#fixturestable')
  					  .append('svg')
  					  .attr("viewBox", "0 0 300 600")

var height = 200
d3.csv("mock.csv", function(error, data) {
    // data.forEach(function(d) {
    //     d['1gw'] = +d['1gw'];  
    // });
  
    console.log(d3.max(+ data['1gw']));
    var yScale = d3.scale.linear()
                   		 .domain([0, d3.max(data, function (d) { return +d['1gw']})])
                   		 .rangeRound([height, 20]);
    var x = 20
    var x1 = 80

    		var groups = fixturestable.selectAll("g")
                    				  .data(data)
                    				  .enter()
                    	              
                    	              
                    	        var rects  = groups.append("rect")
		                    				.attr('x',x1)
		                    				.attr('y', function(d){ return yScale(parseInt(d['1gw'])) })
		                    				.attr('height', 5)
		                    				.attr('width', 5)
		                    				.attr('fill', "tomato")

		                    		groups.append('text')
		                    			  .attr('x',x)
		                    			  .attr('y', function(d){ return yScale(parseInt(d['1gw'])) })
		                    			  .attr('dy','0.37em')
		                    			  .attr('fill','steelblue')
		                    			  .attr('class','club')
		                    			  .text(function(d){return d.club})



});

