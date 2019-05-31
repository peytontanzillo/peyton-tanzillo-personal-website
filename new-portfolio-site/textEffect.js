const names = document.getElementsByClassName('name-effect');
const below = document.getElementsByClassName('below-name');

let TEXT_CENTER = {
  top: undefined,
  left: undefined,
};

let SCREEN_CENTER = {
  top: undefined,
  left: undefined,
};

const TEXT_SHIFT_INTENSITY = 78;

function resizeWindow() {
  TEXT_CENTER = {
    top: (window.innerHeight - names[0].offsetHeight) / 2,
    left: (window.innerWidth - names[0].offsetWidth) / 2,
  };
  if (below !== null) {
    const belowTop = (window.innerHeight / 2) + (names[0].offsetHeight / 2);
    const belowLeft = (window.innerWidth - below[0].offsetWidth) / 2;
    below[0].style.top = `${belowTop}px`;
    below[0].style.left = `${belowLeft}px`;
    console.log(below);
  }

  SCREEN_CENTER = {
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
  };
  for (let i = 0; i < names.length; i++) {
    names[i].style.top = `${TEXT_CENTER.top}px`;
    names[i].style.left = `${TEXT_CENTER.left}px`;
  }
}

function generateOffset(event) {
  return {
    top: (event.clientY - SCREEN_CENTER.top) / TEXT_SHIFT_INTENSITY,
    left: (event.clientX - SCREEN_CENTER.left) / TEXT_SHIFT_INTENSITY,
  };
}

function displayText(offset) {
  for (let i = 0; i < names.length; i++) {
    const offsetCenter = {
      top: TEXT_CENTER.top + (offset.top * i),
      left: TEXT_CENTER.left + (offset.left * i),
    };
    names[i].style.top = `${offsetCenter.top}px`;
    names[i].style.left = `${offsetCenter.left}px`;
  }
}

function moveText(event) {
  const textOffset = generateOffset(event);
  displayText(textOffset);
}

window.addEventListener('load', resizeWindow);
window.addEventListener('resize', resizeWindow);
window.addEventListener('mousemove', moveText);
