
var width = 900,
    height = 600;

var fill = d3.scale.category10();

var nodes = [],
    foci = [{x: 300, y: 300}];

var svg = d3.select("#d3foci").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0)
    .size([width, height])
    .on("tick", tick);

var node = svg.selectAll("circle");

function tick(e) {
  var k = .1 * e.alpha;

  // Push nodes toward their designated focus.
  nodes.forEach(function(o, i) {
    o.y += (foci[o.id].y - o.y) * k;
    o.x += (foci[o.id].x - o.x) * k;
  });

  node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}
d3.csv("333status.csv", function(row){

row.forEach(function(d,i)
{
setTimeout(function(){
  nodes.push({id: ~~(Math.random() * foci.length)});
  force.start();

  node = node.data(nodes);

  node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 6)
      .attr('status', function(d,i){ return row[i].status } )
      .attr('datacat', function(d,i){ return row[i].category } )
      .style("fill", function(d, i){ return getcolor(row[i].category) })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on('click', circleclick)
      .style("stroke", function(d,i) { return d3.rgb(fill(d.id)).darker(2); })
      .call(force.drag)
      .append("svg:title")
        .text(function(d, i) { return row[i].status });
}, i*500);
});
});

function mouseover() {
   d3.select(this).transition()
       .duration(10)
       .attr("r", 12);
}

function mouseout(){
  d3.selectAll('circle')
    .attr("r", 6)
}

var color_dict = {'education': '#7bccc4',
 'life': '#1c9099',
 'movie': '#e34a33',
 'news': '#fec44f',
 'philosophy': '#481486',
 'politics': '#bdbdbd',
 'society': '#edf8b1',
 'sports': '#b30000',
 'tv': '#bd0026',
 'work': '#016c59'}

 function getcolor(cat)
 {
  return color_dict[cat] || '0f0'
  }


var legendwidth = 900,
    legendheight = 50;

var svglegend = d3.select("#legend").append("svg")
    .attr("width", legendwidth)
    .attr("height", legendheight);

data_legend = ['life',
 'education',
 'work',
 'sports',
 'tv',
 'movie',
 'news',
 'politics',
 'society',
 'philosophy'
 ]


var legendgroup = svglegend.append('g')
      
var circles = legendgroup.selectAll('circle')
      .data(data_legend)
      .enter()
      .append('g')

circles.append('circle')
       .attr('class', 'node')
       .attr("cx", function(d,i) { return i<9? i*60+30 : i*60+35 })
       .attr("cy", function(d) { return 20 })
       .attr("r", 8)
       .attr('datacat', function(d){ return d })
       .style("fill", function(d, i){ return color_dict[d] })
       .on("click", highlightcat)
      
      circles.append('text')
          .attr('x', function(d,i) { return i<9? i*60+30 : i*60+35  })
          .attr('y', 40 )
          .attr('text-anchor', 'middle')
          .attr('dy', '0.37em')
          .attr('fill', "#000")
          .text(function(d){ return d})

function highlightcat(d)
{
    var click = d

    d3.selectAll(".node").each( function(){
       var cat = d3.select(this).attr("datacat");
       if (cat != d)
       {
         d3.select(this).classed('faded',true)
       }
       else
       {
        d3.select(this).classed('faded',false)
       }
  })

    d3.event.stopPropagation()
}
         

function unhighlightcat()
{
  
  d3.selectAll('.node')
    .classed('faded', false)
}

             
$('body').on('click', unhighlightcat)


function circleclick()
{
  var status = d3.select(this).attr('status')
  ohSnap(status, {color: 'red'});
  var cat = d3.select(this).attr('datacat')
   highlightcat(cat)
}

// google-analytics

 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78417578-1', 'auto');
  ga('send', 'pageview');
