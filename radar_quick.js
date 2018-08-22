Plotly.d3.csv('whr_data_vis.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }
    function get_text(rows) {
        return rows.map(function (row) { return 'Happiness: ' + (row['Happiness score']).toString() + '<br>Dystopia: ' + (row['Dystopia']).toString() + '<br>GDP per capital: ' + (row['GDP']).toString() + '<br>Social support: ' + (row['Social support']).toString() + '<br>Healthy life expectancy: ' + (row['Healthy life expectancy']).toString() + '<br>Freedom to make life choices: ' + (row['Freedom to make life choices']).toString() + '<br>Generosity: ' + (row['Generosity']).toString() + '<br>Perceptions of corruption: ' + (row['Perceptions of corruption']).toString(); });
    }

    trace2 = {
        type: 'scatterpolar',
        r: [3, 3, 3, 3, 3, 3],
        theta: ['A', 'B', 'C', 'D', 'E', 'A'],
        fill: 'toself',
        //xaxis: 'x2',
        //yaxis: 'y2', 
        name: 'Group A'

    };

    data = [trace2]; 

    layout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 3]
            }

        }
    };

    Plotly.plot('radar_quick', data, layout, { showLink: false }).then(gd => {
        gd.on('plotly_click', d => {
            var pt = (d.points || [])[0]
            // enter and update selection

            draw(data4)
            console.log(pt)

        });
    });

});
