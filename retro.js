let images

const checkImage = path =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({path, status: 'ok'});
        img.onerror = () => resolve({path, status: 'error'});
        img.src = path;
    });

const totalFrames = 21;
const animationDuration = 1300;
const timePerFrame = animationDuration / totalFrames;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber;
let lastFrame;
let longFrame;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to 'requestAnimationFrame' function
function step(startTime) {

    // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
    // first of all we calculate how much time has passed from the last time when frame was update
    if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
    timeFromLastUpdate = startTime - timeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (timeFromLastUpdate > timePerFrame) {
        // and show the required one
        images[frameNumber-1].style.opacity = '1';
        images[lastFrame-1].style.opacity = '0';
        // reset the last update time
        timeWhenLastUpdate = startTime;

        // If its a text frame we delay moving for 4 frames
        if(images[frameNumber-1].classList.contains('glitch-frame--text') && longFrame < 12) {
            longFrame = longFrame + 1
        } else {
            longFrame = 0;
            // then increase the frame number or reset it if it is the last frame
            if (frameNumber >= totalFrames) {
                frameNumber = 1;
            } else {
                frameNumber = frameNumber + 1;
            }
            // then increase the frame number or reset it if it is the last frame
            if (lastFrame >= totalFrames) {
                lastFrame = 1;
            } else {
                lastFrame = lastFrame + 1;
            }
        }
    }

    if (!window.cancelStep) {
        requestAnimationFrame(step);
    }
}

window.loadImg = function(paths, large) {
    images = document.querySelectorAll('.glitch-frame');
    timeWhenLastUpdate = null;
    timeFromLastUpdate = null;
    frameNumber = 1;
    lastFrame = totalFrames;
    longFrame = 0;
    window.cancelStep = false;
    return Promise.all(paths.map(checkImage)).then((result) => {
        [].forEach.call(images, (img) => {
            return img.style.backgroundImage = `url(${ large ? img.dataset.src : img.dataset.msrc })`;
        })
    }).then(() => {
        requestAnimationFrame(step);
    })
}