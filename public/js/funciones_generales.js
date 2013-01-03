// JavaScript Document
document.writeln('<script language="JavaScript" src="../js/funciones_validacion.js"></script>');
document.writeln('<script language="JavaScript" src="../js/funciones_mascara.js"></script>');
document.writeln('<script language="JavaScript" src="../js/funciones_formatoNumero.js"></script>');
document.writeln('<script language="JavaScript" src="../js/funciones_tabPage.js"></script>');
document.writeln('<script language="JavaScript" src="../js/funciones_rounedCorners.js"></script>');
document.writeln('<script language="JavaScript" src="../js/XHConn.js"></script>');
document.writeln('<script language="JavaScript" src="../js/BarraProgreso.js"></script>');
document.writeln('<script language="JavaScript" src="../js/DataGrid.js"></script>');

var keyCode_escape = 27;
var keyCode_F5	   = 116;
var keyCode_F11	   = 122;
var keyCode_Ctrl_N = 78;
var keyCode_Ctrl_U = 85;

function crearDivProcesando() {
	document.writeln('<div id="dproc" style="position:absolute; left:0px; top:0px; width:100%; height:100%; visibility:hidden; z-index:+999;">');
	document.writeln('  <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">');
	document.writeln('    <tr>');
	document.writeln('      <td align="center">');
	document.writeln('        <table width="195" height="150" border="1" cellpadding="0" cellspacing="0" bgcolor="#00FF00">');
	document.writeln('          <tr> ');
	document.writeln('            <td width="206" align="center">');
	document.writeln('              <strong><font size="-1" color="#0000FF">Procesando...<br><br>');
	document.writeln('              <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="60" height="9" id="hora_bd" align="middle">');
	document.writeln('                <param name="allowScriptAccess" value="sameDomain" />');
	document.writeln('                <param name="movie" value="/swf/hora_bd.swf" />');
	document.writeln('                <param name="menu" value="false" />');
	document.writeln('                <param name="quality" value="high" />');
	document.writeln('                <param name="bgcolor" value="#003399" />');
	document.writeln('                <embed src="/swf/hora_bd.swf" quality="high" bgcolor="#003399" width="60" height="9" name="hora_bd" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.writeln('              </object>');
	document.writeln('            </td>');
	document.writeln('          </tr>');
	document.writeln('        </table>');
	document.writeln('      </td>');
	document.writeln('    </tr>');
	document.writeln('  </table>');
	document.writeln('</div>');
}

function crearDivBloqueo() {
	document.writeln('<div id="dbloq" style="position:absolute; left:0px; top:0px; width:100%; height:100%; visibility:hidden; z-index:+998;">');
	document.writeln('  <table width="100%" height="100%" border="0" borderColor="#FF0000" cellpadding="0" cellspacing="0">');
	document.writeln('    <tr>');
	document.writeln('      <td align="center" background="ORION/img/trama.gif">');
	document.writeln('      </td>');
	document.writeln('    </tr>');
	document.writeln('  </table>');
	document.writeln('</div>');
}

function crearDivBarraProgreso() {
	document.writeln('<div id="dbprog" style="position:absolute; top:0px; left:0px; width:40px; height:20px; background-color:#FFFFFF; visibility:hidden;">');
	document.writeln('  <div id="dbprog_estado" style="position:absolute; top:0px; left:0px; width:0%; height:100%; background-color:#75B096;"></div>');
	document.writeln('  <div style="position:absolute; top:0px; left:0px; width:100%; height:100%;">');
	document.writeln('    <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" bordercolor="#708ED4" style="border:#FFFFFF 2px inset;">');
	document.writeln('      <tr>');
	document.writeln('        <td align="center"><font size="-1"><b id="dbprog_estado_texto">0%</b></font></td>');
	document.writeln('      </tr>');
	document.writeln('    </table>');
	document.writeln('  </div>');
	document.writeln('  <div style="position:absolute; left:0px; top:0px; width:100%; height:100%;"></div>');
	document.writeln('</div>');
}

function ucfirst(text) {
	var newText = "";
	var caracter = "";

	for (i=0; i<text.length; i++) {
		caracter = text.substr(i,1);
		if (i == 0) {
			caracter = caracter.toUpperCase();
		}
		newText = newText + caracter;
	}

	return newText;
}

function formatearRut(strRut) {
	if (strRut.length > 0) {
	    straux         = strRut.substring(strRut.length-1,strRut.length);
	    rutspng        = strRut.substring(0,strRut.length-1);
	    rutspng        = parseInt(rutspng,10) + "";
	    strAuxArray    = new Array(0,0,0);
	    strAuxArray[0] = rutspng.substring(rutspng.length-3,rutspng.length);
	    strAuxArray[1] = rutspng.substring(rutspng.length-6,rutspng.length-3);
	    strAuxArray[2] = rutspng.substring(0,rutspng.length-6);
	    rutspng        = "-" + straux;

	    for (i=0; i < 3; i ++) {
	        if (strAuxArray[i] == "") {
	            i = 3;
	        }else{
	            if (i > 0) {
	                rutspng = "." + rutspng;
	            }
	            rutspng = strAuxArray[i] + rutspng;
	        }
	    }
	    return rutspng.toUpperCase();
	}else{
	    return "";
	}
}

function limpiarRutSinDigito(rut) {
	var strRut = limpiarRut(rut);

	return strRut.substring(0,strRut.length-1);
}

function limpiarRutParaFoto(rut) {
	var strRut = limpiarRut(rut);

    for(var i=0; i<10-strRut.length;i++){
      strRut = "0" + strRut;
    }

	return strRut;
}

function campoRutFormateado(campo,descripcion,obligatorio) {
	var strRut = campo.value;

	if (strRut != "") {
		campo.value = rutFormateado(strRut);

		campoValido(campo,descripcion,isRut,obligatorio);
	}
}

function rutFormateado(rut) {
	var strRut = rut;

	if (strRut != "") {
		if (isRut(strRut)) {
			strRut		   = limpiarRut(strRut);

			straux		   = strRut.substring(strRut.length-1,strRut.length);
			rutspng		   = strRut.substring(0,strRut.length-1);
			strAuxArray	   = new Array(0,0,0);
			strAuxArray[0] = rutspng.substring(rutspng.length-3,rutspng.length);
			strAuxArray[1] = rutspng.substring(rutspng.length-6,rutspng.length-3);
			strAuxArray[2] = rutspng.substring(0,rutspng.length-6);
			rutspng		   = "-" + straux;

			for (i=0; i < 3; i ++) {
				if (strAuxArray[i] == "") {
					i = 3;
				} else {
					if (i > 0) {
						rutspng = "." + rutspng;
					}
					rutspng = strAuxArray[i] + rutspng;
				}
			}

			rut = rutspng.toUpperCase();
		}
	}

	return rut;
}

function campoMascara(campo,mascara,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio) {
	mascara(campo,autoSalto,descripcion,codigoSecuenciaOK,codigoSecuenciaCambio);
}

function campoValido(campo,descripcion,funcion,obligatorio,foco) {
	var validacion = true;

	if (typeof foco == "undefined") {
		foco = 1;
	}

	validacion = checkField(campo,descripcion,funcion,obligatorio == 0,foco == 1);

	return validacion;
}

function abrirVentana(href,target,ancho,alto,resizable,scrollbars,x,y) {
	if (typeof resizable == "undefined") {
		resizable = 0;
	}

	if (typeof scrollbars == "undefined") {
		scrollbars = 0;
	}

	if (typeof x == "undefined" || typeof y == "undefined") {
		var x, y;

		if (ancho != null && alto != null) {
			x = (screen.width - ancho) / 2;
			y = (screen.height - alto) / 2.5;
		}
	}

	ventana = window.open(href,
						  target,
						  "width=" + ancho +
						  ",height=" + alto +
						  ",resizable=" + resizable +
						  ",scrollbars=" + scrollbars +
						  ",left=" + x +
						  ",top=" + y +
						  ",status=1");

	ventana.focus();

	return ventana;
}

function cerrarVentana(ventana) {
	if (ventana == null) {

		ventana = "opener";
	}

	if (!window.closed) {
		window.close();
	}

//	if (ventanaValida(ventana) && !eval(ventana).closed) {
//		eval(ventana).focus();
//	}
}

function ventanaValida(ventana,mensaje) {
	var vventana = new Array();
	var caracter;
	var i, j;
	var validacion = true;

	if (arguments.length == 1) {
		mensaje = false;
	}

	j = 0;
	vventana[j] = "";

	for (i=0; i<ventana.length; i++) {
		caracter = ventana.substr(i,1);

		if (caracter == ".") {
			j++;
			vventana[j] = "";
		}else{
			vventana[j] += caracter;
		}
	}

	ventana = "";
	for (i=0; i<vventana.length; i++) {
		if (ventana.length > 0) {
			ventana += ".";
		}

		ventana += vventana[i];

		if (eval(ventana) == null || eval(ventana + ".closed")) {
			validacion = false;
			break;
		}
	}

	if (!validacion && mensaje) {
		alert("No se encontro página de origen");
	}

	return validacion;
}

function keyDownPopup(event) {
	var operacion = "";

	event = event ? event : window.event;

	if (event.keyCode == keyCode_F11 || (event.ctrlKey && (event.keyCode == keyCode_Ctrl_N || event.keyCode == keyCode_Ctrl_U))) {
		if (event.keyCode == keyCode_F11) {
			operacion = "F11";
		}else if (event.keyCode == keyCode_Ctrl_N) {
			operacion = "Ctrl+N";
		}else if (event.keyCode == keyCode_Ctrl_U) {
			operacion = "Ctrl+U";
		}

		if (document.all) {
			event.keyCode = 0;
			event.returnValue = false;
		}else if (event.preventDefault) {
			event.preventDefault();
			return false;
		}

		alert("Operación \"" + operacion + "\" no permitida");
	}
}

function bloquearTeclas(event,teclas) {
	var tecla = null;
	teclas = teclas.split(",");

	event = event ? event : window.event;

	for (i=0; i<teclas.length; i++) {
		var NU = eval(teclas[i]) == keyCode_Ctrl_N || eval(teclas[i]) == keyCode_Ctrl_U;

		if (event.keyCode == eval(teclas[i]) && (!NU || event.ctrlKey)) {
			tecla = teclas[i];
			break;
		}
	}

	if (tecla != null) {
		if (document.all) {
			event.keyCode = 0;
			event.returnValue = false;
		}else if (event.preventDefault) {
			event.preventDefault();
			return false;
		}
	}
}

function trim(texto) {
	if (texto.length > 0) {
		while (texto.indexOf(" ") == 0) {
			texto = texto.substr(1);
		}
	}

	if (texto.length > 0) {
		while(texto.lastIndexOf(" ") == texto.length - 1) {
			texto = texto.substr(0, texto.length - 1);
		}
	}

	return texto;
}

function ordenar(columna,orden,columna_ordenar,ventana_a_bloquea) {
	if (arguments.length == 4) {
		ventana_a_bloquea.procesando(true);
	}

	if (columna_ordenar == columna) {
		if (orden == "asc") {
			orden_ordenar = "desc";
		}else{
			orden_ordenar = "asc";
		}
	}else{
		orden_ordenar = "asc";
	}
	document.formulario.columna.value = columna_ordenar;
	document.formulario.orden.value   = orden_ordenar;
}

function procesando(procesa) {
	bloquear(procesa);
	if (document.getElementById("dproc") == null) {
		alert('No existe �rea de proceso en "' + window.location.pathname + '"');
	}else{
		if (procesa) {
			ocultarElemento("select",document.getElementById("dproc"));
			ocultarElemento("applet",document.getElementById("dproc"));
			document.getElementById("dproc").style.width = datoPagina("anchoVista");
			document.getElementById("dproc").style.visibility = "visible";
		}else{
			document.getElementById("dproc").style.visibility = "hidden";
			mostrarElemento("select");
			mostrarElemento("applet");
		}
	}
}

function existeAreaBloqueo() {
	return document.getElementById("dbloq") != null;
}

function bloquear(bloquea) {
	if (!existeAreaBloqueo()) {
		alert('No existe �rea de bloqueo en "' + window.location.pathname + '"');
	}else{
		if (bloquea) {
			ocultarElemento("select",document.getElementById("dbloq"));
			ocultarElemento("applet",document.getElementById("dbloq"));
			document.getElementById("dbloq").style.width = datoPagina("ancho");
			document.getElementById("dbloq").style.height = datoPagina("alto");
			document.getElementById("dbloq").style.visibility = "visible";
		}else{
			document.getElementById("dbloq").style.visibility = "hidden";
			mostrarElemento("select");
			mostrarElemento("applet");
		}
	}
}

function barraProgresoSetear(x,y,ancho,alto) {
	if (document.getElementById("dbprog") == null) {
		alert('No existe �rea de barra de progreso en "' + window.location.pathname + '"');
	}else{
		if (!isNaN(parseInt(x,10))) {
			document.getElementById("dbprog").style.left = x;
		}
		if (!isNaN(parseInt(y,10))) {
			document.getElementById("dbprog").style.top = y;
		}
		if (!isNaN(parseInt(ancho,10)) && ancho > 40) {
			document.getElementById("dbprog").style.width = ancho;
		}
		if (!isNaN(parseInt(alto,10))) {
			document.getElementById("dbprog").style.height = alto;
		}
	}
}

function barraProgresoMostrar(muestra) {
	if (document.getElementById("dbprog") == null) {
		alert('No existe �rea de barra de progreso en "' + window.location.pathname + '"');
	}else{
		if (muestra) {
			document.getElementById("dbprog").style.visibility = "visible";
		}else{
			document.getElementById("dbprog").style.visibility = "hidden";
		}
	}
}

function barraProgreso(parcial,total) {
	if (document.getElementById("dbprog") == null) {
		alert('No existe �rea de barra de progreso en "' + window.location.pathname + '"');
	}else{
		var porcentaje = 0;

		if (isNaN(parseInt(parcial,10)) || isNaN(parseInt(total,10))) {
			parcial = 0;
			total   = 100;
		}

		if (total > 0) {
			porcentaje = parseInt((parcial*100)/total,10);
		}

		porcentaje += "%";

		document.getElementById("dbprog_estado").style.width = porcentaje;
		document.getElementById("dbprog_estado_texto").innerHTML = porcentaje;
	}
}

function mensaje(texto) {
	if (texto.length > 0) {
		var texto_depurado = "";
		var desde = 0;
		var hasta = 0;

		pos1 = texto.indexOf("[%",desde);

		if (pos1 >= 0) {
			while (pos1 >= 0) {
				pos2 = texto.indexOf("]",pos1 + 1);
				pos3 = texto.indexOf("[",pos1 + 1);

				if (pos2 >= 0 && (pos3 < 0 || pos2 < pos3)) {
					hasta = pos1;

					texto_depurado += texto.substring(desde,hasta);

					caracter_especial = texto.substring(pos1 + 2,pos2);
					caracter_especial = caracter_especial.toUpperCase();

					if (caracter_especial == "TABULACION") {
						texto_depurado += "\t";
					}else if (caracter_especial == "ENTER") {
						texto_depurado += "\n";
					}else if (caracter_especial == "COMILLA_DOBLE") {
						texto_depurado += '"';
					}else if (caracter_especial == "COMILLA_SIMPLE") {
						texto_depurado += "'";
					}

					desde = pos2 + 1;
				}else{
					hasta = pos1 + 1;
					texto_depurado += texto.substring(desde,hasta);
					desde = hasta;
				}

				pos1 = texto.indexOf("[%",desde);
			}
			hasta = texto.length;
			texto_depurado += texto.substring(desde,hasta);
		}else{
			texto_depurado = texto;
		}

		alert(texto_depurado);
	}
}

//Objeto oNumero
function oNumero(numero) {
	//Propiedades 
	this.valor = numero || 0
	this.dec = -1;

	//M�todos 
	this.formato = numFormat;
	this.ponValor = ponValor;

	//Definici�n de los m�todos 
	function ponValor(cad) {
		cad = "" + cad;

		if (cad == "-" || cad == "+") {
			return;
		}

		if (cad.length == 0) {
			return;
		}

		if (cad.indexOf(".") >= 0) {
		    this.valor = parseFloat(cad);
		}else{
		    this.valor = parseInt(cad,10);
		}
	} 

	function numFormat(dec, miles) {
		var num = this.valor, signo=3, expr;
		var cad = ""+this.valor;
		var ceros = "", pos, pdec, i;

		for (i=0; i < dec; i++) {
			ceros += "0";
		}

		pos = cad.indexOf(".")
		if (pos < 0) {
		    cad = cad+"."+ceros;
		}else{
		    pdec = cad.length - pos -1;
		    if (pdec <= dec) {
		        for (i=0; i< (dec-pdec); i++) {
		            cad += "0";
		        }
		    }else{
		        num = num*Math.pow(10, dec);
		        num = Math.round(num);
		        num = num/Math.pow(10, dec);
		        cad = new String(num);
		    }
		}

		pos = cad.indexOf(".")
		if (pos < 0) {
			pos = cad.length;
		}

		if (cad.substr(0,1) == "-" || cad.substr(0,1) == "+") {
			signo = 4;
		}

		if (miles && pos > signo) {
		    do {
		        expr = /([+-]?\d)(\d{3}[\.\,]\d*)/
		        cad.match(expr)
		        cad=cad.replace(expr, RegExp.$1+","+RegExp.$2)
		    }while (cad.indexOf(",") > signo);
		}

		if (cad.substr(cad.length-1,1) == ".") {
			cad = cad.substr(0,cad.length-1);
		}

	    if (dec<0) {
	    	cad = cad.replace(".","");
	    }

        return cad;
	}
}//Fin del objeto oNumero:

function campoNumerico(campo,largo,precision,obligatorio,miles,signoNegativo) {
	if (arguments.length < 6) {
		signoNegativo = false;

		if (arguments.length < 5) {
			miles = true;

			if (arguments.length < 4) {
				obligatorio = false;
			}
		}
	}

	campo.cantEnt		= largo - precision;
	campo.cantDec		= precision;
	campo.miles			= miles;
	campo.signoNegativo	= signoNegativo;
	campo.obligatorio	= obligatorio;
	campo.teclaValida	= false;
	campo.onkeydown		= onKeyDown;
	campo.onkeypress	= onKeyPress;
	campo.onkeyup		= onKeyUp;

	function onKeyDown() {
		this.teclaValida = true;
	}

	function onKeyPress() {
		var keyCode = getKeyCode(event);
		var signoNegativo, numeros, separadorDecimal, enter;

		this.teclaValida = false;

		numeros				 = (keyCode >= 48 && keyCode <= 57);
		if (this.cantDec > 0) {
			separadorDecimal = (keyCode == 44 || keyCode == 46);
		}else{
			separadorDecimal = false;
		}
		if (this.signoNegativo) {
			signoNegativo	 = (keyCode == 45);
		}else{
			signoNegativo	 = this.signoNegativo;
		}
		enter				 = keyCode == 13;

		if (!(signoNegativo || numeros || separadorDecimal || enter)) {
			return false;
		}

		if (signoNegativo && this.value.length > 0) {
			return false;
	    }

		if (separadorDecimal) {
			if (this.value.length == 0) {
				this.value = "0,";
			}else{
				if (this.value.indexOf(",") == -1) {
					this.value += ",";
				}
			}
			return false;
		}

		var cadena = numeroSinFormato(this.value);

		var largo = this.cantEnt + this.cantDec;
		if (this.cantDec > 0) {
			largo++;
		}
		if (cadena.substr(0,1) == "-") {
			largo++;
		}

		var textoSeleccionado = "";
		var selectedText	  = document.selection;
		if (selectedText.type == "Text") {
			var rangoSeleccionado = selectedText.createRange();
			textoSeleccionado = rangoSeleccionado.text;
		}

		if (cadena.length >= largo && textoSeleccionado.length == 0 && !enter) {
			return false;
		}

		this.teclaValida = true;
	}

	function onKeyUp() {
		var keyCode = getKeyCode(event);
		var cadena;
		var pd, ent, dec, signo;

		if (keyCode >= 35 && keyCode <= 40) {
			return;
		}

		if (keyCode == 9 || keyCode == 16 || keyCode == 67 || keyCode == 86) {
			return;
		}

		cadena = this.value;

		if (this.teclaValida || !isNaN(parseFloat(cadena))) {
			cadena = numeroSinFormato(cadena);

			pd = cadena.indexOf(".");

			if (pd >= 0) {
				ent = pd;
				dec = cadena.length - pd - 1;
				pd = cadena.length - pd - 1;
			}else{
				ent = cadena.length;
				dec = 0;
			}
			if (cadena.substr(0,1) == "-") {
				signo = 1;
			}else{
				signo = 0;
			}

			if (ent > this.cantEnt + signo) {
				if (dec == 0) {
					cadena = cadena.substr(0,this.cantEnt + signo);
				}else{
					cadena = cadena.substr(0,this.cantEnt + signo) + cadena.substr(cadena.indexOf("."));
				}
			}

			if (dec > this.cantDec) {
				cadena = cadena.substr(0,cadena.length-1);
			    pd = this.cantDec;
			}

			cadena = numeroFormateado(cadena,pd,this.miles);

			if (cadena == "0") {
				if (!this.obligatorio) {
					cadena = "";
				}
			}

			this.value = cadena;
		}
	}
}

function numeroSinFormato(numero) {
	numero = numero.replace(/\./g,"");
	numero = numero.replace(",",".");

	return numero;
}

function numeroConFormato(numero) {
	numero = numero.replace(".","coma");
	numero = numero.replace(/\,/g,".");
	numero = numero.replace("coma",",");

	return numero;
}

function numeroFormateado(numero,decimales,miles) {
	var minumero = new oNumero();

	minumero.ponValor(numero);
	numero = minumero.formato(decimales,miles);
	numero = numeroConFormato(numero);

	return numero;
}

function formatNumero(numero) {
    numero = numero.toString().replace(/\ |\,/g,'');
    if(isNaN(numero)) 
      numero = "0";
    numero = Math.floor((numero*100+0.5)/100).toString();
    for(var i=0;i < Math.floor((numero.length-(1+i))/3);i++){
      numero = numero.substring(0,numero.length-(4*i+3))+'.'+numero.substring(numero.length-(4*i+3));
    }
    return (numero);
}

function formatoNumero($valor,$formato) {
	$valor			= $valor + "";
	$formateado		= "";
	$formateado_ent = "";
	$formateado_dec = "";
	$negativo		= false;

	if (!isNaN(parseFloat($valor,10)) && isFinite($valor)) {
		if ($valor.substr(0,1) == "-") {
			$negativo = true;
			$valor	  = $valor.substr(1);
		}

		$aux	   = $valor.split(".");
		$valor_ent = $aux[0];
		$valor_dec = $aux[1];
		if (typeof $valor_ent == "undefined") $valor_ent = "";
		if (typeof $valor_dec == "undefined") $valor_dec = "";

		$aux		 = $formato.split(",");
		$formato_ent = $aux[0];
		$formato_dec = $aux[1];
		if (typeof $formato_ent == "undefined") $formato_ent = "";
		if (typeof $formato_dec == "undefined") $formato_dec = "";

		if ($valor_ent.length > $formato_ent.replace(/\./g,"").length || $valor_dec.length > $formato_dec.length) {
			for (i=0; i<$formato.length; i++) {
				$formateado += "#";
			}
		}else{
			$j = $valor_ent.length - 1;
			for ($i=$formato_ent.length - 1; $i>=0; $i--) {
				if ($formato_ent.substr($i,1) == "#" || $formato_ent.substr($i,1) == "0") {
					if ($j < 0) {
						if ($formato_ent.substr(0,$i + 1).indexOf("0") != -1) {
							$formateado_ent = "0" + $formateado_ent;
						}
					}else{
						if ($valor_ent.length > 0 || $formato_ent.substr($i,1) != "#" || $formato_ent.substr(0,$i + 1).indexOf("0") != -1) {
							$formateado_ent = $valor_ent.substr($j,1) + $formateado_ent;
						}
					}

					$j--;
				}else{
					if ($i == 0 || $j >= 0 || $formato_ent.substr(0,$i + 1).indexOf("0") != -1) {
						$formateado_ent = $formato_ent.substr($i,1) + $formateado_ent;
					}
				}
			}

			$formateado = $formateado_ent;

			if ($formato_dec.length > 0) {
				$j = 0;
				for ($i=0; $i<$formato_dec.length; $i++) {
					if ($formato_dec.substr($i,1) == "#" || $formato_dec.substr($i,1) == "0") {
						if ($j >= $valor_dec.length) {
							if ($formato_dec.substr($i,$formato_dec.length).indexOf("0") != -1) {
								$formateado_dec += "0";
							}
						}else{
							if ($valor_dec.length > 0 || $formato_dec.substr($i,1) != "#" || $formato_dec.substr($i,strlen($formato_dec)).indexOf("0") != -1) {
								$formateado_dec += $valor_dec.substr($j,1);
							}
						}

						$j++;
					}else{
						if ($i == $formato_dec.length || $j < $formato_dec.length || $formato_dec.substr($i,strlen($formato_dec)).indexOf("0") != -1) {
							$formateado_dec += $formato_dec.substr($i,1);
						}
					}
				}

				$formateado += "," + $formateado_dec;
			}

			if ($negativo) {
				$formateado = "-" + $formateado;
			}
		}
	}

	return $formateado;
}

function deshabilitarSeleccion(ventana) {
	if (arguments.length == 0) {
		var ventana = window;
	}

	function deshabilita(e) {
		return false;
	}

	function habilita() {
		return true;
	}

	//if IE4+
	ventana.document.onselectstart = deshabilita;

	//if NS6
	if (window.sidebar) {
		ventana.document.onmousedown = deshabilita;
		ventana.document.onclick = habilita;
	}
}

function deshabilitarBotonDerecho(ventana) {
/*	var message = "";

	if (arguments.length == 0) {
		var ventana = window;
	}

	function clickIE() {
		if (ventana.document.all) {
			(message);
			return false;
		}
	}

	function clickNS(e) {
		if (ventana.document.layers || (ventana.document.getElementById && !ventana.document.all)) {
			if (e.which == 2 || e.which == 3) {
				(message);
				return false;
			}
		}
	}

	if (ventana.document.layers) {
		ventana.document.captureEvents(Event.MOUSEDOWN);
		ventana.document.onmousedown = clickNS;
	}else{
		ventana.document.onmouseup = clickNS;
		ventana.document.oncontextmenu = clickIE;
	}

	ventana.document.oncontextmenu = function() {return false;};*/
}

function datoPagina(dato,ventana) {
	var x			= 0;
	var y			= 0;
	var ancho		= 0;
	var alto		= 0;
	var anchoVista	= 0;
	var altoVista	= 0;

	if (arguments.length == 1) {
		var ventana = "window";
	}

	if(eval(ventana + ".document.all")) {
		x		   = eval(ventana + ".document.body.scrollLeft");
		y		   = eval(ventana + ".document.body.scrollTop");
		ancho	   = eval(ventana + ".document.body.scrollWidth");
		alto	   = eval(ventana + ".document.body.scrollHeight");
		anchoVista = eval(ventana + ".document.body.clientWidth");
		altoVista  = eval(ventana + ".document.body.clientHeight");
	}else if(eval(ventana + ".document.getElementById") && !eval(ventana + ".document.all")) {
		x		   = eval(ventana + ".pageXOffset");
		y		   = eval(ventana + ".pageYOffset");
		ancho	   = eval(ventana + ".pageWidthOffset");
		alto	   = eval(ventana + ".pageHeightOffset");
		anchoVista = eval(ventana + ".innerWidth");
		altoVista  = eval(ventana + ".innerHeight");
	}

	return eval(dato);
}

function datoNavegador(dato) {
	var id = "";
	var version = "";
	var aBrowFull = new Array("msie", "netscape", "opera", "mozilla", "gecko");
	var aBrowVers = new Array("msie", "netscape", "opera", "mozilla", "rv");
	var aBrowAbrv = new Array("ie",   "ns",       "op",    "mo",      "ns");
	var sInfo	  = navigator.userAgent.toLowerCase();

	for (var i = 0; i < aBrowFull.length; i++) {
		if ((id == "") && (sInfo.indexOf(aBrowFull[i]) != -1)) {
			id = aBrowAbrv[i];
			version = String(parseFloat(sInfo.substr(sInfo.indexOf(aBrowVers[i]) + aBrowVers[i].length + 1)));
		}
	}

//id: ie = Internet Explorer
//	  ns = Netscape
//	  op = Opera
//	  mo = Mozilla

	return eval(dato);
}

function ocultarElemento(elmID,overDiv) { // hides <select> and <applet> objects (for IE only)
	if (datoNavegador("id") == "ie") {
		for (var i=0; i<document.all.tags(elmID).length; i++) {
			var obj = document.all.tags(elmID)[i];

			if( !obj || !obj.offsetParent ) {
				continue;
			}

			// Find the element's offsetTop and offsetLeft relative to the BODY tag.
			var objLeft   = obj.offsetLeft;
			var objTop    = obj.offsetTop;
			var objParent = obj.offsetParent;

			while (objParent.tagName.toUpperCase() != "BODY") {
				objLeft  += objParent.offsetLeft;
				objTop   += objParent.offsetTop;
				objParent = objParent.offsetParent;
			}

			objHeight = obj.offsetHeight;
			objWidth = obj.offsetWidth;
	    
			if ((overDiv.offsetLeft + overDiv.offsetWidth ) <= objLeft) {
				continue;
			}else if ((overDiv.offsetTop + overDiv.offsetHeight ) <= objTop) {
				continue;
			}else if (overDiv.offsetTop >= (objTop + objHeight)) {
				continue;
			}else if (overDiv.offsetLeft >= (objLeft + objWidth)) {
				continue;
			}else{
				if (obj.savedStyleDisplay==null) {
					obj.savedStyleDisplay = obj.style.visibility;
				}
				obj.style.visibility = "hidden";
			}
		}
	}
}

function mostrarElemento(elmID) { // unhides <select> and <applet> objects (for IE only)
	if (datoNavegador("id") == "ie") {
		for (var i=0; i<document.all.tags(elmID).length; i++) {
			var obj = document.all.tags(elmID)[i];

			if( !obj || !obj.offsetParent ) {
				continue;
			}

			if (obj.savedStyleDisplay!=null) {
				if (obj.savedStyleDisplay.toLowerCase() != "hidden") {
					obj.style.visibility = "";
				}
			}

			obj.savedStyleDisplay = null;
		}
	}
}

function calendario(campo,funcion,event) {
	var href	   = "calendario.php?campo=" + campo.name + "&fecha_sel=" + campo.value;
	var target	   = "calendario";
	var ancho	   = 274;
	var alto	   = 174;
	var resizable  = 0;
	var scrollbars = 0;

	if (funcion != null) {
		href += "&funcion=" + funcion;
	}

	var x = posCursor(event,"sx");
	var y = posCursor(event,"sy");

	if (x > screen.width - ancho) {
		x = (screen.width - ancho - 20);
	}

	if (y > screen.height - alto) {
		y = screen.height - alto - 77;
	}

	ventana = abrirVentana(href,target,ancho,alto,resizable,scrollbars,x,y);

	ventana.focus();
}

function buscador(campo,tabla,funcion,bd) {
	var param = "?campo=" + campo.name + "&tabla=" + tabla;

	if (funcion != null) {
		param += "&funcion=" + funcion;
	}

	if (bd != null) {
		param += "&bd=" + bd;
	}

	var href       = "buscador.php" + param;
	var target     = "buscador";
	var ancho      = 630;
	var alto       = 300;
	var resizable  = 1;

	ventana = abrirVentana(href,target,ancho,alto,resizable);

	ventana.focus();
	
}

function mostrarDespliegue(campo,tabla,bd) {
	if (bd == null) {
		bd = "";
	}

	eval('despliegue_' + campo.name + '.document.location.replace("/despliegue.php?id=' + campo.value + '&tabla=' + tabla + '&bd=' + bd + '")');
}

function limpiarDespliegue(campo) {
	eval('despliegue_' + campo.name + '.document.getElementById("despliegue").innerHTML = "";');
}

function posCursor(ev,dato) {
	var px, py, sx, sy;

	if (!document.all) {
		px = ev.pageX;
		py = ev.pageY;
		sx = ev.screenX;
		sy = ev.screenY;
	}else{
		px = event.clientX + document.body.scrollLeft;
		py = event.clientY + document.body.scrollTop;
		sx = event.screenX;
		sy = event.screenY;
	}

	return eval(dato);
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_nbGroup(event, grpName, opcion) { //v3.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
	if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
	  img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
	  if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
	  nbArr[nbArr.length] = img;
	  for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
		if (!img.MM_up) img.MM_up = img.src;
		img.src = img.MM_dn = args[i+1];
		nbArr[nbArr.length] = img;
	} }
  } else if (event == "over") {
	document.MM_nbOver = nbArr = new Array();
	for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
	  if (!img.MM_up) img.MM_up = img.src;
	  img.src = (img.MM_dn && args[i+2]) ? args[i+2] : args[i+1];
	  nbArr[nbArr.length] = img;
	}
  } else if (event == "out" ) {
	for (i=0; i < document.MM_nbOver.length; i++) {
	  img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
	if ((nbArr = document[grpName]) != null)
	  for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
	document[grpName] = nbArr = new Array();
	for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
	  if (!img.MM_up) img.MM_up = img.src;
	  img.src = img.MM_dn = args[i+1];
	  nbArr[nbArr.length] = img;
    }
  }
}

function getIndexByName(campo) {
  var index = -1, i = 0;

  while (i < document.getElementsByName(campo.name).length && index == -1) {
    if (document.getElementsByName(campo.name)[i] == campo) {
      index = i;
    }else{
      i++;
    }
  }

  return index;
}

function autoTabLargo(campo,largo) {
	var isNN = (navigator.appName.indexOf("Netscape")!=-1);
	var keyCode = getKeyCode(event);
	var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,33,34,35,36,37,38,39,40,46];

	if (campo.value.length >= largo && !containsElement(filter,keyCode)) {
		campo.value = campo.value.slice(0,largo);
		autoTab(campo);
	}

	function containsElement(arr,ele) {
		var found = false, index = 0;

		while(!found && index < arr.length) {
			if (arr[index] == ele) {
				found = true;
			}else{
				index++;
			}
		}

		return found;
	}
}

function getKeyCode(event) {
	event = event ? event : window.event;

	return event.keyCode?event.keyCode:event.which?event.which:event.charCode;
}

function autoTabEnter(campo) {
	var keyCode = getKeyCode(event);

	if (keyCode = 13) {
		autoTab(campo);
	}
}

function autoTab(campo) {
	campo.form[getNextIndex(campo) % campo.form.length].focus();

	if (campo == campo.form[getNextIndex(campo) % campo.form.length]) {
		campo.blur();
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

function cargaAjax(target,href,ventana,funcion,htmlCargando) 
{
	var myConn = new XHConn();
	var i	  = -1;
	var hoy	  = new Date();
	var url	  = "";
	var param = "";

	if (!myConn) {
		alert("XMLHTTP no esta disponible. Int�ntalo con un navegador m�s actual.");
	}else{
		i = href.indexOf("?");
		if (i < 0) {
			url	  = href;
			param = "time=" + hoy.getTime();
		}else{
			url	  = href.substring(0,i);
			param = href.substring(i + 1);
			param = "time=" + hoy.getTime() + "&" + param;
		}

		if (ventana == null) {
			var ventana = window;
		}

		if (htmlCargando == null) {
			htmlCargando = "Cargando ...";
		}

		if (htmlCargando.length == 0) {
			ventana.document.getElementById(target).innerHTML = '<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"><tr><td valign="top"><img src="" width="16" height="16" border="0"></td></tr></table>';
		}else{
			ventana.document.getElementById(target).innerHTML = '<p class="cargando">' + htmlCargando + '</p>';
		}

		var procesar = function () {
							var peticion = function (oXML) {
												var ok = oXML.status == 0 || oXML.status == 200;

												if (ok) {
													ventana.document.getElementById(target).innerHTML = oXML.responseText;

													// Inicio Carga Asincr�nica, Javascript y Style //
													var javascript = ventana.document.getElementById(target).getElementsByTagName("script");
													var css		   = ventana.document.getElementById(target).getElementsByTagName("style");
													var i, etiquetaScript, cssCont, etiquetaStyle, contenidoCSS, ultimaEtiquetaStyle;

													for (i=0; i<javascript.length; i++) {
														agregarJS(ventana,javascript[i].innerHTML)
													}

													for (i=0; i<css.length; i++) {
														agregarCss(ventana,css.innerHTML)
													}
													// Fin Carga Asincr�nica, Javascript y Style //

													if (funcion != null) {
														if (typeof funcion == "string") {
															eval(funcion);
														}else{
															funcion();
														}
													}
												}else{
													var statusText = "";

													if (oXML.status == 500) {
														ventana.document.getElementById(target).innerHTML = oXML.responseText;

														statusText = unescape(ventana.document.getElementById("statusText").innerHTML);
														statusText = statusText.replace(/\+/gi," ");
														//window.open("/negocio/INT/INT_control_acceso.php?error=" + statusText,"sitioFrameSISTEMASUTA");

														if (ventanaValida("opener")) {
															cerrarVentana("opener");
														}
													}else if (oXML.status == 400) {
														statusText = unescape(oXML.responseText);
														statusText = statusText.replace(/\+/gi," ");

														ventana.document.getElementById(target).innerHTML = "";

														if (typeof funcion != "undefined") {
															funcion(statusText);
														}else{
															mensaje(statusText);
														}
													}
												}
										   };

							if (htmlCargando.length == 0) {
								ventana.document.getElementById(target).innerHTML = '<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"><tr><td valign="top"><img src="" width="16" height="16" border="0"></td></tr></table>';
							}else{
								ventana.document.getElementById(target).innerHTML = '<p class="cargando">' + htmlCargando + '</p>';
							}

							myConn.connect(url,"POST",param,peticion);
					   };

		setTimeout(procesar,0);
	}
}

function agregarJS(ventana,javascript) {
	var etiquetaScript = ventana.document.createElement('script');
	ventana.document.getElementsByTagName('head')[0].appendChild(etiquetaScript);
	etiquetaScript.text = javascript;
}

function agregarCss(ventana,css) {
	var etiquetaStyle = ventana.document.createElement('style');
	ventana.document.getElementsByTagName('head')[0].appendChild(etiquetaStyle);

	if (ventana.document.all) {
		var contenidoCSS = css.split('{');
		var ultimaEtiquetaStyle = ventana.document.styleSheets[ventana.document.styleSheets.length-1];
		ultimaEtiquetaStyle.addRule(contenidoCSS[0],'{' + contenidoCSS[1]);
	}else{
		var contenidoCSS = ventana.document.createTextNode(css); 
        etiquetaStyle.appendChild(contenidoCSS); 
	}
}

function habilitarBoton(obj,habilitado) {
	var imagen = obj.getAttribute("imagen");
	var cursor = "";
	var objImg, objTxt;

	if (habilitado) {
		cursor	= "pointer";
	}else{
		imagen += "Disabled";
		cursor	= "default";
	}

	obj.disabled = !habilitado;

	if (obj.ownerDocument.getElementById("imagen_" + obj.getAttribute("id")) != null) {
		objImg = obj.ownerDocument.getElementById("imagen_" + obj.getAttribute("id"));

		objImg.disabled = !habilitado;
		objImg.style.cursor = cursor;
		objImg.src = "/ORION/img/boton/" + imagen + ".gif";

		if (!habilitado) {
			if (obj.ownerDocument.getElementById("div_fondo_over_" + obj.getAttribute("rand")) != null) {
				objImgFondo = obj.ownerDocument.getElementById("div_fondo_over_" + obj.getAttribute("rand"));

				objImgFondo.style.visibility = "hidden";
			}
		}
	}

	if (obj.ownerDocument.getElementById("texto_" + obj.getAttribute("id")) != null) {
		objTxt = obj.ownerDocument.getElementById("texto_" + obj.getAttribute("id"));

		objTxt.style.cursor = cursor;

		if (habilitado) {
			objTxt.style.color = "";
		}else{
			objTxt.style.color = "#aca899";
		}
	}

	if (obj.ownerDocument.getElementById("buscar_" + obj.getAttribute("id")) != null) {
		habilitarBoton(obj.ownerDocument.getElementById("buscar_" + obj.getAttribute("id")),habilitado);
	}else if (obj.ownerDocument.getElementById("calendario_" + obj.getAttribute("id")) != null) {
		habilitarBoton(obj.ownerDocument.getElementById("calendario_" + obj.getAttribute("id")),habilitado);
	}
}

function createElementWithName(type,name) {
	var element;

	try {
		element = document.createElement('<'+type+' name="'+name+'">');
	}catch (e){
		element = document.createElement(type)
		element.name = name;
	}

	return element;
}

function getParentXXX(el,pTagName) {
	if (el == null) {
		return null;
	}else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) { // Gecko bug, supposed to be uppercase
		return el;
	}else{
		return getParent(el.parentNode,pTagName);
	}
}

function getParent(element,parent) {
	if (typeof element == "string") {
		element = document.getElementById(element);
	}

	if (!element) {
		return null;
	}

	var elements = [];
	if (typeof parent != "string") {
		while (element.parentNode) {
			element = element.parentNode;
			elements.unshift(element);
			if (element == parent) {
				return element;
			}
		}
	}else{
		parent = parent.toUpperCase();
		while (element.parentNode) {
			element = element.parentNode;
			elements.unshift(element);
			if (element.nodeName && element.nodeName.toUpperCase() == parent) {
				return element;
			}
		}
	}

	return null;
}

function controlaMaxLengthTextArea(event,obj,maxlength) {
	if (obj.value.length == maxlength) {
		var event = event ? event : window.event;
		if (event.keyCode != 9 && event.keyCode != 16 && event.keyCode != 18 && !(event.keyCode >= 35 && event.keyCode <= 40) && !(!document.all && (event.keyCode == 8 || event.keyCode == 46 || (event.ctrlKey && (event.keyCode == 45 || event.charCode == 99))))) {
			if (document.all) {
				event.returnValue = false;
			}else if (event.preventDefault) {
				event.preventDefault();
				return false;
			}
		}
	}else if (obj.value.length > maxlength) {
		obj.value = obj.value.substr(0,maxlength);
	}
}

function addEvent(elm,evType,fn,useCapture) {
//	addEvent and removeEvent
//	cross-browser event handling for IE5+,  NS6 and Mozilla
//	By Scott Andrew
	if (elm.addEventListener) {
		elm.addEventListener(evType, fn, useCapture);
		return true;
	}else if (elm.attachEvent) {
		var r = elm.attachEvent("on"+evType, fn);
		return r;
	}else{
		alert("Handler could not be removed");
	}
}

function urlencode(str) {
	var histogram = {}, histogram_r = {}, code = 0, tmp_arr = [];
	var ret = str.toString();

	var replacer = function(search, replace, str) {
		var tmp_arr = [];
		tmp_arr = str.split(search);
		return tmp_arr.join(replace);
	};

	// The histogram is identical to the one in urldecode.
	histogram['!']   = '%21';
	histogram['%20'] = '+';

	// Begin with encodeURIComponent, which most resembles PHP's encoding functions
	ret = encodeURIComponent(ret);

	for (search in histogram) {
		replace = histogram[search];
		ret = replacer(search, replace, ret) // Custom replace. No regexing
	}

	// Uppercase for full PHP compatibility
	return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2) {
		return "%"+m2.toUpperCase();
	});

	return ret;
}

function fechaMayorOIgualQue(fec1,fec0){ 
		//fec0='09-05-2009';\
		//fec1='09-05-2009';\
		var bRes = false; 
		var sDia0 = fec0.substr(0, 2); 
		var sMes0 = fec0.substr(3, 2); 
		var sAno0 = fec0.substr(6, 4); 
		var sDia1 = fec1.substr(0, 2); 
		var sMes1 = fec1.substr(3, 2); 
		var sAno1 = fec1.substr(6, 4); 
		if (sAno0 > sAno1) bRes = true; 
		else { 
		 if (sAno0 == sAno1){ 
		  if (sMes0 > sMes1) bRes = true; 
		  else { 
		   if (sMes0 == sMes1) 
			if (sDia0 >= sDia1) bRes = true; 
		  } 
		 } 
		} 
		return bRes; 
}

function roundNumber(num,dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}



