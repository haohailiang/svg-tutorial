var SVG_NS = "http://www.w3.org/2000/svg";

// 图形及对应默认属性
var shapeInfo = {
  rect: 'x:10, y:10, width:200, height:100, rx:10, ry:10',
  circle: 'cx:200, cy:200, r:50',
  ellipse: 'cx:200, cy:200, rx:80, ry:30',
  line: 'x1:10, y1:10, x2:100, y2:100'
};

// 默认公共属性
var defaultAttrs = {
  fill: '#FFFFFF',
  stroke: '#FF0000'
};

var createForm = document.getElementById('create-shape');
var attrForm = document.getElementById('shape-attrs');
var lookForm = document.getElementById('look-and-transform');

var svg =createSVG();
var selected = null;

svg.addEventListener('click', function(e) {
  if(e.target.tagName.toLowerCase() in shapeInfo) {
    select(e.target);
  }
}, false);

createForm.addEventListener('click', function(e) {
  if(e.target.tagName.toLowerCase() == 'button') {
    create(e.target.getAttribute('create'));
  }
})

attrForm.addEventListener('input', function(e) {
  if(e.target.tagName.toLowerCase() != 'input') return;
  var handle = e.target;
  selected.setAttribute(handle.name, handle.value);
})

lookForm.addEventListener('input', function(e) {
  if(e.target.tagName.toLowerCase() != 'input') return;
  if(!selected) return;
  selected.setAttribute('fill', fill.value);
  selected.setAttribute('stroke', stroke.value);
  selected.setAttribute('stroke-width', strokeWidth.value);
  selected.setAttribute('transform', encodeTranform({
    tx: translateX.value,
    ty: translateY.value,
    scale: scale.value,
    rotate: rotate.value
  }));
}, false);

// 创建一个面板
function createSVG() {
  var svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  // id是canvas可以直接选取
  canvas.appendChild(svg);

  svg.addEventListener('click', function(e) {
    if(e.target.tagName.toLowerCase() in shapeInfo) {
      select(e.target);
    }
  }, false);

  return svg;
}

function create(name) {
  var shape = document.createElementNS(SVG_NS, name);
  svg.appendChild(shape);
  select(shape);
}

function select(shape) {
  var attrs = shapeInfo[shape.tagName].split(',');
  var attr, name, value;

  attrForm.innerHTML = '';

  while (attrs.length) {
    attr = attrs.shift().split(':');
    name = attr[0].trim();
    value = shape.getAttribute(name) || attr[1];
    createHandle(shape, name, value);
    shape.setAttribute(name, value);
  }

  for(name in defaultAttrs) {
    value = shape.getAttribute(name) || defaultAttrs[name];
    shape.setAttribute(name, value);
  }
  selected = shape;

  updateLookHandle();
}

function createHandle(shape, name, value) {
  var label = document.createElement('label');
  label.textContent = name;

  var handle = document.createElement('input');
  handle.setAttribute('name', name);
  handle.setAttribute('type', 'range');
  handle.setAttribute('value', value);
  handle.setAttribute('min', 0);
  handle.setAttribute('max', 800);

  attrForm.appendChild(label);
  attrForm.appendChild(handle);
}

function updateLookHandle() {
  fill.value = selected.getAttribute('fill');
  stroke.value = selected.getAttribute('stroke');
  var t = decodeTransform(selected.getAttribute('transfrom'));
  translateX.value = t ? t.tx : 0;
  translateY.value = t ? t.ty : 0;
  rotate.value = t ? t.rotate : 0;
  scale.value = t ? t.scale : 1;
}

function decodeTransform(transString) {
  var match = /translate\((\d+),(\d+)\)\stroke\((\d+)\)\sscale\((\d+)\)/.exec(transString);
  return match ? {
    tx: +match[1],
    ty: +match[2],
    rotate: +match[3],
    scale: +match[4],
  } : null;
}

function encodeTranform(transObject) {
  return ['translate(', transObject.tx, ',', transObject.ty, ') ',
          'rotate(', transObject.rotate, ') ',
          'scale(', transObject.scale, ') '].join('');
}
