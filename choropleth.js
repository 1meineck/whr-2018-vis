Plotly.d3.csv('whr_data_vis.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }
    function get_text(rows) {
        texts = rows.map(function (row) {
            if (row['Dystopia'] <= dystopia 
            && row['GDP'] <= gdp 
            && row['SocialSupport'] <= social
            && row['LifeExpectancy'] <= lifeExp
            && row['LifeChoices'] <= lifeChoices
            && row['Generosity'] <= generosity
            && row['Corruption'] <= corruption) 
            { return 'Happiness: ' + (row['HappinessScore']).toString() 
                + '<br>Dystopia: ' + (row['Dystopia']).toString() 
                + '<br>GDP per capital: ' + (row['GDP']).toString() 
                + '<br>Social Support: ' + (row['SocialSupport']).toString() 
                + '<br>Healthy life expectancy: ' + (row['LifeExpectancy']).toString() 
                + '<br>Freedom to make life choices: ' + (row['LifeChoices']).toString() 
                + '<br>Generosity: ' + (row['Generosity']).toString() 
                + '<br>Perceptions of corruption: ' + (row['Corruption']).toString(); }
            else {
                return 0;
            }
        });
        return texts.filter(check_selected);

    }
    function get_happiness(rows, value){

        var result = rows.find(obj => {
            return obj.Country === value;
          })
          return [[result.Country, result.HappinessScore],[result.Dystopia, result.GDP, result.SocialSupport, result.LifeExpectancy, result.LifeChoices, result.Generosity, result.Corruption]];
    }
    function unpack_selected(rows, key) {
        values = rows.map(function (row) {
            if (row['Dystopia'] <= dystopia 
            && row['GDP'] <= gdp 
            && row['SocialSupport'] <= social
            && row['LifeExpectancy'] <= lifeExp
            && row['LifeChoices'] <= lifeChoices
            && row['Generosity'] <= generosity
            && row['Corruption'] <= corruption) {
                return row[key];
            }
            else {
                return 0;
            }
        })
        return values.filter(check_selected);
    }
    function check_selected(n) {
        return n != 0;
    }

    var happy = [['select country', 0.0],[0.0,0.0,0.0,0.0,0.0,0.0,0.0]];
    var dystopia = 1.0;
    var gdp =3.0;
    var social = 3.0;
    var lifeExp = 3.0; 
    var lifeChoices = 3.0; 
    var generosity = 3.0; 
    var corruption = 3.0;

    var label = ['Dystopia', 
    'GDP', 
    'Social Support', 
    'Life Expectancy', 
    'Life Choices', 
    'Generosity', 
    'Corruption']

    // Create Data -> call function before calling Plotly.react to update data
    function create_data() {
        var headerNames = ['Country', 'HappinessScore']

        var headerValues = [];
        var cellValues = [];
        for (i = 0; i < headerNames.length; i++) {
            headerValue = [headerNames[i]];
            headerValues[i] = headerValue;
            cellValue = unpack_selected(rows, headerNames[i]);
            cellValues[i] = cellValue;
        }

        // clean date
        for (i = 0; i < cellValues[1].length; i++) {
            var dateValue = cellValues[1][i].split(' ')[0]
            cellValues[1][i] = dateValue
        }


        var table = {
            type: 'table',
            columnwidth: [200, 100],
            columnorder: [0, 1],
            header: {
                values: headerValues,
                align: "center",
                line: { width: 1, color: 'rgb(50, 50, 50)' },
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

        my_text = get_text(rows);
        trace1 = {
            type: 'choropleth',
            mode: 'markers',
            locationmode: 'country names',
            locations: unpack_selected(rows, 'Country'),
            z: unpack_selected(rows, 'HappinessScore'),
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
            r: happy[1], 
            theta: label,
            fill: 'toself', 
            name: happy[0][1],
            text: happy[0][0],
            textposition: 'top',

            
        }

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

            happy = get_happiness(rows, pt.location);
            console.log(happy);
            create_data();
            Plotly.react('choropleth', data, layout,{showLink:false})

            }

        );
    });
});