var selected_choropleth = [];
var deselected_choropleth = [];
var hover_text = [];
var selected_table = [];
var deselected_table = [];

var current_choropleth = []; 
var current_table = [];

var selection = true;

function select_data() {
	selected_choropleth = [];
	deselected_choropleth = [];
	selected_table = [];
	deselected_table =[];
	hover_text = [];

	for (i = 0; i < data_complete.length; i++) {
		current_data = data_complete[i];
			if (current_data.Dystopia <= axisLevels.Dystopia
				&& current_data.GDP <= axisLevels.GDP
				&& current_data.SocialSupport <= axisLevels.Social
				&& current_data.LifeExpectancy <= axisLevels.Life
				&& current_data.LifeChoices <= axisLevels.Freedom
				&& current_data.Generosity <= axisLevels.Generosity
				&& current_data.Corruption <= axisLevels.Corruption){
				selected_choropleth.push(current_data);
				selected_table.push([current_data.Country, current_data.HappinessScore]);
				/*hover_text.push('Happiness: ' + current_data.HappinessScore.toString()
					+ '<br>Dystopia: ' + current_data.Dystopia.toString()
					+ '<br>GDP per capital: ' + current_data.GDP.toString()
					+ '<br>Social Support: ' + current_data.SocialSupport.toString()
					+ '<br>Healthy life expectancy: ' + current_data.LifeExpectancy.toString()
					+ '<br>Freedom to make life choices: ' + current_data.LifeChoices.toString()
					+ '<br>Generosity: ' + current_data.Generosity.toString()
					+ '<br>Perceptions of corruption: ' + current_data.Corruption.toString());
					*/
					console.log(selected_choropleth);
			} else{
				deselected_choropleth.push(current_data);
				deselected_table.push([current_data.Country, current_data.HappinessScore]);
	}
	}

	if (selection){
		current_choropleth = selected_choropleth;
		current_table = selected_table;

	}
	else{
		current_choropleth = deselected_choropleth;
		current_table = deselected_table;

	}
}


function getColumn(str) {
	result = [];
	for (i = 0; i < current_choropleth.length; i++) {
		switch (str) {
			case "Country":
				result.push(current_choropleth[i].Country);
				break;
			case "HappinessScore":
				result.push(current_choropleth[i].HappinessScore);
				break;
			case "Dystopia":
				result.push(current_choropleth[i].Dystopia);
				break;
			case "GDP":
				result.push(current_choropleth[i].GDP);
				break;
			case "SocialSupport":
				result.push(current_choropleth[i].SocialSupport);
				break;
			case "LifeExpectancy":
				result.push(current_choropleth[i].LifeExpectancy);
				break;
			case "LifeChoices":
				result.push(current_choropleth[i].LifeChoices);
				break;
			case "Generosity":
				result.push(current_choropleth[i].Generosity);
				break;
			case "Corruption":
				result.push(current_choropleth[i].Corruption);
				break;
			default:
				console.log("Error in fetching data")
		}
	}
	return result;

}
var happy = [];
function getHappiness(location) {
	happy = [];

	for (var i = 0; i < current_choropleth.length; i++) {
		if (current_choropleth[i].Country == location) {
			happy = current_choropleth[i];
		}
	}

	return happy;


}
console.log(selected_choropleth);
console.log(deselected_choropleth);
select_data();
getColumn("Corruption");


