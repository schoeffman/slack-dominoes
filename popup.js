function saveChanges() {

    // Get a value saved in a form.
    var token = document.getElementById('token').value;
    var channel = document.getElementById("channel").value;

        // Check that there's some code there.
        if (!token) {
          return;
        } else {
          // Save it using the Chrome extension storage API.
          chrome.storage.sync.set({'token':token}, function() {
            // Notify that we saved.
          });
        } 
        
        if (!channel) {
          return;
       
        } else {
          // Save it using the Chrome extension storage API.
          chrome.storage.sync.set({'channel': channel}, function() {
            // Notify that we saved.
          });
        } 

}

document.addEventListener('DOMContentLoaded', function() {

   var link  = document.getElementById('save');
   var status = document.getElementById('status');
   var regex = new RegExp(/^https:\/\/order\.dominos\.ca\/en\/pages\/order\/confirmation.*$/);
   chrome.storage.sync.get(load);
   
   chrome.tabs.getAllInWindow(null, function(tabs){

     for (var i = 0; i < tabs.length; i++) {

        var currentUrl = tabs[i].url;

        if(regex.test(currentUrl)) {
          document.getElementById("status").innerHTML = "Active";
          document.getElementById("status").className = "active";
        }
      }
    });

    // onClick's logic below:
    link.addEventListener('click', function() {
      saveChanges();
    });

});

function load(data){
    if(data) {
      document.getElementById("token").value = data.token;
      document.getElementById("channel").value = data.channel;
    }
}
