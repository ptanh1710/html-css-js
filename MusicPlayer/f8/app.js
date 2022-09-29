/**
 * 1. Render Songs
 * 2. Scroll Top
 * 3. Play / Pause / Seek
 * 4. CD Rotate
 * 5. Next / Prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active Song
 * 9. Scroll Active Song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const cd = $('.cd');

const nameSong = $('.dashboard header h2');
const cdThumb = $('.cd .cd-thumb');
const audio = $('.dashboard #audio');
const range = $('.dashboard #progress');
const player = $('.player');

const playBtn = $('.control .btn-toggle-play');
const repeatBtn = $('.control .btn-repeat');
const prevBtn = $('.control .btn-prev');
const nextBtn = $('.control .btn-next');
const randomBtn = $('.control .btn-random');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    musics: [
        {
            name: 'Alone',
            singer: 'Alan Walker',
            path: './assets/music/Alone - Alan Walker_ Noonie Bao.mp3',
            image: './assets/image/alan-walker.jpg',
        },
        {
            name: 'Despacito',
            singer: 'Mandarin, Luis Fonsi',
            path: './assets/music/Despacito-Mandarin-Version-Luis-Fonsi.mp3',
            image: './assets/image/Despacito_cover.jpeg',
        },
        {
            name: 'Face',
            singer: "Nu'est",
            path: './assets/music/Face - NU_EST.mp3',
            image: './assets/image/nuest.jpg',
        },
        {
            name: 'Faded',
            singer: 'Alan Walker',
            path: './assets/music/Faded - Alan Walker.mp3',
            image: './assets/image/alan-walker.jpg',
        },
        {
            name: 'Fantastic Baby',
            singer: 'Big Bang',
            path: './assets/music/Fantastic Baby - Big Bang.mp3',
            image: './assets/image/big-bang.jpg',
        },
        {
            name: 'Gurenge',
            singer: 'Lisa',
            path: './assets/music/Gurenge - LiSA.mp3',
            image: './assets/image/gurenge.jpg',
        },
        {
            name: 'Rising Hope',
            singer: 'Lisa',
            path: './assets/music/Rising Hope - LiSA.mp3',
            image: './assets/image/rising-hope.jpg',
        },
        {
            name: 'The Boys',
            singer: 'SNSD',
            path: './assets/music/The Boys - Girls_ Generation.mp3',
            image: './assets/image/snsd.jpg',
        },
        {
            name: 'Toward The Truth',
            singer: 'FriSide',
            path: './assets/music/TwoSoulsTowardTheTruth-Fripside-4248246.mp3',
            image: './assets/image/toward-the-truth.jpg',
        },
        {
            name: 'Yoru ni Kakeru',
            singer: 'Yoasobi',
            path: './assets/music/Yoru Ni Kakeru - YOASOBI.mp3',
            image: './assets/image/yoru-ni-kakeru.jpg',
        },
    ],

    render: function () {
        const songs = this.musics.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                    <div
                        class="thumb"
                        style="background-image: url('${song.image}')"
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });

        playlist.innerHTML = songs.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.musics[this.currentIndex];
            },
        });
    },

    handleEvents: function () {
        // Xử lý animation rotate
        const cdThumbAnimation = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000,
            iterations: Infinity,
        });

        cdThumbAnimation.pause();

        // Xử lý Scroll
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.screenY || document.documentElement.scrollTop;
            const newWidthCD = cdWidth - scrollTop;
            cd.style.width = newWidthCD > 0 ? newWidthCD + 'px' : 0;
            cd.style.opacity = newWidthCD / scrollTop;
        };

        // Xử lý playing
        playBtn.onclick = function () {
            app.isPlaying ? audio.pause() : audio.play();
        };

        // When song is playing
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimation.play();
        };

        // When song is paused
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimation.pause();
        };

        // When song is playing => Change input range
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progress = Math.floor((audio.currentTime / audio.duration) * 100);
                range.value = progress;
            }
        };

        // Xử lý khi tua bài hát = When seek is playing
        range.oninput = function (e) {
            const seekTime = (e.target.value * audio.duration) / 100;
            audio.currentTime = seekTime;
        };

        // Xử lý khi next song
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.nextSong();
            }
            audio.play();
            app.activeSong();
            app.scrollToIntoView();
        };

        // Xử lý khi prev song
        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.prevSong();
            }
            audio.play();
            app.activeSong();
            app.scrollToIntoView();
        };

        // Xử lý khi random song
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle('active', app.isRandom);
        };

        // Xử lý khi repeat song
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle('active', app.isRepeat);
        };

        // Xử lý next khi song ended
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe sự kiện click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.song .option')) {
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    app.loadCurrentSong();
                    app.activeSong();
                    audio.play();
                }

                if (e.target.closest('.song .option')) {
                }
            }
        };
    },

    loadCurrentSong: function () {
        nameSong.innerText = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.musics.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.musics.length - 1;
        }
        this.loadCurrentSong();
    },

    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.musics.length);
        } while (newIndex == this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    activeSong: function () {
        const children = playlist.children;
        $('.song.active').classList.remove('active');
        children[this.currentIndex].classList.add('active');
    },

    scrollToIntoView: function () {
        setTimeout(() => {
            if (this.currentIndex == 0 || this.currentIndex == 1 || this.currentIndex == 2 || this.currentIndex == 3) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    // inline: 'nearest',
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    // inline: 'nearest',
                });
            }
        }, 400);
    },

    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe / Xử lý các sự kiện (DOM Event)
        this.handleEvents();

        // Load first songs UI
        this.loadCurrentSong();

        // Render playlist UI
        this.render();
    },
};

app.start();
