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
	var result;
	var resultHTML = '';
	
	// Test if forbidden characters
	if(!YC.operationJS.match(/^[+\-0-9(). *\/]+$/)){
		YC.$results.innerHTML += '<div class="error cf"><strong>Character not allowed</strong></div>';
		YC.$results.scrollTop = 10000;
		return false;
	}

	// Try the calculation to catch errors
	try{
		result = eval(YC.operationJS); // jshint ignore:line
	}catch(err){
		YC.$results.innerHTML += '<div class="error cf"><strong>Can\'t calculate expression</strong></div>';
		YC.$results.scrollTop = 10000;
		return false;
	}

	// Avoid undefined
	if(typeof result === 'undefined'){
		return false;
	}

	// Display
	YC.lastResult = result;
	resultHTML += '<div class="cf">';
	resultHTML += '	<span>'+YC.$operationHTML.value.replace('*','&times;').replace('/','÷')+'</span>';
	resultHTML += '	<strong>'+YC.lastResult+'</strong>';
	resultHTML += '</div>';
	YC.$results.innerHTML += resultHTML;
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




