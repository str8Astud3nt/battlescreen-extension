/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2014 Bryan Martin

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/

// detects battlescreen in context of history state
// when navigating with the popup on battlelog
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
	console.log('history state updated')
	if(details.url.indexOf("battlelog.battlefield.com/bf4/battlescreen/show/") != -1){
		chrome.pageAction.show(details.tabId)
		chrome.runtime.sendMessage({
						method: 'insertColors',
						colors:{
							squadColor: localStorage.getObject('squadColor'),
							teamColor: localStorage.getObject('teamColor'),
							enemyColor: localStorage.getObject('enemyColor')
						}
					});
	} else {
		chrome.pageAction.hide(details.tabId)
	}
	
})

// allows easy object storage and retrieval through localstorage
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

// shows the icon in the omnibox
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request == "show_page_action") {
    chrome.pageAction.show(sender.tab.id);
  }
});

// sends the selected colors from the extension popup to the page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getColors")
      sendResponse({
						squadColor: localStorage.getObject('squadColor'),
						
						teamColor: localStorage.getObject('teamColor'),
						
						enemyColor: localStorage.getObject('enemyColor'),
					});
    else
      sendResponse({}); // snub them.
});