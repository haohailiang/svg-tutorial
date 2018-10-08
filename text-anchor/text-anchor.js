var values = "auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge | text-top | text-bottom".split(' | ');

values.forEach(function(value) {
  var opt = document.createElement('option');
  opt.value = opt.textContent = value;
  select.appendChild(opt);
});

select.addEventListener('input', function() {
  text.setAttribute('dy', 0);
  var dy = getAlignmentDy(select.value);
  text.setAttribute('dy', dy);
  // text.setAttribute('dominant-baseline', select.value);
  var box = text.getBBox();
  rect.setAttribute('x', box.x);
  rect.setAttribute('y', box.y);
  rect.setAttribute('width', box.width);
  rect.setAttribute('height', box.height);
});

ta.addEventListener('input', function() {
  text.setAttribute('text-anchor', ta.value);
});

function getAlignmentDy(value) {
  var box = text.getBBox();
  var y = +text.getAttribute('y');

  switch(value) {
    case 'top' : return box.y - y;
    case 'middle' : return box.y + box.height / 2 - y;
    case 'bottom' : return boy.y + box.height - y;
  }
}
