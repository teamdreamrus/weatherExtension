const refreshTime = 1000 * 60 * 60;
let dataToSend = [];

readData = () => {
    const getIP = "http://ip-api.com/json/";
    const openWeatherMap = "http://api.openweathermap.org/data/2.5/weather";
    const appid = "826ab8d24703d18d5dbabd2c58c66c83";
    $(document).ready(() => {

        $.getJSON(getIP).done((location) => {
            let url;

            url = `${openWeatherMap}?q=${location.city},${location.countryCode}&lang=ru&appid=${appid}`;

            $.getJSON(url).done((weather) => {
                dataToSend.push(weather.name);
                dataToSend.push(weather.weather[0].main, weather.weather[0].description);
                dataToSend.push(Math.round(weather.main.temp - 273) + "");
                dataToSend.push(weather.wind.speed + " м/с");
                dataToSend.push(weather.main.humidity + "%");
                dataToSend.push(Math.round(weather.main.pressure / 1, 333) + " мм.р.ст.");

            })

        })
    })


};

setInterval(readData(), refreshTime);

chrome.runtime.onMessage.addListener(() => {

    chrome.runtime.sendMessage({
        dataToSend
    }, () => {});

});