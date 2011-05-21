// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$(document).ready(function() {
  initializeMessages();
  initializeClock();
  updateClock();

  $("#settingsLink").click(function() {
    $("#settingsLink").css("-webkit-transform", "translate(0px, 1800px)");
    $("#settingsContainer").css("-webkit-transform", "translate(0px, -1800px)");
  });

  $("#hideSettingsLink").click(function() {
    $("#settingsLink").css("-webkit-transform", "translate(0px, 0px)");
    $("#settingsContainer").css("-webkit-transform", "translate(0px, 1800px)");
  });

  $("#clockFont").change(
    function() {
      localStorage["clockFont"] = $("select[name='clockFont'] option:selected").val();

      //now we need to re-load the settings so they take effect.
      loadSettings();
  });
});

function buildTimeString() {
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();

  // For nice formatting, we want to add '0' before single digit hours,
  // minutes, and seconds
  hours < 10 ? hours = "0" + hours : hours;
  minutes < 10 ? minutes = "0" + minutes : minutes;
  seconds < 10 ? seconds = "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds; 
}

function initializeClock() {
  $("#clockData").html(buildTimeString());
  loadSettings();
}

function updateClock() {
  requestAnimFrame( updateClock );
  $("#clockData").html(buildTimeString());
}

function loadSettings() {
  if(localStorage["clockFont"]){
    var savedFont = localStorage["clockFont"];        
    $("#clockData").css("font-family", savedFont);
    $("select[name=clockFont] option[value='" + savedFont + "']").attr("selected", true);       
  } else {
    $("#clockData").css("font-family", "Arvo");
  }
}

function initializeMessages() {
  // Set the title of the app
  document.title = chrome.i18n.getMessage("app_name");
	
  //Set the text of the Show Settings link
  $("#settingsLink").html(chrome.i18n.getMessage("show_settings"));
	
  //Set the text of the Hide Settings link
  $("#hideSettingsLink").html(chrome.i18n.getMessage("hide_settings"));
	
  //Set the text of the Font label
  $("#fontLabel").html(chrome.i18n.getMessage("font_label"));
}
