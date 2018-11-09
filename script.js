class Raindrop {
  constructor(id, width, height, x, animationSpeed) {
    this.id = id;
    $('.drop').eq(this.id).animate({
      x: x,
      width: width, 
      height: height
    }, 0);
    $('.drop').eq(this.id).stop();
    this.animationSpeed = animationSpeed;
  }
  
  resetDrop() {
    console.log('reset');
    $('.drop').eq(this.id).animate({
      y: '0'
    }, 0);
  }
  
  animate() {
    console.log('animate');
    $('.drop').eq(this.id).animate({
      y: '2000'
    }, this.animationSpeed);
  }
  
};

$( document ).ready(function() {
  for (let i = 0; i < $('.drop').length; i++) {
    drop = new Raindrop(i, 7, 30, 500, 4000);
  }
  
  r = new Raindrop(0, 7, 30, 500, 4000);
  
  setInterval(function() {
    r.animate();
    r.resetDrop();
  }, r.animationSpeed);
  
});