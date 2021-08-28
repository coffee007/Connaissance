console.log("Hello");

var ytplayer = document.getElementsByTagName('video')[0];
var time1 = ytplayer.currentTime;
console.log(time1);
var data = {
time: time1
};
console.log(time1, data);

document.dispatchEvent(new CustomEvent('dataCollected', { detail: data }));
