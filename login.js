document.getElementById("join").onclick = function () {
    window.location.href = "videoCall.html";
    localStorage.setItem("username", document.getElementById("userName").value);
    localStorage.setItem("channelname", document.getElementById("groupName").value);

} 