/* Content script to toggle Youtube video display.
	Runs when user clicks on add-on icon in toolbar.
*/

// show add on button only on youtube videos pages
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (tab.url.match(/https:\/\/www.youtube.com\/watch?/)) {
		chrome.pageAction.show(tab.id);
	}
});

var videoOn = undefined;

var toggleVideoFlag = function() {
	videoOn = !videoOn;
}

var initVideoFlag = function() {
	videoOn = false;
}

// run appropriate script when add on button is clicked
chrome.pageAction.onClicked.addListener(function() {
	if (videoOn == undefined) {
		chrome.tabs.executeScript({
		file: "initOverlay.js"
		}, initVideoFlag);
	} else if (videoOn == true) {
		chrome.tabs.executeScript({
		file: "addOverlay.js"
		}, toggleVideoFlag);
	} else {
		chrome.tabs.executeScript({
		file: "removeOverlay.js"
		}, toggleVideoFlag);
	}
});