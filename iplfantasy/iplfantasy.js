
var width = 800,
    height =600

var svg = d3.select('#ipl')
    .append('svg')
   .attr("width", width)
    .attr("height", height); 

d3.csv('iplfix.csv', function(data){ 

var parseDate = d3.time.format("%d-%b-%y").parse
var currDate = new Date()
var currtime = currDate.getHours();
console.log(currtime);
data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.time = parseInt( d.time.match(/\d/g).join(''))/100;
    });

var filtereddata = data.filter(function(d){return d.date > currDate })
var today = data.filter(function(d){return d.date == currDate })
var todaymatches = today.filter(function(d){return d.time > currtime })
    var allmatches = filtereddata.concat(todaymatches)
var nextfivematches = filtereddata.splice(0,5)
console.log(nextfivematches);
var home = nextfivematches.map(function(d){return d.hometeam})
var away = nextfivematches.map(function(d){return d.awayteam})
var homeaway = home.concat(away)
var counts = {}, j, value;
for (j = 0; j < homeaway.length; j++) {
    value = homeaway[j];
    var numOccurences = $.grep(home, function (elem) {
    return elem === value;
    }).length
    var homeadv = numOccurences/2
    if (typeof counts[value] === "undefined") {
        counts[value] = 1+homeadv-j/10;
    } else {
        counts[value] += 1
    }
}

var sortable = [];
for (var team in counts) {
    sortable.push([team, counts[team]]);
}
sortable.sort(function(a, b) {
    return b[1] - a[1];
});

console.log(sortable)


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
var postion2 = {'pune': 1, 'delhi': 3, 'mumbai':7, 'hyderabad':5, 
            'punjab':6, 'kolkata':2, 'gujarat':8, 'bangalore':4}

svg.append('rect')
   .attr('x',0)
   .attr('y',10)
   .attr('width', 170)
   .attr('height', 100)
   .attr('class', 'yellowfellow')

svg.append('text')
   .attr('x',10)
   .attr('y', 25 )
   .attr('dy', '0.37em' )
   .text('Next Match')

svg.append('text')
   .attr('x',20)
   .attr('y', 50 )
   .attr('dy', '0.37em' )
   .attr('class', 'teamname')
   .text(toTitleCase(home[0]))

  svg.append('text')
   .attr('x', 70)
   .attr('y', 70 )
   .attr('dy', '0.37em' )
   .attr('class', 'teamname')
   .text('vs') 

svg.append('text')
   .attr('x',20)
   .attr('y', 90 )
   .attr('dy', '0.37em' )
   .attr('class', 'teamname')
   .text(toTitleCase(away[0]))

var player = svg.selectAll('.teams')
      .data(teams)
      .enter()

var position = player.append("svg:image")
            .attr("xlink:href", function(d){ return d+'.svg' })
            .attr("width", 40)
            .attr("height", 40)
            .attr('class', 'sattai')
            .attr("x",  function(d,i){return i%2==0? 250: 500} )
            .attr("y", function(d,i){return i%2==0? 120 + i*50: 120 + (i-1)*50 })

      position.transition()
            .delay(function(d,i){return postion[d]*400})
            .duration(5000)
            .attr("x", function(d,i){ return postion[d] < 5? 375: 260+(postion[d]-4)*50 })
            .attr('y', function(d,i){ return postion[d] < 5? 370+ (postion[d]-4)*70: 470 })

$('#myonoffswitch').on('change', function(){
    if($(this). prop("checked") == true){
        recompute(false)
    }
    else
    {
        recompute(true)
    }
})

function recompute(toggle)
{
    var positionarray = postion
    if(toggle)
    positionarray = postion2
    var newpostion = d3.selectAll('.sattai')
    newpostion.transition()
            .delay(function(d,i){return (positionarray[d]-1)*400})
            .duration(5000)
            .attr("x", function(d,i){ return positionarray[d] < 5? 375: 260+(positionarray[d]-4)*50 })
            .attr('y', function(d,i){ return positionarray[d] < 5? 370+ (positionarray[d]-4)*70: 470 })
}
})


$(document).ready(function() {
    var clock = $('.clock').FlipClock(3600, {
     countdown: true
});
})

function toTitleCase(str)
{   if(str)
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    else
      return ''
}