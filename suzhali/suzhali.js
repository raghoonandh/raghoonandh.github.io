lyrics = [['Ei', 'Suzhali', 'Azhagi', 'Velagi'],
 ['Kalakatti', 'Poravaley', 'Irudi', 'Thirudi'],
 ['Azhaguttithan', 'Nagarum', 'Arali'],
 ['Nora', 'Thalli', 'Ponen', 'Vetkam', 'Koradi'],
 ['Un', 'Vayasathan', 'Thithipa', 'Thinen'],
 ['Usurathan', 'Kathi', 'Sonen'],
 ['Potta', 'kozhi', 'Alagula'],
 ['Enna', 'Koththi', 'Alayura'],
 ['Vitta', 'konjam', 'Pozhaikiren', 'Vidudi'],
 ['Mutta', 'Pottu', 'Manasula'],
 ['Kanna', 'Thooki', 'Eriyura'],
 ['Thitta', 'Etti', 'Sethururen', 'Erali'],
 ['Ei', 'Suzhali', 'Azhagi', 'Colouri'],
 ['Kalakatti', 'Poravaley', 'Irudi', 'Thirudi'],
 ['Kedamattuku', 'Unava', 'Azhali'],
 ['Vitha', 'Potta', 'Kaata', 'Thinga', 'Kududi'],
 ['Nee', 'Manasoda', 'Kalvetta', 'Ninna'],
 ['Kanvetta', 'Vetyi', 'Konna'],
 ['Potta', 'kozhi', 'Alagula'],
 ['Enna', 'Koththi', 'Alayura'],
 ['Vitta', 'konjam', 'Pozhaikiren', 'Vidudi'],
 ['Mutta', 'Pottu', 'Manasula'],
 ['Kanna', 'Thooki', 'Eriyura'],
 ['Thitta', 'Etti', 'Sethururen', 'Erali'],
 ['Ei', 'Suzhali'],
 ['Aalangkattu', 'Kara'],
 ['Aathil', 'Needhum', 'Perai'],
 ['Odaiyura', 'Alli'],
 ['Olaruthu', 'Niththam'],
 ['Kadhala', 'Vandhu'],
 ['Kaadhula', 'Kathum'],
 ['Pozhagura', 'Vandu'],
 ['Muzhunguthu', 'Muththam'],
 ['Poovula', 'Thaththi'],
 ['Thavura', 'Saththam'],
 ['Pozhiyuthu', 'Thenu'],
 ['Pothaiyuren', 'Naanu'],
 ['Ada', 'Mazhai', 'Kottucha'],
 ['Kanavula', 'Matti'],
 ['Kozhambuna', 'Meenu'],
 ['Muzhichathum', 'Thappicha'],
 ['Potta', 'kozhi', 'Alagula'],
 ['Enna', 'Koththi', 'Alayura'],
 ['Vitta', 'konjam', 'Pozhaikiren', 'Vidudi'],
 ['Mutta', 'Pottu', 'Manasula'],
 ['Kanna', 'Thooki', 'Eriyura'],
 ['Thitta', 'Etti', 'Sethururen', 'Erali'],
 ['Ei', 'Suzhali...'],
 ['Ei', 'Suzhali...'],
 ['Ei', 'Suzhali...'],
 ['Ei', 'Suzhali...']]

 similarity = 

[-1, 0, 0, 0, 3, -1, 0, 1, 1, 1, 1, 3, 2, 2, 2, -1, 3, 2, 2, 2, 0, 2, 
3, 3, 2, 2, 3, 1, -1, 3, -1, -1, -1, 1, -1, 0, -1, 1, 3, 0, 2, -1, 0, -1, 
0, 1, 2, 3, 3, 0, 2, -1, 3, 0, 0, 0, 3, 2, -1, -1, 2, 1, 2, 2, -1, 3, 3, 2, 
2, 3, 1, -1, 3, -1, -1, -1, 1, -1, 0, -1, 1, 3, 0, 2, -1, 0, -1, 2, 1, 3, 3, 
1, 0, 3, -1, 2, 3, 1, 3, 0, 3, 1, -1, 0, 3, 1, 1, 2, 2, 1, 1, 3, 3, -1, 2, 2, 
1, 2, 1, -1, 0, 1, 3, 2, 2, 3, 1, -1, 3, -1, -1, -1, 1, -1, 0, -1, 1, 3, 0, 2,
 -1, 0, 1, 1, 1, 1, 1, 1, 1, 1]

var svg = d3.select("#suzhali")
            .append('svg')
            .attr("width", 1200)
            .attr("height", 1100);
var k = 0
for(var i=0; i < lyrics.length; i ++)
{
   for (var j=0; j<lyrics[i].length; j++)
   {
   	
   	if(k==0)
   	{
    var offset = 20

    	svg.append('text')
   	               .attr('x', 500)
   	               .attr('y', 20)
   	               .text('Word similarity Index')


   		svg.append('rect')
   	               .attr('x', 500)
   	               .attr('y', 20+offset)
   	               .attr('width', 30 )
   	               .attr('height', 20)
   	               .attr('class', 'degree0')

   	    svg.append('text')
   	               .attr('x', 550)
   	               .attr('y', 35+offset)
   	               .text('Next word Highly Similar')

   	    	svg.append('rect')
   	               .attr('x', 500)
   	               .attr('y', 50+offset)
   	               .attr('width', 30 )
   	               .attr('height', 20)
   	               .attr('class', 'degree1')

   	    svg.append('text')
   	               .attr('x', 550)
   	               .attr('y', 65+offset)
   	               .text('Second Word from the current word Highly Similar')

   	    svg.append('rect')
   	               .attr('x', 500)
   	               .attr('y', 80+offset)
   	               .attr('width', 30 )
   	               .attr('height', 20)
   	               .attr('class', 'degree2')

   	    svg.append('text')
   	               .attr('x', 550)
   	               .attr('y', 95+offset)
   	               .text('Third Word from the current word Highly Similar')

   	    svg.append('rect')
   	               .attr('x', 500)
   	               .attr('y', 110+offset)
   	               .attr('width', 30 )
   	               .attr('height', 20)
   	               .attr('class', 'degree3')

   	    svg.append('text')
   	               .attr('x', 550)
   	               .attr('y', 125+offset)
   	               .text('Fourth Word from the current word Highly Similar')
   	}


   	 var rect = svg.append('rect')
   	               .attr('x', j*100+10)
   	               .attr('y', i*20+10)
   	               .attr('width', 0 )
   	               .attr('height', 18)
   	               .attr('class', function(){return getsimilarity(similarity[k])})

   	  var word = svg.append('text')
   	   .attr('x', j*100+10)
   	   .attr('y', i*20+20)
   	   .attr('dy', '0.37em')
   	   .text(lyrics[i][j])
   	   .style('font-size', '12px' )

   	                rect.transition()
                        .delay(k*1000)
                        .duration(1000)
                        .attr('width', 90)
                        

   	   k += 1
   }
}

function getsimilarity(item){
	if(item == -1)
	return 'zerodegrees'
	else 
	return 'degree'+item
}

