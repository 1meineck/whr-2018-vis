var selected_data = [];
var hover_text = [];
var table_data = [];

function select_data() {
	selected_data = [];
	hover_text = [];
    table_data = [];
    filter_data = d[0];
	for (i = 0; i < data_complete.length; i++) {
		current_data = data_complete[i];

		if (current_data.Dystopia <= axisLevels.Dystopia
			&& current_data.GDP <= axisLevels.GDP
			&& current_data.SocialSupport <= axisLevels.Social
			&& current_data.LifeExpectancy <= axisLevels.Life
			&& current_data.LifeChoices <= axisLevels.Freedom
			&& current_data.Generosity <= axisLevels.Generosity
			&& current_data.Corruption <= axisLevels.Corruption){
			selected_data.push(current_data);
			table_data.push([current_data.Country, current_data.HappinessScore]);
			/*hover_text.push('Happiness: ' + current_data.HappinessScore.toString()
				+ '<br>Dystopia: ' + current_data.Dystopia.toString()
				+ '<br>GDP per capital: ' + current_data.GDP.toString()
				+ '<br>Social Support: ' + current_data.SocialSupport.toString()
				+ '<br>Healthy life expectancy: ' + current_data.LifeExpectancy.toString()
				+ '<br>Freedom to make life choices: ' + current_data.LifeChoices.toString()
				+ '<br>Generosity: ' + current_data.Generosity.toString()
				+ '<br>Perceptions of corruption: ' + current_data.Corruption.toString());
				*/
		}
	}
	return selected_data;
}


function getColumn(str) {
	result = [];
	for (i = 0; i < selected_data.length; i++) {
		switch (str) {
			case "Country":
				result.push(selected_data[i].Country);
				break;
			case "HappinessScore":
				result.push(selected_data[i].HappinessScore);
				break;
			case "Dystopia":
				result.push(selected_data[i].Dystopia);
				break;
			case "GDP":
				result.push(selected_data[i].GDP);
				break;
			case "SocialSupport":
				result.push(selected_data[i].SocialSupport);
				break;
			case "LifeExpectancy":
				result.push(selected_data[i].LifeExpectancy);
				break;
			case "LifeChoices":
				result.push(selected_data[i].LifeChoices);
				break;
			case "Generosity":
				result.push(selected_data[i].Generosity);
				break;
			case "Corruption":
				result.push(selected_data[i].Corruption);
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

	for (var i = 0; i < selected_data.length; i++) {
		if (selected_data[i].Country == location) {
			happy = selected_data[i];
		}
	}

	return happy;


}

select_data();
getColumn("Corruption");


