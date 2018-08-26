!function() {

    var operation = d3.select('body').append('div').append('h2');
 
    data =  [ ];
           
    array0 ={    
      "Country": "No Country Selected",
      "HappinessScore": 0.0,
      "Dystopia": 0.0,
      "GDP": 0.0,
      "SocialSupport": 0.0,
      "LifeExpectancy": 0.0,
      "LifeChoices": 0.0,
      "Generosity": 0.0,
      "Corruption": 0.0
    }

  array1 = {
    "Country": "Finland",
    "HappinessScore": 7.632,
    "Dystopia": 2.595,
    "GDP": 1.305,
    "SocialSupport": 1.592,
    "LifeExpectancy": 0.874,
    "LifeChoices": 0.681,
    "Generosity": 0.192,
    "Corruption": 0.393
    
   }
  array2 = {
    "Country": "Norway",
    "HappinessScore": 7.594,
    "Dystopia": 2.383,
    "GDP": 1.456,
    "SocialSupport": 1.582,
    "LifeExpectancy": 0.861,
    "LifeChoices": 0.686,
    "Generosity": 0.286,
    "Corruption": 0.34
  }
  array3 = {
    "Country": "Fantasialand",
    "HappinessScore": 7.594,
    "Dystopia": 2.383,
    "GDP": 1.456,
    "SocialSupport": 1.582,
    "LifeExpectancy": 0.861,
    "LifeChoices": 0.686,
    "Generosity": 0.286,
    "Corruption": 0.34
  }
      
    
      //this should happen for setup for each chart
       radarChart.options({'legend': {display: true}});
       radarChart.options({'legend':{symbol:'triangle-down'}})
      //set stacking to true if multiple areas should be drawn
       radarChart.stacking(false).update()
       radarChart.addData(array0)
       
       
       
       
       
       //this is an example
       radarChart.addData(array1)
       radarChart.addData(array2)
       radarChart.addData(array3)



     
 
       //TODO:
       // MaxValue
       // No Percent
       // Set Colors
       // Add MaxNumber of Countries to add
       // No Double Countries
       // define add function within radar_chart code
       // add defining function on one chart vs. multiple

 }();