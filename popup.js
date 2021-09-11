Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value.toString());
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}


// HOME VIEW
function openNav() {
  document.getElementById("mySidebar").style.width = "150px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

function onComplete(a) { // When the code completes, do this
    document.body.innerHTML = a;
}

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



function getReadingList(){
  document.getElementById('readlist').innerHTML = "";
  chrome.storage.sync.get(null, function(items) {
   for (key in items) {
    if (Object.size(items[key]) < 2){
    link = items[key].toString();
    var strToAdd = "<br><br><input type='checkbox' name='readlistdelete' value='" + key + "'> &nbsp;&nbsp;&nbsp;" + key + " - <a class='resume' href='" + link + "' target='_blank'>Resume</a>";
    document.getElementById('readlist').innerHTML = document.getElementById('readlist').innerHTML + strToAdd;
  }
   }
  if (document.getElementById('readlist').innerHTML == ""){
      document.getElementById('readlist').innerHTML = "No items found."
    }

});
}
function addToReadManually(){
  title = document.getElementById("readbookmarkname").value;
  url = document.getElementById("readbookmarklink").value;

  if (!title) {
    document.getElementById('error2').innerHTML = "Please enter a name";
    return;
  }
  if (!url) {
    document.getElementById('error2').innerHTML = "Please enter a link";
    return;
    }
  chrome.storage.sync.set({[title]: [url] }, function() {});
  getReadingList();
}

async function addToReadLater() {
    let responseTabID = await getTabID();
    var item = responseTabID.toString();
    var title = item.split(" !@#$% ")[0];
    var url = item.split(" !@#$% ")[1];
    chrome.storage.sync.set({[title]: [url] }, function() {});
    getReadingList();

}

function delReadLater(){
  items = getCheckedBoxes("readlistdelete");
  if (items == null){
    alert("Please tick the items you would like to delete!");
    return
  }
  for(var i = 0; i < items.length; i++){
    chrome.storage.sync.remove(items[i], function(removed){
      // console.log(items[i]);
    })
  }
  getReadingList();
}

document.getElementById("openbtn").addEventListener("click", openNav);
document.getElementById("closebtn").addEventListener("click", closeNav);
document.getElementById("addToReadLater").addEventListener("click", addToReadLater);
document.getElementById("addToReadLater2").addEventListener("click", addToReadLater);
document.getElementById("addToWatchLater").addEventListener("click", addToWatchLater);
document.getElementById("delreadbtn").addEventListener("click", delReadLater);
document.getElementById("manualsubmit").addEventListener("click", addToReadManually);

// END OF HOME VIEW
function showMainDiv(){
  document.getElementById("homediv").style.display = "";
  document.getElementById("readlaterdiv").style.display = "None";
  document.getElementById("watchlaterdiv").style.display = "None";
  // document.getElementById("builderdiv").style.display = "None";
  document.getElementById("settingsdiv").style.display = "None";
  document.getElementById("reminderdiv").style.display = "None";
  document.getElementById("mySidebar").style.width = "0";


}
function showReadDiv(){
  document.getElementById("readlaterdiv").style.display = "";
  document.getElementById("homediv").style.display = "None";
  document.getElementById("watchlaterdiv").style.display = "None";
  // document.getElementById("builderdiv").style.display = "None";
  document.getElementById("settingsdiv").style.display = "None";
  document.getElementById("reminderdiv").style.display = "None";
  document.getElementById("mySidebar").style.width = "0";
  getReadingList();

}
function showBuilderDiv(){
  // document.getElementById("builderdiv").style.display = "";
  document.getElementById("watchlaterdiv").style.display = "None";
  document.getElementById("homediv").style.display = "None";
  document.getElementById("readlaterdiv").style.display = "None";
  document.getElementById("settingsdiv").style.display = "None";
  document.getElementById("reminderdiv").style.display = "None";
  document.getElementById("mySidebar").style.width = "0";


}
function showsettingsdiv(){
  document.getElementById("watchlaterdiv").style.display = "None";
  document.getElementById("settingsdiv").style.display = "";
  document.getElementById("homediv").style.display = "None";
  // document.getElementById("builderdiv").style.display = "None";
  document.getElementById("readlaterdiv").style.display = "None";
  document.getElementById("reminderdiv").style.display = "None";
  document.getElementById("mySidebar").style.width = "0";
}

function showReminderDiv(){
  document.getElementById("watchlaterdiv").style.display = "None";
  document.getElementById("reminderdiv").style.display = "";
  document.getElementById("homediv").style.display = "None";
  // document.getElementById("builderdiv").style.display = "None";
  document.getElementById("readlaterdiv").style.display = "None";
  document.getElementById("settingsdiv").style.display = "None";
  document.getElementById("mySidebar").style.width = "0";
}

function showWatchLaterDiv(){
  document.getElementById("watchlaterdiv").style.display = "";
  document.getElementById("reminderdiv").style.display = "None";
  document.getElementById("homediv").style.display = "None";
  // document.getElementById("builderdiv").style.display = "None";
  document.getElementById("readlaterdiv").style.display = "None";
  document.getElementById("settingsdiv").style.display = "None";
  document.getElementById("mySidebar").style.width = "0";
}

document.getElementById("home").addEventListener("click", showMainDiv);
document.getElementById("readlater").addEventListener("click", showReadDiv);
// document.getElementById("builder").addEventListener("click", showBuilderDiv);
document.getElementById("watchlater").addEventListener("click", showWatchLaterDiv);
document.getElementById("settings").addEventListener("click", showsettingsdiv);
document.getElementById("reminders").addEventListener("click", showReminderDiv);



// YOUTUBE

function addBookmark() {
  var link = document.getElementById('bookmarklink').value;

  var time = document.getElementById('timestamp').value.toString();

  if (!time) {
      time = "1";
  }
  var timetest = time.split(":");
  if (timetest.length < 3){
    document.getElementById('error').innerHTML = "Please enter three values for hours, minutes and seconds in the proper format (Eg. 00:10:32)";
    return;
  }

  var a = time.split(":");
  var time = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

  var name = document.getElementById('bookmarkname').value;

   if (!name) {
      document.getElementById('error').innerHTML = "Please enter a name";
      return;
  }
   if (!link) {
      document.getElementById('error').innerHTML = "Please enter a link";
      return;
  }

  chrome.storage.sync.set({[name]: {"link": [link], "time": [time]}}, function() {});

  document.getElementById('error').innerHTML = "";

  document.getElementById('bookmarklink').value = "";
  document.getElementById('timestamp').value = "";
  document.getElementById('bookmarkname').value = "";

  if (document.getElementById('hidebookmark').style.display == "block") {
    getBookmark();
    document.getElementById('error').innerHTML = "";
  }

}

function autoBookmark() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    var name = tab.title;
    var link = tab.url;
    console.log(name, link);
  });
  // chrome.storage.sync.set({[name]: {"link": [link], "time": [time]}}, function() {});
}

function getBookmark() {
  document.getElementById('bookmarks').innerHTML = "";
  document.getElementById('getbookmark').style.display = "none";
  document.getElementById('hidebookmark').style.display = "block";
  chrome.storage.sync.get(null, function(items) {
   for (key in items) {
    if (Object.size(items[key]) == 2) {
    var timeVal = items[key]['time'].toString();
    var newLink = items[key]['link'].toString();
    var seconds = timeVal;
    var strToAdd = "<br><br> <input type='checkbox' class='bookmarkdel' name='ytbookmarks' value='" + key + "'>&nbsp;&nbsp;&nbsp;" + key + "&nbsp;&nbsp;  <a class='resume' href='" + newLink + "&t=" + seconds + "' target='_blank'>Resume</a>";
    document.getElementById('bookmarks').innerHTML = document.getElementById('bookmarks').innerHTML + strToAdd;
  }}
  if (document.getElementById('bookmarks').innerHTML == ""){
      document.getElementById('bookmarks').innerHTML = "No bookmarks found."
    }
});

}

function hideBookmark(){
  document.getElementById('bookmarks').innerHTML = "";
  document.getElementById('getbookmark').style.display = "block";
  document.getElementById('hidebookmark').style.display = "none";
}



function delBookmark(){
  items = getCheckedBoxes("ytbookmarks");
  console.log(items);
  for (var i = 0; i < items.length; i++){
  chrome.storage.sync.remove(items[i], function(removed){
    console.log(items[i]);
  });
}
  if (document.getElementById('hidebookmark').style.display == "block") {
    getBookmark();
  }
}

function hide(){
  document.getElementById('deleted').innerHTML = "";
  document.getElementById('close').style.display = "none";
}

function clearBookmarks() {
  check = document.getElementById('clearcheck').checked
  if (check){
  chrome.storage.sync.clear();
  document.getElementById('clearcheck').checked = false;
}
  else{
    alert("Please check (tick) the box first");
    return;
  }
  if (document.getElementById('hidebookmark').style.display == "block") {
    getBookmark();
  }
}

document.getElementById("addbookmark").addEventListener("click", addBookmark);
document.getElementById("getbookmark").addEventListener("click", getBookmark);
document.getElementById("hidebookmark").addEventListener("click", hideBookmark);
document.getElementById("clearbookmarks").addEventListener("click", clearBookmarks);
document.getElementById("delbookmark").addEventListener("click", delBookmark);
document.getElementById("closebtn").addEventListener("click", hide);
document.addEventListener('dataCollected', function (e) {
  var data = e.detail;
  console.log('received', data);
});



function getToDo(){

}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  for (i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function() {
      var div = this.parentElement;
      div.style.display = "none";
    });
  }
}
document.getElementById("addTaskBtn").addEventListener("click", newElement);

function addToWatchLater(){
  chrome.tabs.executeScript({file: "content.js"});
}
