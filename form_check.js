
function isWhiteSpaceOrEmpty(str){
	return /^[\s\t\r\n]*$/.test(str);
}


function checkPerson(str){
	return /^[A-Z][a-z]+$/.test(str);
}


function checkStr(str){
	return !isWhiteSpaceOrEmpty(str);
}


function isEmailValid(str){
	let email = /^[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+$/;
	return email.test(str);
}

function isAdressValid(str){
	let adress = /^[0-9]{2}-[0-9]{3}$/;
	return adress.test(str);
}


function checkStringAndFocus(obj, msg, validationFunc){
	let str = obj.value;
	let errorFieldName = "e_"+ obj.name.substr(2, obj.name.length);
	var returnStatus = validationFunc(str);
	if (!returnStatus) {
		document.getElementById(errorFieldName).innerHTML = msg;
		obj.focus();
		return false;
	} else {
		document.getElementById(errorFieldName).innerHTML = "";
		return true;
	}
}

function pNameVisibility(char){
 	 var row = document.getElementById("nPanienskieRow");
 	 if(char == 'f'){
 	 	row.style.display = '';
 	 	//row.style.visibility="visible";
 	 } else {
 	 	row.style.display = 'none';	//Ten sposób nie zostawia pustego wiersza, w przeciwieństwie do 'hidden'.
 	 	//row.style.visibility="hidden";
 	 	document.getElementById("fNazwiskoInput").value = "";
 	 }
}

function checkFlag(flag, next){
	return flag == true? next : false;
}


function validate(formToCheck){
	let checkAll = true;
	let flag = true;
	let nameField = formToCheck.elements["f_imie"];
	let emailField = formToCheck.elements["f_email"];
	let adressField = formToCheck.elements["f_kod"];
	if(!checkAll){
		flag = checkFlag(flag, checkStringAndFocus(adressField, "Podaj właściwy kod pocztowy.", isAdressValid));
		flag = checkFlag(flag, checkStringAndFocus(emailField, "Podaj właściwy e-mail.", isEmailValid));
		flag = checkFlag(flag, checkStringAndFocus(nameField, "Podaj imię!", checkPerson));
	} else {
		let nazwiskoField = formToCheck.elements["f_nazwisko"];
		let ulicaField = formToCheck.elements["f_ulica"];
		let miastoField = formToCheck.elements["f_miasto"];
		let fNazwiskoP = formToCheck.elements["f_nazwisko_p"];
		flag = checkFlag(flag, checkStringAndFocus(miastoField, "Podaj właściwe miasto.", checkStr));
		flag = checkFlag(flag, checkStringAndFocus(ulicaField, "Podaj właściwą ulicę.", checkStr));
		flag = checkFlag(flag, checkStringAndFocus(adressField, "Podaj właściwy kod pocztowy.", isAdressValid));
		flag = checkFlag(flag, checkStringAndFocus(emailField, "Podaj właściwy e-mail.", isEmailValid));
		flag = checkFlag(flag, checkStringAndFocus(fNazwiskoP, "Podaj właściwe nazwisko panieńskie.", checkPerson));
		flag = checkFlag(flag, checkStringAndFocus(nazwiskoField, "Podaj właściwe nazwisko.", checkPerson));			
		flag = checkFlag(flag, checkStringAndFocus(nameField, "Podaj imię!", checkPerson));
	}
	return flag; 
}



function alterRows(i, e){
	if(e){
		if(i % 2 == 1){
			e.setAttribute("style", "background-color: Aqua;");
		}
		e = e.nextSibling;
		while(e && e.nodeType != 1){
			e = e.nextSibling;
		}
		alterRows(++i, e);
	}
}


function nextNode(e){
	while(e && e.nodeType != 1){
		e = e.nextSibling;
	}
	return e;
}


function prevNode(e){
	while(e && e.nodeType != 1){
		e = e.previousSibling;
	}
	return e;
}


function swapRows(b){
	let tab = prevNode(b.previousSibling);
	let tBody = nextNode(tab.firstChild);
	let lastNode = prevNode(tBody.lastChild);
	tBody.removeChild(lastNode);
	let firstNode = nextNode(tBody.firstChild);
	tBody.insertBefore(lastNode, firstNode);
}


function cnt(form, msg, maxSize) {
	if(form.value.length > maxSize){
		form.value = form.value.substring(0, maxSize);
	} else {
		msg.innerHTML = maxSize - form.value.length;
	}
}
