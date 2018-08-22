Plotly.d3.csv('whr_data_vis.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    function get_text(rows) {
        return rows.map(function (row) { return 'Happiness: ' + (row['Happiness score']).toString() + '<br>Dystopia: ' + (row['Dystopia']).toString() + '<br>GDP per capital: ' + (row['GDP']).toString() + '<br>Social support: ' + (row['Social support']).toString() + '<br>Healthy life expectancy: ' + (row['Healthy life expectancy']).toString() + '<br>Freedom to make life choices: ' + (row['Freedom to make life choices']).toString() + '<br>Generosity: ' + (row['Generosity']).toString() + '<br>Perceptions of corruption: ' + (row['Perceptions of corruption']).toString(); });
    }
my_text = get_text(rows);
trace1 = {
    type: 'choropleth',
    locationmode: 'country names',
    locations: unpack(rows, 'Country'),
    z: unpack(rows, 'Happiness score'),
    text: my_text,
    hoverinfo: 'text+location',
    autocolorscale: true,

    };
data=[trace1];
layout = {
    title: 'World Happiness Report 2018',
    geo: { 
        projection: {
        type: 'equirectangular'
        }
    }
};

Plotly.plot('choropleth', data, layout, { showLink: false }).then(gd => {
    gd.on('plotly_click', d => {
        var pt = (d.points || [])[0]
        // enter and update selection
        console.log(pt)

    });
});
});