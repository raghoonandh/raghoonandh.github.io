d3.csv('iplfix.csv', function(data){ 

var parseDate = d3.time.format("%d-%b-%y").parse
var currDate = new Date()
data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.time = parseInt( d.time.match(/\d/g).join(''))/100;
    });

var filtereddata = data.filter(function(d){return d.date >= currDate })
var nextfivematches = filtereddata.splice(0,5)
var home = nextfivematches.map(function(d){return d.hometeam})
var away = nextfivematches.map(function(d){return d.awayteam})
var homeaway = home.concat(away)
var counts = {}, j, value;
for (j = 0; j < homeaway.length; j++) {
    value = homeaway[j];
    var homeadv = Sugar.Array.count(value, home)
    console.log(homeadv);
    if (typeof counts[value] === "undefined") {
        counts[value] = 1;
    } else {
        counts[value]++;
    }
}

console.log(counts);

var width = 800,
    height =600

var svg = d3.select('#ipl')
    .append('svg')
   .attr("width", width)
    .attr("height", height); 

svg.append('circle')
   .attr('cx', 400)
   .attr('cy', 280)
   .attr('r', 270)
   .attr('class', 'field')

svg.append('rect')
   .attr('x',350)
   .attr('y',150)
   .attr('width', 100)
   .attr('height', 300)
   .attr('class', 'pitch')

var teams = [ 'pune', 'delhi', 'mumbai', 'hyderabad', 'punjab', 'gujarat', 'kolkata', 'bangalore']
var postion = {'pune': 4, 'delhi': 7, 'mumbai':3, 'hyderabad':2, 
            'punjab':8, 'kolkata':5, 'gujarat':6, 'bangalore':1}


var player = svg.selectAll('.teams')
      .data(teams)
      .enter()

var position = player.append("svg:image")
            .attr("xlink:href", function(d){ return d+'.svg' })
            .attr("width", 40)
            .attr("height", 40)
            .attr("x",  function(d,i){return i%2==0? 250: 500} )
            .attr("y", function(d,i){return i%2==0? 120 + i*50: 120 + (i-1)*50 })

      position.transition()
            .delay(function(d,i){return i*40})
            .duration(5000)
            .attr("x", function(d,i){ return postion[d] < 5? 375: 260+(postion[d]-4)*50 })
            .attr('y', function(d,i){ return postion[d] < 5? 370+ (postion[d]-4)*70: 470 })

})


$(document).ready(function() {
    var clock = $('.clock').FlipClock(3600, {
     countdown: true
});
})