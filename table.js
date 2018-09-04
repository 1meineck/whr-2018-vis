function update_table() {
    table = document.querySelector('table tbody');

    //Remove content from table
    $("tbody#tbody tr").remove()
    //Convert rows to columns
    var r = current_table[0].map(function (col, i) {
        return current_table.map(function (row) {
            return row[i];
        });
    });

    //Add data to table
    r.forEach(function (e) {
        table.innerHTML += '<tr><td>' + e[0] + '</td><td>' + e[1] + '</td></tr>'
    })

}
update_table();

