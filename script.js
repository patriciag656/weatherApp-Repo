
let weather = {
    'apiKey' : "ef1bd83351330db6cb3aacc4bb6210a3",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
        ).then((response) => {
            if(!response.ok) {
               document.querySelector(".error").style.visibility = "visible";
                
            }
            else{
                document.querySelector(".error").style.visibility = "hidden";
                
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
       
        const {name} = data; 
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main; 
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather In " + name;
        document.querySelector(".temp").innerText = Math.floor(temp) + "° F"; 
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerText = description; 
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + Math.floor(speed) + " mph";
        
        document.querySelector(".weather").classList.remove("loading"); 
        
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-box").value);
    }
};


document.querySelector(".search button").addEventListener('click', function(){
    weather.search(); 
});

document.querySelector(".search-box").addEventListener("keyup", function(event){
if(event.key === "Enter")
{
    weather.search(); 
}
})



weather.fetchWeather("Denver");

