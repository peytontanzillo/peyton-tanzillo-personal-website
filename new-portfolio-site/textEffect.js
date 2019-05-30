const names = document.getElementsByClassName('name-effect');

let TEXT_CENTER = {
  top: undefined,
  left: undefined,
};

let SCREEN_CENTER = {
  top: undefined,
  left: undefined,
};

const TEXT_SHIFT_INTENSITY = 80;

function resizeWindow() {
  TEXT_CENTER = {
    top: (window.innerHeight - names[0].offsetHeight) / 2,
    left: (window.innerWidth - names[0].offsetWidth) / 2,
  };
  SCREEN_CENTER = {
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
  };
  console.log(TEXT_CENTER);
  for (let i = 0; i < names.length; i++) {
    names[i].style.top = `${TEXT_CENTER.top}px`;
    names[i].style.left = `${TEXT_CENTER.left}px`;
  }
}

function loadText() {
  resizeWindow();
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
  console.log(textOffset);
  displayText(textOffset);
}

window.addEventListener('load', loadText);
window.addEventListener('resize', resizeWindow);
window.addEventListener('mousemove', moveText);
