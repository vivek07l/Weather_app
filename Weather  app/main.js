function weather_report(){
    // this will make the kolkata the default report in screen .
    if (check == 1){
        city_name = "kolkata";
    }
    // this will make sure that kolkata will not appear again in ther screen.
    else{
        city_name = document.getElementById('search-bar').value
    }
    
    var latitude;
    var longitude;
    // this will calculate the latitude and longitude according to the city name .
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`)
    .then(res => res.json())
    .then(data =>{
        latitude = data.coord.lat;
        longitude = data.coord.lon;
        // this will find the city and return its weather data in json
        fetch((`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`))
        .then(response => response.json())
        .then(data2 => {
            console.log(data2);
            // displaying the weather report according to the what user searches
           document.getElementById('temp').innerHTML= Math.round(data2.main.temp)+"\u00B0C";
           document.getElementById("title").innerHTML = `Weather of ${data2.name}`;
           document.getElementById("humidity").innerHTML = "humidity"+data2.main.humidity+"%";
           document.getElementById("wind-speed").innerHTML = `wind speed: ${data2.wind.speed}Km/h`;
           document.getElementById("weather-details").innerText = data2.weather[0].description;
           icons = `http://openweathermap.org/img/wn/${data2.weather[0].icon}@2x.png`;
        //    it will pass the src of icon to the img src
           $(".icon").attr("src",icons); 

        })
    })
    .catch(err =>{
            console.log(err)
            document.getElementById('title').fontsize="1rem"
            if(document.getElementById('title').innerHTML.length < 20){
                document.getElementById('title').innerHTML = `OPPS cant find the ${city_name}`
                document.getElementById('temp').innerHTML= "??";
                document.getElementById("humidity").innerHTML = "??";
                document.getElementById("wind-speed").innerHTML = `??`;
                document.getElementById("weather-details").innerText = "";
            }
            else{
                document.getElementById('title').innerHTML = `OPPS cant find what you're looking for`
                document.getElementById('temp').innerHTML= "??";
                document.getElementById("humidity").innerHTML = "??";
                document.getElementById("wind-speed").innerHTML = `??`;
                document.getElementById("weather-details").innerText = "";
            }
            

        })
    check = 2
    
}


var city_name;
// you can change the api key to your own(api key) if u want to try on your computer it will not work otherwise just making easy for you to check my project nothing personal.
API_key = "2d9c9de01e85aeba794738fd6837e32b";
var check = 1 
// this will call the weather report first time to the default value 
weather_report()

// this will for the search that the use do.
function city_value(){
    weather_report()

}
    
    
    
