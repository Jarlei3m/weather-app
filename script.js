const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const middle = document.getElementById("middle");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByCity(city) {
    const resp = await fetch(url(city), { mode: "cors" });
    const respData = await resp.json();

    console.log(respData)

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const feelsLike = KtoC(data.main.feels_like);
    const maxTemp = KtoC(data.main.temp_max);
    const minTemp = KtoC(data.main.temp_min);
    

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <p class="city">${search.value}, ${data.sys.country}</p>
        <h2> <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${temp}°C</h2>
        <small>${data.weather[0].main}</small>
    `;

    const moreInfo = document.createElement('ul');
    moreInfo.innerHTML = `
        <li>Humidity<strong><img src="images/drop.svg">${data.main.humidity}%</strong></li>
        <li>Feels Like<strong><img src="images/wind.svg">${feelsLike}°C</strong></li>
        <li>Maximum<strong><img src="images/hot.svg">${maxTemp}°C</strong></li>
        <li>Minimum<strong><img src="images/cold.svg">${minTemp}°C</strong></li>
    `;

    main.innerHTML = '';
    middle.innerHTML = '';

    main.appendChild(weather);
    middle.appendChild(moreInfo)
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;
    if(city) {
        getWeatherByCity(city)
    }
});
