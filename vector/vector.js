(function() {
  function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  Vector.prototype = {
    constructor: Vector,
    square: function() {
      return this.x * this.x + this.y * this.y;
    },
    length: function() {
      return Math.sqrt(this.square());
    },
    add: function(q) {
      return new Vector(this.x + q.x, this.y + q.y);
    },
    minus: function(q) {
      return new Vector(this.x - q.x, this.y - q.y);
    },
    multipy: function(scale) {
      return new Vector(this.x * scale, this.y * scale);
    },
    normalize: function(length) {
      if (length === undefined) {
        length = 1;
      }
      return this.multipy(length / this.length());
    }
  }
  Vector.fromPoints = function(p1, p2) {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
  };
  window.Vector = Vector;
})();
// var points = 'a,b,c,d,e,f,g,h'.split(',').map(function(name, index, arr) {
var points = 'a,b,c'.split(',').map(function(name, index, arr) {
  return {
    name: name,
    color: 'hsl(' + (360 * index / arr.length) + ', 100%, 60%)'
  };
});
var relation = 300;
var svg = document.querySelector('svg');
var k = 0.05;

var Vector = window.Vector;

function random(min, max) {
  return Math.round(min + (max - min) * Math.random());
}

points.forEach(function(point) {
  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  var x = random(-200, 200);
  var y = random(-200, 200);
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', 10);
  circle.setAttribute('fill', point.color);

  svg.appendChild(circle);

  point.circle = circle;
  point.s = new Vector(x, y);
  point.v = new Vector();
  point.a = new Vector();
});
var lastFrameTime = +(new Date());

function update() {
  var frameTime = +(new Date());
  var t = frameTime - lastFrameTime;

  t /= 100;

  points.forEach(function(pa) {
    var f = new Vector();

    points.forEach(function(pb) {
      if (pa == pb) return;

      var x = Vector.fromPoints(pa.s, pb.s);

      var delta = x.length() - relation;

      f = f.add(x.normalize(delta * k));
    });
    pa.a = f;
    pa.v = pa.v.add(pa.a.multipy(t)).multipy(0.98);
    pa.s = pa.s.add(pa.v.multipy(t));

    pa.circle.setAttribute('cx', pa.s.x);
    pa.circle.setAttribute('cy', pa.s.y);
  });

  //连接更新
  var linkPath = [];
  points.forEach(function(pa) {
    var sa = pa.s;
    points.forEach(function(pb) {
      if (pa == pb) return;
      var sb = pb.s;
      linkPath = linkPath.concat([
        'M', sa.x, sa.y,
        'L', sb.x, sb.y
      ]);
    });
  });
  document.getElementById('links').setAttribute('d', linkPath.join(' '));

  lastFrameTime = frameTime;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);