function BarraProgreso(ancho,alto,idContenedor) {
	//Propiedades
	this.maxPosicion  = 0;
	this.idContenedor = idContenedor;

	//Métodos
	this.asignarMaxPosicion = asignarMaxPosicion;
	this.progreso			= progreso;
	this.reIniciar			= reIniciar;
	this.mostrar			= mostrar;
	this.desplegar			= desplegar;

	var ultPorcentaje = 0;
	var ultPosicion	  = 0;
	var posFinal	  = 0;

	var colorFondo	= "#FFFFFF";
	var colorBorde	= "#CCCCCC";
	var colorBloque	= "#F7F7F7";
	var colorTexto	= "#000000";

	var colorFondo	= "#FFFFFF";
	var colorBorde	= "#F88D0D";
	var colorBloque	= "#F3C083";
	var colorTexto	= "#FF0000";

	constructor(ancho,alto,idContenedor);

	function constructor(ancho,alto,idContenedor) {
		ancho = String(ancho).toLowerCase();
		if (ancho.length == 0) {
			ancho = "100%";
		}else{
			if (ancho.indexOf("%") == -1 && ancho.indexOf("px") == -1) {
				if (document.all) {
					if (!isNaN(parseInt(ancho,10))) {
						ancho = parseInt(ancho,10) + 6;
					}
				}

				ancho += "px";
			}
		}

		alto = String(alto).toLowerCase();
		if (alto.length == 0) {
			alto = "100%";
		}else{
			if (alto.indexOf("%") == -1 && alto.indexOf("px") == -1) {
				if (document.all) {
					if (!isNaN(parseInt(alto,10))) {
						alto = parseInt(alto,10) + 6;
					}
				}

				alto += "px";
			}
		}

		var contenedor;

		if (idContenedor != null && document.getElementById(idContenedor) != null) {
			contenedor = document.getElementById(idContenedor);
		}else{
			contenedor = document.body;
		}

		contenedor.style.margin = "0px";

		var tablegral = document.createElement("TABLE");
		tablegral.setAttribute("id","bprog-tabla-general-" + idContenedor);
		tablegral.setAttribute("width","100%");
		tablegral.setAttribute("height","100%");
		tablegral.setAttribute("border","0");
		tablegral.setAttribute("cellspacing","0");
		tablegral.setAttribute("cellpadding","0");
		tablegral.style.borderCollapse = "collapse";
		var tbodygral = document.createElement("TBODY");
		var trgral	  = document.createElement("TR");
		var tdgral	  = document.createElement("TD");
		tdgral.setAttribute("align","center");
		tdgral.setAttribute("valign","middle");

		var tablebarra = document.createElement("TABLE");
		tablebarra.setAttribute("id","bprog-tabla-barra-" + idContenedor);
		tablebarra.setAttribute("width",ancho);
		tablebarra.setAttribute("height",alto);
		tablebarra.setAttribute("border","0");
		tablebarra.setAttribute("cellspacing","0");
		tablebarra.setAttribute("cellpadding","0");
		tablebarra.style.borderCollapse = "collapse";
		tablebarra.style.position = "relative";
		var tbodybarra = document.createElement("TBODY");
		var trbarra	   = document.createElement("TR");
		var tdbarra	   = document.createElement("TD");
		tdbarra.setAttribute("align","center");
		tdbarra.setAttribute("valign","middle");

		var divbarra = document.createElement("DIV");
		divbarra.setAttribute("id","bprog-div-barra-" + idContenedor);
		divbarra.style.position   = "relative";
		divbarra.style.left		  = "0px";
		divbarra.style.top		  = "0px";
		divbarra.style.width	  = "100%";
		divbarra.style.height	  = "100%";
		divbarra.style.background = colorFondo;
		divbarra.style.border	  = "1px solid " + colorBorde;
		divbarra.style.overflow	  = "hidden";

		var divtexto = document.createElement("DIV");
		divtexto.setAttribute("id","bprog-div-texto-" + idContenedor);
		divtexto.style.position = "absolute";
		divtexto.style.left		= "0px";
		divtexto.style.top		= "0px";
		divtexto.style.width	= "100%";
		divtexto.style.height	= "100%";
		divtexto.style.overflow	= "hidden";

		var tabletexto = document.createElement("TABLE");
		tabletexto.setAttribute("width","100%");
		tabletexto.setAttribute("height","100%");
		tabletexto.setAttribute("border","0");
		tabletexto.setAttribute("cellspacing","0");
		tabletexto.setAttribute("cellpadding","0");
		tabletexto.style.borderCollapse = "collapse";
		var tbodytexto = document.createElement("TBODY");
		var trtexto	   = document.createElement("TR");
		var tdtexto	   = document.createElement("TD");
		tdtexto.setAttribute("align","center");
		tdtexto.setAttribute("valign","middle");
		var span = document.createElement("SPAN");
		span.setAttribute("id","bprog-span-texto-" + idContenedor);
		span.style.fontFamily = "Verdana, Arial, sans-serif, Helvetica";
		span.style.fontSize	  = "13px";
		span.style.fontWeight = "bold";
		span.style.lineHeight = "9px";
		span.style.color	  = colorTexto;
		span.style.cursor	  = "default";
		var texto = document.createTextNode("0%");
		span.appendChild(texto);
		tdtexto.appendChild(span);
		trtexto.appendChild(tdtexto);
		tbodytexto.appendChild(trtexto);
		tabletexto.appendChild(tbodytexto);

		divtexto.appendChild(tabletexto);
		divbarra.appendChild(divtexto);

		tdbarra.appendChild(divbarra);
		trbarra.appendChild(tdbarra);
		tbodybarra.appendChild(trbarra);
		tablebarra.appendChild(tbodybarra);

		tdgral.appendChild(tablebarra);
		trgral.appendChild(tdgral);
		tbodygral.appendChild(trgral);
		tablegral.appendChild(tbodygral);

		if (ancho == "100%" && alto == "100%") {
			contenedor.appendChild(divbarra);
		}else{
			contenedor.appendChild(tablegral);
		}

		if (!document.all) {
			document.getElementById("bprog-div-barra-" + idContenedor).style.height = (document.getElementById("bprog-div-barra-" + idContenedor).offsetHeight - 4) + "px";
			document.getElementById("bprog-div-barra-" + idContenedor).style.width  = (document.getElementById("bprog-div-barra-" + idContenedor).offsetWidth - 4) + "px";
		}else{
			document.getElementById("bprog-div-barra-" + idContenedor).style.height = (document.getElementById("bprog-div-barra-" + idContenedor).offsetHeight) + "px";
			document.getElementById("bprog-div-barra-" + idContenedor).style.width  = (document.getElementById("bprog-div-barra-" + idContenedor).offsetWidth) + "px";

			document.getElementById("bprog-div-texto-" + idContenedor).style.height	   = (document.getElementById("bprog-div-texto-" + idContenedor).offsetHeight) + "px";

			if (document.getElementById("bprog-tabla-general-" + idContenedor) != null) {
				if (alto.indexOf("%") != -1) {
					document.getElementById("bprog-tabla-barra-" + idContenedor).style.top = ((document.getElementById("bprog-tabla-general-" + idContenedor).offsetHeight - document.getElementById("bprog-tabla-barra-" + idContenedor).offsetHeight) / 2) + "px";
				}
			}
		}
	}

	function asignarMaxPosicion(maxPosicion) {
		this.maxPosicion = maxPosicion;
	}

	function progreso(posicion) {
		var porcentaje = Math.round((posicion * 100)/this.maxPosicion,0);

		if (porcentaje != ultPorcentaje) {
			var anchoBarra = document.getElementById("bprog-div-barra-" + this.idContenedor).offsetWidth;
			var altoBarra  = document.getElementById("bprog-div-barra-" + this.idContenedor).offsetHeight;
			var porcBloque = parseInt((anchoBarra*10)/100);
			var posActual  = Math.round(porcentaje/((12*100)/anchoBarra));
			var difBorde   = 0;
			var i		   = 0;
			var x		   = 0;
			var div;

			posFinal = Math.round(100/((12*100)/anchoBarra));

			if (!document.all) {
				difBorde = 2;
			}
			
			var anchoBloque = Math.round((porcBloque*100)/anchoBarra) - difBorde;

			if (posActual != 0 && posActual != ultPosicion) {
				for (i=ultPosicion+1; i<=posActual; i++) {
					if (ultPosicion > 0) {
						x = ultPosicion * anchoBloque + ((2 + difBorde) * ultPosicion);
					}

					div					 = document.createElement("DIV");
					div.id				 = "pos_" + this.idContenedor + "_" + i;
					div.style.position	 = "absolute";
					div.style.background = colorBloque;
					div.style.border	 = "1px solid " + colorBorde;
					div.style.margin	 = "1px";
					div.style.filter	 = "alpha(opacity=50)";
					div.style.opacity	 = "0.5";
					div.style.left		 = x + "px";
					div.style.width		 = anchoBloque + "px";
					div.style.height	 = (altoBarra - 4 - difBorde) + "px";
					div.style.overflow	 = "hidden";

					document.getElementById("bprog-div-barra-" + this.idContenedor).appendChild(div);

					ultPosicion = i;
				}
			}

			var obj = document.getElementById("pos_" + this.idContenedor + "_" + (posActual+1));

			if (obj != null) {
				borrarBloque(posActual+1,posFinal,this.idContenedor);
			}

			document.getElementById("bprog-span-texto-" + this.idContenedor).innerHTML = porcentaje + "%";
			ultPorcentaje = porcentaje;
		}
	}

	function borrarBloque(posIni,posFin,idContenedor) {
		var i;
		var obj;

		for (i=posIni; i<=posFin; i++) {
			obj = document.getElementById("pos_" + idContenedor + "_" + i);

			if (obj != null) {
				obj.parentNode.removeChild(obj);
			}else{
				break;
			}
		}
	}

	function reIniciar() {
		borrarBloque(1,posFinal,this.idContenedor);

		ultPorcentaje = 0;
		ultPosicion	  = 0;
		posFinal	  = 0;

		document.getElementById("bprog-span-texto-" + this.idContenedor).innerHTML = "0%";
	}

	function mostrar(muestra) {
		if (muestra) {
			document.getElementById("bprog-tabla-general-" + this.idContenedor).style.visibility = "visible";
		}else{
			document.getElementById("bprog-tabla-general-" + this.idContenedor).style.visibility = "hidden";
		}
	}

	function desplegar(despliega) {
		var obj;

		if (document.getElementById("bprog-tabla-general-" + this.idContenedor) != null) {
			obj = document.getElementById("bprog-tabla-general-" + this.idContenedor);
		}else{
			obj = document.getElementById(this.idContenedor);
		}

		if (despliega) {
			obj.style.display = "block";
		}else{
			obj.style.display = "none";
		}
	}
}
