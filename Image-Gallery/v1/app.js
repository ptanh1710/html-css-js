var images = document.querySelectorAll('.image img');
var gallery = document.querySelector('.gallery');
var galleryImage = document.querySelector('.gallery__image img');

var next = document.querySelector('.gallery .icon-next');
var prev = document.querySelector('.gallery .icon-prev');
var close = document.querySelector('.gallery .icon-close');

var currentIndex = 0;

images.forEach((image, index) => {
    image.addEventListener('click', function () {
        currentIndex = index;
        showGallery();
    });
});

function showGallery() {
    // show / hide current arrow left/right
    currentIndex == images.length - 1 ? next.classList.add('hide') : next.classList.remove('hide');
    currentIndex == 0 ? prev.classList.add('hide') : prev.classList.remove('hide');

    // show gallery image
    gallery.classList.add('show');
    galleryImage.src = images[currentIndex].src;
}

close.addEventListener('click', () => {
    gallery.classList.remove('show');
});

next.addEventListener('click', () => {
    currentIndex != images.length - 1 ? currentIndex++ : undefined;
    showGallery();
});

prev.addEventListener('click', () => {
    currentIndex != 0 ? currentIndex-- : undefined;
    showGallery();
});

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 27 || e.key == 'Escape' || e.code == 'Escape') {
        gallery.classList.remove('show');
    }
});
