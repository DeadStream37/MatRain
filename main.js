let canvas;

var streams = [];

var cX = 600;
var cY = 400;
var maxV = 6;
var minV = 2;
var maxS = 20;
var minS = 5;
var symSize = 20;

function setup() {
  canvas = createCanvas(cX, cY);
  canvas.parent("prog");

  background(0);
  textSize(symSize);

  var x = 0;

  for (var i = 0; i <= width / symSize; i++) {
    var stream = new Stream();
    stream.genSym(x, random(-(2 * cY), 0));
    streams.push(stream);
    x += symSize;
  }
}

function draw() {
  background(0, 80);

  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, v, first) {
  this.x = x;
  this.y = y;
  this.v = v;
  this.first = first;

  this.switchInt = round(random(2, 20))

  this.val;


  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInt == 0) {
      this.val = String.fromCharCode(0x30A0 + round(random(0, 96)));
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.v;
  }
}

function Stream() {
  this.syms = [];

  this.totalSym = round(random(minS, maxS));
  this.v = random(minV, maxV);

  this.genSym = function(x, y) {
    var first = round(random(0, 4)) == 1;

    for (var i = 0; i <= this.totalSym; i++) {
      sym = new Symbol(x, y, this.v, first);
      sym.setToRandomSymbol();
      this.syms.push(sym);
      y -= symSize;
      first = false;
    }
  }

  this.render = function() {
    this.syms.forEach(function(sym) {
      if (sym.first) {
        fill(150, 255, 150);
      } else {
        fill(0, 200, 60);
      }
      text(sym.val, sym.x, sym.y);
      sym.rain();
      sym.setToRandomSymbol();
    });
  }
}
