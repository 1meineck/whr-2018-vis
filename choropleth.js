var label = ['Dystopia',
    'GDP',
    'Social Support',
    'Life Expectancy',
    'Life Choices',
    'Generosity',
    'Corruption'];

var layout_choropleth = {
        geo: {
            projection: {
                type: 'equirectangular'
            },
    
        },
    
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
        text: my_text,
        hoverinfo: 'z+location',
        autocolorscale: true,
        xaxis: 'x',
        colorbar: {
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

        if (radar_selection.length <= 4) {
            console.log(radar_selection.includes(happy));
            radar_selection.push(happy);
        }
        update_choropleth();
        update_radar(radar_selection);
        Plotly.react('choropleth', data_choropleth, layout_choropleth, { showLink: false, displayModeBar: false});
        Plotly.react('radar', radar, layout_choropleth, { showLink: false, displayModeBar: false});

    }

    );
});
update_choropleth();


radar_selection = []
function update_radar(data) {
    radar = [];
    if (radar_selection.length == 0) {
        radarData = {
            type: 'scatterpolar',
            theta: label,
            r: [0, 0, 0, 0, 0, 0, 0]
        }
        radar.push(radarData);
    }

    for (i = 0; i < data.length; i++) {
        radarData = {
            type: 'scatterpolar',
            r: [data[i].Dystopia, data[i].GDP, data[i].SocialSupport, data[i].LifeExpectancy, data[i].LifeChoices, data[i].Generosity, data[i].Corruption],
            theta: label,
            fill: 'toself',
            name: data[i].Country,

        };
        radar.push(radarData);
    }


}
radar_empty = [['', 0.0], [0, 0, 0, 0, 0, 0, 0]];
radarData = [radar_empty, radar_empty, radar_empty, radar_empty]
update_radar(radarData);
Plotly.plot('radar', radar, layout_choropleth, { showLink: false }).then(gd => {
    gd.on('plotly_click', d => {
        var pt = (d.points || [])[0];
    })
})