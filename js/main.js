function addKey(a){"="===a?calculate():"ANS"===a?(operationJS+=lastResult,operationHTML.value+=lastResult):"C"===a?clear():(operationJS+=a,operationHTML.value+=a)}function calculate(){lastResult=eval(operationJS),results.innerHTML+="<span>"+operationHTML.value+"</span>",results.innerHTML+="<strong>"+lastResult+"</strong>",operationJS="",operationHTML.value=""}function clear(){operationJS="",operationHTML.value=""}var keys=[].slice.call(document.querySelectorAll(".buttons span")),results=document.querySelector(".results"),operationHTML=document.querySelector(".operation input"),operationJS="",lastResult=0;keys.forEach(function(a){a.addEventListener("click",function(a){console.log("lol",a),addKey(a.target.getAttribute("value"))},!1)}),operationHTML.addEventListener("keyup",function(a){13===a.keyCode?calculate():27===a.keyCode?clear():operationJS=operationHTML.value},!1);