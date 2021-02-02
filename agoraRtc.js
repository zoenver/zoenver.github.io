let handlefail = function(err){
    console.log(err)
}

let appId = "3edc42e7f0fc43e9825e6395c030125c";
let globalStream;
let isAudioMuted = false;
let isVideoMuted = false;
localStorage.setItem("count", "0"); 

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
   
    var i = +localStorage.getItem("count") +1;
    localStorage.setItem("count", i); 


    if(localStorage.getItem("count") == "1"){
    let remoteContainer1 = document.getElementById("remoteStream1");
    let streamDiv1 = document.createElement("div");
    streamDiv1.id = streamId;
    streamDiv1.style.transform = "rotateY(180deg)";
    streamDiv1.style.height = "250px"
    remoteContainer1.appendChild(streamDiv1)
    

    }else if(localStorage.getItem("count") == "2"){
    let remoteContainer2 = document.getElementById("remoteStream2");
    let streamDiv2 = document.createElement("div");
    streamDiv2.id = streamId;
    streamDiv2.style.transform = "rotateY(180deg)";
    streamDiv2.style.height = "250px"
    remoteContainer2.appendChild(streamDiv2)
    
    }else if(localStorage.getItem("count") == "3"){
        let remoteContainer3 = document.getElementById("remoteStream3");
        let streamDiv3 = document.createElement("div");
        streamDiv3.id = streamId;
        streamDiv3.style.transform = "rotateY(180deg)";
        streamDiv3.style.height = "250px"
        remoteContainer3.appendChild(streamDiv3)
        
    }

    i = +localStorage.getItem("count") +1;
    localStorage.setItem("count", i); 

}

document.getElementById("leave").onclick = function () {
    client.leave(function() {
        console.log("Left!")
    },handlefail)
    removeMyVideoStream();
    window.location.href = "index.html";

}
    

let Username = localStorage.getItem("username");
let channelName = localStorage.getItem("channelname");
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