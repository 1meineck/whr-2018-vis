// Code adapted from Matt Hermann at http://bl.ocks.org/mph006/9e11bdbfcaed13c7a2b7
//Options for the Radar chart, other than default

var cfg = {
    w: 500,
    h: 500,
    maxValue: 3.00,
    levels: 9,
   opacityArea: 0.50,
    radius:5,
    radians: 2 * Math.PI,
    factor:1,
    factorLegend: 0.85,
  ToRight: 5,
  TranslateX: 100,
   TranslateY:60,
   ExtraWidthX: 700,
   ExtraWidthY: 200,
   duration:200,
   
   // set colors for the 'Glyph' here
   lineColor: '#a6cee3',
   areaColor: '#a6cee3',
   dotColor: '#a6cee3'
};

// variables to use for filtering data
var axisLevels = {
 Dystopia: 3,
 Corruption: 3,
 Generosity: 3,
 Freedom: 3,
 Life: 3,
 Social: 3,
 GDP: 3
}

function init(){
  cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.skills.map(function(o){return o.value;}));}));
  var allAxis = (d[0].skills.map(function(i, j){return i.axis;}));
  var total = allAxis.length;
  var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
  d3.select("#chart").select("svg").remove();
  
  var g = d3.select("#chart")
              .append("svg")
              .attr("width", cfg.w+cfg.ExtraWidthX)
              .attr("height", cfg.h+cfg.ExtraWidthY)
            .append("g")
              .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")")
                .attr("id","chartArea");
  
  for(var j=0; j<cfg.levels; j++){

    var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);

    //Web
      g.selectAll(".levels")
             .data(allAxis)
             .enter()
             .append("svg:line")
             .attr("x1", function(d, i){
                 return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
             .attr("y1", function(d, i){
                 return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
             .attr("x2", function(d, i){
                 return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
             .attr("y2", function(d, i){
                 return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
             .attr("class", "web")
             .style("stroke", "grey")
             .style("stroke-opacity", "0.75")
             .style("stroke-width", "0.3px")
             .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");

      //Text labels along 12 0'clock axis [1-10]
      g.selectAll(".levels")
          .data([1]) //dummy data
             .enter()
             .append("svg:text")
             .attr("x", function(d){
                 return levelFactor*(1-cfg.factor*Math.sin(0));})
             .attr("y", function(d){
                 return levelFactor*(1-cfg.factor*Math.cos(0));})
             .attr("class", "skill-value")
             .style("font-family", "sans-serif")
             .style("font-size", "10px")
             .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
             .attr("fill", "#737373")
             .text(((j+1)*cfg.maxValue/cfg.levels).toFixed(2));
  }
  
  series = 0;
  var maxAxisValues = [];
    function drawAxis(){

      var axis = g.selectAll(".axis")
                    .data(allAxis)
                    .enter()
                  .append("g")
                    .attr("class", "axis")
                    .attr("id",function(d){return d;});

        //Axis lines
      axis.append("line")
            .attr("x1", cfg.w/2)
            .attr("y1", cfg.h/2)
            .attr("x2", function(j, i){
              maxAxisValues[i] = {x:cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total)), y:0};
              return maxAxisValues[i].x;
            })
            .attr("y2", function(j, i){
              maxAxisValues[i].y = cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));
              return maxAxisValues[i].y;
            })
            .attr("class", "line").style("stroke", "grey").style("stroke-width", "1px");

      //Axis labels
      axis.append("text")
          .attr("class", "skill-legend")
          .text(function(d){return d;})
          .style("font-family", "sans-serif")
          .style("font-size", "11px")
          .style("cursor","pointer")
          .attr("text-anchor", "middle")
          .attr("dy", "1.5em")
          .attr("transform", function(d, i){return "translate(0, -10)";})
          .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-80*Math.sin(i*cfg.radians/total);})
          .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
  }

drawAxis();
initPolygon();

   //Fill Areas
  function initPolygon(){
    
        d.forEach(function(y, x){
          dataValues = [];
              
              g.selectAll(".nodes")
                .data(y.skills, function(j, i){
                      dataValues.push([
                    cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                    cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                  ]);
            });
          
          dataValues.push(dataValues[0]);
          
          g.selectAll(".area")
             .data([dataValues])
             .enter()
             .append("polygon")
             .attr("class", "radar-chart-series"+series)
             .attr("id","radar-chart-area-"+y.name.replace(" ","-"))
             .style("stroke-width", "2px")
             .style("stroke", y.color)
             .attr("points",function(d) {
                 var str="";
                 for(var pti=0;pti<d.length;pti++){
                     str=str+d[pti][0]+","+d[pti][1]+" ";
                 }
                 return str;
              })
             .style("fill", function(j, i){return y.color;})
             .style("fill-opacity", cfg.opacityArea);

          series++;

        });
    }

  series=0;


  var drag = d3.behavior.drag()
            .on("drag",move)
            .on("dragend",dragend);

  function dragend(){
  }


  function move(dobj, i){
      this.parentNode.appendChild(this);
      var dragTarget = d3.select(this);
      
      var oldData = dragTarget.data()[0];
      var oldX = parseFloat(dragTarget.attr("cx")) - cfg.w/2;
      var oldY = cfg.h/2 - parseFloat(dragTarget.attr("cy"));
      var point_name = dragTarget.axis

     var minvalue = false
     var maxvalue = false

     // console.log(point_name)
      //Bug for vector @ 270deg -Infinity/Infinity slope
      oldX=(Math.abs(oldX)<0.0000001)?0:oldX;
      oldY=(Math.abs(oldY)<0.0000001)?0:oldY;

      var newY = 0, newX = 0, newValue = 0;
      var maxX = maxAxisValues[i].x - cfg.w/2;
      var maxY = cfg.h/2 - maxAxisValues[i].y;

      if(oldX === 0) {

        newY = oldY - d3.event.dy;
       
          if(Math.abs(newY) > Math.abs(maxY)) {
            newY = maxY;
          }
          newValue = ((newY/oldY) * oldData.value);
      }
      else {
          var slope = oldY / oldX;
          
          newX = d3.event.dx + parseFloat(dragTarget.attr("cx")) - cfg.w/2;
          
          if(Math.abs(newX) > Math.abs(maxX)) {
            newX = maxX;
          }
          newY = newX * slope;

          var ratio = newX / oldX;
          newValue = (ratio * oldData.value);
          
      }
     
      //Bound the drag behavior to the max and min of the axis, not by pixels but by value calc (easier)
      if(newValue >=0.0000001 && newValue<= cfg.levels){
        minvalue = false
        maxvalue = false

        dragTarget
              .attr("cx", function(){return newX + cfg.w/2 ;})
              .attr("cy", function(){return cfg.h/2 - newY;});

        //Updating the data set with the new value
        (dragTarget.data()[0]).value = newValue;

        //center display for value
        d3.select(".updatevalue.skill").text((dragTarget.data()[0]).axis)
                                        .style("display","block")
                                        .style("font-size","12px")
                                        .style("text-align","center")
                                        .style("margin","20px 0 5px 0");
                               

        d3.select(".updatevalue.value").text(newValue)
                                      .style("display","block")
                                      .style("text-align","center")
                                      .style("visibility","visible");
        updatePoly();

      }
      //Release the drag listener on the node if you hit the min/max values
      //https://github.com/mbostock/d3/wiki/Drag-Behavior

      else{
          if(newValue <=0){newValue =0; maxvalue = false, minvalue = true, console.log('minValue')}
          else if(newValue >=cfg.levels){newValue = cfg.levels; maxvalue = true, minvalue = false, console.log('maxValue')}
          dragTarget.on("drag",null);       
       }
        var axisName = (dragTarget.data()[0]).axis
        var axisValue = 0
        
        if (maxvalue){axisValue = 3.00}
        else if (minvalue){axisValue = 0.00}
        else{axisValue = (dragTarget.data()[0]).value.toFixed(2)}

        if (axisName.includes('Dystopia')){
          axisLevels.Dystopia = axisValue
        }
        else if (axisName.includes('GDP')){
          axisLevels.GDP = axisValue
        }
        else if (axisName.includes('Corruption')){
          axisLevels.Corruption = axisValue
        }
        else if (axisName.includes('Generosity')){
          axisLevels.Generosity = axisValue
        }
        else if (axisName.includes('Freedom')){
          axisLevels.Freedom = axisValue
        }
        else if (axisName.includes('Life')){
          axisLevels.Life = axisValue
        }
        else if (axisName.includes('Social')){
          axisLevels.Social = axisValue
        } 
        console.log("Dystopia ", axisLevels.Dystopia, "GDP ", axisLevels.GDP, 'Corruption ', axisLevels.Corruption, 'Generosity ', axisLevels.Generosity, 'Freedom ', axisLevels.Freedom, 'Life', axisLevels.Life, 'Social', axisLevels.Social)
        
        
        //TODO: Data Update here
  }

function updatePoly(){
  d.forEach(function(y, x){
          dataValues = [];
              
              g.selectAll(".nodes")
                .data(y.skills, function(j, i){
                      dataValues.push([
                    cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
                    cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total)),
                  ]);        
            });  

            dataValues = [dataValues];
          g.selectAll("#radar-chart-area-Data-Set")
             .data(dataValues)
             .attr("points",function(d) {
                 //console.log(d);
                 var str="";
                 for(var pti=0;pti<d.length;pti++){
                     str=str+d[pti][0]+","+d[pti][1]+" ";
                 }
                 return str;
              });
        });
}

//Put circles on the polygon at inflection points
  d.forEach(function(y, x){
    g.selectAll(".nodes")
      .data(y.skills).enter()
      .append("svg:circle")
      .attr("class", "radar-chart-series"+series)
      .attr("id","radar-chart-points-"+y.name.replace(" ","-"))
      .attr('r', cfg.radius)
      .attr("alt", function(j){return Math.max(j.value, 0);})
      .attr("cx", function(j, i){
        dataValues.push([
          cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
          cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
      ]);
      return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
      })
      .attr("cy", function(j, i){
        return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
      })
      .attr("data-id", function(j){return j.axis;})
      .style("fill", y.color)
      .style("fill-opacity", 0.99)
  .style("z-index",12)
  .style("cursor","pointer")
      .call(drag);

    series++;
  });
}//end init()
init();
