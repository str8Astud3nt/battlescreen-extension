// ask to show the icon in the omnibox
chrome.runtime.sendMessage("show_page_action");

// ask for the color settings from the popup
chrome.runtime.sendMessage({method: "getColors"}, function(response) {
	console.log(response)
	insertColors(response)
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.method == "insertColors") {
    insertColors(request.colors);
  }
});

// insert the script to change the TeamColorization into the page
function insertColors(c) {
	var actualCode = '(' + function(colors) {
		TeamColorization[0] = [colors.squadColor.r,colors.squadColor.g,colors.squadColor.b,255]  // squad
		TeamColorization[1] = [colors.teamColor.r,colors.teamColor.g,colors.teamColor.b,255]  // team
		TeamColorization[2] = [colors.enemyColor.r,colors.enemyColor.g,colors.enemyColor.b,255]  // enemy

		if(typeof(bs.icons) != "undefined") {
			console.log("changing icons")
			bs.loadIcons(bs.icons[TeamColorization.length])
		} else {
			console.log("no icons yet")
		}
	} + ')(' + JSON.stringify(c) + ')';
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}