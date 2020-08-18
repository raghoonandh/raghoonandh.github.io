
var w = 800
var h = 750
formation = [3,4,2]
var svg = d3.select('#emojifootball')
			.append('svg')
			.attr('width', w)
			.attr('height', h)

var svgGw = d3.select('#picks')
              .append('svg')
              .attr('width', 400)
              .attr('height', h)
				 // svg.append("svg:image")
  			// 		.attr("xlink:href", 'img/football-field.svg')
  			// 		.attr("width", w)
 				// 	.attr("height", h)
  			// 		.attr("x", 10)
  			// 		.attr("y", 0);
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


var divTooltip = d3.select("body").append("div").attr("class", "toolTip_div");
     
    d3.csv("season201920.csv", function(data) {

    svgGw.append('text')
            .attr('x', 90 )
            .attr('y', 240)
            .classed('gameweek', true)
            .attr('fill', '#08109A')
            .text('Gameweek');


    var rounds = d3.map(data, function(d){return d.round;}).keys();
    var row= 0
    var col = 0


                var gameweeks = svgGw.append("g")
                             .attr("class", "links")
                             .selectAll("line")
                             .append('rect')
                             .data(rounds)
                             .enter()
                             .append('rect')
                         .attr('x', function(d,i){ return ((i+1)%5)*70+10  })
                         .attr('y', function(d,i) {return 250 + (Math.floor((i)/5))*50  } )
                         .attr('height', 40)
                         .attr('width', 60)
                        .attr('fill', '#05FF88')
                        .on('click', function(d, i){ pickteam(Number(d))})

                var gameweekstext = svgGw.append("g")
                             .attr("class", "links")
                             .selectAll("line")
                             .append('rect')
                             .data(rounds)
                             .enter()
                             .append('text')
                         .attr('x', function(d,i){ return ((i+1)%5)*70+25  })
                         .attr('y', function(d,i) {return 275 + (Math.floor(i/5))*50  } )
                         .classed('gameweek', true)
                         .attr('fill', '#08109A')
                         .text(function(d,i){ return Number(d)})



           
    // for (r = 0; r < rounds.length; r++)
    // {

    //     svg.append('rect')
    //         .attr('x', col*70+800)
    //         .attr('y', 250+row*50)
    //         .attr('height', 40)
    //         .attr('width', 60)
    //         .attr('fill', '#05FF88')
    //         .on('click', function(d,i){ return console.log(i); })

    //     svg.append('text')
    //         .attr('x', col*70+800+15)
    //         .attr('y', 275+row*50)
    //         .classed('gameweek', true)
    //         .attr('fill', '#08109A')
    //         .text(Number(rounds[r])+1);


    //     if ((r+1)%5 == 0) {
    //         row +=1  
    //         col = 0
    //     }
    //     else
    //     {
    //         col +=1
    //     }
    // }
       
    pickteam(3);


    function pickteam(round) { 

        svg.selectAll("*").remove();

        svg.append('text')
            .attr('x', 250)
            .attr('y', 30)
            .text('Gameweek ' + round)
            .classed('weekname', true);

    var filter_data  = data.filter(function(d){return d.round == round});
      var starters  = filter_data.filter(function(d){ return d.starting==1 })
      var total_points = d3.sum(starters, d => d.total_points_nextgw) 
      console.log(total_points);

       svg.append('text')
            .attr('x', 290)
            .attr('y', 80)
            .text(total_points + ' Pts')
            .classed('pointsbig', true);

     var gk = 0,
            df = 0,
            mf = 0,
            fw = 0;
        for (j = 0; j < filter_data.length; j++)
        {
            
            var curr_player = filter_data[j]
            var curr_player_type = curr_player.element_type
            // console.log(curr_player_type);

            if (curr_player_type==1) {

           svg.append("svg:image")
            .attr("xlink:href", 'jerseys/astonvilla.svg')
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  150+(gk*300))
            .attr("y", 50)
            .on("mouseover", function() { 
            divTooltip.style("left", (d3.event.pageX-20 )+"px");
            divTooltip.style("top", (d3.event.pageY-35)+"px");
            divTooltip.style("display", "inline-block");
            divTooltip.html('Number of Tackels Won/Attempted 5/6')})
            .on("mouseout", function() { divTooltip.style("display", "none"); }) 


               svg.append("text")
            .attr("x",  185+(gk*300))
            .attr("y", 175)
            .classed('points', true)
            .text(Number(curr_player.total_points_nextgw))
           

            svg.append('text')
            .attr('x', 160+(gk*300))
            .attr('y', 150)
            .text(curr_player.web_name);

             gk = gk+1
            

            }

            else if (curr_player_type == 2) {


           svg.append("svg:image")
            .attr("xlink:href", 'jerseys/arsenal.svg')
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  0+(df*150) )
            .attr("y", 220)
            .on("mouseover", function() { 
            divTooltip.style("left", (d3.event.pageX-20 )+"px");
            divTooltip.style("top", (d3.event.pageY-35)+"px");
            divTooltip.style("display", "inline-block");
            divTooltip.html('Number of Tackels Won/Attempted 5/6')})
            .on("mouseout", function() { divTooltip.style("display", "none"); })

             svg.append('text')
            .attr('x', 10+(df*150))
            .attr('y', 320)
            .text(curr_player.web_name);

              svg.append("text")
            .attr("x",  35+(df*150))
            .attr("y", 345)
            .classed('points', true)
            .text(Number(curr_player.total_points_nextgw))
           


            df = df+1;

            }


            else if (curr_player_type==3) {

                svg.append("svg:image")
            .attr("xlink:href", 'jerseys/leedsunited.svg')
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  0+(mf*150) )
            .attr("y", 400)
            .on("mouseover", function() { 
            divTooltip.style("left", (d3.event.pageX-20 )+"px");
            divTooltip.style("top", (d3.event.pageY-35)+"px");
            divTooltip.style("display", "inline-block");
            divTooltip.html('Number of Tackels Won/Attempted 5/6')})
            .on("mouseout", function() { divTooltip.style("display", "none"); })

            svg.append('text')
            .attr('x', 10+(mf*150))
            .attr('y', 500)
            .text(curr_player.web_name);

              svg.append("text")
            .attr("x",  35+(mf*150))
            .attr("y", 525)
            .classed('points', true)
            .text(Number(curr_player.total_points_nextgw))

            mf = mf+1;

            }

            else 
            {

        svg.append("svg:image")
            .attr("xlink:href", 'jerseys/chelsea.svg')
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  150+fw*150 )
            .attr("y", 580)
            .on("mouseover", function() { 
            divTooltip.style("left", (d3.event.pageX-20 )+"px");
            divTooltip.style("top", (d3.event.pageY-35)+"px");
            divTooltip.style("display", "inline-block");
            divTooltip.html('Number of Tackels Won/Attempted 5/6')})
            .on("mouseout", function() { divTooltip.style("display", "none"); })


             svg.append('text')
            .attr('x', 160+(fw*150))
            .attr('y', 680)
            .text(curr_player.web_name);

             svg.append('text')
            .attr('x', 185+(fw*150))
            .attr('y', 705)
            .classed('points', true)
            .text(Number(curr_player.total_points_nextgw));

            fw = fw+1

        }


             }


        

       




        
    }
});

        
          