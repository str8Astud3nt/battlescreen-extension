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