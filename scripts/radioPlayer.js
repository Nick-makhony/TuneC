export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMuted = document.querySelector('.radio-volume__icon');
    let volumeTemp;

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    audio.volume = 0.5;
    radioVolume.value = audio.volume * 100;


    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    const changeVolumeIcon = () => {
        if (audio.volume == 0) {
            radioMuted.classList.remove('fa-volume-up');
            radioMuted.classList.add('fa-volume-off');
        } else {
            radioMuted.classList.add('fa-volume-up');
            radioMuted.classList.remove('fa-volume-off');
        }
    };
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const stopStream = () => {
        if (!radio.classList.contains('active')) {

            if (!audio.paused) {
                radio.classList.remove('play');
                radioStop.classList.add('fa-play');
                radioStop.classList.remove('fa-stop');
                audio.pause();
            };


        };
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;

        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;



        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    })

    radioMuted.addEventListener('click', () => {
        if (audio.volume != 0) {
            volumeTemp = audio.volume;
            audio.volume = 0;
        } else {
            audio.volume = volumeTemp;
        }
        changeVolumeIcon();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });


    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        changeVolumeIcon();
    });

    window.addEventListener('click', () => {
        stopStream();
    });


};