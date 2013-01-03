// JavaScript Document
function maskRut(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
	campo.style.textTransform = "uppercase";

    maskField(campo,
    		  "nn.nnn.nnn-x",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{2})\\.(\\d{3})\\.(\\d{3})\\-([0-9Kk])$",
    		  "objInputMask.value=objInputMask.value.toUpperCase(); objInputMask.maskValue=objInputMask.maskValue.toUpperCase(); if (campoValido(objInputMask,'"+descripcion+"',isRut,0)) {" + codigoSecuenciaOK + "}",
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskFecha(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nn-nn-nnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{2})\\-(\\d{2})\\-(\\d{4})$",
    		  "if (campoValido(objInputMask,'"+descripcion+"',isDate,0)) {" + codigoSecuenciaOK + "}",
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskHora(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nn:nn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{2})\\:(\\d{2})$",
    		  "if (campoValido(objInputMask,'"+descripcion+"',isTime,0)) {" + codigoSecuenciaOK + "}",
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskIngreso(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nn.nnn.nnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{2})\\.(\\d{3})\\.(\\d{3})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskFechaHora(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nn-nn-nnnn nn:nn:nn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{2})\\-(\\d{2})\\-(\\d{4}) (\\d{2})\\:(\\d{2})\\:(\\d{2})$",
    		  "if (campoValido(objInputMask,'"+descripcion+"',isDateTime,0)) {" + codigoSecuenciaOK + "}",
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskAno(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{4})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskCuentaContable(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{8})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskItem(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{7})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskCCosto(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{4})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskProContable(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{4})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskConceptoContable(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
	campo.style.textTransform = "uppercase";

    maskField(campo,
    		  "xxxxxx",
    		  " ",
    		  autoSalto,
    		  descripcion,
    		  "",
    		  "objInputMask.value=trim(objInputMask.value.toUpperCase()); objInputMask.maskValue=trim(objInputMask.maskValue.toUpperCase());" + codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskAsignatura(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
	campo.style.textTransform = "uppercase";

    maskField(campo,
    		  "aannn",
    		  "_",
    		  autoSalto,
    		  descripcion,
    		  "^(\\w{2})(\\d{3})$",
    		  "objInputMask.value=objInputMask.value.toUpperCase(); objInputMask.maskValue=objInputMask.maskValue.toUpperCase();" + codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskPorcentajeDecimal(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnn.nn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{3})\\.(\\d{2})$",
    		  "if ((inputMask_UnMasked()/100) <= 100) {" + codigoSecuenciaOK + "}else{this.focus(); alert('Porcentaje no válido');}",
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskPorcentajeInteres(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "n.nn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{1})\\.(\\d{2})$",
    		  "if ((inputMask_UnMasked()/100) <= 100) {" + codigoSecuenciaOK + "}else{this.focus(); alert('Porcentaje no válido');}",
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskNDecimal(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnn.nn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{7})\\.(\\d{2})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskS2(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
	campo.style.textTransform = "uppercase";

    maskField(campo,
    		  "aa",
    		  " ",
    		  autoSalto,
    		  descripcion,
    		  "",
    		  "objInputMask.value=trim(objInputMask.value.toUpperCase()); objInputMask.maskValue=trim(objInputMask.maskValue.toUpperCase());" + codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "left");
}

function maskN1(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "n",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{1})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN2(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{2})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN3(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{3})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN4(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{4})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN6(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{6})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN5(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{5})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN7(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{7})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN8(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{8})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN9(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{9})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN10(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{10})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskN11(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{11})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}
function maskN15(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{15})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}
function maskN16(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{16})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskFolioCG(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{11})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}

function maskSolIngreso(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
    maskField(campo,
    		  "nnnnnnnnnn",
    		  "0",
    		  autoSalto,
    		  descripcion,
    		  "^(\\d{10})$",
    		  codigoSecuenciaOK,
    		  codigoSecuenciaCambio,
    		  "right");
}


function maskField(campo,mask,maskDisplay,maskAutoTab,maskDsc,regexPattern,onRegexMatch,onEditChange,inputIni) {
    inputMask(campo,
    		  mask,
    		  "n",
    		  "a",
    		  "x",
    		  maskDisplay,
    		  maskAutoTab,
    		  regexPattern,
    		  onRegexMatch,
			  "alert('Validación Fallida:\\n\\nCaracteres inválidos para el campo \"" + maskDsc + "\"'); objInputMask.focus();",
    		  onEditChange,
    		  inputIni);
}

function inputMask(objInputMask,mask,maskNumeric,maskAlpha,maskAlphaNumeric,maskDisplay,maskAutoTab,regexPattern,onRegexMatch,onRegexNoMatch,onEditChange,inputIni) {
	var objInputMask_Aux	= objInputMask.value;
	var objInputMask_Aux1	= "";
	var objInputMask_Cambio	= false;
	var objInputMask_Init	= false;

	if (typeof inputIni == "undefined") {
		inputIni = "left";
	}else{
		inputIni = inputIni.toLowerCase();
		if (inputIni != "left" && inputIni != "right") {
			inputIni = "left";
		}
	}

	objInputMask.mask			   = mask;
	objInputMask.maskNumeric	   = maskNumeric;
	objInputMask.maskAlpha		   = maskAlpha;
	objInputMask.maskAlphaNumeric  = maskAlphaNumeric;
	objInputMask.maskDisplay	   = maskDisplay;
	objInputMask.maskAutoTab	   = maskAutoTab;
	objInputMask.maskValue		   = "";
	objInputMask.regexPattern	   = regexPattern;
	objInputMask.onRegexMatch	   = onRegexMatch;
	objInputMask.onRegexNoMatch	   = onRegexNoMatch;
	objInputMask.onWrongKeyPressed = "";
	objInputMask.onEditChange	   = onEditChange;
	objInputMask.onfocus		   = inputMask_OnFocus;
	objInputMask.onkeydown		   = function(event) {inputMask_KeyDown(event);};
	objInputMask.onkeypress		   = function(event) {inputMask_KeyPress(event);};
	objInputMask.onblur			   = inputMask_LostFocus;
	objInputMask.onclick		   = inputMask_OnClick;
	objInputMask.oncut			   = function(event) {inputMask_OnCut(event);};
	objInputMask.onpaste		   = function(event) {inputMask_OnPaste(event);};
	objInputMask.oninput		   = inputMask_OnInput;
	objInputMask.mascara		   = inputMask_GetDisplayMask(true);
	objInputMask.inputIni		   = inputIni;

	function inputMask_OnInput() {
		inputMask_ValidateContent();
		inputMask_PutCaretPos(inputMask_GetSelectionStart());
	}

	function inputMask_ValidateContent() {
		var $c="";
		var $d=objInputMask.value;
		var $e=objInputMask.mask;
		var $f=objInputMask.maskAlpha;
		var $g=objInputMask.maskNumeric;
		var $h=objInputMask.maskAlphaNumeric;
		var $i=objInputMask.maskDisplay;

		for (i=0;i<$e.length;i++) {
			if ($e.substring(i,(i+1))==$f) {
				while ($d.length>0&&(!(($d.substring(0,1).charCodeAt(0)>=65&&$d.substring(0,1).charCodeAt(0)<=90)||($d.substring(0,1).charCodeAt(0)>=97&&$d.substring(0,1).charCodeAt(0)<=122)))) {
					$d=$d.substring(1);
				}
				if ($d.length>0) {
					$c+=$d.substring(0,1);
					$d=$d.substring(1);
				}else{
					$c+=$i;
				}
			}else if ($e.substring(i,(i+1))==$g) {
				while ($d.length>0&&(!($d.substring(0,1).charCodeAt(0)>=48&&$d.substring(0,1).charCodeAt(0)<=57))) {
					$d=$d.substring(1);
				}
				if ($d.length>0) {
					$c+=$d.substring(0,1);
					$d=$d.substring(1);
				}else{
					$c+=$i;
				}
			}else if ($e.substring(i,(i+1))==$h) {
				while ($d.length>0&&(!(($d.substring(0,1).charCodeAt(0)>=65&&$d.substring(0,1).charCodeAt(0)<=90)||($d.substring(0,1).charCodeAt(0)>=97&&$d.substring(0,1).charCodeAt(0)<=122)||($d.substring(0,1).charCodeAt(0)>=48&&$d.substring(0,1).charCodeAt(0)<=57)))) {
					$d=$d.substring(1);
				}
				if ($d.length>0) {
					$c+=$d.substring(0,1);
					$d=$d.substring(1);
				}else{
					$c+=$i;
				}
			}else{
				$c+=$e.substring(i,(i+1));
			}
		}

		objInputMask.value=$c;
	}

	function inputMask_OnPaste(event) {
		if (window.clipboardData) {
			var $k=inputMask_GetSelectionStart();
			var $l=inputMask_GetSelectionEnd();
			if ($k==0&&$l==objInputMask.value.length) {
				objInputMask.value="";
				inputMask_GotFocus();
			}else{
				var $i=objInputMask.maskDisplay;
				for (i=$k; i<$l; i++) {
					$j=inputMask_GetValidPos(i);
					if ($j<$l) {
						inputMask_UpdateChar($j,$i);
					}
				}
				inputMask_PutCaretPos($k);
			}
			objInputMask_Aux = objInputMask.value;
			var $d=objInputMask.ownerDocument.parentWindow.clipboardData.getData("Text");
			var $j=inputMask_PlaceInMask($d);
			objInputMask.ownerDocument.parentWindow.setTimeout("var objInputMask = document."+objInputMask.form.name+"."+objInputMask.name+"; var $j = "+$j+"; if (objInputMask.createTextRange) {var $w=objInputMask.createTextRange(); $w.moveStart(\"character\",$j); $w.moveEnd(\"character\",$j-objInputMask.value.length); $w.select();}else if (objInputMask.setSelectionRange) {objInputMask.focus(); objInputMask.setSelectionRange($j,$j);}if (objInputMask.maskAutoTab) {if ($j>objInputMask.value.length-1) {autoTabMask(objInputMask);}}",10);
			inputMask_StopEvent(event);
			inputMask_ChangeCar();
		}
	}

	function inputMask_OnCut(event) {
		if (window.clipboardData) {
			var $k=inputMask_GetSelectionStart();
			var $l=inputMask_GetSelectionEnd();
			if ($k==0&&$l==objInputMask.value.length) {
				objInputMask.ownerDocument.parentWindow.clipboardData.setData("Text",objInputMask.value);
				objInputMask.value="";
				inputMask_GotFocus();
			}else{
				var $i=objInputMask.maskDisplay;
				objInputMask.ownerDocument.parentWindow.clipboardData.setData("Text",objInputMask.value.substring($k,$l));
				for (i=$k; i<$l; i++) {
					$j=inputMask_GetValidPos(i);
					if ($j<$l) {
						inputMask_UpdateChar($j,$i);
					}
				}
				inputMask_PutCaretPos($k);
			}
			inputMask_StopEvent(event);
			inputMask_ChangeCar();
		}
	}

	function inputMask_PlaceInMask($d) {
		var $c="";

		if ($d.length>0) {
			var $e=objInputMask.mask;
			var $f=objInputMask.maskAlpha;
			var $g=objInputMask.maskNumeric;
			var $h=objInputMask.maskAlphaNumeric;
			var $i=objInputMask.maskDisplay;
			var $m=inputMask_GetSelectionStart();
			$c+=objInputMask.value.substring(0,$m);
			for (i=$m; i<$e.length;i++) {
				if ($e.substring(i,(i+1))==$f) {
					while ($d.length>0&&(!(($d.substring(0,1).charCodeAt(0)>=65&&$d.substring(0,1).charCodeAt(0)<=90)||($d.substring(0,1).charCodeAt(0)>=97&&$d.substring(0,1).charCodeAt(0)<=122)))) {
						$d=$d.substring(1);
					}
					if ($d.length>0) {
						$c+=$d.substring(0,1);
						$d=$d.substring(1);
					}else{
						break;
					}
				}else if ($e.substring(i,(i+1))==$g) {
					while ($d.length>0&&(!($d.substring(0,1).charCodeAt(0)>=48&&$d.substring(0,1).charCodeAt(0)<=57))) {
						$d=$d.substring(1);
					}
					if ($d.length>0) {
						$c+=$d.substring(0,1);
						$d=$d.substring(1);
					}else{
						break;
					}
				}else if ($e.substring(i,(i+1))==$h) {
					while ($d.length>0&&(!(($d.substring(0,1).charCodeAt(0)>=65&&$d.substring(0,1).charCodeAt(0)<=90)||($d.substring(0,1).charCodeAt(0)>=97&&$d.substring(0,1).charCodeAt(0)<=122)||($d.substring(0,1).charCodeAt(0)>=48&&$d.substring(0,1).charCodeAt(0)<=57)))) {
						$d=$d.substring(1);
					}
					if ($d.length>0) {
						$c+=$d.substring(0,1);
						$d=$d.substring(1);
					}else{
						break;
					}
				}else{
					$c+=$e.substring(i,(i+1));
				}
			}

			$c+=objInputMask.value.substring(i,$e.length);
		}

		objInputMask.value=$c;
		return i;
	}

	function inputMask_LostFocus() {
		var $e=objInputMask.mask;

		objInputMask.maskValue = inputMask_UnMasked();

		if ($e!=null&&objInputMask.value==inputMask_GetDisplayMask(true)) {
			objInputMask.value="";
		}else{
			if (objInputMask.value!=null&&objInputMask.value.length>0) {
				var $n=objInputMask.regexPattern;
				var $o=objInputMask.onRegexMatch;
				var $p=objInputMask.onRegexNoMatch;
				if ($n!=null&&$n.length>0) {
					var re=new RegExp($n);
					if (objInputMask.value.match(re)) {
						if ($o!=null&&$o.length>0) {
							if (objInputMask.value != objInputMask_Aux) {
								objInputMask_Aux = objInputMask.value;
								eval($o);
							}
						}
					}else{
						if ($p!=null&&$p.length>0) {
							eval($p);
						}
					}
				}else{
					if ($o!=null&&$o.length>0) {
						if (objInputMask.value != objInputMask_Aux) {
							objInputMask_Aux = objInputMask.value;
							eval($o);
						}
					}
				}
			}
		}
	}

	function inputMask_OnClick() {
		if (!objInputMask_Init) {
			inputMask_Init();
		}
	}

	function inputMask_KeyDown(event) {
		if (!objInputMask_Init) {
			inputMask_Init();
		}

		var $e=objInputMask.mask;

		if ($e!=null&&$e.length>0) {
			if (!document.all && ((event.ctrlKey && event.keyCode == event.DOM_VK_C) || (event.ctrlKey && event.keyCode == event.DOM_VK_INSERT) || (event.ctrlKey && event.keyCode == event.DOM_VK_X))) {
				inputMask_OnCut(event);
			}else if (!document.all && ((event.ctrlKey && event.keyCode == event.DOM_VK_V) || (event.shiftKey && event.keyCode == event.DOM_VK_INSERT))) {
				inputMask_OnPaste(event);
			}else{
				var k=inputMask_GetKeyCode(event);
				if (k==8||(k>=33&&k<=40)||k==46) {
					switch (k) {
						case 8:
							if (objInputMask.inputIni == "right" && inputMask_GetSelectionStart()==objInputMask.value.length && inputMask_GetSelectionEnd()==objInputMask.value.length) {
								if (objInputMask.value!=inputMask_GetDisplayMask(true)) {
									objInputMask.value="";
									inputMask_GotFocus();
									objInputMask_Aux="";

									objInputMask_Aux1 = objInputMask_Aux1.substr(0,objInputMask_Aux1.length-1);

									inputMask_AlReves(objInputMask.value.length);

									inputMask_ChangeCar();
								}
							}else{
								inputMask_KeyBackspace();
							}
							break;
						case 33:inputMask_PushPosBegin();break;
						case 34:inputMask_PushPosEnd();break;
						case 35:inputMask_PushPosEnd();break;
						case 36:inputMask_PushPosBegin();break;
						case 37:inputMask_PushPosLeft();break;
						case 38:inputMask_PushPosLeft();break;
						case 39:inputMask_PushPosRight();break;
						case 40:inputMask_PushPosRight();break;
						case 46:
							inputMask_KeyDelete();
							if (objInputMask.inputIni == "right") {
								objInputMask_Aux1 = "";
							}
							break;
					}
					inputMask_StopEvent(event);
				}else if (k==13) {
					objInputMask.blur();
				}
			}
		}
	}

	function inputMask_AlReves(pos) {
		inputMask_PushPosEnd();

		if (objInputMask_Aux1.length > 0) {
			j = objInputMask.mask.length;
			for (i=objInputMask_Aux1.length-1; i>=0; i--) {
				j = inputMask_GetValidPos(j-1,true);

				if (inputMask_KeyIsValid(j,objInputMask_Aux1.substr(i,1).charCodeAt(0))) {
					inputMask_UpdateChar(j,objInputMask_Aux1.substr(i,1));

					if (j==0) {
						break;
					}
				}else{
					objInputMask_Aux1 = objInputMask_Aux1.substr(0,objInputMask_Aux1.length-1);

					inputMask_AlReves(pos);

					var $q=objInputMask.onWrongKeyPressed;
					if ($q!=null&&$q.length>0) {
						eval($q);
					}

					break;
				}
			}

			inputMask_PutCaretPos(pos);
		}
	}

	function inputMask_KeyPress(event) {
		var $e=objInputMask.mask;

		if ($e!=null&&$e.length>0) {
			var kc=inputMask_GetKeyCode(event);
			var ss=inputMask_GetSelectionStart();
			if (kc!=9) {
				if (inputMask_GetSelectionEnd()==objInputMask.value.length && objInputMask.inputIni=="right") {
					if (inputMask_KeyIsValid(inputMask_GetSelectionEnd()-1,kc)) {
						event_aux = event ? event : objInputMask.ownerDocument.parentWindow.event;
						if (!event_aux.ctrlKey && !event_aux.shiftKey) {
							if ((ss==0&&inputMask_GetSelectionEnd()==objInputMask.value.length) || (objInputMask_Aux1.length == 0 && objInputMask.value.length != 0)) {
								objInputMask.value="";
								inputMask_GotFocus();
								objInputMask_Aux="";
								objInputMask_Aux1="";
							}

							if (!inputMask_Masked_full("right")) {
								var ks=String.fromCharCode(kc);
								if (objInputMask.style.textTransform == "uppercase") {
									ks=ks.toUpperCase();
								}else if (objInputMask.style.textTransform == "lowercase") {
									ks=ks.toLowerCase();
								}

								objInputMask_Aux1 += ks;

								inputMask_AlReves(objInputMask.value.length-1);

								inputMask_PushPosEnd();

								if (objInputMask.maskAutoTab) {
									if (inputMask_Masked_full("right")) {
										autoTabMask(objInputMask);
									}
								}
							}

							inputMask_ChangeCar();
						}
					}else{
						var $q=objInputMask.onWrongKeyPressed;
						if ($q!=null&&$q.length>0) {
							eval($q);
						}
					}
				}else{
					if (inputMask_KeyIsValid(ss,kc)) {
						var k=inputMask_GetSelectionStart();
						var l=inputMask_GetSelectionEnd();

						if (k==0&&l==objInputMask.value.length) {
							objInputMask.value="";
							inputMask_GotFocus();
						}

						var ks=String.fromCharCode(kc);
						if (objInputMask.style.textTransform == "uppercase") {
							ks=ks.toUpperCase();
						}else if (objInputMask.style.textTransform == "lowercase") {
							ks=ks.toLowerCase();
						}

						if (ks != objInputMask.value.substr(ss,1)) {
							objInputMask_Aux="";
						}

						inputMask_UpdateChar(ss,ks);
						inputMask_PutCaretPos(ss+1);

						inputMask_ChangeCar();

						if (objInputMask.maskAutoTab) {
							if (ss+1>objInputMask.value.length-1) {
								if (inputMask_Masked_full("left")) {
									autoTabMask(objInputMask);
								}
							}
						}
					}else{
						var $q=objInputMask.onWrongKeyPressed;
						if ($q!=null&&$q.length>0) {
							eval($q);
						}
					}
				}

				inputMask_StopEvent(event);
			}
		}
	}

	function inputMask_StopEvent(event) {
		if (document.all) {
			event = event ? event : objInputMask.ownerDocument.parentWindow.event;
			event.returnValue=false;
		}else if (event.stopPropagation) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	function inputMask_OnFocus() {
		objInputMask_Cambio	= false;
		inputMask_GotFocus();
		inputMask_Init();
	}

	function inputMask_Init() {
		objInputMask_Aux = objInputMask.value;
		if (objInputMask.value == inputMask_GetDisplayMask(true)) {
			objInputMask_Aux1="";
		}else{
			objInputMask_Aux1=inputMask_UnMasked();
		}
		objInputMask_Init = true;
	}

	function inputMask_GotFocus() {
		var $e=objInputMask.mask;

		if ($e!=null&&$e.length>0) {
			var $r=inputMask_GetSelectionStart();
			var $j=inputMask_GetValidPos($r);
			if ($j!=-1) {
				if (objInputMask.value==null||objInputMask.value.length==0) {
					objInputMask.value=inputMask_GetDisplayMask(true);
				}
				inputMask_PutCaretPos($j);


				if (objInputMask.createTextRange) {
					var rango=objInputMask.createTextRange();
					rango.moveStart("character",0);
					rango.moveEnd("character",0);
					rango.select();
				}else if (objInputMask.setSelectionRange) {
					objInputMask.focus();
					objInputMask.setSelectionRange(0,objInputMask.value.length);
				}
			}else{
				objInputMask.blur();
			}
		}
	}

	function inputMask_GetKeyCode(event) {
		event = event ? event : objInputMask.ownerDocument.parentWindow.event;
		return(event.keyCode?event.keyCode:event.which?event.which:event.charCode);
	}

	function inputMask_ChangeCar() {
		if (objInputMask.value != objInputMask_Aux) {
			if (!objInputMask_Cambio) {
				eval(objInputMask.onEditChange);
				objInputMask_Cambio	= true;
			}
		}
	}

	function inputMask_KeyDelete() {
		var $k=inputMask_GetSelectionStart();
		var $l=inputMask_GetSelectionEnd();

		if ($k==0&&$l==objInputMask.value.length) {
			if (objInputMask.value!=inputMask_GetDisplayMask(true)) {
				objInputMask.value="";
				inputMask_GotFocus();
				objInputMask_Aux="";
				objInputMask_Aux1="";
			}
		}else{
			var $i=objInputMask.maskDisplay;

			if ($k==$l) {
				if ($k<objInputMask.value.length) {
					$j=inputMask_GetValidPos($k);
					inputMask_UpdateChar($j,$i);
					inputMask_PutCaretPos($j+1);
				}
			}else{
				for (i=$k; i<$l; i++) {
					$j=inputMask_GetValidPos(i);
					if ($j<$l) {
						inputMask_UpdateChar($j,$i);
					}
				}
				inputMask_PutCaretPos(i);
			}
		}
		inputMask_ChangeCar();
	}

	function inputMask_KeyBackspace() {
		var $k=inputMask_GetSelectionStart();
		var $l=inputMask_GetSelectionEnd();

		if ($k==0&&$l==objInputMask.value.length) {
			if (objInputMask.value!=inputMask_GetDisplayMask(true)) {
				objInputMask.value="";
				inputMask_GotFocus();
				objInputMask_Aux="";
				objInputMask_Aux1="";
			}
		}else{
			var $i=objInputMask.maskDisplay;

			if ($k==$l) {
				if ($k>0) {
					$j=inputMask_GetValidPos($k-1,true);
					inputMask_UpdateChar($j,$i);
					inputMask_PutCaretPos($j);
				}
			}else{
				for (i=$l-1; i>=$k; i--) {
					$j=inputMask_GetValidPos(i,true);
					if ($j>=$k) {
						inputMask_UpdateChar($j,$i);
					}
				}
				inputMask_PutCaretPos(i+1);
			}
		}
		inputMask_ChangeCar();
	}

	function inputMask_PushPosLeft() {
		var k=inputMask_GetSelectionStart();
		var l=inputMask_GetSelectionEnd();

		if (k==0&&l==objInputMask.value.length) {
			inputMask_PushPosEnd();
		}else{
			if (k==l) {
				if ((k-1)>=0) {
					inputMask_PutCaretPos((k-1),true);
				}
			}else{
				inputMask_PutCaretPos(k,true);
			}
		}
	}

	function inputMask_PushPosRight() {
		var k=inputMask_GetSelectionStart();
		var l=inputMask_GetSelectionEnd();

		if (k==0&&l==objInputMask.value.length) {
			inputMask_PushPosBegin();
		}else{
			if (k==l) {
				if ((k+1)<=objInputMask.value.length) {
					inputMask_PutCaretPos((k+1));
				}
			}else{
				inputMask_PutCaretPos(l);
			}
		}
	}

	function inputMask_PushPosBegin() {
		inputMask_PutCaretPos(0);
	}

	function inputMask_PushPosEnd() {
		inputMask_PutCaretPos(objInputMask.mask.length);
	}

	function inputMask_UpdateChar($j,ks) {
		var x=objInputMask.value;
		var $t=x.substring(0,$j);
		var $u=x.substring($j+1,x.length);
		objInputMask.value=$t+ks+$u;
	}

	function inputMask_PutCaretPos($j,$v) {
		if ($j<=0) {
			$j=0;
		}
		$j=inputMask_GetValidPos($j,$v);
		if ($j!=-1) {
			if (objInputMask.createTextRange) {
				var $w=objInputMask.createTextRange();
				$w.moveStart("character",$j);
				$w.moveEnd("character",$j-objInputMask.value.length);
				$w.select();
			}else if (objInputMask.setSelectionRange) {
				objInputMask.focus();
				objInputMask.setSelectionRange($j,$j);
			}
		}else{
			objInputMask.blur();
		}
	}

	function inputMask_GetValidPos($j,$v) {
		if ($v==null) {
			$v=false;
		}

		if (inputMask_PosIsValid($j)) {
			return $j;
		}else{
			var $e=objInputMask.mask;
			if ($v) {
				while ($j>=0) {
					if (inputMask_PosIsValid($j)) {
						return $j;
					}
					$j--;
				}
				while ($j<$e.length-1) {
					if (inputMask_PosIsValid($j)) {
						return $j;
					}
					$j++;
				}
			}else{
				while ($j<$e.length-1) {
					if (inputMask_PosIsValid($j)) {
						return $j;
					}
					$j++;
				}
				while ($j>=0) {
					if (inputMask_PosIsValid($j)) {
						return $j;
					}
					$j--;
				}
			}

			return -1;
		}
	}

	function inputMask_PosIsValid($j) {
		var $e=objInputMask.mask;
		var m=$e.split("");

		if ($j<m.length) {
			if (m[$j]!=null) {
				var $f=objInputMask.maskAlpha;
				var $g=objInputMask.maskNumeric;
				var $h=objInputMask.maskAlphaNumeric;
				if (m[$j]==$f||m[$j]==$g||m[$j]==$h) {
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}else if ($j==m.length) {
			return true;
		}else{
			return false;
		}
	}

	function inputMask_KeyIsValid($j,$x) {
		var m=objInputMask.mask.split("");

		if (m.length>$j) {
			var $y=m[$j];
			var $z=objInputMask.maskAlpha;
			var $A=objInputMask.maskNumeric;
			var $B=objInputMask.maskAlphaNumeric;
			if ($y==$z) {
				if (($x>=65&&$x<=90)||($x>=97&&$x<=122)) {
					return true;
				}else{
					return false;
				}
			}else if ($y==$A) {
				if ($x>=48&&$x<=57) {
					return true;
				}else{
					return false;
				}
			}else if ($y==$B) {
				if (($x>=48&&$x<=57)||($x>=65&&$x<=90)||($x>=97&&$x<=122)) {
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	function inputMask_GetSelectionStart() {
		if (objInputMask.createTextRange) {
			$C=document.selection.createRange().duplicate();
			$C.moveEnd("character",objInputMask.value.length);
			$j=objInputMask.value.lastIndexOf($C.text);
			if ($C.text=="") $j=objInputMask.value.length;
			return $j;
		}else{
			return objInputMask.selectionStart;
		}
	}

	function inputMask_GetSelectionEnd() {
		if (objInputMask.createTextRange) {
			$C=document.selection.createRange().duplicate();
			$C.moveStart("character",-objInputMask.value.length);
			$j=$C.text.length;
			return $j;
		}else{
			return objInputMask.selectionEnd;
		}
	}

	function inputMask_GetDisplayMask($D) {
		var $e=objInputMask.mask;

		if ($D==true) {
			var f="";
			var $f=objInputMask.maskAlpha;
			var $g=objInputMask.maskNumeric;
			var $h=objInputMask.maskAlphaNumeric;
			var $i=objInputMask.maskDisplay;
			var m=$e.split("");
			for (mi=0;mi<m.length;mi++) {
				if (m[mi]==$f||m[mi]==$g||m[mi]==$h) {
					f+=$i;
				}else{
					f+=m[mi];
				}
			}
			return f;
		}else{
			return $e;
		}
	}

	function inputMask_UnMasked() {
		var unMasked = "";
		var $e=objInputMask.mask;
		var $f=objInputMask.maskAlpha;
		var $g=objInputMask.maskNumeric;
		var $h=objInputMask.maskAlphaNumeric;

		for (i=0; i<objInputMask.value.length; i++) {
			if ($e.substr(i,1) == $f || $e.substr(i,1) == $g || $e.substr(i,1) == $h) {
				unMasked += objInputMask.value.substr(i,1);
			}
		}

		var aux = unMasked;
		unMasked = "";

		for (i=0; i<aux.length; i++) {
			if (aux.substr(i,1) != "0" || unMasked.length > 0) {
				unMasked += aux.substr(i,1);
			}
		}

		return unMasked;
	}

	function inputMask_Masked_full(inputIni) {
		if (inputIni == "right") {
			var cont_total = 0;
			var $e=objInputMask.mask;
			var $f=objInputMask.maskAlpha;
			var $g=objInputMask.maskNumeric;
			var $h=objInputMask.maskAlphaNumeric;

			for (i=0; i<objInputMask.value.length; i++) {
				if ($e.substr(i,1) == $f || $e.substr(i,1) == $g || $e.substr(i,1) == $h) {
					cont_total++;
				}
			}

			return cont_total == objInputMask_Aux1.length;
		}else{
			return inputMask_GetSelectionEnd() == objInputMask.value.length;
		}
	}
}

function autoTabMask(campo) {
	var proximoCampo = campo.form[getNextIndex(campo) % campo.form.length];

	if (campo == proximoCampo) {
		campo.blur();
	}else{
		proximoCampo.focus();
	}


	function getNextIndex(input) {
		var index = -1, i = 0;

		while (i < input.form.length && index == -1) {
			if (input.form[i] == input) {
				index = i;
			}else{
				i++;
			}
		}

		while (i < input.form.length-1) {
			i++;

			if (!input.form[i].disabled && input.form[i].type != "hidden") {
				index = i;
				break;
			}
		}

		return index;
	}
}

function asignarValorMask(objInputMask,$d) {
	$d += "";

	if ($d.length>0) {
		var $e=objInputMask.mask;
		var $f=objInputMask.maskAlpha;
		var $g=objInputMask.maskNumeric;
		var $h=objInputMask.maskAlphaNumeric;
		var $i=objInputMask.maskDisplay;
		var $c="";
		for (i=0; i<$e.length;i++) {
			if ($e.substring(i,(i+1))==$f) {
				while ($d.length>0&&(!(($d.substring(0,1).charCodeAt(0)>=65&&$d.substring(0,1).charCodeAt(0)<=90)||($d.substring(0,1).charCodeAt(0)>=97&&$d.substring(0,1).charCodeAt(0)<=122)))) {
					$d=$d.substring(1);
				}
				if ($d.length>0) {
					$c+=$d.substring(0,1);
					$d=$d.substring(1);
				}else{
					break;
				}
			}else if ($e.substring(i,(i+1))==$g) {
				while ($d.length>0&&(!($d.substring(0,1).charCodeAt(0)>=48&&$d.substring(0,1).charCodeAt(0)<=57))) {
					$d=$d.substring(1);
				}
				if ($d.length>0) {
					$c+=$d.substring(0,1);
					$d=$d.substring(1);
				}else{
					break;
				}
			}else if ($e.substring(i,(i+1))==$h) {
				while ($d.length>0&&(!(($d.substring(0,1).charCodeAt(0)>=65&&$d.substring(0,1).charCodeAt(0)<=90)||($d.substring(0,1).charCodeAt(0)>=97&&$d.substring(0,1).charCodeAt(0)<=122)||($d.substring(0,1).charCodeAt(0)>=48&&$d.substring(0,1).charCodeAt(0)<=57)))) {
					$d=$d.substring(1);
				}
				if ($d.length>0) {
					$c+=$d.substring(0,1);
					$d=$d.substring(1);
				}else{
					break;
				}
			}else{
				$c+=$e.substring(i,(i+1));
			}
		}

		$c+=objInputMask.value.substring(i,$e.length);
	}

	objInputMask.value=$c;
}
