let handlefail = function(err){
    console.log(err)
}

let appId = "3edc42e7f0fc43e9825e6395c030125c";
let globalStream;
let isAudioMuted = false;
let isVideoMuted = false;
let i =0; 
 

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
    console.log()
    let remoteContainer =document.getElementsByClassName("remoteStream")[i++];
    let streamDiv =document.createElement("div");
    streamDiv.id = streamId;
    streamDiv.style.transform ="rotateY(180deg)";
    streamDiv.style.height ="250px"; 
    remoteContainer.appendChild(streamDiv); 
    

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


/document.getElementById("video-mute").onclick = function(){
    if(!isVideoMuted){
        globalStream.muteVideo();
        isVideoMuted = true;
        console.log("video muted")
    }else{
        globalStream.unmuteVideo();
        isVideoMuted = false;
        console.log("video unmuted")
    }
}

document.getElementById("audio-mute").onclick = function(){
    if(!isAudioMuted){
        globalStream.muteAudio();
        isAudioMuted = true;
        console.log("audio muted")
    }else{
        globalStream.unmuteAudio();
        isAudioMuted = false;
        console.log("audio unmuted")
    }
}