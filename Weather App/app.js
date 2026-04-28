
const apiKey = "8a447327420673925ad4cb463480f151";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const box = document.getElementById("weatherBox");

    if (city === "") {
        box.innerHTML = "<p>⚠ Please enter a city</p>";
        return;
    }

    box.innerHTML = "<p>⏳ Loading...</p>";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

   
        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        box.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <p>${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} km/h</p>
        `;

        document.getElementById("cityInput").value = "";

    } catch (err) {
        box.innerHTML = `<p>❌ ${err.message}</p>`;
    }
}


document.getElementById("cityInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});



