var keys = [].slice.call(document.querySelectorAll('.buttons span'));
var results = document.querySelector('.results');
var operationHTML = document.querySelector('.operation input');
var operationJS = '';
var lastResult = 0;

keys.forEach(function(key){
	key.addEventListener("click", function(e){
		console.log('lol', e);
		addKey(e.target.getAttribute('value'));
	}, false);
});

operationHTML.addEventListener('keyup', function(e){
	if(e.keyCode === 13){
		calculate();
	}else if(e.keyCode === 27){
		clear();
	}else{
		operationJS = operationHTML.value;
	}
}, false);

function addKey(v){
	if(v === '='){
		calculate();
	}else if(v === 'ANS'){
		operationJS += lastResult;
		operationHTML.value += lastResult;
	}else if(v === 'C'){
		clear();
	}else{
		operationJS += v;
		operationHTML.value += v;
	}
	
}

function calculate(){
	lastResult = eval(operationJS); // jshint ignore:line
	results.innerHTML += '<span>'+operationHTML.value+'</span>';
	results.innerHTML += '<strong>'+lastResult+'</strong>';
	operationJS = '';
	operationHTML.value = '';
}
function clear(){
	operationJS = '';
	operationHTML.value = '';
}