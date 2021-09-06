function getTabID() {
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({
                active: true,
            }, function (tabs) {
              var url = tabs[0].url;
              var title = tabs[0].title;
              var item = title + " !@#$% " + url;
                resolve(item);
            })
        } catch (e) {
            reject(e);
        }
    })
}

async function addToWLater(time) {
    let responseTabID = await getTabID();
    var item = responseTabID.toString();
    var name = item.split(" !@#$% ")[0];
    var link = item.split(" !@#$% ")[1];
    chrome.storage.sync.set({[name]: {"link": [link], "time": [time]}}, function() {});

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  var views = chrome.extension.getViews({
    type: "popup"
});
for (var i = 0; i < views.length; i++) {
  var time = Math.round(request.time);
  addToWLater(time);

}
});
