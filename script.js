class Raindrop {
  constructor(id, width, height, x, animationSpeed) {
    this.id = id;
    $('.drop').eq(this.id).animate({
      x: x,
      width: width, 
      height: height,
      y: -100
    }, 0);
    this.animationSpeed = animationSpeed;
  }
  
  resetDrop() {
    $('.drop').eq(this.id).animate({
      y: -100
    }, 0);
  }
  
  animate() {
    $('.drop').eq(this.id).animate({
      y: '2000'
    }, this.animationSpeed);
  }
  
};

$( document ).ready(function() {
  
  makeRain();
  
  setInterval(function() {
    $('#down-arrow').animate({
      margin: '6px 0px'
    }, 1000);
    setTimeout(function() {
      $('#down-arrow').animate({
        margin: '-6px 0px'
      }, 1000);
    }, 1000);
  }, 2000); 
  
  $('.scroll-to-id').click(function() {
    const correctID = this.id.split("-");
    $('html, body').animate({
      scrollTop: $(correctID[1]).position().top + $(window).height()
    }, 800);
  });
  
  $(window).resize(function() {
    makeRain();
    console.log('reset')
  });
});

function makeRain() {
  allDrops = [];
  
  for (let i = 0; i < $('.drop').length; i++) {
    const width = (6 * Math.random()) + 6;
    const height = (30 * Math.random()) + 40;
    const position = (($(window).width() + (2 * width)) * Math.random());
    const animationSpeed = (2000 * Math.random()) + 2000;
    const drop = new Raindrop(i, width, height, position, animationSpeed);
    allDrops.push(drop);
    setInterval(function() {
      allDrops[i].animate();
      allDrops[i].resetDrop();
    }, allDrops[i].animationSpeed);
  }
}
