var label = ['Dystopia',
    'GDP',
    'Social Support',
    'Life Expectancy',
    'Life Choices',
    'Generosity',
    'Corruption']

// Create Data -> call function before calling Plotly.react to update data
function create_data() {
    var countries = getColumn("Country");
    var happiness = getColumn("HappinessScore");


    var headerNames = ['Country', 'HappinessScore']
    var cellValues = [countries, happiness];

    var table = {
        type: 'table',
        columnwidth: [200, 100],
        columnorder: [0, 1],
        header: {
            values: headerNames,
            align: "center",
            line: { wtable_dataidth: 1, color: 'rgb(50, 50, 50)' },
            fill: { color: ['rgb(235, 100, 230)'] },
            font: { family: "Arial", size: 11, color: "white" }
        },
        cells: {
            values: cellValues,
            align: ["center", "center"],
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 10, color: ["black"] }
        },
        xaxis: 'x',
        domain: { x: [0, 0.2] }
    }

    my_text = hover_text;
    trace1 = {
        type: 'choropleth',
        mode: 'markers',
        locationmode: 'country names',
        locations: countries,
        z: happiness,
        text: my_text,
        hoverinfo: 'text+location',
        autocolorscale: true,
        xaxis: 'x',
        colorbar: {
            x: 1,
        },
        domain: { x: [0.2, 0.8] }

    };

    trace2 = {
        type: 'scatterpolar',
        r: [happy.Dystopia, happy.GDP, happy.SocialSupport, happy.LifeExpectancy, happy.LifeChoices, happy.Generosity, happy.Corruption],
        theta: label,
        fill: 'toself',
        name: happy.Country,
        text: happy.HappinessScore,
        textposition: 'top',


    };

    data = [table, trace1, trace2];

}
create_data();
layout = {
    title: 'World Happiness Report 2018',
    geo: {
        projection: {
            type: 'equirectangular'
        },

    },
    table: {

    },
    polar: {
        domain: {
            x: [0.8, 0.95],
            y: [0, 1]
        },
        radialaxis: {
            visible: true,
            range: [0, 3],
            angle: 90,
        }

    }

};

Plotly.plot('choropleth', data, layout, { showLink: false }).then(gd => {
    gd.on('plotly_click', d => {
        var pt = (d.points || [])[0]
        // enter and update selection

        happy = getHappiness(pt.location);

        if (radar_selection.length <= 4) {
            console.log(radar_selection.includes(happy));
            radar_selection.push(happy);
        }
        create_data();
        create_radar(radar_selection);
        Plotly.react('choropleth', data, layout, { showLink: false });
        Plotly.react('radar', radar, layout, { showLink: false });

    }

    );
});
radar_selection = []
function create_radar(data) {
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
create_radar(radarData);
Plotly.plot('radar', radar, layout, { showLink: false }).then(gd => {
    gd.on('plotly_click', d => {
        var pt = (d.points || [])[0];
    })
})