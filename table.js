var table =[];
var layout_table = {};
function update_table() {
    var countries = getColumn("Country");
    var happiness = getColumn("HappinessScore");


    var headerNames = ['Country', 'HappinessScore']
    var cellValues = [countries, happiness];

    var table = [{
        type: 'table',
        columnwidth: [400, 300],
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
    }]

    Plotly.react('table', table, layout_table, { showLink: false, displayModeBar: false}); 
}
Plotly.plot('table', table, layout_table, { showLink: false, displayModeBar: false}); 
update_table();