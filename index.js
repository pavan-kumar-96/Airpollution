document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const resultContainer = document.getElementById("result");
    const aqiResult = document.getElementById("aqi");
    const coResult = document.getElementById("co");
    const no2Result = document.getElementById("no2");
    const o3Result = document.getElementById("o3");
    const pm2Result = document.getElementById("pm2");
    const pm10Result = document.getElementById("pm10");
    const so2Result = document.getElementById("so2");
    const errorContainer = document.getElementById("error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const latitude = latitudeInput.value.trim();
        const longitude = longitudeInput.value.trim();

        if (!latitude || !longitude) {
            errorContainer.textContent = "❌ Please enter valid latitude and longitude.";
            errorContainer.style.display = "block";
            resultContainer.style.display = "none";
            return;
        }

        errorContainer.style.display = "none";

        const apiKey = "b8a9360df0cb69e66ac4ed4cae61dd5b";
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;


        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) throw new Error("⚠️ Unauthorized: Check API Key.");
                    if (response.status === 429) throw new Error("⚠️ API limit reached. Try again later.");
                    throw new Error(`⚠️ Network error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("API Response:", result);

                if (result.list && result.list.length > 0) {
                    let readings = result.list[0].components;

                    aqiResult.textContent = result.list[0].main.aqi ?? "No Data";
                    coResult.textContent = readings.co ?? "No Data";
                    no2Result.textContent = readings.no2 ?? "No Data";
                    o3Result.textContent = readings.o3 ?? "No Data";
                    pm2Result.textContent = readings.pm2_5 ?? "No Data";
                    pm10Result.textContent = readings.pm10 ?? "No Data";
                    so2Result.textContent = readings.so2 ?? "No Data";

                    resultContainer.style.display = "block";
                } else {
                    throw new Error("⚠️ No data available for this location.");
                }
            })
            .catch((error) => {
                console.error("API Fetch Error:", error);
                errorContainer.innerHTML = `⚠️ ${error.message}`;
                errorContainer.style.display = "block";
                resultContainer.style.display = "none";
            });
    });
});
