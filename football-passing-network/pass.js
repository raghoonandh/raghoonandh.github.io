
var width = 400
var height = 535
var svg = d3.select("#passingnetwork")
            .append('svg')
            .attr("width", width)
            .attr("height", height);

var color = ['golie', 'defender', 'midfield', 'attack'];

svg.append('circle')
  .attr('cx', 10)
  .attr('cy', 10)
  .attr('r',10)
  .attr('class', 'golie')
  .on('click', function(){filtergolie(1)})


svg.append('text')
  .attr('x',20)
  .attr('y', 15)
  .text('GK')
  .attr('class', 'golie')

svg.append('circle')
  .attr('cx', 100)
  .attr('cy', 10)
  .attr('r',10)
  .attr('class', 'defender')
  .on('click', function(){filtergolie(2)})

svg.append('text')
  .attr('x',110)
  .attr('y', 15)
  .text('DEF')
  .attr('class', 'defender')

  svg.append('circle')
  .attr('cx', 200)
  .attr('cy', 10)
  .attr('r',10)
  .attr('class', 'midfield')
  .on('click', function(){filtergolie(3)})

  svg.append('text')
  .attr('x',210)
  .attr('y', 15)
  .text('MID')
  .attr('class', 'midfield')

  svg.append('circle')
  .attr('cx', 300)
  .attr('cy', 10)
  .attr('r',10)
  .attr('class', 'attack')
  .on('click', function(){filtergolie(4)})

  svg.append('text')
  .attr('x',310)
  .attr('y', 15)
  .text('FWD')
  .attr('class', 'attack')

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(200))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2.6)) 

function filtergolie(id)
{
  target = []
  d3.selectAll('line')
    .classed('faded', function(d){
      if(d.source.group == id)
      {
         target.push(d.target.id)
      }
      if(d.target.group == id)
      {
         target.push(d.source.id)
      }
      return (d.source.group == id) ||  (d.target.group == id)? false:true
      })

     d3.selectAll('circle')
    .classed('faded', function(d){
      if(d)
      {
         return (d.group == id) || target.indexOf(d.id) > -1? false:true
      }
     
      })
}

d3.json("pass.json", function(error, graph) {
  if (error) throw error;
  var jsonData = graph['nodes']
  var playerNames = new Array();
            $.each( jsonData, function ( index, product )
            {
                playerNames.push( product.id );
            } );
           
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 10)
      .attr("class", function(d) { return color[parseInt(d.group) - 1]; })
      .attr('title', function(d) { return d.id; })
      .classed('playernode', true)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));


 $('body')
  .tooltip({
  selector: '[title]',
  container: 'body',
  html: true
  });

  // node.append("title")
  //     .text

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

 


  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return  d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}


  function playertype()
{
  var player = $('#player').val()
  var target = [player]
  if(player != '')
  {
  
  d3.selectAll('line')
    .classed('faded', function(d){
      if(d.source.id==player){
        target.push(d.target.id)
      return false
    }
      else
      return true
    })
    d3.selectAll('circle')
    .classed('faded', function(d){
      if(d)
      return target.indexOf(d.id) > -1? false:true
      else
        return false
      
      })
    
  }
  else
  {
      d3.selectAll('circle')
    .classed('faded', false)

  d3.selectAll('line')
    .classed('faded', false)
  }
}

