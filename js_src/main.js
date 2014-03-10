var YC = {
	$keys: [].slice.call(document.querySelectorAll('.buttons span')),
	$results: document.querySelector('.results'),
	$operationHTML: document.querySelector('.operation input'),
	$body: document.body,
	operationJS: '',
	lastResult: 0
};


/* FUNCTIONS
---------------------------------------*/
YC.addKey = function(v){
	if(v === '='){
		YC.calculate();
	}else if(v === 'ANS'){
		YC.operationJS += YC.lastResult;
		YC.$operationHTML.value += YC.lastResult;
	}else if(v === 'C'){
		YC.clear();
	}else{
		YC.operationJS += v;
		YC.$operationHTML.value += v;
	}
};

YC.calculate = function(){
	YC.lastResult = eval(YC.operationJS); // jshint ignore:line
	YC.$results.innerHTML += '<span>'+YC.$operationHTML.value+'</span>';
	YC.$results.innerHTML += '<strong>'+YC.lastResult+'</strong>';
	YC.operationJS = '';
	YC.$operationHTML.value = '';
	YC.$results.scrollTop = 10000;
};
YC.clear = function(){
	YC.operationJS = '';
	YC.$operationHTML.value = '';
};

YC.updateOnlineStatus = function() {
  var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
  YC.$body.setAttribute("class", condition);
  console.log('Status ',condition);
};


/* BINDINGS
---------------------------------------*/
window.addEventListener("online", function(){
	YC.updateOnlineStatus();
});
window.addEventListener("offline", function(){
	YC.updateOnlineStatus();
});

YC.$keys.forEach(function(key){
	key.addEventListener("click", function(e){
		YC.addKey(e.target.getAttribute('value'));
	}, false);
});

YC.$operationHTML.addEventListener('keyup', function(e){
	if(e.keyCode === 13){
		YC.calculate();
	}else if(e.keyCode === 27){
		YC.clear();
	}else{
		YC.operationJS = YC.$operationHTML.value;
	}
}, false);

YC.updateOnlineStatus();




