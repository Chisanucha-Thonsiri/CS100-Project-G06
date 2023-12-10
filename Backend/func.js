function zoom1(){
    let zoom1info = document.getElementById("zoom1");
    let bs = document.getElementById("bs1");
    zoom1info.classList.add("infonew3zoomedvisible");
    bs.classList.add("blackscreenvisible");
}
function removezoom1(){
    let zoom1info = document.getElementById("zoom1");
    let bs = document.getElementById("bs1");
    zoom1info.classList.remove("infonew3zoomedvisible");
    bs.classList.remove("blackscreenvisible");
}