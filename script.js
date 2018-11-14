class Raindrop {
  constructor(id, width, height, x, animationSpeed) {
    this.id = id;
    
    $('.drop').eq(this.id).css({position: 'absolute', width: width, height: height});
    $('.drop').eq(this.id).offset({top: -100, left: x});
    this.animationSpeed = animationSpeed;
  }
  
  resetDrop() {
    $('.drop').eq(this.id).animate({
      top: '-100'
    }, 0);
  }
  
  animate() {
    $('.drop').eq(this.id).animate({
      top: '2000'
    }, this.animationSpeed);
  }
  
};

$( document ).ready(function() {
  
  createRainDivs();
  
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
  });
  
//  $('.skill-full').hide();
//  let hasAnimatedSkills = false;
//  
//  $(document).scroll(function() {
//    if ($(document).scrollTop() >= ($('#skills').position().top + $(window).height()) && !hasAnimatedSkills) {
//      hasAnimatedSkills = true;
//      $('.skill-full').toggle('slide');
//    }
//  });
});

function createRainDivs() {
  for (i = 0; i < 150; i++) {
    $('#raindrops').append("<div class=\"drop\"></div>");
  }
}

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
