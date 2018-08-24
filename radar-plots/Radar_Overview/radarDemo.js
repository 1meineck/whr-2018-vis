!function() {

    var operation = d3.select('body').append('div').append('h2');
 
    data = 
       [  
         {  
           "key":"Nokia Smartphone",
           "values":[  
             {  "axis":"Battery Life", "value":0.26 }, {  "axis":"Brand", "value":0.10 },
             {  "axis":"Contract Cost", "value":0.30 }, {  "axis":"Design And Quality", "value":0.14 },
             {  "axis":"Have Internet Connectivity", "value":0.22 }, {  "axis":"Large Screen", "value":0.04 },
             {  "axis":"Price Of Device", "value":0.41 }
             
           ]
         },
         {  
           "key":"Samsung",
           "values":[  
             {  "axis":"Battery Life", "value":0.27 }, {  "axis":"Brand", "value":0.16 },
             {  "axis":"Contract Cost", "value":0.35 }, {  "axis":"Design And Quality", "value":0.13 },
             {  "axis":"Have Internet Connectivity", "value":0.20 }, {  "axis":"Large Screen", "value":0.13 },
             {  "axis":"Price Of Device", "value":0.35 }
           ]
         },
         {  
           "key":"iPhone",
           "values":[  
             {  "axis":"Battery Life", "value":0.22 }, {  "axis":"Brand", "value":0.28 },
             {  "axis":"Contract Cost", "value":0.29 }, {  "axis":"Design And Quality", "value":0.17 },
             {  "axis":"Have Internet Connectivity", "value":0.22 }, {  "axis":"Large Screen", "value":0.02 },
             {  "axis":"Price Of Device", "value":0.21 }
           ]
         },
         {
           "key":"Test",
           "values":[
            {  "axis":"Battery Life", "value":0.25 }, {  "axis":"Brand", "value":0.18 },
            {  "axis":"Contract Cost", "value":0.19 }, {  "axis":"Design And Quality", "value":0.27 },
            {  "axis":"Have Internet Connectivity", "value":0.32 }, {  "axis":"Large Screen", "value":0.01 },
            {  "axis":"Price Of Device", "value":0.41 }
           ]
         },
         {
          "key":"IsThisAlsoYellow",
          "values":[
           {  "axis":"Battery Life", "value":0.25 }, {  "axis":"Brand", "value":0.18 },
           {  "axis":"Contract Cost", "value":0.10 }, {  "axis":"Design And Quality", "value":0.27 },
           {  "axis":"Have Internet Connectivity", "value":0.32 }, {  "axis":"Large Screen", "value":0.01 },
           {  "axis":"Price Of Device", "value":0.21 }
          ]
        }
       ];
      
       radarChart.data(data).update();
       radarChart.options({'legend': {display: true}});
       radarChart.options({'legend':{symbol:'circle'}})
       radarChart.update();
       
 }();