let mt = document.getElementById("maintxt");
let m1f = document.getElementById("m1");
let m2f = document.getElementById("m2");
let m3f = document.getElementById("m3");
let ms1f = document.getElementById("ms1");
let ms2f = document.getElementById("ms2");
let ms3f = document.getElementById("ms3");
let mp1 = document.getElementById("mp1");
let mp2 = document.getElementById("mp2");
let mp3 = document.getElementById("mp3");
let pmst = document.getElementById("pmst");
let ic1 = document.getElementById("ic1");
let ic2 = document.getElementById("ic2");
let mf1 = document.getElementById("mf1");
let foodst = document.getElementById("foodst");
let fi1 = document.getElementById("fi1");
let nofood = document.getElementById("nofood");
let reload = document.getElementById("reload");
let wrappercl = document.getElementById("wrappermain");
let member = document.getElementById("member");
let welcomediv = document.getElementById("welcomediv");

function showmem(){
member.classList.add("membervsb");
welcomediv.classList.add("gone");
}
function flipm1(){
m1f.classList.add("menu1flip");
m1f.onclick = flipm1close ;
}
function flipm2(){
m2f.classList.add("menu2flip");
m2f.onclick = flipm2close ;
}
function flipm3(){
m3f.classList.add("menu3flip");
m3f.onclick = flipm3close ;
}
function kramcolor(){
wrappercl.classList.add("wrappermainkram");
}
function kramcolorout(){
wrappercl.classList.remove("wrappermainkram");
}
function notcolor(){
wrappercl.classList.add("wrappermainnot");
}
function notcolorout(){
wrappercl.classList.remove("wrappermainnot");
}
function inkcolor(){
wrappercl.classList.add("wrappermainink");
}
function inkcolorout(){
wrappercl.classList.remove("wrappermainink");
}
function flipm1close(){

m1f.classList.remove("menu1flip");
m1f.onclick = flipm1 ;
}
function flipm2close(){

m2f.classList.remove("menu2flip");
m2f.onclick = flipm2 ;
}
function flipm3close(){
m3f.classList.remove("menu3flip");
m3f.onclick = flipm3 ;
}
function tokram(){
m1f.classList.add("gone");
m2f.classList.add("gone");
m3f.classList.add("gone");
ms1f.classList.add("gone");
ms2f.classList.add("gone");
ms3f.classList.add("gone");
mt.innerHTML = "กำลังไปที่คราม..";
mp1.classList.add("pay1vsb");
setTimeout(() => {
mt.innerHTML = "กำลังไปที่คราม...";
  }, 1000);
  setTimeout(() => {
mt.innerHTML = "กำลังไปที่คราม....";
  }, 2000);
setTimeout(() => {
window.location.href = 'Kram/Kram.html';
  }, 3000);
}
function tonot(){
m1f.classList.add("gone");
m2f.classList.add("gone");
m3f.classList.add("gone");
ms1f.classList.add("gone");
ms2f.classList.add("gone");
ms3f.classList.add("gone");
mt.innerHTML = "กำลังไปที่ต้นน้ำ..";
mp1.classList.add("pay1vsb");
setTimeout(() => {
mt.innerHTML = "กำลังไปที่ต้นน้ำ...";
  }, 1000);
  setTimeout(() => {
mt.innerHTML = "กำลังไปที่ต้นน้ำ....";
  }, 2000);
setTimeout(() => {
window.location.href = 'Not/Not.html';
  }, 3000);
}
function toink(){
m1f.classList.add("gone");
m2f.classList.add("gone");
m3f.classList.add("gone");
ms1f.classList.add("gone");
ms2f.classList.add("gone");
ms3f.classList.add("gone");
mt.innerHTML = "กำลังไปที่อิ้ง..";
mp1.classList.add("pay1vsb");
setTimeout(() => {
mt.innerHTML = "กำลังไปที่อิ้ง...";
  }, 1000);
  setTimeout(() => {
mt.innerHTML = "กำลังไปที่อิ้ง....";
  }, 2000);
setTimeout(() => {
window.location.href = 'Ink/Ink.html';
  }, 3000);
}
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds;
  document.getElementById('clock').innerHTML = timeString;
  setTimeout(updateClock, 1000);
}
updateClock();
