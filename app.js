// get elements
const access = document.querySelector('#access-denied');
const accessMessage = document.querySelector('#access-denied > p')
const weatherIcon =document.querySelector('#weather-icon');
const tempValue = document.querySelector('#temp-value');
const tempDescription = document.querySelector('#temp-description');
const Location = document.querySelector('#location');
const humidity = document.querySelector('#humidity')

const weather = {};
weather.temp = {
 unit: 'celsius'};

 const kelvin = 273;
 const key = "82005d27a116c2880c8f0fcb866998a0";

 function showYourLocationAndWeather(){
  if (navigator.geolocation){
   navigator.geolocation.getCurrentPosition((position) =>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude
    showYourWeather(latitude,longitude)    
   }, error =>{
   access.classList.remove('hidden');
   access.classList.add('block') 
   accessMessage.innerHTML = `${error.message}`
   console.log(`${error.message}`)
   })
  }else{
   access.classList.remove('hidden');
   access.classList.add('block')  
   accessMessage.innerHTML = `Browser does not support geolocation`
   
  }
 }
  
// GET API resource for your location
async function showYourWeather(latitude,longitude) {
 let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
 
 try{
  const response = await fetch(api)
   if(response.status !== 200 || !response.ok){
   throw new Error('cannot get response, Invalid coordinates')
 } 
  const data = await response.json();
  displayWeather(data)
   
 } catch (error) {
  access.classList.remove('hidden');
  access.classList.add('block') 
  accessMessage.innerHTML = `${error.message}`;
  console.log(`${error.message}`)  
 }
}

// Function to fetch weather data by city
async function getWeatherByCity(city) {
  const key = '82005d27a116c2880c8f0fcb866998a0';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById('weatherOutput').textContent = `Error: ${error.message}`;
    console.error('error', error.message)
  }
 }

 // Function to fetch weather data by coordinates
async function getWeatherByCoordinates(lat, lon) {
  const key = '82005d27a116c2880c8f0fcb866998a0'; 
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  
  try {
    const response = await fetch(url);  
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById('weatherOutput').textContent = `Error: ${error.message}`;
 } }

//Display results 
function displayWeather(data) {
weather.temp.value = Math.floor(data.main.temp - kelvin);
   weather.description = data.weather[0].description;
   weather.city = data.name;
   weather.iconId = data.weather[0].icon ;
   weather.country = data.sys.country;  
   weather.humidity = data.main.humidity 
 weatherIcon.src = `icons/${weather.iconId}.png`;
 weatherIcon.classList.remove('blur-[2px]')
 tempValue.innerHTML = `${weather.temp.value}&deg<span class="text-[0.5em]">C</span>`;
tempDescription.innerHTML = `${weather.description}`;
Location.innerHTML = `${weather.city}, ${weather.country}`;
humidity.innerHTML = `${weather.humidity}%`  ;
let outputText = [tempDescription,tempValue,Location, humidity];
 outputText.forEach( output =>{
 output.classList.replace('text-gray-600','text-blue-600')
 })
}

// Celsius to fahrenheit converter function
function fahrenheitConverter(celsius){
let fahrenheit = (9/5 * celsius) + 32
return Math.floor(fahrenheit)
}
tempValue.addEventListener('click', () => {
 if (weather.temp.value === undefined){
   return
 }
 if (weather.temp.unit == 'celsius'){
  let fahrenheit = fahrenheitConverter(weather.temp.value)
  console.log(fahrenheit)
  tempValue.innerHTML = `${fahrenheit}&deg<span class="text-[0.5em]">F</span>`
  weather.temp.unit = 'fahrenheit'
 }
  else{
    weather.temp.unit = 'celsius'
    tempValue.innerHTML = `${weather.temp.value}&deg<span class="text-[0.5em]">C</span>`;    
  }
})

document.getElementById('yourLocationButton').addEventListener('click', showYourLocationAndWeather
)
document.getElementById('getWeatherByDetails').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  const lat = document.getElementById('latitude').value.trim();
  const lon = document.getElementById('longitude').value.trim();
 
  if (city) {
    getWeatherByCity(city);
  } else if (lat && lon) {
    getWeatherByCoordinates(lat, lon);
  } else {  
    let output = document.getElementById('weatherOutput');
    output.classList.add('text-red-500')
    output.textContent = 'Please enter a city name or coordinates!';
  }
 });

 
 




 

 
 
 
