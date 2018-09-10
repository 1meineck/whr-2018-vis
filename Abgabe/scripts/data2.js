var selected_choropleth = [];
var deselected_choropleth = [];
var hover_text = [];
var selected_table = [[],[]];
var deselected_table = [[],[]];

var current_choropleth = []; 
var current_table = [[],[]];

var selection = true;

function select_data() {
	selected_choropleth = [];
	deselected_choropleth = [];
	selected_table = [[],[]];
	deselected_table =[[],[]];
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
				selected_table[0].push(current_data.Country);
				selected_table[1].push(current_data.HappinessScore);
			} else{
				deselected_choropleth.push(current_data);
				deselected_table[0].push(current_data.Country);
				deselected_table[1].push(current_data.HappinessScore);
		}
	}
	set_data_to_selection();
	
}

function set_data_to_selection(){
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

select_data();
getColumn("Corruption");


