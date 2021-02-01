document.getElementById("join").onclick = function () {
    window.location.href = "videoCall.html";
    localStorage["username"] = document.getElementById("userName").value;
    localStorage["channelname"] = document.getElementById("groupName").value;
} 