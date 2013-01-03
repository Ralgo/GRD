var tabPageTab = new Array();

function tabPage_init(onClick) {
	var idTab, idTabPage;

	for (idTab in tabPageTab) {
		if (!tabPageTab[idTab].inicializada) {
			tabPageTab[idTab].ancho = 0;
			tabPageTab[idTab].anchoAjustado = 0;

			if (document.getElementById(idTab).offsetWidth > 0) {
				for (idTabPage in tabPageTab[idTab].opcion) {
					tabPageTab[idTab].opcion[idTabPage].ancho = document.getElementById(idTab + "." + idTabPage + ".opcion_tabla").offsetWidth;
					tabPageTab[idTab].opcion[idTabPage].alto = document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_interior").offsetHeight;
					tabPageTab[idTab].ancho += tabPageTab[idTab].opcion[idTabPage].ancho;
				}
				tabPageTab[idTab].opcionIni = tabPageTab[idTab].opcion;
			}
		}
	}

	var opcionActiva = false;
	for (idTab in tabPageTab) {
		if (!tabPageTab[idTab].inicializada) {
			if (document.getElementById(idTab).offsetWidth > 0) {
				if (tabPageTab[idTab].activa.length > 0) {
					idTabPage = tabPageTab[idTab].activa;
				}else{
					for (idTabPage in tabPageTab[idTab].opcion) {
						if (idTabPage.length > 0) {
							break;
						}
					}
				}

				tabPageTab[idTab].activa = "";
				if (!onClick) {
					tabPage_onClick(idTab,idTabPage);
				}
				opcionActiva = true;
			}
		}
	}

	if (!opcionActiva) {
		tabPage_ajustarTab(idTab);
	}

	tabPage_addEvent(window,"resize",tabPage_resize);
}

function tabPage_resize() {
	var idTab, idTabPage;

	for (idTab in tabPageTab) {
		if (document.getElementById(idTab).offsetWidth > 0) {
			tabPageTab[idTab].opcion = tabPageTab[idTab].opcionIni;
			document.getElementById(idTab + ".opciones").innerHTML = tabPageTab[idTab].opcionesHTML;

			tabPage_ajustarTab(idTab);
		}else{
			tabPageTab[idTab].anchoAjustado = 0;
		}
	}

	for (idTab in tabPageTab) {
		if (document.getElementById(idTab).offsetWidth > 0) {
			if (tabPageTab[idTab].activa.length > 0) {
				idTabPage = tabPageTab[idTab].activa;
				tabPageTab[idTab].activa = "";
				tabPage_onClick(idTab,idTabPage,false);
			}
		}
	}
}

function tabPage_ajustarTab(idTab) {
	var idTabPage, j, tabWidth, ids, idTabPages, ancho, altoMax, idTabPagesWidth;

	for (idTabPage in tabPageTab[idTab].opcion) {
		document.getElementById(idTab + "." + idTabPage + ".opcion_tabla").style.width = tabPageTab[idTab].opcion[idTabPage].ancho + "px";
		document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_separador").style.width = "1px";

		if (idTab + "." + idTabPage != idTab + "." + tabPageTab[idTab].activa) {
			if (tabPageTab[idTab].opcion[idTabPage].disabled) {
				document.getElementById(idTab + "." + idTabPage + ".opcion").className = "tabPage_normalDisabled";
			}else{
				document.getElementById(idTab + "." + idTabPage + ".opcion").className = "tabPage_normal";
			}
		}
	}

	tabWidth = document.getElementById(idTab).offsetWidth;

	ids = new Array();
	ancho = 0;
	j = 0;

	for (idTabPage in tabPageTab[idTab].opcion) {
		ancho += tabPageTab[idTab].opcion[idTabPage].ancho;

		if (ancho > tabWidth) {
			ancho = tabPageTab[idTab].opcion[idTabPage].ancho;
			j++;
		}

		tabPageTab[idTab].opcion[idTabPage].fila = j + 1;

		if (ids[j] == null) {
			ids[j] = "";
		}else{
			ids[j] += ",";
		}
		ids[j] += idTabPage;
	}

	tabPageTab[idTab].nfilas = ids.length;

	if (tabPageTab[idTab].nfilas > 1) {
		for (i=0; i<ids.length; i++) {
			idTabPages = ids[i].split(",");

			ancho = 0;
			altoMax = 0;
			idTabPagesWidth = new Array();
			for (j=0; j<idTabPages.length; j++) {
				idTabPage = idTabPages[j];

				idTabPagesWidth[j] = tabPageTab[idTab].opcion[idTabPage].ancho;

				ancho += idTabPagesWidth[j];

				if (j == idTabPages.length - 1) {
					document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_separador").style.width = "0px";
				}

				if (tabPageTab[idTab].opcion[idTabPage].alto > altoMax) {
					altoMax = tabPageTab[idTab].opcion[idTabPage].alto;
				}
			}

			j = 0;
			while (ancho < tabWidth) {
				idTabPagesWidth[j]++;
				ancho++;
				if (j < idTabPages.length - 1) {
					j++;
				}else{
					j = 0;
				}
			}

			for (j=0; j<idTabPages.length; j++) {
				document.getElementById(idTab + "." + idTabPages[j] + ".opcion_tabla").style.width = idTabPagesWidth[j] + "px";
				document.getElementById(idTab + "." + idTabPages[j] + ".opcion_tabla_interior_bi").style.height = altoMax + "px";
				document.getElementById(idTab + "." + idTabPages[j] + ".opcion_tabla_interior").style.height = altoMax + "px";
				document.getElementById(idTab + "." + idTabPages[j] + ".opcion_tabla_interior_bd").style.height = altoMax + "px";
			}
		}
	}else{
		altoMax = 0;
		for (idTabPage in tabPageTab[idTab].opcion) {
			if (tabPageTab[idTab].opcion[idTabPage].alto > altoMax) {
				altoMax = tabPageTab[idTab].opcion[idTabPage].alto;
			}
		}

		for (idTabPage in tabPageTab[idTab].opcion) {
			document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_interior_bi").style.height = altoMax + "px";
			document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_interior").style.height = altoMax + "px";
			document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_interior_bd").style.height = altoMax + "px";
		}
//Borrar Ini
//var idTabPage = tabPageTab[idTab].activa;
//document.getElementById(idTab + "." + idTabPage + ".contenido").innerHTML = "tabPage: [" + idTab + "." + idTabPage + "] fila: [" + tabPageTab[idTab].opcion[idTabPage].fila + "/" + tabPageTab[idTab].nfilas + "] anchoReal: [" + tabPageTab[idTab].opcion[idTabPage].ancho + "] anchoHTML: [" + document.getElementById(idTab + "." + idTabPage + ".opcion_tabla").offsetWidth + "] separador: [" + document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_separador").offsetWidth + "]";
//Borrar Fin
	}

	tabPageTab[idTab].anchoAjustado = document.getElementById(idTab).offsetWidth;
}

function tabPage_onMouseOver(idTab,idTabPage) {
	var id = idTab + "." + idTabPage;
	var tabPageActiva = idTab + "." + tabPageTab[idTab].activa;

	if ((id != tabPageActiva || !tabPageTab[idTab].inicializada) && !tabPageTab[idTab].opcion[idTabPage].disabled) {
		document.getElementById(id + ".opcion").className = "tabPage_over";
	}
}

function tabPage_onMouseOut(idTab,idTabPage) {
	var id = idTab + "." + idTabPage;
	var tabPageActiva = idTab + "." + tabPageTab[idTab].activa;

	if ((id != tabPageActiva || !tabPageTab[idTab].inicializada)) {
		if (tabPageTab[idTab].opcion[idTabPage].disabled) {
			document.getElementById(id + ".opcion").className = "tabPage_normalDisabled";
		}else{
			document.getElementById(id + ".opcion").className = "tabPage_normal";
		}
	}
}

function tabPage_onClick(idTab,idTabPage,ejecutar) {
	var id = idTab + "." + idTabPage;
	var tabPageActiva = "";
	var idTabAux;

	if (!tabPageTab[idTab].inicializada) {
		tabPage_init(true);
		tabPageTab[idTab].inicializada = true;
	}

	if (tabPageTab[idTab].activa.length > 0) {
		tabPageActiva = idTab + "." + tabPageTab[idTab].activa;
	}

	if (id != tabPageActiva && !tabPageTab[idTab].opcion[idTabPage].disabled) {
		if (tabPageActiva.length > 0) {
			document.getElementById(tabPageActiva + ".opcion").className = "tabPage_normal";
	    	document.getElementById(tabPageActiva + ".opcion").style.top = "0px";
			document.getElementById(tabPageActiva + ".contenido").style.display = "none";
		}

		document.getElementById(id + ".opcion").className = "tabPage_seleccionado";
		document.getElementById(id + ".contenido").style.display = "block";

		var idContenido = tabPageTab[idTab].opcion[idTabPage].idContenido;
		var iframe		= document.getElementsByName(idContenido)[0];
		if (iframe != null) {
			iframe.height = 0;
			iframe.height = document.getElementById(id + ".contenido").offsetHeight;
		}

		tabPageTab[idTab].activa = idTabPage;

		for (idTabAux in tabPageTab) {
			if (document.getElementById(idTabAux).offsetWidth > 0) {
				if (tabPageTab[idTabAux].ancho == 0) {
					for (idTabPage in tabPageTab[idTabAux].opcion) {
						tabPageTab[idTabAux].opcion[idTabPage].ancho = document.getElementById(idTabAux + "." + idTabPage + ".opcion_tabla").offsetWidth;
						tabPageTab[idTabAux].opcion[idTabPage].alto = document.getElementById(idTabAux + "." + idTabPage + ".opcion_tabla_interior").offsetHeight;
						tabPageTab[idTabAux].ancho += tabPageTab[idTabAux].opcion[idTabPage].ancho;
					}
					tabPageTab[idTabAux].opcionIni = tabPageTab[idTabAux].opcion;
				}

				if (tabPageTab[idTabAux].anchoAjustado == 0) {
//alert('onClick Aux: ['+id+'] ['+idTabAux+']');
					tabPageTab[idTabAux].opcion = tabPageTab[idTabAux].opcionIni;
					document.getElementById(idTabAux + ".opciones").innerHTML = tabPageTab[idTabAux].opcionesHTML;

					tabPage_ajustarTab(idTabAux);

					if (tabPageTab[idTabAux].activa.length > 0) {
						idTabPage = tabPageTab[idTabAux].activa;
						tabPage_onClick(idTabAux,idTabPage);
					}
				}
			}
		}

		tabPage_ajustarOpcionActiva(idTab);

		if (tabPageTab[idTab].funcion != null) {
			if (ejecutar == null || ejecutar) {
				tabPageTab[idTab].funcion(idTab,tabPageTab[idTab].activa);
			}
		}
	}
}

function tabPage_disabled(idTab,idTabPage,disabled) {
	var id = idTab + "." + idTabPage;

	tabPageTab[idTab].opcion[idTabPage].disabled = disabled;

	if (tabPageTab[idTab].opcion[idTabPage].disabled) {
		document.getElementById(id + ".opcion").className = "tabPage_normalDisabled";
		document.getElementById(id + ".opcion_tabla_interior").style.color		= "#ACA899";
		document.getElementById(id + ".opcion_tabla_interior").style.textShadow = "1px 1px 0px #FFFFFF";

		document.getElementById(id + ".opcion_tabla.alto_arriba").style.height = "3px";
		document.getElementById(id + ".opcion_tabla.alto_abajo").style.height  = "0px";

		if (tabPageTab[idTab].activa == idTabPage) {
			tabPageTab[idTab].activa = "";
			document.getElementById(id + ".contenido").style.display = "none";
		}
	}else{
		document.getElementById(id + ".opcion").className = "tabPage_normal";
		document.getElementById(id + ".opcion_tabla_interior").style.color		= "";
		document.getElementById(id + ".opcion_tabla_interior").style.textShadow = "";
	}
}

function tabPage_ajustarOpcionActiva(idTab) {
	var idTabPage = tabPageTab[idTab].activa;
	var idTabPageAux, tabPageOpcion, opcion, vopcionesHTML, opcionesHTML, fila, filaAux, nfila;
//alert('antes tabPage_ajustarOpcionActiva: ['+idTab+'] ['+tabPageTab[idTab].opcion[idTabPage].fila+'] ['+tabPageTab[idTab].nfilas+']');

	if (tabPageTab[idTab].alineacion == "arriba") {
		nfila_ref = tabPageTab[idTab].nfilas;
		nfila_ini = 0;
		nfila_inc = 1;
	}else if (tabPageTab[idTab].alineacion == "abajo") {
		nfila_ref = 1;
		nfila_ini = tabPageTab[idTab].nfilas + 1;
		nfila_inc = -1;
	}

	if (tabPageTab[idTab].opcion[idTabPage].fila != nfila_ref) {
		document.getElementById(idTab + ".opciones").style.visibility = "hidden";

		tabPageOpcion = new Array();
		for (idTabPageAux in tabPageTab[idTab].opcion) {
			if (tabPageTab[idTab].opcion[idTabPageAux].fila != tabPageTab[idTab].opcion[idTabPage].fila) {
				tabPageOpcion[idTabPageAux] = tabPageTab[idTab].opcion[idTabPageAux];

				tabPageTab[idTab].opcion[idTabPageAux].anchoAjustado = document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla").offsetWidth;
				tabPageTab[idTab].opcion[idTabPageAux].separador = document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_separador").offsetWidth;
				tabPageTab[idTab].opcion[idTabPageAux].altoAjustado = document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_interior").offsetHeight;
			}
		}
		for (idTabPageAux in tabPageTab[idTab].opcion) {
			if (tabPageTab[idTab].opcion[idTabPageAux].fila == tabPageTab[idTab].opcion[idTabPage].fila) {
				tabPageOpcion[idTabPageAux] = tabPageTab[idTab].opcion[idTabPageAux];

				tabPageTab[idTab].opcion[idTabPageAux].anchoAjustado = document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla").offsetWidth;
				tabPageTab[idTab].opcion[idTabPageAux].separador = document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_separador").offsetWidth;
				tabPageTab[idTab].opcion[idTabPageAux].altoAjustado = document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_interior").offsetHeight;
			}
		}
		tabPageTab[idTab].opcion = tabPageOpcion;

		vopcionesHTML = new Array();
		fila = nfila_ini;
		filaAux = 0;
		for (idTabPageAux in tabPageTab[idTab].opcion) {
			if (tabPageTab[idTab].opcion[idTabPageAux].fila != filaAux) {
				filaAux = tabPageTab[idTab].opcion[idTabPageAux].fila;
				fila += nfila_inc;
				vopcionesHTML[fila] = "";
			}

			tabPageTab[idTab].opcion[idTabPageAux].fila = fila;

			opcion = tabPageTab[idTab].opcion[idTabPageAux];

			vopcionesHTML[fila] += tabPage_armarOpcion(idTab,idTabPageAux,opcion.html,opcion.title,opcion.estilo);
		}

		opcionesHTML = "";
		for (fila=1; fila<vopcionesHTML.length; fila++) {
			opcionesHTML += vopcionesHTML[fila];
		}

		document.getElementById(idTab + ".opciones").innerHTML = opcionesHTML;

		for (idTabPageAux in tabPageTab[idTab].opcion) {
			document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla").style.width = tabPageTab[idTab].opcion[idTabPageAux].anchoAjustado + "px";
			document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_separador").style.width = tabPageTab[idTab].opcion[idTabPageAux].separador + "px";
			document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_interior_bi").style.height = tabPageTab[idTab].opcion[idTabPageAux].altoAjustado + "px";
			document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_interior").style.height = tabPageTab[idTab].opcion[idTabPageAux].altoAjustado + "px";
			document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla_interior_bd").style.height = tabPageTab[idTab].opcion[idTabPageAux].altoAjustado + "px";
		}

		document.getElementById(idTab + ".opciones").style.visibility = "visible";
	}

	for (idTabPageAux in tabPageTab[idTab].opcion) {
		if (tabPageTab[idTab].opcion[idTabPageAux].fila == nfila_ref) {
			if (idTabPageAux == tabPageTab[idTab].activa) {
		    	document.getElementById(idTab + "." + idTabPageAux + ".opcion").className = "tabPage_seleccionado";

				if (tabPageTab[idTab].alineacion == "arriba") {
					document.getElementById(idTab + "." + idTabPageAux + ".opcion").style.top = "1px";
				}else if (tabPageTab[idTab].alineacion == "abajo") {
					document.getElementById(idTab + "." + idTabPageAux + ".opcion").style.top = "-1px";
				}

				document.getElementById(idTab + "." + idTabPageAux + ".opcion").style.zIndex = "999";
				document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla.alto_arriba").style.height = "0px";
				document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla.alto_abajo").style.height = "3px";
			}else{
				document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla.alto_arriba").style.height = "3px";
				document.getElementById(idTab + "." + idTabPageAux + ".opcion_tabla.alto_abajo").style.height = "0px";
			}
		}
	}
//Borrar Ini
//if (!(idTab == "tab_1" && idTabPage == "tabPage_2")) {
//	document.getElementById(idTab + "." + idTabPage + ".contenido").innerHTML = "tabPage: [" + idTab + "." + idTabPage + "] fila: [" + tabPageTab[idTab].opcion[idTabPage].fila + "/" + tabPageTab[idTab].nfilas + "] anchoReal: [" + tabPageTab[idTab].opcion[idTabPage].ancho + "] anchoHTML: [" + document.getElementById(idTab + "." + idTabPage + ".opcion_tabla").offsetWidth + "] separador: [" + document.getElementById(idTab + "." + idTabPage + ".opcion_tabla_separador").offsetWidth + "] top: [" + document.getElementById(idTab + "." + idTabPage + ".opcion").offsetTop + "]";
//}
//Borrar Fin
}

function tabPage_dibujarTab(idTab) {
	var idTabPage, opcion, html = "";

	if (tabPageTab[idTab].alineacion != null && tabPageTab[idTab].alineacion.length > 0) {
		tabPageTab[idTab].alineacion = tabPageTab[idTab].alineacion.toLowerCase();
	}else{
		tabPageTab[idTab].alineacion = "arriba";
	}

	if (tabPageTab[idTab].margen == null || tabPageTab[idTab].margen.length == 0) {
		tabPageTab[idTab].margen = 5;
	}

	html += '<div id="' + idTab + '" class="tab">';
	html += '  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';

	if (tabPageTab[idTab].alineacion == "arriba") {
		html += '    <tr class="tabPage_opcion"> ';
		html += '      <td id="' + idTab + '.td_opciones"> ';
		html += '        <div id="' + idTab + '.opciones"> ';

		tabPageTab[idTab].opcionesHTML = "";
		for (idTabPage in tabPageTab[idTab].opcion) {
			opcion = tabPageTab[idTab].opcion[idTabPage];
			tabPageTab[idTab].opcionesHTML += tabPage_armarOpcion(idTab,idTabPage,opcion.html,opcion.title,opcion.estilo);
		}
		html += tabPageTab[idTab].opcionesHTML;

		html += '        </div>';
		html += '      </td>';
		html += '    </tr>';
	}

	html += '    <tr height="100%" class="tabPage_fondo"> ';
	html += '      <td>';
	html += '        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';
	html += '          <tr> ';
	html += '            <td colspan="3" height="1" class="tabPage_borde"></td>';
	html += '          </tr>';
	html += '          <tr> ';
	html += '            <td width="1" class="tabPage_borde"></td>';
	html += '            <td> ';
	html += '              <table width="100%" height="100%" border="0" cellspacing="' + tabPageTab[idTab].margen + '" cellpadding="0">';
	html += '                <tr> ';
	html += '                  <td> ';

	for (idTabPage in tabPageTab[idTab].opcion) {
		var id = idTab + "." + idTabPage;

		html += '<div id="' + id + '.contenido" class="tabPage_contenido">';
		html += '</div>';
	}

	html += '                  </td> ';
	html += '                </tr> ';
	html += '              </table>';
	html += '            </td>';
	html += '            <td width="1" class="tabPage_borde"></td>';
	html += '          </tr>';
	html += '          <tr> ';
	html += '            <td colspan="3" height="1" class="tabPage_borde"></td>';
	html += '          </tr>';
	html += '        </table>';
	html += '      </td>';
	html += '    </tr>';

	if (tabPageTab[idTab].alineacion == "abajo") {
		html += '    <tr class="tabPage_opcion"> ';
		html += '      <td id="' + idTab + '.td_opciones"> ';
		html += '        <div id="' + idTab + '.opciones"> ';

		tabPageTab[idTab].opcionesHTML = "";
		for (idTabPage in tabPageTab[idTab].opcion) {
			opcion = tabPageTab[idTab].opcion[idTabPage];
			tabPageTab[idTab].opcionesHTML += tabPage_armarOpcion(idTab,idTabPage,opcion.html,opcion.title,opcion.estilo);
		}
		html += tabPageTab[idTab].opcionesHTML;

		html += '        </div>';
		html += '      </td>';
		html += '    </tr>';
	}

	html += '  </table>';
	html += '</div>';

	document.writeln(html);

	tabPage_desHabilitarSeleccionObjeto(document.getElementById(idTab + ".opciones"));

	for (idTabPage in tabPageTab[idTab].opcion) {
		var id = idTab + "." + idTabPage;
		var idContenido = tabPageTab[idTab].opcion[idTabPage].idContenido;
		var contenido = "";

		if (document.getElementById(idContenido) == null) {
			contenido += '<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';
			contenido += '  <tr>';
			contenido += '    <td valign="top">No existe DIV para la opción "' + id + '".</td>';
			contenido += '  </tr>';
			contenido += '</table>';

			document.getElementById(id + ".contenido").innerHTML = contenido;
		}else{
			document.getElementById(idContenido).style.display = "block";

			document.getElementById(id + ".contenido").appendChild(document.getElementById(idContenido));
		}
	}
}

function tabPage_desHabilitarSeleccionObjeto(target) {
	if (typeof target.onselectstart != "undefined") {//IE
		target.onselectstart = function() {return false}
	}else if (typeof target.style.MozUserSelect != "undefined") {//Firefox
		target.style.MozUserSelect = "none";
	}else{ //Opera
		target.onmousedown = function() {return false}
	}
	target.style.cursor = "default";
}

function tabPage_armarOpcion(idTab,idTabPage,html,title,estilo) {
	var id = idTab + "." + idTabPage;
	var opcion = "";

	opcion += '<div id="' + id + '.opcion" onClick="tabPage_onClick(\'' + idTab + '\',\'' + idTabPage + '\')" onMouseOver="tabPage_onMouseOver(\'' + idTab + '\',\'' + idTabPage + '\')" onMouseOut="tabPage_onMouseOut(\'' + idTab + '\',\'' + idTabPage + '\')" class="tabPage_normal' + (tabPageTab[idTab].opcion[idTabPage].disabled?"Disabled":"")+ '"> ';
	opcion += '  <table id="' + id + '.opcion_tabla" border="0" cellspacing="0" cellpadding="0" class="tabPage_tabla">';
	opcion += '    <tr valign="bottom"> ';
	opcion += '      <td> ';
	opcion += '        <table width="100%" border="0" cellspacing="0" cellpadding="0">';

	if (tabPageTab[idTab].alineacion == "arriba") {
		opcion += '          <tr> ';
		opcion += '            <td> ';
		opcion += '              <table id="' + id + '.opcion_tabla.alto_arriba" width="100%" border="0" cellspacing="0" cellpadding="0" style="height:3px;">';
		opcion += '                <tr> ';
		opcion += '                  <td><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                </tr>';
		opcion += '              </table>';
		opcion += '            </td>';
		opcion += '          </tr>';
		opcion += '          <tr> ';
		opcion += '            <td> ';
		opcion += '              <table width="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                <tr> ';
		opcion += '                  <td> ';
		opcion += '                    <table width="3" height="3" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td></td>';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td width="100%"> ';
		opcion += '                    <table width="100%" height="3" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td> ';
		opcion += '                    <table width="3" height="3" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                </tr>';
		opcion += '              </table>';
		opcion += '            </td>';
		opcion += '          </tr>';
	}else if (tabPageTab[idTab].alineacion == "abajo") {
		opcion += '          <tr> ';
		opcion += '            <td> ';
		opcion += '              <table id="' + id + '.opcion_tabla.alto_abajo" width="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                <tr> ';
		opcion += '                  <td> ';
		opcion += '                    <table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td width="100%"> ';
		opcion += '                    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_abajo"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td> ';
		opcion += '                    <table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                </tr>';
		opcion += '              </table>';
		opcion += '            </td>';
		opcion += '          </tr>';
	}

	opcion += '          <tr> ';
	opcion += '            <td> ';
	opcion += '              <table border="0" cellspacing="0" cellpadding="0">';
	opcion += '                <tr> ';
	opcion += '                  <td id="' + id + '.opcion_tabla_interior_bi" height="100%"> ';
	opcion += '                    <table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">';
	opcion += '                      <tr> ';
	opcion += '                        <td class="tabPage_borde"><div style="width:1px; overflow:hidden;">&nbsp;</div></td>';
	opcion += '                      </tr>';
	opcion += '                    </table>';
	opcion += '                  </td>';
	opcion += '                  <td width="100%"> ';
	opcion += '                    <table id="' + id + '.opcion_tabla_interior" width="100%" border="0" cellspacing="0" cellpadding="0">';
	opcion += '                      <tr ' + estilo + '> ';
	opcion += '                        <td align="center" title="' + title + '" nowrap class="tabPage_fondo_centro">' + html + '</td>';
	opcion += '                      </tr>';
	opcion += '                    </table>';
	opcion += '                  </td>';
	opcion += '                  <td id="' + id + '.opcion_tabla_interior_bd" height="100%"> ';
	opcion += '                    <table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">';
	opcion += '                      <tr> ';
	opcion += '                        <td class="tabPage_borde"><div style="width:1px; overflow:hidden;">&nbsp;</div></td>';
	opcion += '                      </tr>';
	opcion += '                    </table>';
	opcion += '                  </td>';
	opcion += '                </tr>';
	opcion += '              </table>';
	opcion += '            </td>';
	opcion += '          </tr>';

	if (tabPageTab[idTab].alineacion == "arriba") {
		opcion += '          <tr> ';
		opcion += '            <td> ';
		opcion += '              <table id="' + id + '.opcion_tabla.alto_abajo" width="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                <tr> ';
		opcion += '                  <td> ';
		opcion += '                    <table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td width="100%"> ';
		opcion += '                    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_abajo"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td> ';
		opcion += '                    <table width="1" height="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                </tr>';
		opcion += '              </table>';
		opcion += '            </td>';
		opcion += '          </tr>';
	}else if (tabPageTab[idTab].alineacion == "abajo") {
		opcion += '          <tr> ';
		opcion += '            <td> ';
		opcion += '              <table width="100%" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                <tr> ';
		opcion += '                  <td> ';
		opcion += '                    <table width="3" height="3" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td></td>';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td width="100%"> ';
		opcion += '                    <table width="100%" height="3" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                  <td> ';
		opcion += '                    <table width="3" height="3" border="0" cellspacing="0" cellpadding="0">';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_fondo_arriba"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_fondo_arriba"></td>';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                      </tr>';
		opcion += '                      <tr> ';
		opcion += '                        <td class="tabPage_borde_esquina_2"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td class="tabPage_borde_esquina_1"><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                        <td></td>';
		opcion += '                      </tr>';
		opcion += '                    </table>';
		opcion += '                  </td>';
		opcion += '                </tr>';
		opcion += '              </table>';
		opcion += '            </td>';
		opcion += '          </tr>';
		opcion += '          <tr> ';
		opcion += '            <td> ';
		opcion += '              <table id="' + id + '.opcion_tabla.alto_arriba" width="100%" border="0" cellspacing="0" cellpadding="0" style="height:3px;">';
		opcion += '                <tr> ';
		opcion += '                  <td><div style="width:1px; height:1px; overflow:hidden;"></div></td>';
		opcion += '                </tr>';
		opcion += '              </table>';
		opcion += '            </td>';
		opcion += '          </tr>';
	}

	opcion += '        </table>';
	opcion += '      </td>';
	opcion += '      <td id="' + id + '.opcion_tabla_separador" style="width:1px;"></td>';
	opcion += '    </tr>';
	opcion += '  </table>';
	opcion += '</div>';

	return opcion;
}

function tabPage_addEvent(elm,evType,fn,useCapture) {
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
	if (elm.addEventListener) {
		elm.addEventListener(evType,fn,useCapture);
		return true;
	}else if (elm.attachEvent) {
		var r = elm.attachEvent("on"+evType,fn);
		return r;
	}else{
		alert("Handler could not be removed");
	}
}
