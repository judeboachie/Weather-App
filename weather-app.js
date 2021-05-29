//Script for weather app 

// DOM Elements
const input = document.getElementById('inputField');
const button = document.getElementById('button');
const loader = document.querySelector('.loader');
const errorDisplay = document.getElementById('errorDisplay');

const displayContainer = document.getElementById('displayContainer');
const regionDisplay = document.getElementById('regionDisplay');
const tempDisplay = document.getElementById('tempDisplay');
const windDisplay = document.getElementById('windDisplay');
const descriptionDisplay = document.getElementById('descriptionDisplay');
const forecastContainer = document.getElementById('forecastContainer');
const forecast1Display = document.getElementById('forecast1Display');
const forecast2Display = document.getElementById('forecast2Display');
const forecast3Display = document.getElementById('forecast3Display');


function getWeather(){
    loader.style.visibility = "visible";
    const location = input.value;
    fetch(`https://goweather.herokuapp.com/weather/${location}`)
    .then((data) => {
        return data.json();
    })
    .then((data => {
        console.log(data);
        
        let temp = data.temperature;
        let wind = data.wind;
        let desc = data.description;
        let forecast = data.forecast;

        console.log(location);
        console.log(parseInt(location));
        console.log(temp);
        console.log(wind);
        console.log(desc);
        console.log(forecast);
        console.log(forecast[0]);
        console.log(forecast[1]);
        console.log(forecast[2]);

        return data;
    }))
    .then((data =>{
        displayWeather(data);
    }))
    .catch((error) =>{
        console.log("Error. Something went wrong.");
        loader.style.visibility = "hidden";
        displayContainer.style.display = "none";
        errorDisplay.style.display = "block";
    })
}
    function displayWeather(data){  
        // This API actually has weather data for number entries (up to a certain point), but there's no documentation to actually explain why.
        // If the user enters a number          
        if(parseInt(input.value)){
            console.log(`Error. That's a number, not a place.`);
            loader.style.visibility = "hidden";
            displayContainer.style.display = "none";
            errorDisplay.style.display = "block";
        } 
        // If the user mispells the location name or enters some gibberish
        else if(data.temperature == ""){
            console.log(`Error. There doesn't seem to be any weather data for "${input.value}"`);
            loader.style.visibility = "hidden";
            displayContainer.style.display = "none";
            errorDisplay.style.display = "block";
        } 
        // Valid entry
        else if(data.temperature !== ""){
            loader.style.visibility = "hidden";;
            errorDisplay.style.display = "none";
            displayContainer.style.display = "block";

            regionDisplay.innerHTML = `Here is today's weather for ${input.value}`;
            tempDisplay.innerHTML = data.temperature;
            windDisplay.innerHTML = data.wind;
            descriptionDisplay.innerHTML = data.description;
            forecast1Display.innerHTML = `~~~ Tomorrow ~~~  <br> Temperature: ${data.forecast[0].temperature} <br> Wind: ${data.forecast[0].wind} <br>`;
            forecast2Display.innerHTML = `~~~ 2 Days from Now ~~~  <br> Temperature: ${data.forecast[1].temperature}  <br> Wind: ${data.forecast[1].wind} <br>`;
            forecast3Display.innerHTML = `~~~ 3 Days from Now ~~~  <br> Temperature: ${data.forecast[2].temperature} <br> Wind: ${data.forecast[2].wind} <br>`;
        }
    };