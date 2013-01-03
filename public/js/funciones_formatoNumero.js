function inputFormatNum(objInputFormatNum,formatNumLen,formatNumDec,formatNumMil,formatNumOnEditChange) {
	var objInputFormatNum_Aux	 = objInputFormatNum.value;
	var objInputFormatNum_Cambio = false;
	var objInputFormatNum_Init	 = false;

	if (formatNumLen == null) {
		formatNumLen = 0;
	}

	if (formatNumDec == null) {
		formatNumDec = 0;
	}

	if (formatNumLen < formatNumDec) {
		formatNumLen = 0;
		formatNumDec = 0;
	}

	if (formatNumMil == null) {
		formatNumMil = true;
	}

	objInputFormatNum.formatNumLen	 = formatNumLen;
	objInputFormatNum.formatNumDec	 = formatNumDec;
	objInputFormatNum.formatNumMil	 = formatNumMil;
	objInputFormatNum.formatNumValue = "";
	objInputFormatNum.onEditChange	 = formatNumOnEditChange;
	objInputFormatNum.onfocus		 = inputFormatNum_GotFocus;
	objInputFormatNum.onkeydown		 = function(event) {inputFormatNum_KeyDown(event);};
	objInputFormatNum.onkeyup		 = function(event) {inputFormatNum_KeyUp(event);};
	objInputFormatNum.onblur		 = inputFormatNum_LostFocus;
	objInputFormatNum.onclick		 = inputFormatNum_OnClick;
	objInputFormatNum.oncut			 = function(event) {inputFormatNum_OnCut(event);};
	objInputFormatNum.onpaste		 = function(event) {inputFormatNum_OnPaste(event);};

	inputFormatNum_LostFocus();

	function inputFormatNum_GetKeyCode(event) {
		event = event ? event : objInputFormatNum.ownerDocument.parentWindow.event;
		return(event.keyCode?event.keyCode:event.which?event.which:event.charCode);
	}

	function inputFormatNum_GetSelectionStart() {
		if (objInputFormatNum.createTextRange) {
			$C=document.selection.createRange().duplicate();
			$C.moveEnd("character",objInputFormatNum.value.length);
			$j=objInputFormatNum.value.lastIndexOf($C.text);
			if ($C.text=="") $j=objInputFormatNum.value.length;
			return $j;
		}else{
			return objInputFormatNum.selectionStart;
		}
	}

	function inputFormatNum_GetSelectionEnd() {
		if (objInputFormatNum.createTextRange) {
			$C=document.selection.createRange().duplicate();
			$C.moveStart("character",-objInputFormatNum.value.length);
			$j=$C.text.length;
			return $j;
		}else{
			return objInputFormatNum.selectionEnd;
		}
	}

	function inputFormatNum_PutCaretPos($j) {
		if ($j<=0) {
			$j=0;
		}
		if ($j!=-1) {
			if (objInputFormatNum.createTextRange) {
				var $w=objInputFormatNum.createTextRange();
				$w.moveStart("character",$j);
				$w.moveEnd("character",$j-objInputFormatNum.value.length);
				$w.select();
			}else if (objInputFormatNum.setSelectionRange) {
				objInputFormatNum.focus();
				objInputFormatNum.setSelectionRange($j,$j);
			}
		}else{
			objInputFormatNum.blur();
		}
	}

	function inputFormatNum_ChangeCar() {
		if (objInputFormatNum.value != objInputFormatNum_Aux) {
			if (!objInputFormatNum_Cambio) {
				eval(objInputFormatNum.onEditChange);
				objInputFormatNum_Cambio = true;
			}
		}
	}

	function inputFormatNum_OnClick() {
		if (!objInputFormatNum_Init) {
			inputFormatNum_Init();
		}
	}

	function inputFormatNum_KeyDown(event) {
		if (!objInputFormatNum_Init) {
			inputFormatNum_Init();
		}

		var key			= inputFormatNum_GetKeyCode(event);
		var pos			= inputFormatNum_GetSelectionStart();
		var dig_ent_max	= objInputFormatNum.formatNumLen - objInputFormatNum.formatNumDec;
		var dig_dec_max	= objInputFormatNum.formatNumDec;
		var pos_dec		= -1;
		var dig_ent		= 0;
		var dig_dec		= 0;

		for (m=0; m<objInputFormatNum.value.length; m++) {
			if (objInputFormatNum.value.charAt(m) == ",") {
				pos_dec = m;
			}else{
				if (parseInt(objInputFormatNum.value.charAt(m),10) >= 0 && parseInt(objInputFormatNum.value.charAt(m),10) <= 9) {
					if (pos_dec != -1) {
						dig_dec++
					}else{
						dig_ent++
					}
				}
			}
		}

		var numeros = (key>=48 && key<=57 || key>=96 && key<=105) && ((pos_dec!=-1 && pos>pos_dec) || dig_ent<dig_ent_max) && (pos<=pos_dec || dig_dec<dig_dec_max || dig_dec_max==0);
		var menos = key==109 && pos==0;
		var punto = (key==110 || key==190) && objInputFormatNum.value.search(",")==-1 && pos==objInputFormatNum.value.length && dig_dec_max>0;
		var coma = key==188 && objInputFormatNum.value.search(",")==-1 && pos==objInputFormatNum.value.length && dig_dec_max>0;
		var backspace = key==8 && (objInputFormatNum.value.charAt(pos-1)!="," || objInputFormatNum.value.charAt(objInputFormatNum.value.length-1)==",") && objInputFormatNum.value.substr(pos-1,2)!="0,";
		var suprimir = key==46 && (objInputFormatNum.value.charAt(pos)!="," || objInputFormatNum.value.charAt(objInputFormatNum.value.length-1)==",") && objInputFormatNum.value.substr(pos,2)!="0,";
		var inicio = key==36;
		var fin = key==35;
		var izquierda = key==37;
		var derecha = key==39;
		var tabulacion = key==9;
		var enter = key==13;

		var cancelar = false;

		if (izquierda) {
			pos = inputFormatNum_GetSelectionStart() - 1;
			if (objInputFormatNum.value.charAt(pos)==".") {
				inputFormatNum_PutCaretPos(pos - 1);
				cancelar = true;
			}
		}else if (derecha) {
			pos = inputFormatNum_GetSelectionStart() + 1;
			if (objInputFormatNum.value.charAt(pos)==".") {
				inputFormatNum_PutCaretPos(pos + 1);
				cancelar = true;
			}
		}else if (!(numeros || menos || punto || coma || backspace || suprimir || inicio || fin || tabulacion || enter)) {
			cancelar = true;
		}

		if (cancelar) {
			inputFormatNum_StopEvent(event);
		}
	}

	function inputFormatNum_StopEvent(event) {
		if (document.all) {
			event = event ? event : objInputFormatNum.ownerDocument.parentWindow.event;
			event.returnValue=false;
		}else if (event.stopPropagation) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	function inputFormatNum_KeyUp(event) {
		var key = inputFormatNum_GetKeyCode(event);
		var pos = inputFormatNum_GetSelectionStart();

		var numeros = key>=48 && key<=57 || key>=96 && key<=105;
		var menos = key==109 && pos==0;
		var punto = (key==110 || key==190) && objInputFormatNum.value.search(",")==-1 && pos==objInputFormatNum.value.length;
		var coma = key==188 && objInputFormatNum.value.search(",")==-1 && pos==objInputFormatNum.value.length;
		var backspace = key==8;
		var suprimir = key==46;

		if (numeros || menos || punto || coma || backspace || suprimir) {
			valor = objInputFormatNum.value
			caracter = valor.charAt(valor.length-1)

			pat = /[\.,\*,\+,\-,\(,\),\?,\,$,\\$,\[,\],\^]/

			if (isNaN(caracter) || pat.test(caracter) == true) {
				if (pat.test(caracter)==true){
					caracter = "\\" + caracter
				}
				carcter = new RegExp(caracter,"g")
				if (caracter=="\\." || caracter=="\\,") {
					valor = valor.substr(0,valor.length-1) + ","
				}else{
					valor = valor.replace(carcter,"")
				}
				objInputFormatNum.value = valor
			}

			if (valor.charAt(valor.length-1) != ",") {
				var valorFormateado = inputFormatNum_Formatear();

				var pos = inputFormatNum_GetSelectionStart();

				if (valorFormateado.charAt(0) == ",") {
					valorFormateado = "0" + valor;
					pos++;
				}

				if (objInputFormatNum.value != valorFormateado && (suprimir || backspace)) {
					if (objInputFormatNum.value.charAt(1) == "." && (objInputFormatNum.value.search(",") == -1 || pos <= objInputFormatNum.value.search(","))) {
						if (suprimir) {
							if (objInputFormatNum.value.charAt(pos) != ".") {
								pos--;
							}
						}else{
							pos--;
						}
					}
				}

				var aux = objInputFormatNum.value
				objInputFormatNum.value = valorFormateado

				if (suprimir || backspace) {
					if (suprimir) {
						if (objInputFormatNum.value.charAt(pos) == ".") {
							pos++;
						}
					}
				}else{
					pos += objInputFormatNum.value.split(".").length - aux.split(".").length;
				}

				inputFormatNum_PutCaretPos(pos);
			}else{
				if (objInputFormatNum.value.charAt(0) == ",") {
					objInputFormatNum.value = "0" + valor;
				}
			}

			objInputFormatNum.formatNumValue = inputFormatNum_UnFormatNum();
		}
	}

	function inputFormatNum_Formatear() {
		var retorno	 = "";
		var valor	 = objInputFormatNum.value;
		var largo	 = valor.length;

		var cont_ent = 0;
		var cont_dec = 0;
		var decimal	 = false;
		var nums_ent = new Array();
		var nums_dec = new Array();

		for (m=0; m<largo; m++) {
			if (valor.charAt(m) == "." || valor.charAt(m) == "," || valor.charAt(m) == " ") {
				if (valor.charAt(m) == ",") {
					decimal = true;
				}
				continue;
			}else{
				if (decimal) {
					nums_dec[cont_dec] = valor.charAt(m)
					cont_dec++
				}else{
					nums_ent[cont_ent] = valor.charAt(m)
					cont_ent++
				}
			}
		}

		if (nums_ent.length > 3 || nums_dec.length > 0 || largo > 3) {
			var cad1="", cad2="", tres=0

			for (k=nums_ent.length-1; k>=0; k--) {
				cad1 = nums_ent[k]
				cad2 = cad1 + cad2
				tres++

				if (objInputFormatNum.formatNumMil && (tres%3) == 0) {
					if (k!=0) {
						cad2 = "." + cad2
					}
				}
			}

			for (k=0; k<nums_dec.length; k++) {
				cad1 = nums_dec[k]

				if (k==0) {
					cad2 += ","
				}

				cad2 += cad1
			}

			retorno = cad2
		}else{
			retorno = valor
		}

		inputFormatNum_ChangeCar();

		return retorno;
	}

	function inputFormatNum_GotFocus() {
		if (objInputFormatNum.createTextRange) {
			var rango=objInputFormatNum.createTextRange();
			rango.moveStart("character",0);
			rango.moveEnd("character",0);
			rango.select();
		}else if (objInputFormatNum.setSelectionRange) {
			objInputFormatNum.focus();
			objInputFormatNum.setSelectionRange(0,objInputFormatNum.value.length);
		}

		objInputFormatNum_Cambio = false;
		inputFormatNum_Init();
	}

	function inputFormatNum_Init() {
		objInputFormatNum_Aux = objInputFormatNum.value;
		objInputFormatNum_Init = true;
	}

	function inputFormatNum_LostFocus() {
		var valor = objInputFormatNum.value

		if (valor.charAt(valor.length-1) == ",") {
			objInputFormatNum.value = valor.substr(0,valor.length-1)
		}

		objInputFormatNum.formatNumValue = inputFormatNum_UnFormatNum();
	}

	function inputFormatNum_OnCut(event) {
		if (window.clipboardData) {
			var $k=inputFormatNum_GetSelectionStart();
			var $l=inputFormatNum_GetSelectionEnd();

			if ($k==0&&$l==objInputFormatNum.value.length) {
				objInputFormatNum.ownerDocument.parentWindow.clipboardData.setData("Text",objInputFormatNum.value);
				objInputFormatNum.value="";
				inputFormatNum_GotFocus();
			}else{
				objInputFormatNum.ownerDocument.parentWindow.clipboardData.setData("Text",objInputFormatNum.value.substring($k,$l));

				var x  = objInputFormatNum.value;
				var $t = x.substring(0,$k);
				var $u = x.substring($l,x.length);
				objInputFormatNum.value = $t + $u;

				inputFormatNum_PutCaretPos($k);
			}

			inputFormatNum_StopEvent(event);

			objInputFormatNum.value = inputFormatNum_Formatear();
		}
	}

	function inputFormatNum_OnPaste(event) {
		if (window.clipboardData) {
			var $d=objInputFormatNum.ownerDocument.parentWindow.clipboardData.getData("Text");
			var $k=inputFormatNum_GetSelectionStart();
			var $l=inputFormatNum_GetSelectionEnd();

			if ($k==0&&$l==objInputFormatNum.value.length) {
				objInputFormatNum.value=$d;
				inputFormatNum_GotFocus();
			}else{
				var x  = objInputFormatNum.value;
				var $t = x.substring(0,$k);
				var $u = x.substring($l,x.length);
				objInputFormatNum.value = $t + $d + $u;

				inputFormatNum_PutCaretPos($k);
			}

			inputFormatNum_StopEvent(event);

			objInputFormatNum.value = inputFormatNum_Formatear();
		}
	}

	function inputFormatNum_UnFormatNum() {
		var valor = objInputFormatNum.value;

		valor = valor.replace(/\./g,"");
		valor = valor.replace(/\,/g,".");
		valor = parseFloat(valor,10);

		if (isNaN(valor)) {
			valor = "";
		}

		return valor;
	}
}
