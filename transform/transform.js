function target() {
	return document.getElementById(group.value);
}

function tc2ts(tc) {
	var arr = (tc || '').split(' ');
	var ts = '';
	var elem, lastElemType;
	var cmd = {
		't': 'translate(',
		'r': 'rotate(',
		's': 'scale(',
		'm': 'matrix('
	};

	while(elem = arr.shift()) {
		if(cmd[elem]) {
			if(lastElemType == 'number') ts += ') ';
			ts += cmd[elem];
			lastElemType = 'command';
		}
		else {
			if(lastElemType == 'number') ts += ', ';
			ts += elem;
			lastElemType = 'number';
		}
	}
	if(ts.length) ts += ')';
	return ts;
}

group.oninput = function() {
	tc.value = target().tc || '';
	ts.innerHTML = tc2ts(tc.value);
}

tc.oninput = function() {
	target().tc = tc.value;
	target().setAttribute('transform', ts.innerHTML = tc2ts(tc.value));
}