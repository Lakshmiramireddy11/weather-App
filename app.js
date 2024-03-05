const container = document.querySelector('.container');
const input_box = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_image = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location-not-found')
const weather_body=document.querySelector('.weather-body')

async function checkWeather(city){
      const apiKey='de81c9c463f0578c6e674dc9fd893da8';
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      let weather_info=await fetch(url)
      .then((response)=>{
           return response.json();
      })
      .catch((error)=>{
        console.log("Error in fetching data")
      })
      console.log(weather_info);
      if(weather_info.cod==404){
            location_not_found.style.display='flex'
            weather_body.style.display='none'
            return;
      }
      location_not_found.style.display='none'
      weather_body.style.display='flex'
      temperature.innerHTML=`${Math.round(weather_info.main.temp-273.15)}°C`
      description.innerHTML=`${weather_info.weather[0].description}`
      humidity.innerHTML=`${weather_info.main.humidity}%`
      wind_speed.innerHTML=`${weather_info.wind.speed}km/H`;

      switch(weather_info.weather[0].main){
        case 'Clouds':
            weather_image.src = 'cloud.jpeg';
            break;
        case 'Clear':
            weather_image.src = 'clear.jpeg';
            break;
        case 'Mist':
            weather_image.src = 'mist.jpeg';
            break;  
        case 'Rain':
            weather_image.src = 'rain.jpeg';
            break;   
        case 'Snow':
            weather_image.src = 'snow.jpeg';
            break;
    }
    

}     


searchBtn.addEventListener(('click'),()=>{
    checkWeather(input_box.value);

});

