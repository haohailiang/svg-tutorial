var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_NS = 'http://www.w3.org/1999/xlink';

var select = document.getElementById('text-path-select');
var text = document.getElementById('text');
var tspan = document.getElementById('tspan');

function addTextPath() {
	var textPath = document.createElementNS(SVG_NS, 'textPath');
	while(text.firstChild) {
		textPath.appendChild(text.firstChild);
	}
	text.appendChild(textPath);
}

function setTextPath(path) {
	var textPath = text.firstChild;
	textPath.removeAttributeNS(XLINK_NS, 'xlink:href');
	textPath.setAttributeNS(XLINK_NS, 'xlink:href', path);

	var pathElement = document.querySelector(path);
	tspan.setAttribute('fill', pathElement.getAttribute('stroke'));
}

function removeTextPath() {
	var textPath = text.firstChild;
	while(textPath.firstChild) {
		text.appendChild(textPath.firstChild);
	}
	text.removeChild(textPath);
	tspan.removeAttribute('fill')
}

select.addEventListener('input', function() {
	var value = select.value;
	if( text.firstChild.tagName && text.firstChild.tagName.toLowerCase() == 'textpath') {
		removeTextPath();
		addTextPath();
		setTextPath(value);
	}
	else {
		if(value != 'none') {
			addTextPath();
			setTextPath(value);
		}
	}
}, false);