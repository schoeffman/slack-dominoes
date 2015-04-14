//This injects scriptjs into the current page

   data = chrome.storage.sync.get(load);

function load(data) {

 var token = data.token;
 var channel = data.channel; 

  var actualCode = '(' + function(_token, _channel) {
    
     var _prevState = null;
     var channel = _channel; 
     var token = _token;


    function notify(state, token, channel) {
        var n = new XMLHttpRequest();
        n.open("POST", "https://slack.com/api/chat.postMessage?token=" + token + "&channel=%23" + channel + "&text=" + state + "&username=Domino's%20Notify&icon_url=http%3A%2F%2Fcdn.marketplaceimages.windowsphone.com%2Fv8%2Fimages%2F81c41161-1148-4f50-bdda-dd681d2a4b1d%3FimageType%3Dws_icon_large&pretty=1");
        n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //n.send();
    }

    function checkStatus(token, channel) {

        var state = '';

        try {
         state = document.getElementById('intl-tracker').getAttribute('data-currentstage');
        } catch(err) {
          console.log('Slack-Dominoes Content Script Error => ', err); 
        }

     
        if (state != _prevState) {
          
          _prevState = state;
     
          if(state == "1") {
              message = "Order%20Placed";
          } else if(state == "2") {
              message = "Prep";
          } else if(state == "3") {
             message = "Bake";
          } else if(state == "4") {
              message = "Quality%20Check";
          } else if(state == "5") {
              message = "%20Out%20for%20Delivery";
          } else {
             message = "Unknown%20State";
            }
          }
     
          notify(message, token, channel);
    }

    setInterval(checkStatus(token, channel), 2000);  

  } + ')(' + JSON.stringify(token) + ',' + JSON.stringify(channel) + ');';

  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);

}
