// Constants for Raindrop
const RAIN_START_TOP = -100;
const RAIN_END_TOP = 2000;
const NUMBER_OF_RAINDROPS = 50;

// Bounds for Raindrop
const WIDTH_LOWER_BOUND = 6;
const WIDTH_UPPER_BOUND = 12;
const HEIGHT_LOWER_BOUND = 40;
const HEIGHT_UPPER_BOUND = 70;
const ANIMATION_SPEED_LOWER_BOUND = 2000;
const ANIMATION_SPEED_UPPER_BOUND = 4000;

const DOWN_ARROW_INTERVAL = 1000;

const SECTION_SCROLL_SPEED = 800;

const HEADER_HEIGHT = 50;

class Raindrop {
  constructor(drop, width, height, x, animationSpeed) {
    this.drop = drop;
    this.drop.css({
      position: 'absolute',
      width,
      height,
    });
    this.drop.offset({
      top: RAIN_START_TOP,
      left: x,
    });
    this.animationSpeed = animationSpeed;
  }

  resetDrop() {
    this.drop.animate({top: RAIN_START_TOP}, 0);
  }

  animate() {
    this.drop.animate({top: RAIN_END_TOP}, this.animationSpeed);
  }
}

function createRainDivs() {
  for (let i = 0; i < NUMBER_OF_RAINDROPS; i++) {
    $('#raindrops').append('<div class="drop"></div>');
  }
}

function makeRain() {
  const allDrops = [];

  for (let i = 0; i < $('.drop').length; i++) {
    const width = ((WIDTH_UPPER_BOUND - WIDTH_LOWER_BOUND) * Math.random()) + WIDTH_LOWER_BOUND;
    const height = ((HEIGHT_UPPER_BOUND - HEIGHT_LOWER_BOUND) * Math.random()) + HEIGHT_LOWER_BOUND;
    const position = ($(window).width() + (2 * width)) * Math.random();
    const animationSpeed = ((ANIMATION_SPEED_UPPER_BOUND - ANIMATION_SPEED_LOWER_BOUND) * Math.random()) + ANIMATION_SPEED_LOWER_BOUND;
    const drop = new Raindrop($('.drop').eq(i), width, height, position, animationSpeed);
    allDrops.push(drop);
    setInterval(() => {
      allDrops[i].animate();
      allDrops[i].resetDrop();
    }, allDrops[i].animationSpeed);
  }
}

$(document).ready(() => {
  createRainDivs();

  makeRain();

  setInterval(() => {
    $('#down-arrow').animate({margin: '6px 0px'}, DOWN_ARROW_INTERVAL);
    setTimeout(() => {
      $('#down-arrow').animate({margin: '-6px 0px'}, DOWN_ARROW_INTERVAL);
    }, DOWN_ARROW_INTERVAL);
  }, 2 * DOWN_ARROW_INTERVAL);

  $('.scroll-to-id').click(function() { // eslint-disable-line func-names
    const correctID = this.id.split('-');
    $('html, body').animate({scrollTop: $(correctID[1]).position().top + $(window).height() - HEADER_HEIGHT}, SECTION_SCROLL_SPEED);
  });

//  $(window).resize(() => {
//    makeRain();
//  });

  $('.skill-full').hide();
  let hasAnimatedSkills = false;

  $(document).scroll(() => {
    if (($(document).scrollTop() >= ($('#skills').position().top + $(window).height()) || $(document).scrollTop() + $(window).height() >= $('#contact').position().top + $(window).height()) && !hasAnimatedSkills) {
      hasAnimatedSkills = true;
      $('.skill-full').toggle('slide');
    }
  });
});
