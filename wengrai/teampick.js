
var w = 850
var h = 720
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
    var curr_round =  3
    var curr_type = 'model_dream';
    var sim_file = "WengerAiSeasonSimulation2019-20.csv"
    var season_file = "WengrAiPredictions2020-21.csv"
    d3.csv(season_file, function(data) {
      
 

     $(document).ready(function(){
     //    $('input[type="checkbox"]').click(function(){
     //        if($(this).prop("checked") == true){
     //            console.log("Checkbox is checked.");
     //            curr_type = 'model_budget';
     //            pickteam();

     //        }
     //        else if($(this).prop("checked") == false){
     //            curr_type = 'model_dream';
     //            pickteam();
     //        }
     //    }






     //    );

         $('#round').change(function(){
                    var value = $('#round').val();
                    curr_round = value
                    document.body.style.zoom="100%"
                    pickteam()

                    });

          $('#teamtype').change(function(){
                    var value = $('#teamtype').val();
                    curr_type = value
                    document.body.style.zoom="100%"
                    pickteam()
                    });


         




    });






    
    // svgGw.append('text')
    //         .attr('x', 60 )
    //         .attr('y', 240)
    //         .classed('gameweek', true)
    //         .text('Gameweeks - Season 2019/20');


    var rounds = d3.map(data, function(d){return Number(d.round);}).keys();
    rounds.sort(function(a, b){return b-a});
    var row= 0
    var col = 0
    curr_round =  d3.max(data, d => +d.round);
    
    function toggle_team(type)
    {

      pickteam(type, curr_round)
      if(type == 'model_dream')
      {
      curr_type = 'model_dream'
      dream_team.classed('inactive', false)
      dream_team.classed('active', true)
      real_team.classed('active', false)
      real_team.classed('inactive', true)
    }
    else
    {
      curr_type = 'model_budget'
      dream_team.classed('active', false)
      dream_team.classed('inactive', true)
      real_team.classed('inactive', false)
      real_team.classed('active', true)

    }
    }

    function toggle_gameweek(round_curr)
    {
      curr_round = round_curr
      pickteam()
      gameweeks.classed('active', function (d,i){ return  Number(d) == curr_round? true:false } )
      gameweeks.classed('inactive', function (d,i){ return Number(d) == curr_round? false:true } )

    }

    // var dream_team = svgGw.append('rect')
    //      .attr('x', 60)
    //      .attr('y', 160)
    //      .attr('width', 120)
    //      .attr('height', 40)
    //      .classed('active', true)
    //      .on('click', function(){  toggle_team('model_dream') })

    // svgGw.append('text')
    //      .attr('x', 70)
    //      .attr('y', 180)
    //      .text('Dream Team')
    //       .on('click', function(){  toggle_team('model_dream') })



    //       var real_team = svgGw.append('rect')
    //      .attr('x', 190)
    //      .attr('y', 160)
    //      .attr('width', 120)
    //      .attr('height', 40)
    //      .classed('inactive', true)
    //      .on('click', function(){   toggle_team('model_budget') })




    // svgGw.append('text')
    //      .attr('x', 210)
    //      .attr('y', 180)
    //      .text('Real Team')
    //       .on('click', function(){  toggle_team('model_budget') })


for (r = 0; r < rounds.length; r++)
{
var x = document.getElementById("round");
var option = document.createElement("option");
option.text = 'GW ' + rounds[r]
option.value = rounds[r]
x.add(option);
}


                // var gameweeks = svgGw.append("g")
                //              .attr("class", "links")
                //              .selectAll("line")
                //              .append('rect')
                //              .data(rounds)
                //              .enter()
                //              .append('rect')
                //          .attr('x', function(d,i){ return ((i)%5)*70+60  })
                //          .attr('y', function(d,i) {return 250 + (Math.floor((i)/5))*50  } )
                //          .attr('height', 40)
                //          .attr('width', 60)
  
                //         .classed('active', function (d,i){ return  Number(d) == curr_round? true:false } )
                //         .classed('inactive', function (d,i){ return Number(d) == curr_round? false:true } )
                //         .on('click', function(d, i){ pickteam( toggle_gameweek(Number(d)) )})

                // var gameweekstext = svgGw.append("g")
                //              .attr("class", "links")
                //              .selectAll("line")
                //              .append('rect')
                //              .data(rounds)
                //              .enter()
                //              .append('text')
                //          .attr('x', function(d,i){ return ((i)%5)*70+75  })
                //          .attr('y', function(d,i) {return 275 + (Math.floor(i/5))*50  } )
                //          .classed('gameweek', true)
                 
                //          .text(function(d,i){ return Number(d)+1})
                //          .on('click', function(d, i){ pickteam( toggle_gameweek(Number(d)) )})



           
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


  
    // console.log(curr_type);  
    pickteam(curr_type, curr_round);


    function pickteam(mtype, round) {
    
     
      //console.log('here');

   
    // console.log('there', curr_type) 
    //   console.log('there',mtype)
        curr_round = round| curr_round;
        curr_type =  mtype? mtype: curr_type;
       
        gw_tex = 'Wengr.ai Real Team'
       if(curr_type=='model_dream')
        gw_tex = 'Wengr.ai Dream Team'
       if(curr_type=='transfer_dream')
        gw_tex = 'Transfers In Dream Team'
       if(curr_type=='selection_dream')
        gw_tex = 'Selected By Dream Team'


        svg.selectAll("*").remove();



        svg.append('text')
            .attr('x', 285)
            .attr('y', 40)
            .text('Gameweek '+curr_round)
            .classed('weekname', true);



        svg.append('text')
            .attr('x', 220)
            .attr('y', 15)
            .text(gw_tex)
            .classed('teamtype', true); 

    var filter_data  = data.filter(function(d){return d.round == curr_round  });
          // console.log(filter_data);
       filter_data = filter_data.filter(function(d){return (d.type == curr_type)}) 
       // console.log(filter_data)



      var starters  = filter_data.filter(function(d){ return Number(d.starting)==1 })
      
      var total_points = d3.sum(starters, d => d.total_points_nextgw)

      var captain = starters.filter(function(d){ return Number(d.captain) == 1})
      
      total_points = total_points+Number(captain[0].total_points_nextgw)

  

      var played =  starters.filter(function(d){ return Number(d.minutes)>0 })
      var played_def = played.filter(function(d){ return Number(d.element_type)==2})
      var num_played_def = played_def.length
      // console.log(num_played_def);
      var from_bench = 11 - played.length
      
  
      if (from_bench)
      {

        // console.log(from_bench)
        var benchers = filter_data.filter(function(d){ return Number(d.starting)==0 })
        // console.log(benchers)
        if(num_played_def >= 3)
        {
      
        console.log('here')
        var bench_in = benchers.filter(function(d){ return (Number(d.bench_order)<=from_bench) & (Number(d.bench_order)>0) })
        }
        else
        {

          var from_bench_def = 3-num_played_def
        
        var def_in = benchers.filter(function(d){ return Number(d.element_type)==2 })
        var bench_in =  def_in.filter(function(d,i){ return i<from_bench_def })
        if(from_bench > bench_in.length)
        {
        var  other_players =  benchers.filter(function(d){ return Number(d.element_type)>2 })
        var other_in  =  other_players.filter(function(d,i){ return i<(from_bench-bench_in.length) })
        console.log(other_in)
        bench_in.push(other_in[0])
        console.log(bench_in)
      }

        }
        // console.log(bench_in)
        var bench_points = d3.sum(bench_in, d => d.total_points_nextgw)
        console.log(bench_points)
        // console.log(bench_points)
        total_points = total_points+bench_points
      }

      if(total_points == 0)
        total_points = '-'

      var total_budget =  d3.sum(filter_data, d => d.value)
      total_budget = total_budget/10 
    

       svg.append('text')
            .attr('x', 290)
            .attr('y', 80)
            .text(total_points + ' Pts')
            .classed('pointsbig', true);

            svg.append('text')
            .attr('x', 290)
            .attr('y', 120)
            .text(total_budget + 'm')
            .classed('pointsbig', true);

         svg.append('text')
            .attr('x', 620)
            .attr('y', 690)
            .text('Developed By');

            svg.append('text')
            .attr('x', 620)
            .attr('y', 715)
            .text('Raghoonandh');

              svg.append("svg:image")
            .attr("xlink:href", 'linkedin.svg')
            .attr("width", 35)
            .attr("height", 35)
            .attr("x",  730)
            .attr("y", 680)
            .on('click', function() {
             window.open('https://www.linkedin.com/in/raghoonandh', '_blank');});

             svg.append("svg:image")
            .attr("xlink:href", 'twitter.svg')
            .attr("width", 35)
            .attr("height", 35)
            .attr("x",  775)
            .attr("y", 680)
            .on('click', function() {
             window.open('https://www.twitter.com/raghoonandh', '_blank');});


              svg.append("svg:image")
            .attr("xlink:href", 'medium.svg')
            .attr("width", 35)
            .attr("height", 35)
            .attr("x",  815)
            .attr("y", 680)
            .on('click', function() {
             window.open('https://medium.com/@raghunandh10', '_blank');});

           

     var gk = 0,
            df = 0,
            mf = 0,
            fw = 0;
        for (j = 0; j < filter_data.length; j++)
        {
            
            var curr_player = filter_data[j]
            var curr_player_type = curr_player.element_type
            var points = curr_player.total_points_nextgw;
            if(curr_player.captain == 1)
            points = points*2
            
            if((Number(points) == 0 ) & (Number(curr_player.minutes) ==0) & (Number(curr_player.results) == 0))
            {
              points = (curr_player.probability/100);
              points =  points.toFixed(2)
            }
            var txt_offset=0
            if ((points.toString().length) > 3)
              txt_offset = -15
            var player_name = curr_player.web_name
            var probability = curr_player.probability;
           
            // console.log(curr_player)
            var namelength = player_name.length;
            
            var offset = 0;
            if (namelength < 7)
              offset = 10;
            if (namelength > 10)
              offset = -10;
            if (namelength < 5)
              offset = 15;

          

             

            // console.log(curr_player_type);

            if (curr_player_type==1) {

           svg.append("svg:image")
            .attr("xlink:href", 'jerseys/' + curr_player.jersey_code +  '.svg')
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  150+(gk*300))
            .attr("y", 50)
            .attr('title', 'test')

              if(curr_player.minutes == 0 & curr_player.results == 1) 
            {

            svg.append("svg:image")
            .attr("xlink:href", 'downarrow.svg')
            .attr("width", 10)
            .attr("height", 10)
            .attr("x",  250+(gk*300))
            .attr("y", 180)



            }

            if(curr_player.starting != 1) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/bench.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  220+(gk*300))
            .attr("y", 100)



            }



               svg.append("text")
            .attr("x",  txt_offset+185+(gk*300))
            .attr("y", 175)
            .classed('points', true)
            .text(Number(points))
           

            svg.append('text')
            .attr('x', 160+(gk*300)+offset)
            .attr('y', 150)
            .text(curr_player.web_name);

             gk = gk+1
            

            }

            else if (curr_player_type == 2) {


           svg.append("svg:image")
            .attr("xlink:href", 'jerseys/'+ curr_player.jersey_code +  '.svg' )
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  0+(df*150) )
            .attr("y", 220)
            .attr('title', 'test')

            if(curr_player.minutes == 0 & curr_player.results == 1) 
            {

            svg.append("svg:image")
            .attr("xlink:href", 'downarrow.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x",   80+(df*150))
            .attr("y", 280)



            }

             svg.append('text')
            .attr('x', 10+(df*150)+offset)
            .attr('y', 320)
            .text(curr_player.web_name);

              svg.append("text")
            .attr("x",  txt_offset+35+(df*150))
            .attr("y", 345)
            .classed('points', true)
            .text(Number(points))


             if(curr_player.starting == 0) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/bench.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  70+(df*150))
            .attr("y", 270)

            svg.append("text")
            .attr("x",  105+(df*150))
            .attr("y", 295)
            .text(Number(curr_player.bench_order))
            .classed('benchorder', true)
  
            }
           


            df = df+1;

            }


            else if (curr_player_type==3) {

                svg.append("svg:image")
            .attr("xlink:href", 'jerseys/'+ curr_player.jersey_code +  '.svg' )
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  0+(mf*150) )
            .attr("y", 400)
            .attr('title', 'test')

             if(curr_player.minutes == 0 & curr_player.starting==1 & curr_player.results == 1) 
            {

            svg.append("svg:image")
            .attr("xlink:href", 'downarrow.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x",   80+(mf*150))
            .attr("y", 460)



            }

            svg.append('text')
            .attr('x', 10+(mf*150)+offset)
            .attr('y', 500)
            .text(curr_player.web_name);

              svg.append("text")
            .attr("x",  txt_offset+35+(mf*150))
            .attr("y", 525)
            .classed('points', true)
            .text(Number(points))

              if(curr_player.starting == 0) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/bench.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  70+(mf*150))
            .attr("y", 450)

             svg.append("text")
            .attr("x",  105+(mf*150))
            .attr("y", 475)
            .text(Number(curr_player.bench_order))
            .classed('benchorder', true)
            
            }

               if(curr_player.captain == 1) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/captain.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  70+(mf*150))
            .attr("y", 450)
            }

               if(curr_player.vice_captain == 1) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/vice_captain.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  70+(mf*150))
            .attr("y", 450)
            }

            mf = mf+1;

            }

            else 
            {

        svg.append("svg:image")
            .attr("xlink:href",  'jerseys/'+ curr_player.jersey_code +  '.svg')
            .attr("width", 80)
            .attr("height", 80)
            .attr("x",  150+fw*150 )
            .attr("y", 580)
            .attr('title', 'test')


             svg.append('text')
            .attr('x', 160+(fw*150)+offset)
            .attr('y', 680)
            .text(curr_player.web_name);

             svg.append('text')
            .attr('x', txt_offset+185+(fw*150))
            .attr('y', 705)
            .classed('points', true)
            .text(Number(points));

               if(curr_player.minutes == 0 & curr_player.results == 1) 
            {

              console.log(curr_player.web_name)


            svg.append("svg:image")
            .attr("xlink:href", 'downarrow.svg')
            .attr("width", 20)
            .attr("height", 20)
            .attr("x",  225+(fw*150))
            .attr("y", 635)



            }


               if(curr_player.starting == 0) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/bench.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  220+(fw*150))
            .attr("y", 630)


            svg.append("text")
            .attr("x",  255+(fw*150))
            .attr("y", 655)
            .text(Number(curr_player.bench_order))
            .classed('benchorder', true)
            }

              if(curr_player.captain == 1) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/captain.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  220+(fw*150))
            .attr("y", 630)
            }

              if(curr_player.vice_captain == 1) 
            {

              svg.append("svg:image")
            .attr("xlink:href", 'jerseys/vice_captain.svg')
            .attr("width", 30)
            .attr("height", 30)
            .attr("x",  220+(fw*150))
            .attr("y", 630)
            }

          


            fw = fw+1

        }




             }


        

       




        
    }
});

        
          