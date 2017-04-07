var width = 800,
    height =600

var svg = d3.select('#ipl')
    .append('svg')
   .attr("width", width)
    .attr("height", height); 

d3.csv('iplfix.csv', function(data){ 

var parseDate = d3.time.format("%d-%b-%y").parse
var currDate = new Date()
currDate.setDate(currDate.getDate()-1);
var currtime = currDate.getHours();
data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.time = (parseInt( d.time.match(/\d/g).join(''))/100) +12;
    });

var filtereddata = data.filter(function(d){return d.date > currDate })
// var today = data.filter(function(d){return d.date.getTime() == currDate.getTime() })
var todaymatches = today.filter(function(d){return d.time > currtime })
var allmatches = todaymatches.concat(filtereddata)
var matchtime = (allmatches[0]['date']).setHours(allmatches[0]['time'])
var secondsdiff = (matchtime-currDate.getTime())/1000;
var clock = $('.clock').FlipClock(secondsdiff, {
     countdown: true
});
var nextfivematches = allmatches.splice(0,5)
var nexteightmatches = allmatches.splice(0,8)
var home = nextfivematches.map(function(d){return d.hometeam})
var away = nextfivematches.map(function(d){return d.awayteam})
var home8 = nexteightmatches.map(function(d){return d.hometeam})
var away8 = nexteightmatches.map(function(d){return d.awayteam})
var homeaway = home.concat(away)
var homeaway8 = home8.concat(away8)
function getposition(homeaway, home) {
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



var postionobj = {}
for(var i=0; i<sortable.length; i++)
{       
        postionobj[sortable[i][0]] = i+1
}
return postionobj
}

var postion = getposition(homeaway, home)
var position2 = getposition(homeaway8, home8)



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

var arrowrect = svg.append('rect')
   .attr('x', 320)
   .attr('y', 160)
   .attr('height', 250)
   .attr('width',2)
   .attr('opacity', 0)


var rightrect = svg.append('rect')
   .attr('x',320)
   .attr('y',530)
   .attr('width', 130)
   .attr('height', 2)
   .attr('opacity', 0)


 var downarrow = svg.append("svg:image")
            .attr("xlink:href", 'down.svg')
            .attr("width", 25)
            .attr("height", 25)
            .attr("x",  309 )
            .attr("y", 400)
            .attr('opacity', 0)

 var rightarrow = svg.append("svg:image")
            .attr("xlink:href", 'right.svg')
            .attr("width", 25)
            .attr("height", 25)
            .attr("x",  440 )
            .attr("y", 518)
            .attr('opacity', 0)

arrowtransition()
function arrowtransition()
{
   
   arrowrect.transition()
             .attr('opacity', 0)
    downarrow.transition()
             .attr('opacity', 0)
    rightrect.transition()
             .attr('opacity', 0)
    rightarrow.transition()
             .attr('opacity', 0)

   arrowrect.transition()
            .delay(3000)
            .duration(1000)
            .attr('opacity', 1)

    downarrow.transition()
            .delay(3000)
            .duration(1000)
            .attr('opacity', 1)

    rightrect.transition()
            .delay(3000)
            .duration(1000)
            .attr('opacity', 1)

    rightarrow.transition()
            .delay(3000)
            .duration(1000)
            .attr('opacity', 1)

}

var teams = [ 'bangalore', 'delhi', 'gujarat' ,'hyderabad','kolkata', 'mumbai', 'pune', 'punjab']

for(var j=0; j<teams.length; j++)
{
    svg.append("svg:image")
            .attr("xlink:href", teams[j]+'.svg')
            .attr("width", 25)
            .attr("height", 25)
            .attr('class', 'sattai')
            .attr("x",  15 )
            .attr("y", j*50+150)
    svg.append('text')
       .attr("x",  0 )
       .attr("y", j*50+190)
       .attr('class', 'mini')
       .text(toTitleCase(teams[j]))
}

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
   .attr('x',280)
   .attr('y', 100 )
   .attr('dy', '0.37em' )
   .text('Space for Ads')
   .classed('ads', true)

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
    positionarray = position2
    var newpostion = d3.selectAll('.sattai')
    newpostion.transition()
            .delay(function(d,i){return (positionarray[d]-1)*400})
            .duration(5000)
            .attr("x", function(d,i){ return positionarray[d] < 5? 375: 260+(positionarray[d]-4)*50 })
            .attr('y', function(d,i){ return positionarray[d] < 5? 370+ (positionarray[d]-4)*70: 470 })
}
})



function toTitleCase(str)
{   if(str)
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    else
      return ''
}

setTimeout(function() { ohsnapalert() }, 25000);

function ohsnapalert(){
  ohSnap('This App Auto Updates After Everymatch!', {color: 'green', 'duration':'8000'});
}

//testing
// Date.prototype.addDays = function(days) {
//     this.setDate(this.getDate() + parseInt(days));
//     return this;
// };


// google-analytics
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78417578-1', 'auto');
  ga('send', 'pageview');