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

   chrome.storage.sync.get(load);

    var link = document.getElementById('save');

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
