const country = document.querySelector('.Country');
const city = document.querySelector('.City');
const status = document.querySelector('.Status');
const humid = document.querySelector('.Humidity');
const temp = document.querySelector('.Tempreture');
const wind = document.querySelector('.Wind');
const sunrise = document.querySelector('.Sunrise');
const sunset = document.querySelector('.Sunset');
const form = document.querySelector('form');
const input = document.querySelector('input');
const bgImg = document.querySelector('#element-body img');
let icon = "";

form.addEventListener("submit", getData);
 
function getData(e){
    e.preventDefault();
    const link = 'https://api.openweathermap.org/data/2.5/weather?q=';
	const cityInput = input.value;
	const apiId = '&appid=1a9db4d1744c75f856fcbbaad5cc758a&units=metric';
	const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = ()=>{
      if (xhr.readyState == 4 && xhr.status == 200) {
		const object = JSON.parse(xhr.response);
		country.textContent = object.sys.country;
		city.textContent = cityInput;		
		humid.textContent = object.main.humidity + "%";
		temp.textContent = object.main.temp;
		wind.textContent = object.wind.speed + "mph";
		let snrise = object.sys.sunrise;
		let snset = object.sys.sunset;
		let dtrise = new Date(snrise*1000);
		let dtset = new Date(snset*1000);
		let risehrs = dtrise.getHours();
		let sethrs = dtset.getHours();
		let risemnts = "0" + dtrise.getMinutes();
		let setmnts = "0" + dtset.getMinutes();
		sunrise.textContent = risehrs + ' : ' + risemnts.substr(-2) ;
		sunset.textContent = sethrs + ' : ' + setmnts.substr(-2);
		const weatherName = object.weather[0].description.slice(0,17);
		status.textContent = weatherName;
		
		if(weatherName.includes("rain")){
           icon = "./images/rain.jpg";
		}
		else if(weatherName.includes("clouds")){
           icon = "./images/clouds.jpg";
		}
		else if(weatherName.includes("snow")){
           icon = "./images/snow.jpg";
		}
		else if(weatherName === "mist"){
           icon = "./images/mist.jpg";
		}
		else if(weatherName === "clear sky"){
           icon = "./images/clear-sky.jpg";
		}
		else if(weatherName === "smoke"){
           icon = "./images/smoke.jpg";
		}
		else if(weatherName === "dust"){
           icon = "./images/dust.jpg";
		}
		else if(weatherName === "drizzle"){
           icon = "./images/rain.jpg";
		}
		else if(weatherName === "haze"){
           icon = "./images/haze.jpg";
		}
		else if(weatherName === "fog"){
           icon = "./images/foggy.jpg";
		}
		else if(weatherName === "thunderstorm"){
           icon = "./images/thunderstorm.jpg";
		}
		else{
           icon = "./images/pexels-photo-39811.jpg";
		}
      }
	 bgImg.src = icon;
    }
    xhr.open('GET', link + cityInput + apiId, true);
	xhr.send();
}


