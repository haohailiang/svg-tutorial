var n = 26;
var x = [];
var y = null;
var i = n;
var s = 100;
var w = 0.02;
var t = 0;

while(i--) x.push(10);

function arrange(t) {
	y = [];
	var ly = 0, cy;
	for(i=0; i<n; ++i) {
		cy = -s * Math.sin( w * i * 20 + t);
		y.push(cy - ly);
		ly = cy;
	}
}

console.log(y)

function render() {
	sintext.setAttribute('dx', x.join(' '));
	sintext.setAttribute('dy', y.join(' '));
}

function frame() {
	t += 0.01;
	arrange(t);
	render();
	requestAnimationFrame(frame);
}

frame()