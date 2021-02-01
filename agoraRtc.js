let appId = "3edc42e7f0fc43e9825e6395c030125c";
let globalStream;
let isAudioMuted = false;
let isVideoMuted = false;

let handlefail = function(err){
    console.log(err)
}

window.localStorage.setItem("count", "0"); 

let client = AgoraRTC.createClient({
    mode: "live",
    codec: "h264"
})

client.init(appId,() => console.log("AgoraRTC Client Connected"),handlefail
)

function removeMyVideoStream(streamId) {
    globalStream.stop();
}

function removeVideoStream(evt) {
    let stream = evt.stream;
    stream.stop;
    let remDiv = document.getElementById(stream.getId());
    remDiv.parentNode.removeChild(remDiv);
}

function addVideoStream(streamId){
   
    var newVal = parseInt(window.localStorage.getItem("count"));
    window.localStorage.setItem("count", ++newVal);
    console.log(window.localStorage.getItem("count")); 


    if(window.localStorage["numPeople"] == "1"){
    let remoteContainer1 = document.getElementById("remoteStream1");
    let streamDiv1 = document.createElement("div");
    streamDiv1.id = streamId;
    streamDiv1.style.transform = "rotateY(180deg)";
    streamDiv1.style.height = "250px"
    remoteContainer1.appendChild(streamDiv)
    

    }else if(window.localStorage["numPeople"] =="2"){
    let remoteContainer2 = document.getElementById("remoteStream2");
    let streamDiv2 = document.createElement("div");
    streamDiv2.id = streamId;
    streamDiv2.style.transform = "rotateY(180deg)";
    streamDiv2.style.height = "250px"
    remoteContainer2.appendChild(streamDiv)
    
    }else if(window.localStorage["numPeople"] =="3"){
        let remoteContainer3 = document.getElementById("remoteStream3");
        let streamDiv3 = document.createElement("div");
        streamDiv3.id = streamId;
        streamDiv3.style.transform = "rotateY(180deg)";
        streamDiv3.style.height = "250px"
        remoteContainer3.appendChild(streamDiv)
        
    }

    var newVal1 = parseInt(window.localStorage.getItem("count"));
    window.localStorage.setItem("count", ++newVal1);

    /*
     var value = parseInt(localStorage.getItem("numPeople"));
    var newValue = value + 1
    localStorage.setItem("count", newValue);

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
     */

   

}

document.getElementById("leave").onclick = function () {
    client.leave(function() {
        console.log("Left!")
    },handlefail)
    removeMyVideoStream();
    window.location.href = "index.html";

}
    

let Username = localStorage.getItem("username");
let channelName = localStorage.getItem("channelName");
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
    if(!isVideoMuted){
        globalStream.muteVideo();
        isVideoMuted = true;
    }else{
        globalStream.unmuteVideo();
        isVideoMuted = false;
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