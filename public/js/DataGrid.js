function DataGrid(tabObj,opciones) {
	if (typeof opciones == "undefined") {
		var opciones = {};
	}

	//Propiedades
	this.tabObj			 = tabObj;
	this.rowOver		 = (typeof opciones.rowOver == "undefined") ? true : opciones.rowOver;
	this.rowSelect		 = (typeof opciones.rowSelect == "undefined") ? true : opciones.rowSelect;
	this.rowSelectAlways = (typeof opciones.rowSelectAlways == "undefined") ? false : opciones.rowSelectAlways;
	this.rowMultiSelect	 = (typeof opciones.rowMultiSelect == "undefined") ? true : opciones.rowMultiSelect;
	this.onChangeSelect	 = opciones.onChangeSelect;
	this.sortColumn		 = (typeof opciones.sortColumn == "undefined") ? new Array() : opciones.sortColumn;

	//Métodos
	this.getTabObj			 = getTabObj;
	this.getSelectedRow		 = getSelectedRow;
	this.getRowCount		 = getRowCount;
	this.getRowCountSelected = getRowCountSelected;
	this.getNRow			 = getNRow;
	this.getRow				 = getRow;
	this.isSelectedRow		 = isSelectedRow;
	this.selectRow			 = selectRow;
	this.scrollToRow		 = scrollToRow;
	this.insertRow			 = insertRow;
	this.insertRowBefore	 = insertRowBefore;
	this.insertRowAfter		 = insertRowAfter;
	this.updateRow			 = updateRow;
	this.deleteRow			 = deleteRow;
	this.deleteRows			 = deleteRows;
	this.sort				 = sort;
	this.getColumnSort		 = getColumnSort;
	this.getColumnSortOrder	 = getColumnSortOrder;
	this.getTabHTML			 = getTabHTML;
	this.setInnerHTML		 = setInnerHTML;
	this.setAttribute		 = setAttribute;
	this.ajustar			 = ajustar;
	this.setRowSelect		 = setRowSelect;
	this.reset               = reset;

	function getTabObj() {
		return tabObj;
	}

	function getSelectedRow(nRowFrom) {
		var nRow = 0;

		if (typeof nRowFrom == "undefined") {
			var nRowFrom = 0;
		}else{
			nRowFrom--;
		}

		var tbody = tabObj.getElementsByTagName("tbody")[0];

		if (tbody != null) {
			var rows  = tbody.getElementsByTagName("tr");
			var row;

			for (i=nRowFrom; i<rows.length; i++) {
				row = rows[i];

				if (row.className == "down") {
					nRow = i + 1;
					break;
				}
			}
		}

		return nRow;
	}

	function getRowCount() {
		var nRows = 0;
		var tbody = tabObj.getElementsByTagName("tbody")[0];

		if (tbody != null) {
			nRows = tbody.getElementsByTagName("tr").length;
		}

		return nRows;
	}

	function getRowCountSelected() {
		var nRows = 0;
		var tbody = tabObj.getElementsByTagName("tbody")[0];

		if (tbody != null) {
			var rows  = tbody.getElementsByTagName("tr");
			var row;

			for (i=0; i<rows.length; i++) {
				row = rows[i];

				if (row.className == "down") {
					nRows++;
				}
			}
		}

		return nRows;
	}

	function getNRow(row) {
		var nRow;

		if (row == null) {
			nRow = scrollNRow;
		}else{
			var thead = tabObj.getElementsByTagName("thead")[0];

			nRow = row.rowIndex - (thead.getElementsByTagName("tr").length - 1);
		}

		return nRow;
	}

	function getRow(nRow) {
		var row   = null;
		var tbody = tabObj.getElementsByTagName("tbody")[0];

		if (tbody != null) {
			var rows = tbody.getElementsByTagName("tr");
			var row  = rows[nRow - 1];
		}

		return row;
	}

	function isSelectedRow(nRow) {
		var select = false;
		var row = getRow(nRow);

		if (row != null) {
			if (row.className == "down") {
				select = true;
			}
		}

		return select;
	}

	function selectRow(nRow,select) {
		if (scrollRowSelect) {
			if (nRow >= 0 && nRow <= getRowCount()) {
				var tbody = tabObj.getElementsByTagName("tbody")[0];

				if (tbody != null) {
					var rows = tbody.getElementsByTagName("tr");
					var row;

					if (nRow == 0) {
						for (i=0; i<rows.length; i++) {
							row = rows[i];

							if (select) {
								if (scrollRowMultiSelect) {
									if (row.getAttribute("disabled") == null || row.disabled == false) {
										if (row.style.backgroundColor.length != 0) {
											scroll_rowColor(row,"");
										}
										row.className = "down";
									}
								}
							}else{
								if (row.style.backgroundColor.length != 0) {
									scroll_rowColor(row,row.style.backgroundColor);
								}
								row.className = "out";
							}
						}
					}else{
						row = rows[nRow - 1];

						if (select) {
							if (!scrollRowMultiSelect) {
								for (i=0; i<rows.length; i++) {
									if (rows[i].style.backgroundColor.length != 0) {
										scroll_rowColor(rows[i],rows[i].style.backgroundColor);
									}
									rows[i].className = "out";
								}
							}

							if (row.getAttribute("disabled") == null || row.disabled == false) {
								if (row.style.backgroundColor.length != 0) {
									scroll_rowColor(row,"");
								}
								row.className = "down";
							}
						}else{
							if (row.style.backgroundColor.length != 0) {
								scroll_rowColor(row,row.style.backgroundColor);
							}
							row.className = "out";
						}

						var thead = tabObj.getElementsByTagName("thead")[0];

						scrollLastNRow = row.rowIndex - (thead.getElementsByTagName("tr").length - 1);
					}
				}
			}
		}
	}

	function scrollToRow(nRow) {
		var table = tabObj;
		var areaScroll;
		if (table.parentNode != null && (table.parentNode.style.overflow.toLowerCase() == "auto" || table.parentNode.style.overflow.toLowerCase() == "scroll") && table.parentNode.clientHeight > 0) {
			areaScroll = table.parentNode;
		}else{
			areaScroll = table.ownerDocument.body;
		}
		var thead = table.getElementsByTagName("thead")[0];
		var tbody = table.getElementsByTagName("tbody")[0];
		var tfoot = table.getElementsByTagName("tfoot")[0];

		if (tbody != null) {
			var alto_thead = 0;
			var alto_tfoot = 0;

			if (thead != null) {
				alto_thead = thead.offsetHeight;
			}

			if (tfoot != null) {
				alto_tfoot = tfoot.offsetHeight;
			}

			var posicion        = -1;
			var fila_alto       = tbody.getElementsByTagName("tr")[0].offsetHeight;
			var fila_cant_vista = ((areaScroll.clientHeight - alto_thead - alto_tfoot) / fila_alto) - 1;
			var scroll_inicio   = (areaScroll.scrollTop / fila_alto) + fila_cant_vista + 1;
			var scroll_fin      = (areaScroll.scrollTop / fila_alto) + 1;
			var fila_ult        = Math.ceil(tbody.offsetHeight / fila_alto);

			if (nRow > scroll_inicio) {
				posicion = (fila_alto * (nRow - fila_cant_vista - 1)) + 1;
				if (nRow == fila_ult) {
					posicion++;
				}
			}else if (nRow < scroll_fin) {
				posicion = fila_alto * (nRow - 1);
			}

			if (posicion != -1) {
				areaScroll.scrollTop = posicion;
			}
		}
	}

	function insertRow(row) {
		var table = tabObj;
		var thead = table.getElementsByTagName("thead")[0];
		var tbody = table.getElementsByTagName("tbody")[0];

		if (tbody == null) {
			tbody = table.ownerDocument.createElement("tbody");
			tbody.appendChild(row);
			table.appendChild(tbody);
		}else{
			tbody.appendChild(row);
		}

		scrollNRow = row.rowIndex - (thead.getElementsByTagName("tr").length - 1);

		scroll_reGenerar();
	}

	function insertRowBefore(row,rowRef) {
		var table = tabObj;
		var thead = table.getElementsByTagName("thead")[0];
		var tbody = table.getElementsByTagName("tbody")[0];

		if (tbody == null) {
			tbody = table.ownerDocument.createElement("tbody");
			tbody.appendChild(row);
			table.appendChild(tbody);
		}else{
			tbody.insertBefore(row,rowRef);
		}

		scrollNRow = row.rowIndex - (thead.getElementsByTagName("tr").length - 1);

		scroll_reGenerar();
	}

	function insertRowAfter(row,rowRef) {
		var table = tabObj;
		var thead = table.getElementsByTagName("thead")[0];
		var tbody = table.getElementsByTagName("tbody")[0];

		if (tbody == null) {
			tbody = table.ownerDocument.createElement("tbody");
			tbody.appendChild(row);
			table.appendChild(tbody);
		}else{
			if (rowRef.nextSibling) {
				rowRef.parentNode.insertBefore(row,rowRef.nextSibling);
			}else{
				rowRef.parentNode.appendChild(row);
			}
		}

		scrollNRow = row.rowIndex - (thead.getElementsByTagName("tr").length - 1);

		scroll_reGenerar();
	}

	function updateRow(nRow,row) {
		var rowOld = getRow(nRow);

		if (rowOld != null) {
			rowOld.parentNode.replaceChild(row,rowOld);

			scroll_reGenerar();
		}
	}

	function deleteRow(nRow) {
		var row	= getRow(nRow);

		if (row != null) {
			row.parentNode.removeChild(row);

			scroll_reGenerar();
		}
	}

	function deleteRows() {
		var table = tabObj;
		var tbody = table.getElementsByTagName("tbody")[0];

		if (tbody != null) {
			tbody.parentNode.removeChild(tbody);

			scroll_reGenerar();

			if (typeof scrollOnChangeSelect != "undefined") {
				scrollOnChangeSelect();
			}
		}
	}

	function sort(nColumn,order) {
		var obj = tabObj;

		var tHead = obj.getElementsByTagName("thead")[0];

		var cells = tHead.getElementsByTagName("td");

		if (cells.length == 0) {
			cells  = tHead.getElementsByTagName("th");
		}

		if (nColumn >= 1 && nColumn <= cells.length) {
			if (order == "desc") {
				cells[nColumn - 1].setAttribute("sortTableOrden","asc");
			}

			sortTable(cells,nColumn - 1);

			sortTable_ajustarWidthHeaderFooter();
		}
	}

	function getColumnSort() {
		if (isNaN(sortTableColumnIndex)) {
			return 0;
		}else{
			return sortTableColumnIndex + 1;
		}
	}

	function getColumnSortOrder() {
		if (sortTableColumnIndexOrder.length == 0) {
			return "asc";
		}else{
			return sortTableColumnIndexOrder;
		}
	}

	function getTabHTML(anchoCell) {
		var html = "";
		var tHead = tabObj.getElementsByTagName("thead")[0];
		var tBody = tabObj.getElementsByTagName("tbody")[0];
		var tFoot = tabObj.getElementsByTagName("tfoot")[0];
		anchoCell = (typeof anchoCell == "undefined") ? new Array() : anchoCell;

		html += "<table border=1>";
		if (tHead != null) {
			html += "<thead>" + getHTML(tHead,anchoCell) + "</thead>";
		}
		if (tBody != null) {
			html += "<tbody>" + getHTML(tBody,anchoCell) + "</tbody>";
		}
		if (tFoot != null) {
			html += "<tfoot>" + getHTML(tFoot,anchoCell) + "</tfoot>";
		}
		html += "</table>";

		return html;
	}

	function getHTML(tag,anchoCell) {
		var rows	= tag.getElementsByTagName("tr");
		var tagName	= tag.tagName.toLowerCase();
		var html	= "";

		for (i=0; i<rows.length; i++) {
			cells = rows[i].getElementsByTagName("td");
			if (cells.length == 0) {
				cells = rows[i].getElementsByTagName("th");
			}

			html += "<tr>";

			colspan = 1;
			jj = 0;

			for (j=0; j<cells.length; j++) {
				cell = cells[j];

				if (tagName == "thead") {
					cellAux = document.createElement("td");
					cellAux.innerHTML = cell.getAttribute("sortTableText");
				}else{
					cellAux = cell;
				}

				while (cellAux.childNodes.length > 0) {
					if (typeof cellAux.childNodes[0].innerHTML == "undefined") {
						break;
					}else{
						cellAux = cellAux.childNodes[0];
					}
				}
				innerHTML = cellAux.innerHTML;

				if (tagName == "thead" || tagName == "tfoot") {
					innerHTML = "<b>" + innerHTML + "</b>";
				}

				html += "<" + "td";
				if (tagName == "thead") {
					html += " align=center";
				}else{
					if (cell.getAttribute("align")) {
						html += " align=" + cell.getAttribute("align");
					}
				}
				if (cell.getAttribute("colspan") != 1 && cell.getAttribute("colspan") != null) {
					colspan = parseInt(cell.getAttribute("colspan"),10);
					html += " colspan=" + colspan;
				}else{
					if (anchoCell[jj]) {
						html += " width=" + anchoCell[jj];
						if (tagName == "thead") {
							html += " bgcolor=#cccccc";
						}
					}
					colspan = 1;
				}
				if (cell.getAttribute("nowrap")) {
					html += " " + cell.getAttribute("nowrap");
				}
				html += ">" + innerHTML + "</" + "td" + ">";

				jj += colspan;
			}

			html += "</tr>";
		}

		return html;
	}

	function setInnerHTML(id,valor) {
		var table = tabObj;

		if (table.ownerDocument.getElementById(id + "Header") != null) {
			table.ownerDocument.getElementById(id + "Header").innerHTML = valor;
		}

		if (table.ownerDocument.getElementById(id) != null) {
			table.ownerDocument.getElementById(id).innerHTML = valor;
		}

		if (table.ownerDocument.getElementById(id + "Footer") != null) {
			table.ownerDocument.getElementById(id + "Footer").innerHTML = valor;
		}
	}

	function setAttribute(id,atributo,valor) {
		var table = tabObj;

		if (table.ownerDocument.getElementById(id + "Header") != null) {
			table.ownerDocument.getElementById(id + "Header").setAttribute(atributo,valor);
		}

		if (table.ownerDocument.getElementById(id) != null) {
			table.ownerDocument.getElementById(id).setAttribute(atributo,valor);
		}

		if (table.ownerDocument.getElementById(id + "Footer") != null) {
			table.ownerDocument.getElementById(id + "Footer").setAttribute(atributo,valor);
		}
	}

	function ajustar() {
		var table = tabObj;

		if (table.ownerDocument.all) {
		}else{
			var tfoot  = table.getElementsByTagName("tfoot")[0];
			var tableF = table.ownerDocument.getElementById(table.id + "Footer");
			var altoF  = 0;

			if (tfoot != null) {
				altoF = tfoot.offsetHeight + 2;
			}

			tableF.style.top = (table.ownerDocument.body.clientHeight)>table.offsetHeight?table.offsetHeight - altoF:(table.ownerDocument.body.clientHeight - altoF) + "px";
		}

		sortTable_ajustarWidthHeaderFooter();
	}

	function setRowSelect(selecciona) {
		scrollRowSelect = selecciona;
	}

	function reset() {
		var table = tabObj;
		var tbody = table.getElementsByTagName("tbody")[0];
	
		if (tbody != null) {
			tbody.parentNode.removeChild(tbody);
		}

		ajustar();
	}

	var sortTableColumnIndex;
	var sortTableColumnIndexOrder = "";
	var sortTableColumnImagePath  = "img/";
	var sortTableColumnWrite	  = new Array();

//	* Array of this.sortColumn ('S' = String, 'N' = numeric, 'D' = Date, 'T' = Time, 'DT' = DateTime, false = no sort)
	sortTable_init(this.sortColumn);

	function sortTable_init(sortColumn) {
		var obj		  = tabObj;
		var sortArray = sortColumn;

		obj.cellSpacing = 0;
		obj.cellPadding = 0;
		obj.className = "dataGrid";
		var tHead = obj.getElementsByTagName("thead")[0];
		var cells = tHead.getElementsByTagName("td");
		var cell;

		if (cells.length == 0) {
			cells = tHead.getElementsByTagName("th");
		}

		for (i=0; i<cells.length; i++) {
			cell = cells[i];
			cell.className = "dataGrid_headerCell";
			cell.onselectstart = eventFalse;

	        var text = cell.innerHTML;

			if (sortArray[i]) {
		        var antes, despues;
				var imagenTrans = sortTableColumnImagePath + "transparente.gif";

				if (cell.align.toLowerCase() == "center" || ((cell.tagName.toLowerCase() == "td" || cell.tagName.toLowerCase() == "th") && cell.align.length == 0)) {
					antes   = "<img src='" + imagenTrans + "' width='8' height='8'>";
					despues = "<img src='" + imagenTrans + "' width='7' height='8'>";
				}else if (cell.align.toLowerCase() == "right") {
					antes   = "<img src='" + imagenTrans + "' width='15' height='8'>";
					despues = "";
				}else{
					antes   = "";
					despues = "<img src='" + imagenTrans + "' width='15' height='8'>";
				}

				cell.innerHTML = antes + text + despues;

			    var sortfn = null;
				var tsort = sortArray[i].toLowerCase();
				if (sortfn == null && tsort == "n") sortfn = "sortTable_sort_numeric";
				if (sortfn == null && tsort == "d") sortfn = "sortTable_sort_date";
				if (sortfn == null && tsort == "t") sortfn = "sortTable_sort_time";
				if (sortfn == null && tsort == "dt") sortfn = "sortTable_sort_datetime";
			    if (sortfn == null) sortfn = "sortTable_sort_caseinsensitive";

				cell.setAttribute("sortTableFunction",sortfn);

				cell.onmouseover = sortTable_highlightHeader;
				cell.onmouseout = sortTable_deHighlightHeader;
				cell.onmousedown = sortTable_mousedownHeader;
				cell.onmouseup = sortTable_highlightHeader;
				eval("cell.onclick = function() {sortTable(cells," + i + ");}");
			}else{
				cell.style.cursor = "default";
			}

			cell.setAttribute("sortTableText",text);
		}

		var tFoot = obj.getElementsByTagName("tfoot")[0];
		if (tFoot != null) {
			var cells = tFoot.getElementsByTagName("td");
			var cell;



			if (cells.length == 0) {
				cells = tFoot.getElementsByTagName("th");
			}

			for (i=0; i<cells.length; i++) {
				cell = cells[i];
				cell.className = "dataGrid_footerCell";
			}
		}

		sortTable_createHeaderFooter();

		sortTable_updateIdHeaderFooter();
	}

	function sortTable_createHeaderFooter() {
		var table  = tabObj;
		var tableH = table.cloneNode(true);
		var thead  = table.getElementsByTagName("thead")[0];
		var theadH = tableH.getElementsByTagName("thead")[0];
		var tbodyH = tableH.getElementsByTagName("tbody")[0];
		var tfootH = tableH.getElementsByTagName("tfoot")[0];

		var tableF = table.cloneNode(true);
		var tfoot  = table.getElementsByTagName("tfoot")[0];
		var theadF = tableF.getElementsByTagName("thead")[0];
		var tbodyF = tableF.getElementsByTagName("tbody")[0];
		var tfootF = tableF.getElementsByTagName("tfoot")[0];

		if (tbodyH != null) {
			tbodyH.parentNode.removeChild(tbodyH);
		}
		if (tfootH != null) {
			tfootH.parentNode.removeChild(tfootH);
		}

		if (theadF != null) {
			theadF.parentNode.removeChild(theadF);
		}
		if (tbodyF != null) {
			tbodyF.parentNode.removeChild(tbodyF);
		}

		tableH.id = tableH.id + "Header";
		tableF.id = tableF.id + "Footer";

		var altoF = 0;

		if (tfoot != null) {
			altoF = tfoot.offsetHeight + 2;
		}

		if (table.ownerDocument.all) {
			var objDiv = table.ownerDocument.createElement("div");
			objDiv.id = tabObj.id + "Div";
			objDiv.style.overflow = "auto";
			table.parentNode.insertBefore(objDiv,table);
			objDiv.appendChild(table);

			if (eval('typeof sortTableColumnWrite["' + tabObj.id + '"]') == "undefined") {
				var css;

				obj = "(this.ownerDocument.getElementById('" + objDiv.id + "').scrollTop>0?this.ownerDocument.getElementById('" + objDiv.id + "'):this.ownerDocument.body)";

				css	= "#" + tableH.id + " {top:expression(" + obj + ".scrollTop + 'px');}";
				agregarCss(table.ownerDocument.parentWindow,css);
				agregarCss(table.ownerDocument.parentWindow.parent,css);

				css = "#" + tableF.id + " {top:expression((" + obj + ".offsetHeight + " + obj + ".scrollTop > this.ownerDocument.getElementById('" + tabObj.id + "').offsetHeight + (this.ownerDocument.getElementById('" + tabObj.id + "').offsetWidth > " + obj + ".offsetWidth - (this.ownerDocument.getElementById('" + tabObj.id + "').offsetHeight > " + obj + ".offsetHeight?17:0)?17:0)?this.ownerDocument.getElementById('" + tabObj.id + "').offsetHeight - " + altoF + " + (this.ownerDocument.getElementById('" + tabObj.id + "').offsetHeight > " + obj + ".offsetHeight?17:0):" + obj + ".offsetHeight + " + obj + ".scrollTop - " + altoF + " - (this.ownerDocument.getElementById('" + tabObj.id + "').offsetHeight > " + obj + ".offsetHeight && this.ownerDocument.getElementById('" + tabObj.id + "').offsetWidth > " + obj + ".offsetWidth?17:this.ownerDocument.getElementById('" + tabObj.id + "').offsetWidth > " + obj + ".offsetWidth - (this.ownerDocument.getElementById('" + tabObj.id + "').offsetHeight > " + obj + ".offsetHeight?17:0)?17:0)) + 'px');}";
				agregarCss(table.ownerDocument.parentWindow,css);
				agregarCss(table.ownerDocument.parentWindow.parent,css);

				sortTableColumnWrite[tabObj.id] = tableH.innerHTML;
			}

			tableH.style.position = "absolute";
			tableF.style.position = "absolute";

			table.ownerDocument.parentWindow.onresize = function() {
				objDiv.style.width	= table.ownerDocument.body.offsetWidth + "px";
				objDiv.style.height	= table.ownerDocument.body.offsetHeight + "px";
				sortTable_ajustarWidthHeaderFooter();
			}
		}else{
			tableH.style.position = "fixed";
			tableH.style.top	  = "0px";
			tableH.style.left	  = "0px";

			tableF.style.position = "fixed";
			tableF.style.top	  = (table.ownerDocument.body.clientHeight)>table.offsetHeight?table.offsetHeight - altoF:(table.ownerDocument.body.clientHeight - altoF) + "px";
			tableF.style.left	  = "0px";

			window.onresize = function() {
				tableF.style.top  = (table.ownerDocument.body.clientHeight)>table.offsetHeight?table.offsetHeight - altoF:(table.ownerDocument.body.clientHeight - altoF) + "px";
				sortTable_ajustarWidthHeaderFooter();
			}

			table.ownerDocument.onscroll = function() {
				tableH.style.left = (table.ownerDocument.body.scrollLeft * -1) + "px";
				tableF.style.left = tableH.style.left;
			}
		}

		tableH.style.zIndex = 999;
		tableF.style.zIndex = 999;

		table.parentNode.appendChild(tableH);
		table.parentNode.appendChild(tableF);

		var cells  = thead.getElementsByTagName("td");
		var cellsH = theadH.getElementsByTagName("td");
		var cell;

		if (cells.length == 0) {
			cells  = thead.getElementsByTagName("th");
			cellsH = theadH.getElementsByTagName("th");
		}

		for (i=0; i<cells.length; i++) {
			cell  = cells[i];
			cellH = cellsH[i];

			cellH.onmouseover = cell.onmouseover;
			cellH.onmouseout  = cell.onmouseout;
			cellH.onmousedown = cell.onmousedown;
			cellH.onmouseup	  = cell.onmouseup;

			cellH.onselectstart = eventFalse;
			eval("cellH.onclick = function() {sortTable(cells," + i + ");}");
		}

		thead.style.visibility = "hidden";

		if (tfoot != null) {
			tfoot.style.visibility = "hidden";
		}

		sortTable_ajustarWidthHeaderFooter();
	}

	function sortTable_ajustarWidthHeaderFooter() {
		var table  = tabObj;
		var tableH = table.ownerDocument.getElementById(table.id + "Header");

		if (tableH != null) {
			var thead  = table.getElementsByTagName("thead")[0];
			var theadH = tableH.getElementsByTagName("thead")[0];

			if (thead != null && theadH != null) {
				var cells  = thead.getElementsByTagName("td");
				var cellsH = theadH.getElementsByTagName("td");
				var cell;

				if (cells.length == 0) {
					cells  = thead.getElementsByTagName("th");
					cellsH = theadH.getElementsByTagName("th");
				}

				var resta = 0;
//				if ((table.ownerDocument.body.scrollWidth - 10) > table.offsetWidth) {
					resta = 10;
//				}

				for (i=0; i<cells.length; i++) {
					cell  = cells[i];
					cellH = cellsH[i];

					try {
						cellH.width = cell.offsetWidth - resta;
					}catch (e){
					}
				}

				try {
					tableH.width = table.offsetWidth;
				}catch (e){
				}
			}
		}

		var tableF = table.ownerDocument.getElementById(table.id + "Footer");

		if (tableF != null) {
			var tfoot  = table.getElementsByTagName("tfoot")[0];
			var tfootF = tableF.getElementsByTagName("tfoot")[0];

			if (tfoot != null && tfootF != null) {
				var cells  = tfoot.getElementsByTagName("td");
				var cellsF = tfootF.getElementsByTagName("td");
				var cell;

				if (cells.length == 0) {
					cells  = tfoot.getElementsByTagName("th");
					cellsF = tfootF.getElementsByTagName("th");
				}

				var resta = 0;
//				if ((table.ownerDocument.body.scrollWidth - 10) > table.offsetWidth) {
					resta = 10;
//				}

				for (i=0; i<cells.length; i++) {
					cell  = cells[i];
					cellF = cellsF[i];

					try {
						cellF.width = cell.offsetWidth - resta;
					}catch(e) {
					}
				}

				try {
					tableF.width = table.offsetWidth;
				}catch(e) {
				}
			}
		}
	}

	function sortTable_updateIdHeaderFooter() {
		var table  = tabObj;
		var tableH = table.ownerDocument.getElementById(table.id + "Header");

		for (i=0; i<tableH.getElementsByTagName("*").length; i++) {
			obj = tableH.getElementsByTagName("*")[i];
			if (obj.getAttribute("id")) {
				obj.setAttribute("id",obj.getAttribute("id") + "Header");
			}
		}

		var tableF = table.ownerDocument.getElementById(table.id + "Footer");

		if (tableF != null) {
			for (i=0; i<tableF.getElementsByTagName("*").length; i++) {
				obj = tableF.getElementsByTagName("*")[i];
				if (obj.getAttribute("id")) {
					obj.setAttribute("id",obj.getAttribute("id") + "Footer");
				}
			}
		}
	}

	function sortTable_highlightHeader() {
		this.className = "dataGrid_headerCellOver";
	}

	function sortTable_deHighlightHeader() {
		this.className = "dataGrid_headerCell";
	}

	function sortTable_mousedownHeader() {
		this.className = "dataGrid_headerCellDown";
	}

	function sortTable(cells,indice) {
		var obj = cells[indice];

		if (obj.getAttribute("sortTableFunction") != null) {
			sortTableColumnIndex = obj.cellIndex;

		    var sortfn = eval(obj.getAttribute("sortTableFunction"));
		    var newRows = new Array();
			var table = sortTable_getParent(obj,"TABLE");
			var thead = table.getElementsByTagName("thead")[0];
			var tfoot = table.getElementsByTagName("tfoot")[0];
			var nRowsTHead = 0;
			var nRowsTFoot = 0;

			var rows = thead.getElementsByTagName("tr");
			nRowsTHead = rows.length;

			if (tfoot != null) {
				rows = tfoot.getElementsByTagName("tr");
				nRowsTFoot = rows.length;
			}

		    for (j=nRowsTHead; j<table.rows.length-nRowsTFoot; j++) {
		    	newRows[j-nRowsTHead] = table.rows[j];
		    }

		    newRows.sort(sortfn);

			if (obj.getAttribute("sortTableOrden") == "asc") {
		        newRows.reverse();
				obj.setAttribute("sortTableOrden","desc");
			}else{
				obj.setAttribute("sortTableOrden","asc");		
			}

			sortTableColumnIndexOrder = obj.getAttribute("sortTableOrden");

		    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
		    // don't do sortbottom rows
		    for (i=0; i<newRows.length; i++) {
		    	if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf("sortbottom") == -1))) {
		    		table.tBodies[0].appendChild(newRows[i]);
		    	}
		    }
		    // do sortbottom rows only
		    for (i=0; i<newRows.length; i++) {
		    	if (newRows[i].className && (newRows[i].className.indexOf("sortbottom") != -1)) {
		    		table.tBodies[0].appendChild(newRows[i]);
		    	}
		    }

			var trObj = obj.parentNode;
			var cells = trObj.getElementsByTagName("TD");
			var cell, text, antes, despues;
			var imagenTrans = sortTableColumnImagePath + "transparente.gif";
			if (cells.length == 0) {
				cells = trObj.getElementsByTagName("TH");
			}

			var objH = tabObj.ownerDocument.getElementById(tabObj.id + "Header");
			var tHeadH = objH.getElementsByTagName("thead")[0];
			var cellsH = tHeadH.getElementsByTagName("td");
			if (cellsH.length == 0) {
				cellsH = tHeadH.getElementsByTagName("th");
			}

			for (i=0; i<cells.length; i++) {
				cell  = cells[i];
				cellH = cellsH[i];

				if (cell.getAttribute("sortTableFunction")) {
					if (i != sortTableColumnIndex) {
				        text = cell.getAttribute("sortTableText");

						if (cell.align.toLowerCase() == "center" || ((cell.tagName.toLowerCase() == "td" || cell.tagName.toLowerCase() == "th") && cell.align.length == 0)) {
							antes   = "<img src='" + imagenTrans + "' width='8' height='8'>";
							despues = "<img src='" + imagenTrans + "' width='7' height='8'>";
						}else if (cell.align.toLowerCase() == "right") {
							antes   = "<img src='" + imagenTrans + "' width='15' height='8'>";
							despues = "";
						}else{
							antes   = "";
							despues = "<img src='" + imagenTrans + "' width='15' height='8'>";
						}

						cell.innerHTML  = antes + text + despues;
						cellH.innerHTML = cell.innerHTML;
					}
				}
			}

			obj.innerHTML = obj.getAttribute("sortTableText") + 
							"<img src='" + imagenTrans + "' width='4' height='8'>" +
							"<img src='" + sortTableColumnImagePath +
							obj.getAttribute("sortTableOrden") + 
							".gif' width='11' height='8'>";

			var objH = cellsH[indice];
			objH.innerHTML = obj.innerHTML;
		}
	}

	function sortTable_getParent(el,pTagName) {
		if (el == null) {
			return null;
		}else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) { // Gecko bug, supposed to be uppercase
			return el;
		}else{
			return sortTable_getParent(el.parentNode,pTagName);
		}
	}

	function sortTable_getInnerText(el) {
		if (typeof el == "string") return el;
		if (typeof el == "undefined") { return el };
		if (el.innerText) return el.innerText;	//Not needed but it is faster
		var str = "";

		var cs = el.childNodes;
		var l = cs.length;
		for (var i = 0; i < l; i++) {
			switch (cs[i].nodeType) {
				case 1: //ELEMENT_NODE
					str += sortTable_getInnerText(cs[i]);
					break;
				case 3:	//TEXT_NODE
					str += cs[i].nodeValue;
					break;
			}
		}

		return str;
	}

	function sortTable_leftTrim(sString) {
		while (sString.substring(0,1) == " ") {
			sString = sString.substring(1, sString.length);
		}

		return sString;
	}

	function sortTable_rightTrim(sString) {
		while (sString.substring(sString.length-1, sString.length) == " ") {
			sString = sString.substring(0,sString.length-1);
		}

		return sString;
	}

	function sortTable_trim(sString) {
		return sortTable_leftTrim(sortTable_rightTrim(sString));
	}

	function sortTable_date(texto) {
		// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
		var fecha, dd, mm, aa;

		texto = sortTable_trim(texto);

		if (texto.length > 0) {
			texto = texto.replace(/\//gi,"-");
			fecha = texto.split("-");

			dd = parseInt(fecha[0],10);
			mm = parseInt(fecha[1],10);
			aa = parseInt(fecha[2],10);

			if (aa < 1000) {
				if (aa < 50) {
					aa = 2000 + aa;
				}else{
					aa = 1900 + aa;
				}
			}
			if (mm < 10) {
				mm = "0" + mm;
			}
			if (dd < 10) {
				dd = "0" + dd;
			}
		}else{
			dd = "00";
			mm = "00";
			aa = "00";
		}

		fecha = new Array();

		fecha[0] = dd;
		fecha[1] = mm;
		fecha[2] = aa;

		return fecha;
	}

	function sortTable_time(texto) {
		var hora, hh, mi, ss;

		texto = sortTable_trim(texto);

		if (texto.length > 0) {
			hora = texto.split(":");

			hh = parseInt(hora[0],10);
			mi = parseInt(hora[1],10);
			ss = parseInt(hora[2],10);

			if (hh < 10) {
				hh = "0" + hh;
			}
			if (mi < 10) {
				mi = "0" + mi;
			}
			if (ss < 10) {
				ss = "0" + ss;
			}
		}else{
			hh = "00";
			mi = "00";
			ss = "00";
		}

		hora = new Array();

		hora[0] = hh;
		hora[1] = mi;
		hora[2] = ss;

		return hora;
	}

	function sortTable_datetime(texto) {
		var fechaHora, fecha, hora, dd, mm, aa, hh, mi, ss;

		texto = sortTable_trim(texto);

		if (texto.length > 0) {
			fechaHora = texto.split(" ");

			if (fechaHora.length > 0) {
				fecha = sortTable_date(fechaHora[0]);

				dd = fecha[0];
				mm = fecha[1];
				aa = fecha[2];
			}else{
				dd = "00";
				mm = "00";
				aa = "00";
			}

			if (fechaHora.length > 1) {
				hora = sortTable_time(fechaHora[1]);

				hh	 = hora[0];
				mi	 = hora[1];
				ss	 = hora[2];
			}else{
				hh = "00";
				mi = "00";
				ss = "00";
			}
		}else{
			dd = "00";
			mm = "00";
			aa = "00";
			hh = "00";
			mi = "00";
			ss = "00";
		}

		fechaHora = new Array();

		fechaHora[0] = dd;
		fechaHora[1] = mm;
		fechaHora[2] = aa;
		fechaHora[3] = hh;
		fechaHora[4] = mi;
		fechaHora[5] = ss;

		return fechaHora;
	}

	function sortTable_sort_date(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]);
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]);

		fecha = sortTable_date(aa);
		dd = fecha[0];
		mm = fecha[1];
		aa = fecha[2];
	    dt1 = parseInt("" + aa + mm + dd,10);

		fecha = sortTable_date(bb);
		dd = fecha[0];
		mm = fecha[1];
		aa = fecha[2];
	    dt2 = parseInt("" + aa + mm + dd,10);

	    if (dt1==dt2) return 0;
	    if (dt1<dt2) return -1;
	    return 1;
	}

	function sortTable_sort_time(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]);
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]);

		hora = sortTable_time(aa);
		hh = hora[0];
		mi = hora[1];
		ss = hora[2];
	    dt1 = parseInt("" + hh + mi + ss,10);

		hora = sortTable_time(bb);
		hh = hora[0];
		mi = hora[1];
		ss = hora[2];
	    dt2 = parseInt("" + hh + mi + ss,10);

	    if (dt1==dt2) return 0;
	    if (dt1<dt2) return -1;
	    return 1;
	}

	function sortTable_sort_datetime(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]);
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]);

		fechaHora = sortTable_datetime(aa);
		dd = fechaHora[0];
		mm = fechaHora[1];
		aa = fechaHora[2];
		hh = fechaHora[3];
		mi = fechaHora[4];
		ss = fechaHora[5];
	    dt1 = parseInt("" + aa + mm + dd + hh + mi + ss,10);

		fechaHora = sortTable_datetime(bb);
		dd = fechaHora[0];
		mm = fechaHora[1];
		aa = fechaHora[2];
		hh = fechaHora[3];
		mi = fechaHora[4];
		ss = fechaHora[5];
	    dt2 = parseInt("" + aa + mm + dd + hh + mi + ss,10);

	    if (dt1==dt2) return 0;
	    if (dt1<dt2) return -1;
	    return 1;
	}

	function sortTable_sort_numeric(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]);
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]);

		aa = aa.replace(/\./gi,"");
		aa = aa.replace(/\,/gi,".");
	    aa = parseFloat(aa);
	    if (isNaN(aa)) aa = 0;

		bb = bb.replace(/\./gi,"");
		bb = bb.replace(/\,/gi,".");
	    bb = parseFloat(bb);
	    if (isNaN(bb)) bb = 0;

	    return aa-bb;
	}

	function sortTable_sort_caseinsensitive(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]).toLowerCase();
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]).toLowerCase();
	    if (aa==bb) return 0;
	    if (aa<bb) return -1;
	    return 1;
	}

	function sortTable_sort_currency(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]).replace(/[^0-9.]/g,'');
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]).replace(/[^0-9.]/g,'');
	    return parseFloat(aa) - parseFloat(bb);
	}

	function sortTable_sort_default(a,b) {
	    aa = sortTable_getInnerText(a.cells[sortTableColumnIndex]);
	    bb = sortTable_getInnerText(b.cells[sortTableColumnIndex]);
	    if (aa==bb) return 0;
	    if (aa<bb) return -1;
	    return 1;
	}

	var scrollNRow			  = 0;
	var scrollLastNRow		  = 0;
	var scrollPivoteNRow	  = 0;
	var scrollRowOver		  = this.rowOver;
	var scrollRowSelect		  = this.rowSelect;
	var scrollRowSelectAlways = this.rowSelectAlways;
	var scrollRowMultiSelect  = this.rowMultiSelect;
	var scrollOnChangeSelect  = this.onChangeSelect;

	scroll_init();

	function scroll_init() {
		scroll_reGenerar();

		tabObj.ownerDocument.onkeydown = scroll_tecla;
	}

	function scroll_reGenerar() {
		var tbody = tabObj.getElementsByTagName("tbody")[0];

		if (tbody != null) {
			var rows = tbody.getElementsByTagName("tr");
			var row;

			for (i=0; i<rows.length; i++) {
				row				 = rows[i];
				row.style.cursor = "default";
				row.onmouseover  = scroll_onMouseOver;
				row.onmouseout	 = scroll_onMouseOut;
				row.onclick		 = function() {scroll_onClick(this);};

				if (!(row.getAttribute("disabled") == null || row.disabled == false)) {
					row.style.color		 = "#ACA899";
					row.style.textShadow = "1px 1px 0px #FFFFFF";
				}
			}
		}

		ajustar();

		focus();
	}

	function scroll_rowColor(row,color) {
		var cells = row.getElementsByTagName("td");

		for (k=0; k<cells.length; k++) {
			cells[k].style.backgroundColor = color;
		}
	}

	function scroll_onMouseOver() {
		if (scrollRowOver) {
			if (this.getAttribute("disabled") == null || this.disabled == false) {
				if (this.className != "down") {
					if (this.style.backgroundColor.length != 0) {
						scroll_rowColor(this,"");
					}
					this.className = "over";
				}
			}
		}
	}

	function scroll_onMouseOut() {
		if (scrollRowSelect || scrollRowOver) {
			if (this.className != "down") {
				if (this.style.backgroundColor.length != 0) {
					scroll_rowColor(this,this.style.backgroundColor);
				}
				this.className = "out";
			}
		}
	}

	function scroll_onClick(tr) {
		var thead = tabObj.getElementsByTagName("thead")[0];

		if (tr.getAttribute("disabled") == null || tr.disabled == false) {
			if (scrollRowSelect) {
				if (tr.className != "down") {
					var tbody = tr.parentNode;

					if (tbody != null) {
						var rows  = tbody.getElementsByTagName("tr");
						var row;

						if (!scrollRowMultiSelect) {
							selectRow(0,false);
						}

						if (tr.style.backgroundColor.length != 0) {
							scroll_rowColor(tr,"");
						}
						tr.className = "down";
					}
				}else{
					if (!scrollRowSelectAlways) {
						if (tr.style.backgroundColor.length != 0) {
							scroll_rowColor(tr,tr.style.backgroundColor);
						}
						tr.className = "out";
					}
				}

				scrollNRow = tr.rowIndex - (thead.getElementsByTagName("tr").length - 1);

				scrollPivoteNRow = 0;

				if (typeof scrollOnChangeSelect != "undefined") {
					scrollOnChangeSelect();
				}
			}
		}

		scrollLastNRow = tr.rowIndex - (thead.getElementsByTagName("tr").length - 1);
	}

	function scroll_tecla(event) {
		var tecla = scroll_getKeyCode(event);

		var keyCode_rePag		 = 33;
		var keyCode_avPag		 = 34;
		var keyCode_fin			 = 35;
		var keyCode_inicio		 = 36;
		var keyCode_flechaArriba = 38;
		var keyCode_flechaAbajo	 = 40;
		var shiftKey			 = false;

		if (tecla == keyCode_rePag || tecla == keyCode_avPag || tecla == keyCode_fin || tecla == keyCode_inicio || tecla == keyCode_flechaArriba || tecla == keyCode_flechaAbajo) {
			if (getRowCount() > 1) {
				var thead = tabObj.getElementsByTagName("thead")[0];
				var tbody = tabObj.getElementsByTagName("tbody")[0];
				var tfoot = tabObj.getElementsByTagName("tfoot")[0];

				if (tbody != null) {
					var alto_thead = 0;
					var alto_tfoot = 0;

					if (thead != null) {
						alto_thead = thead.offsetHeight;
					}

					if (tfoot != null) {
						alto_tfoot = tfoot.offsetHeight;
					}

					var fila_aux        = scrollLastNRow;
					var fila_alto       = tbody.getElementsByTagName("tr")[0].offsetHeight;
					var fila_cant_vista = Math.floor((tabObj.ownerDocument.body.clientHeight - alto_thead - alto_tfoot) / fila_alto);
					var fila_ult        = Math.ceil(tbody.offsetHeight / fila_alto);

					if (tecla == keyCode_rePag) {
						if (scrollLastNRow > fila_cant_vista) {
							fila_aux -= fila_cant_vista;
						}else{
							fila_aux = 1;
						}
					}else if (tecla == keyCode_avPag) {
						if (fila_aux == 0) {
							fila_aux = 1;
						}
						if (scrollLastNRow <= fila_ult - fila_cant_vista) {
							fila_aux = parseInt(fila_aux) + parseInt(fila_cant_vista);
						}else{
							fila_aux = fila_ult;
						}
					}else if (tecla == keyCode_fin) {
						fila_aux = fila_ult;
					}else if (tecla == keyCode_inicio) {
						fila_aux = 1;
					}else if (tecla == keyCode_flechaArriba) {
						if (fila_aux == 0) {
							fila_aux = 1;
						}
						if (scrollLastNRow > 1) {
							fila_aux--;
						}
					}else if (tecla == keyCode_flechaAbajo) {
						if (scrollLastNRow < fila_ult) {
							fila_aux++;
						}
					}

					if (fila_aux > getRowCount()) {
						fila_aux = getRowCount();
					}

					if (fila_aux != scrollLastNRow || (scrollRowSelect && !isSelectedRow(fila_aux))) {
						event = event ? event : tabObj.ownerDocument.parentWindow.event;
						if (event.shiftKey) {
							shiftKey = true;
						}

						if (shiftKey) {
							if (scrollRowMultiSelect) {
								if (scrollPivoteNRow == 0) {
									selectRow(0,false);

									scrollPivoteNRow = scrollLastNRow;
									if (scrollLastNRow != getSelectedRow()) {
										selectRow(scrollPivoteNRow,true);
									}
								}

								if (fila_aux > scrollLastNRow) {
									var hasta = (scrollPivoteNRow >= fila_aux) ? fila_aux + 1 : fila_aux;

									for (i=scrollLastNRow; i<hasta; i++) {
										if (i > scrollPivoteNRow) {
											selectRow(i,true);
										}else{
											if (i == scrollPivoteNRow && i < fila_aux) {
												selectRow(i,true);
											}else{
												selectRow(i,false);
											}
										}
									}
								}else if (fila_aux < scrollLastNRow) {
									var hasta = (scrollPivoteNRow <= fila_aux) ? fila_aux - 1 : fila_aux;

									for (i=scrollLastNRow; i>hasta; i--) {
										if (i > scrollPivoteNRow) {
											selectRow(i,false);
										}else{
											if (i == scrollPivoteNRow && i == fila_aux) {
												selectRow(i,false);
											}else{
												selectRow(i,true);
											}
										}
									}
								}
							}
						}else{
							selectRow(0,false);
							scrollPivoteNRow = 0;
						}

						var scrollPivoteNRowAnt = scrollPivoteNRow;
						scroll_onClick(getRow(fila_aux));
						scrollPivoteNRow = scrollPivoteNRowAnt;

						if (scrollPivoteNRow == 0) {
							if (getRowCountSelected() == 1) {
								scrollPivoteNRow = getSelectedRow();
							}
						}
					}
				}

				scrollToRow(fila_aux);
			}

			eventFalse(event);
		}
	}

	function scroll_getKeyCode(event) {
		event = event ? event : tabObj.ownerDocument.parentWindow.event;

		return(event.keyCode?event.keyCode:event.which?event.which:event.charCode);
	}

	function eventFalse(event) {
		event = event ? event : tabObj.ownerDocument.parentWindow.event;

		if (event.stopPropagation) {
			event.stopPropagation();
			event.preventDefault();
		}else{
			event.cancelBubble = true;
			event.returnValue = false;
		}
	}
}
