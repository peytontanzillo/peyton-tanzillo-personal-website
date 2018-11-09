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
    console.log('reset');
    $('.drop').eq(this.id).animate({
      y: -100
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
  
  allDrops = [];
  
  for (let i = 0; i < $('.drop').length; i++) {
    drop = new Raindrop(i, 12, 60, (i * 100), 4000);
    allDrops.push(drop);
    setInterval(function() {
      allDrops[i].animate();
      allDrops[i].resetDrop();
    }, allDrops[i].animationSpeed);
  }
});