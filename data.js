var selected_data = [];
var hover_text = [];
var table_data = [];

function select_data() {
	filter_data = d[0];
	selected_data = [];
	hover_text = [];
	table_data = [];
	for (i = 0; i < data_complete.length; i++) {
		current_data = data_complete[i];

		if (current_data.Dystopia <= filter_data.skills[0].value
			&& current_data.GDP <= filter_data.skills[1].value
			&& current_data.SocialSupport <= filter_data.skills[2].value
			&& current_data.LifeExpectancy <= filter_data.skills[3].value
			&& current_data.LifeChoices <= filter_data.skills[4].value
			&& current_data.Generosity <= filter_data.skills[5].value
			&& current_data.Corruption <= filter_data.skills[6].value) {
			selected_data.push(current_data);
			table_data.push([current_data.Country, current_data.HappinessScore]);
			hover_text.push('Happiness: ' + current_data.HappinessScore.toString()
				+ '<br>Dystopia: ' + current_data.Dystopia.toString()
				+ '<br>GDP per capital: ' + current_data.GDP.toString()
				+ '<br>Social Support: ' + current_data.SocialSupport.toString()
				+ '<br>Healthy life expectancy: ' + current_data.LifeExpectancy.toString()
				+ '<br>Freedom to make life choices: ' + current_data.LifeChoices.toString()
				+ '<br>Generosity: ' + current_data.Generosity.toString()
				+ '<br>Perceptions of corruption: ' + current_data.Corruption.toString());
		}
	}
	return selected_data;
}

var d = [

	{
		name: "Data Set",
		color: '#a6cee3',
		skills: [
			{ axis: "Dystopia", value: 3.00 },
			{ axis: "GDP", value: 3.00 },
			{ axis: "Social Support", value: 3.00 },
			{ axis: "Life Expectancy", value: 3.00 },
			{ axis: "Freedom", value: 3.00 },
			{ axis: "Generosity", value: 3.00 },
			{ axis: "Corruption", value: 3.0 },
		],
	}
];

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


