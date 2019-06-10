const pages = document.getElementsByClassName('page');
const buttons = document.getElementsByClassName('header-item');
let backHome = undefined;
let background = undefined;

const TRANSITION_FRAME_INTERVAL = 10;

let SELECTED_PAGE = 'home';

function transitionAnimation(fromPage, toPage) {
  if (fromPage === 'home') {
    background.classList.add('expanded');
    backHome.classList.remove('hidden');
  } else if (toPage === 'home') {
    background.classList.remove('expanded');
    backHome.classList.add('hidden');
  }
}

function changePage(event) {
  let switchTo = event.target.parentElement.id;
  if (switchTo === '') {
    switchTo = 'home';
  }
  if (switchTo !== SELECTED_PAGE) {
    for (const page of pages) {
      if (page.id === `${SELECTED_PAGE}-page`) {
        page.classList.add('hidden');
      } else if (page.id === `${switchTo}-page`) {
        page.classList.remove('hidden');
      }
    }
    transitionAnimation(SELECTED_PAGE, switchTo);
    SELECTED_PAGE = switchTo;
  }
}

function pageSetup() {
  for (const button of buttons) {
    button.addEventListener('click', changePage);
  }

  for (const page of pages) {
    if (page.id !== `${SELECTED_PAGE}-page`) {
      page.classList.add('hidden');
    }
  }

  background = document.getElementById('expanding-background');
  backHome = document.getElementById('home');
}

window.addEventListener('load', pageSetup);
