var label = ['Dystopia',
    'GDP',
    'Social Support',
    'Life Expectancy',
    'Life Choices',
    'Generosity',
    'Corruption'];

var layout_choropleth = {
            projection: {
                type: 'equirectangular'
            },    
        width: document.getElementById('choropleth').clientWidth,
        xaxis: {
            linecolor: 'black',
            linewidth: 2,
            mirror: true
          },
          yaxis: {
            linecolor: 'black',
            linewidth: 2,
            mirror: true
          },
          // fill out div
          margin:{
            l: 20,
            r: 20,
            t:20, 
            b: 20,
        },
        showframe: true,
        autoexpand: true,    
    };

var data_choropleth = [];

// Create Data -> call function before calling Plotly.react to update data
function update_choropleth() {
    var countries = getColumn("Country");
    var happiness = getColumn("HappinessScore");

    my_text = hover_text;
    data_choropleth = [{
        type: 'choropleth',
        mode: 'markers',
        locationmode: 'country names',
        locations: countries,
        z: happiness,
        zmin: 2.5, 
        zmax: 8,
        text: my_text,
        hoverinfo: 'z+location',
        xaxis: 'x',
        colorscale: 'YlGnBu',
        colorbar: {
            lenmode: 'pixel',
            len: layout_choropleth.height,
            x: 1,
        },        
    }];
    Plotly.react('choropleth', data_choropleth, layout_choropleth, { showLink: false, displayModeBar: false});

}

Plotly.plot('choropleth', data_choropleth, layout_choropleth, { showLink: false, displayModeBar: false}).then(gd => {
    gd.on('plotly_click', d => {
        var pt = (d.points || [])[0]
        // enter and update selection

        happy = getHappiness(pt.location);
        radarChart.addData(happy);

    }

    );
});
update_choropleth();
