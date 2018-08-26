!function() {

    var operation = d3.select('body').append('div').append('h2');
 
    data =  [   ];
      
    
       radarChart.data(data).update();
       radarChart.options({'legend': {display: true}});
       radarChart.options({'legend':{symbol:'circle'}})
       

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

       function addData(array){  
        new_set={
          "key":array.Country,
          "values":[
           {  "axis":"Dystopia", "value":array.Dystopia},
           {  "axis":"GDP", "value":array.GDP }, {  "axis":"SocialSupport", "value":array.SocialSupport},
           {  "axis":"LifeExpectancy", "value":array.LifeExpectancy }, {  "axis":"LifeChoices", "value":array.LifeChoices },
           {  "axis":"Generosity", "value":array.Generosity },{axis:"Corruption", value: array.Corruption},
          ]
        }
        data.push(new_set)  
       }

       addData(array1);
       addData(array2);
       radarChart.data(data).update();
 
       //TODO:
       // MaxValue
       // No Percent
       // Set Colors
       // Add MaxNumber of Countries to add
       // No Double Countries
       // define add function within radar_chart code
       // add defining function on one chart vs. multiple

 }();