function Postit(msg) {
  this.msg = msg;
  this.elementHTML = "";
  this.closeElement = "";
  this.dragElement = "";
  this.myImg = this.generateRandomImg();
  this.pos = this.getRandomPosition();
  console.log(this.pos);
  this.rotation = this.randomRoration();
  this.init();
  this.eventSetup();
}

Postit.prototype.init = function() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="postit">
      ${this.msg}
      <strong class="close"></strong>
      <strong class="drag"></strong>
    </div>
  `);

  this.elementHTML = document.querySelector('div');
  this.closeElement = this.elementHTML.querySelector('.close');
  this.dragElement = this.elementHTML.querySelector('.drag');
  Object.assign(this.elementHTML.style, {
    left: this.pos.x + 'px',
    top: this.pos.y + 'px',
    backgroundImage: `url(images/${this.myImg})`,
    transform: `rotate(${this.rotation}deg)`
  })
  // setTimeout(Postit.prototype.init.bind(this), 1000);
}

Postit.prototype.eventSetup = function() {
  this.closeElement.addEventListener('click', this.handleClose.bind(this));
  Draggable.create(this.elementHTML, {
    type: "x,y",
    trigger: this.dragElement,
    bounds: 'body',
    onDragStart: function() {
      this.target.style.opacity = '.5'
    },
    onDragEnd: function() {
      this.target.style.opacity = '1'
    }
  });
}

Postit.prototype.handleClose = function(e) {
  this.elementHTML.remove()
}









Postit.prototype.generateRandomImg = function() {
  var imgArray = ['green.png', 'pink.png', 'yellow.png'];
  var randomNr = Math.floor(Math.random() * 3);
  return imgArray[randomNr];

}

Postit.prototype.randomRoration = function() {
  return Math.floor(Math.random() * 30) - 15;
}


Postit.prototype.getRandomPosition = function() {
  var resolution = this.getResolution();
  var position = {
    x: Math.floor(Math.random() * (resolution.width - 370)) + 185,
    y: Math.floor(Math.random() * (resolution.height - 400)) + 200
  }
  return position;
}

Postit.prototype.getResolution = function() {
  var resolution = {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
  console.log(resolution);
  return resolution;
}