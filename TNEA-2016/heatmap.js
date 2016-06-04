introJs().start();

var colorarray = ["#081d58", "#253494","#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#edf8b1", "#ffffd9"]
var svg = d3.select('#heat')

var heat = svg.append('svg')
   .attr('width',1000)
   .attr('height',355)

function computedata(cutoff, quota){

d3.csv('tneaCounselling.csv', function(data)
{
    data = data.filter(function(row) {
        return row[quota] >= cutoff-2 & row[quota] < cutoff+2 ;
    })
    var y = 0
    var j= 0
    data.forEach(function(d,i)
    {
    if (i< 100)
    {
      j = j+30
      if (i%20 == 0)
      {
        y = y+30
        j= 30
      }
    heat.append('rect')
        .attr('x',j)
        .attr('y',y)
        .attr('height',30)
        .attr('width',30)
        .attr('fill',function(){ return (color(parseInt(data[i][quota]))) })
        .attr('stroke','#fff')
        .attr('cutoff', function(){return data[i][quota]})
        .attr('course', function(){ return d.course})
        .attr('college', function(){ return d.college})
        .attr('district', function(){ return d.district})
        .on('click', playsong)
        .append("svg:title")
          .text(d.course + '-' +d.college + ',' + d.district);

}

  })

  colorarray.forEach(function(colorcode, i)
  {
       heat.append('rect')
        .attr('x',250+ 30*i)
        .attr('y',250)
        .attr('height',30)
        .attr('width',30)
        .attr('fill',colorcode)
        .attr('stroke','#fff')

      heat.append('text')
          .attr('x', 250+30*i)
          .attr('y',300)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.37em')
          .attr('class', 'legend text' )
          .text(function(){
            return getlegend(i)
          })

  })

  function getlegend(pos)
  {
    if (pos == 0)
    {
      return 'High Probablity'
    }

    if (pos == 8)
    {
      return 'Low Probablity'
    }
    else
    {
      return ''
    }
  }

function playsong()
{
  $('.popup').remove()
  $('.ritems').hide();
  var cut = d3.select(this).attr("cutoff");
  if (cut > cutoff){
    tune = songs['poor']
  }
  else
  {
    tune = songs['good'] 
  }
  song = tune[Math.floor(Math.random()*tune.length)]
  var Mp3Me= document.getElementById('Mp3Me');
  // Mp3Me.src = "http://download.tamiltunes.me/Manithan%20(2016)/Kondattam%20-%20TamilTunes.com.mp3";
  Mp3Me.src = song
  var college = d3.select(this).attr("college")
  var course = d3.select(this).attr("course")
  var district = d3.select(this).attr("district")
  $('#course').append("<div class='popup' style='color:white;background-color:#081d58;'><span class='course'>"+course+"</span><br><span>" + college + "</span><br><span class='district'>"
     + district+"</span><br><span> Closing cut off (2015) - " + cut +  "</div>")

}

})
}

var cutoff = 194
var quota = 'OC'

computedata( cutoff, quota);
var color = getcolor(cutoff)


function getcolor(cutoff)
{
  var colorcode = d3.scale.linear()
              .domain([cutoff-2, cutoff-1.5, cutoff-1 , cutoff-0.5, cutoff, cutoff + 0.5, cutoff + 1, cutoff + 1.5 , cutoff + 2])
              .range(colorarray)
    return colorcode
}    

var songs = {}
readTextFile("songs.json", function(text){
    songs = JSON.parse(text);

});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function heatup()
{
  var textcutoff = $('#cutoff').val()
  var dropdownquota = $('#quota').val()
  computedata( parseInt(textcutoff), dropdownquota); 
  color = getcolor(parseInt(textcutoff))
}

heatup();


// google-analytics

 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78417578-1', 'auto');
  ga('send', 'pageview');