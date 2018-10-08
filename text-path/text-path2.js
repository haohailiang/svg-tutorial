var ctrl = document.getElementById('ctrl');
var text = document.querySelector('text');
var textPath = text.firstElementChild;

function update(target) {
	var attr = target.getAttribute('ctrl');
	if(!attr) return;
	if(attr == 'startOffset') {
		textPath.setAttribute(attr, target.value + '%');
	}
	else {
		text.setAttribute(attr, target.value);
	}
}

ctrl.addEventListener('input', function(e) {
	update(e.target);
});
ctrl.addEventListener('reset', function() {
	setTimeout(function(){
		var list = document.querySelectorAll('#ctrl *[ctrl]');
		[].slice.call(list).forEach(update);
	})
})