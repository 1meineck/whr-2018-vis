var table =[];
var table_height = document.getElementById('table').clientHeight;
var table_width = document.getElementById('table').clientWidth;
console.log(table_width);
var layout_table = {
    autosize:false,
    height: table_height,
    width: table_width,
};
function update_table() {
    var countries = getColumn("Country");
    var happiness = getColumn("HappinessScore");


    var headerNames = ['Country', 'HappinessScore']
    var cellValues = [countries, happiness];

    var table = [{
        type: 'table',
        columnwidth: 500,
        columnorder: [0, 1],
        header: {
            values: headerNames,
            align: "center",
            line: { wtable_dataidth: 1, color: 'rgb(50, 50, 50)' },
            fill: { color: ['rgb(200, 0, 230)'] },
            font: { family: "Arial", size: 11, color: "white" },
            height: 32,
        },
        cells: {
            values: cellValues,
            align: ["center", "center"],
            line: { color: "black", width: 1 },
            font: { family: "Arial", size: 10, color: ["black"] },
            height: 32,
            width: 400,
        },
        xaxis: 'x',
        margin:{
            l: 5,
            r: 5,
            t:5, 
            b: 5,
        },
        autoexpand:true,
    }]

    Plotly.react('table', table, layout_table, { showLink: false, displayModeBar: false}); 
}
Plotly.plot('table', table, layout_table, { showLink: false, displayModeBar: false}); 
update_table();