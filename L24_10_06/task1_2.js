var audio = new Audio();
var playButton = document.querySelector('.playPauseButton'); 
//var seeking = false;
var dir = "audio_files/";
var playlist = ["Disturbed- The Sound Of Silence Official Music Video.mp3", "Coldplay - Hymn For The Weekend (Official video).mp3", "Hozier - Take Me To Church.mp3", "Nickelback - How You Remind Me.mp3", "Nickelback - Rockstar OFFICIAL VIDEO.mp3", "P!nk - Try.mp3", "Rag'n'Bone Man - Human (Official Video).mp3", "Reamonn - Supergirl.mp3"];
var playlist_index = 0;
audio.src = dir+playlist[0];   
var nameOfTheSong = document.getElementById("nameOfTheSong");
audio.loop = false;


function switchTrack(){
	if(playlist_index == (playlist.length - 1)){
		playlist_index = 0;
	}else{
		playlist_index++;
	}
	nameOfTheSong.innerHTML = "Track"+(playlist_index+1)+" - "+playlist[playlist_index];
	audio.src = dir+playlist[playlist_index]; 
	audio.play();
}
audio.addEventListener("ended", switchTrack);

function playNewSong(){
	

    if(playButton.getAttribute('src') === ('Images/play.png')){
        playButton.setAttribute('src', 'Images/pause.png');
		audio.play();
		nameOfTheSong.innerHTML = "Track"+(playlist_index+1)+" - "+playlist[playlist_index];
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

var seekslider = document.getElementById("seekslider"),
    seeking=false;
    
 function seek(event){
		// --- Преместих и seekTo тук, понеже е необходимо само за тази функция, и не е нужно да стои в global scop-а.
	var seekTo;
	
	if(seeking){
		// Не е необходимо да се грижиш за положението на слайдера, при клик, тъй като това ти идва на готово от фактът, че си използвала <input type="slider">
        //seekslider.value = event.clientX - seekslider.offsetLeft;	// --- излишно	
        seekTo = audio.duration * (seekslider.value / 100);
        audio.currentTime = seekTo;
	}
}
seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(){ seeking=false; });  

var currentTimeText = document.getElementById('currentTimeText');

audio.addEventListener("timeupdate", function(){updateTimeDisplay(); });
	// --- addEventListener ни е необходим, тъй като аудио файлът трябва да се изтегли от сървъра, което може да отнеме известно време.
	// --- Този евент ще настъпи, когато се заредят метаданите на файлът: https://www.w3schools.com/tags/av_event_loadedmetadata.asp
	// --- В тези метадани се съдържа и дължината на самия файл.
	// --- На теб до момента не ти беше необходим, тъй като 'timeupdate' настъпва след като са заредени метаданите
	// --- Предимството на този подход, е че не е необходимо на потребителя да чака да се изтегли целия mp3 файл за да види колко е дълга песента.
audio.addEventListener('loadedmetadata', setAudioDiration);


function seekTimeUpdate(){
		// !!!!!!--- Трябва да се погрижиш, че автоматичното броене, няма да се изпълнява 
		// докато човека е тръгнал да мести слайдера на ръка
    if(!seeking){
		var newTime = audio.currentTime * (100 / audio.duration);
		seekslider.value = newTime;
	}
}

function updateTimeDisplay(){
	var curMin = Math.floor (audio.currentTime / 60);
	var curSec = Math.floor (audio.currentTime - curMin * 60);
	
		// --- На теория това може да се изкара в отделна функция и да се преизползва и тук и за duration, тъй като логиката е една и съща
	if(curSec < 10){ curSec = "0"+curSec;}
	if(curMin < 10){ curMin = "0"+curMin;}
	currentTimeText.innerHTML = curMin+":"+curSec;
}

	// --- Това го изкарах, понеже не е необходимо да се изпълнява всеки път при промяна на текущото време, а ти трябва само веднъж
function setAudioDiration(){
		// --- Преместих и durationTimeText тук, понеже е необходимо само за тази функция, и не е нужно да стои в global scop-а.
	var durationTimeText = document.getElementById('durationTimeText');
	var durMin = Math.floor (audio.duration / 60);
	var durSec = Math.floor (audio.duration - durMin * 60);
	
	if(durMin < 10){durMin = "0"+durMin;}
	if(durSec < 10){durSec = "0"+durSec;}	
	durationTimeText.innerHTML = durMin+":"+durSec;
}




/*window.addEventListener("load", playNewSong);

*/

