let handlefail = function(err){
    console.log(err)
}

let appId = "3edc42e7f0fc43e9825e6395c030125c";
let globalStream;
let isAudioMuted= false;
let isVidioMuted= false;

let client = AgoraRTC.createClient({
    mode: "live",
    codec: "h264"
})

client.init(appId,() => console.log("AgoraRTC Client Connected"),handlefail
)

function removeMyVideoStream(){
    globalStream.stop();
}

function removeVideoStream(evt){
    let stream = evt.stream;
    stream.stop();
    let remDiv = document.getElementById(stream.getId())
    remDiv.parentNode.removeChild(remDiv);
}

function addVideoStream(streamId){
   
    localStorage["numPeople"]++;

    console.log()
    /*
     
      var value = parseInt(localStorage.getItem("count"));
    var newValue = value + 1
    localStorage.setItem("count", newValue);
     let remoteContainer = document.getElementById("remoteStream1");
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    streamDiv.style.transform = "rotateY(180deg)";
    streamDiv.style.height = "250px"
    remoteContainer.appendChild(streamDiv)*/

    let remoteContainer = document.getElementById("firstRow");

    let streamDiv = document.createElement("div");
    let spaceDiv = document.createElement("div");
    let characterDiv = document.createElement("div");
   
    let distanceSpace = document.createElement("span");

    streamDiv.id = streamId;
    streamDiv.style.transform = "rotateY(180deg)";
    streamDiv.style.height = "35vh";
    streamDiv.style.width = "17vw";
    streamDiv.style.textAlign = "left";
    streamDiv.style.marginTop = "20px";
    streamDiv.style.justifySelf = "center";

    characterDiv.style.height = "30px";
    characterDiv.style.width = "30px";

    if(localStorage["numPeople"] % 4 === 1) {
        streamDiv.style.border = "2px solid #DC143C";
        //characterDiv.style.backgroundColor = "#DC143C";
       
        characterDiv.style.marginLeft = "80vw";
    }
    else if(localStorage["numPeople"] % 4 === 2) {
        streamDiv.style.border = "2px solid #9932CC";
       // characterDiv.style.backgroundColor = "#9932CC";
       
        characterDiv.style.marginLeft = "50vw";
    }
    else if(localStorage["numPeople"] % 4 === 3) {
        streamDiv.style.border = "2px solid #DAA520";
        //characterDiv.style.backgroundColor = "#DAA520";
       
        characterDiv.style.marginLeft = "60vw";
    }
    else {
        streamDiv.style.border = "2px solid #F5DEB3";
        //characterDiv.style.backgroundColor = "#F5DEB3";
       
        characterDiv.style.marginLeft = "30vw";
    }

    spaceDiv.style.width = "3vw";
    distanceSpace.style.marginRight = "17vw";

    remoteContainer.appendChild(spaceDiv);
    remoteContainer.appendChild(streamDiv);
    remoteData.appendChild(distanceSpace);
   
   
}

document.getElementById("leave").onclick = function () {
    client.leave(function() {
        console.log("Left!")
    },handlefail)
    removeMyVideoStream();
    window.location.href = "index.html";

}

    let Username = localStorage["username"];
    let channelName = localStorage["channelname"];
    

    client.join(
        null,
        channelName,
        Username,
        () =>{
            var localStream = AgoraRTC.createStream({
                video: true,
                audio: true,
            })

            localStream.init(function(){
                localStream.play("selfStream")
                console.log(`App id: ${appId}\nChannel id: ${channelName}`)
                client.publish(localStream)
            })

            globalStream = localStream
            localStorage["numPeople"] = 0;
          
        }
    )

    client.on("stream-added", function (evt){
        console.log("Added Stream");
        client.subscribe(evt.stream,handlefail)
    })

    client.on("stream-subscribed", function(evt){
        console.log("Subscribed Stream");
        let stream = evt.stream;
        addVideoStream(stream.getId());  
        stream.play(stream.getId());
    })


    client.on("peer-leave", function (evt) {
        console.log("Peer has left")
        removeVideoStream(evt)}
        )


/*document.getElementById("video-mute").onclick = function(){
    if(!isVidioMuted){
        globalStream.muteVideo();
        isVidioMuted = true;
    }else{
        globalStream.unmuteVideo();
        isVidioMuted = false;
    }
}

document.getElementById("audio-mute").onclick = function(){
    if(!isAudioMuted){
        globalStream.muteAudio();
        isAudioMuted = true;
    }else{
        globalStream.unmuteAudio();
        isAudioMuted = false;
    }
}*/