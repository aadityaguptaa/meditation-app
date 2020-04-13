const app = ()=>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const timeDisplay = document.querySelector('.time-display');
    const sounds = document.querySelectorAll('.sound-picker button');
    const timeSelect = document.querySelectorAll('.time-select button');
    let fakeDuration = 6;
    const video = document.querySelector('.vid-container video');
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(option =>{
        option.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkplay();
        });
    });

    play.addEventListener('click', ()=>{
        checkplay();

    });

    timeSelect.forEach(option =>{
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:00`
        })
    });



    const checkplay = () => {
        if(song.paused ){
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        }
    }

    song.ontimeupdate = () =>{
        let currenttime = song.currentTime;
        let elapsedtime = fakeDuration - currenttime;
        let seconds = Math.floor(elapsedtime % 60);
        let minutes = Math.floor(elapsedtime/60);
        timeDisplay.innerHTML = `${minutes}:${seconds}`;
        outline.style.strokeDashoffset = outlineLength - (currenttime/fakeDuration)*outlineLength;

        if(currenttime >=fakeDuration){
            song.currentTime = 0;
            song.pause();
            video.pause();
            play.src= './svg/play.svg'
        }
    }


};

app();