class Raindrop {
  constructor(id, width, height, x, animationSpeed) {
    this.id = id;
    $('.drop').eq(this.id).animate({
      x: x,
      width: width, 
      height: height
    }, 0);
    this.animationSpeed = animationSpeed;
  }
  
  animateDown() {
    $('.drop').eq(this.id).animate({
      y: '1000'
    }, this.animationSpeed);
  }
};

console.log('here');

$( document ).ready(function() {
  r = new Raindrop(0, 7, 30, 500, 2000);
  r.animateDown();
});