let data = [];

chrome.runtime.sendMessage({
   data: "Handshake"
}, () => {

});

chrome.runtime.onMessage.addListener((message) => {
   data.push(...message.dataToSend);
   $(document).ready(() => {
      $("#parent").width(224);
      $("#parent").height(368);

      let inParent = `<div id = "town">${data[0]}</div>`;

      inParent += `<div id= "tempinfo"><div id="temp" >${data[3]}&deg;</div>`;
      inParent += `<div id = "discriptM">${data[2]}</div></div>`;
      inParent += `<div id = "wind">Скорость ветра: ${data[4]}`;
      inParent += `<div id = "humidity">Влажность: ${data[5]}</div>`;
      inParent += `<div id = "pressure">Давление: ${data[6]}</div></div>`;
      $("#parent").html(inParent);
      let hour = new Date().getHours();
      let url = "/images/";
      if (hour >= 5 && hour < 18)
         url += "5"
      else if (hour >= 18 && hour < 24)
         url += "3"
      else if (hour >= 0 && hour < 5)
         url += "7"
      url += ".png"
      $("body").attr("background", url);

      if (data[0] == undefined) {

         $("#parent").css({
            "display": "none"
         });
         location.reload();
      } else {
         $("#parent").css({
            "display": "flex"
         });
      }

   });

});