var audio = new Audio();
var playButton = document.querySelector('.playPauseButton'); 
var seeking = false;

audio.src = "audio_files/Disturbed- The Sound Of Silence Official Music Video.mp3";   

function playNewSong(){

    if(playButton.getAttribute('src') === ('Images/play.png')){
        playButton.setAttribute('src', 'Images/pause.png');
        audio.play();
    }else{
        playButton.setAttribute('src', 'Images/play.png');
        audio.pause();
            }
}

playButton.addEventListener('click', playNewSong);

var muteButton = document.querySelector('.muteUnmuteButton');

function MuteUnmute(){

    if(muteButton.getAttribute('src') === ('Images/Mute.png')){
        muteButton.setAttribute('src', 'Images/muteed.png');
        audio.volume = 0;
    }else{
        muteButton.setAttribute('src', 'Images/Mute.png');
        audio.volume = 1;
    }
}
muteButton.addEventListener('click', MuteUnmute);

//защо се чупи слайдерът, когато се опитвам да го премется???
var seekslider = document.getElementById("seekslider"),
    seekTo,
    seeking=false,
    seekTimeUpdate;

seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(){ seeking=false; });   


function seek(event){
	if(seeking){
        seekslider.value = event.clientX - seekslider.offsetLeft;
        seekTo = audio.duration * (seekslider.value / 100);
        audio.currentTime = seekTo;
	}
}

var currentTimeText, 
    durationTimeText;

currentTimeText = document.getElementById('currentTimeText');
durationTimeText = document.getElementById('durationTimeText');

audio.addEventListener("timeupdate", function(){seekTimeUpdate(); })

function seekTimeUpdate(){
    var newTime = audio.currentTime * (100 / audio.duration);
    seekslider.value = newTime;
    var curMin = Math.floor (audio.currentTime / 60);
    var curSec = Math.floor (audio.currentTime - curMin * 60);
    var durMin = Math.floor (audio.duration / 60);
    var durSec = Math.floor (audio.duration - durMin * 60);
    if(curSec < 10){ curSec = "0"+curSec;}
    if(curMin < 10){curMin = "0"+curMin;}
    if(durMin < 10){durMin = "0"+durMin;}
    if(durSec < 10){durSec = "0"+durSec;}
    currentTimeText.innerHTML = curMin+":"+curSec;
    durationTimeText.innerHTML = durMin+":"+durSec;

}


/*window.addEventListener("load", playNewSong);

*/

