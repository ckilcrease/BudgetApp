//main.js

/*client-side validation for purchase removal form:*/
function validateRemoval(){
	const purs = document.forms["remPur"]["purchases"].value;
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	const checkArray = Array.prototype.slice.call(checkboxes);
	const atLeastOne = checkArray.some(x => x.checked);
	if (atLeastOne){
		return true;
	}
	//else:
	const err = elt("div", "You must select at least one purchase before submitting.");
	err.classList.add("alert", "alert-warning");
	//integrate error message into the DOM:
	const errCont = document.querySelector(".cont");
	errCont.appendChild(err);

	return false;
}



function elt(type){
	const node = document.createElement(type);
	for (let i = 1; i < arguments.length; i++){
		let child = arguments[i];
		if (typeof child == "string"){
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
}