function roundedCorners_init() {
	// Busca todos los DIV con atributo "rounded" y los redondea.
	if (!document.getElementsByTagName) return;
	var divs = document.getElementsByTagName("DIV");
	var thisDiv;
	var divsRounded = new Array();
	var j = 0;
	for (i=0; i<divs.length; i++) {
		thisDiv = divs[i];
		if (thisDiv.getAttribute("rounded") != null) {
	    	divsRounded[j] = thisDiv;
	    	j++;
        }
    }
	for (i=divsRounded.length - 1; i>=0; i--) {
		thisDiv = divsRounded[i];
		roundedCorners(thisDiv);
	}
}

function roundedCorners(o) {
    var re = /corner(-(top|bottom|none))?(-(left|right|none))?/i;
    var m = re.exec(o.getAttribute("rounded"));
    if (m != null) {
	    var vertical = m[2];
	    var horizontal = m[4];
	}

	var anchoArea = o.getAttribute("roundedAnchoArea");
	var altoArea = o.getAttribute("roundedAltoArea");
	var bordeColor = o.getAttribute("roundedBordeColor");
	var fondoColor = o.getAttribute("roundedFondoColor");
	var fondoImagen = o.getAttribute("roundedFondoImagen");
	var fondoRepite = o.getAttribute("roundedFondoRepite");
	var cursor = o.getAttribute("roundedCursor");

	if (anchoArea == null) {
		anchoArea = "0";
	}
	if (altoArea == null) {
		altoArea = "0";
	}
	if (bordeColor == null) {
		bordeColor = "#000000";
	}
	if (fondoColor == null) {
		fondoColor = "#FFFFFF";
	}
	if (fondoImagen == null) {
		fondoImagen = "";
	}else{
		fondoImagen = "url(" + fondoImagen + ")";
	}
	if (fondoRepite == null) {
		fondoRepite = "no-repeat";
	}
	if (cursor == null) {
		cursor = "default";
	}

    var top = (typeof vertical == 'undefined' || vertical == '' || vertical == 'top');
    var bottom = (typeof vertical == 'undefined' || vertical == '' || vertical == 'bottom');
    var left = (typeof horizontal == 'undefined' || horizontal == '' || horizontal == 'left');
    var right = (typeof horizontal == 'undefined' || horizontal == '' || horizontal == 'right');

    if (top) {
        var rtop = document.createElement('DIV');
        rtop.style.fontSize = '1px';
        rtop.style.height = '5px';
        rtop.style.lineHeight = '0px';
        rtop.style.display = 'block';
        rtop.style.margin = '0px';
        rtop.style.padding = '0px';

        var r1t = document.createElement('DIV');
        r1t.style.fontSize = '0px';
        r1t.style.height = '0px';
        r1t.style.display = 'block';
        r1t.style.marginLeft = left ? '5px' : '0px';
        r1t.style.marginRight = right ? '5px' : '0px';
        r1t.style.marginTop = '0px';
        r1t.style.marginBottom = '0px';
        r1t.style.lineHeight = '1px';
        r1t.style.overflow = 'hidden';
        r1t.style.borderBottomWidth = '1px';
        r1t.style.borderBottomStyle = 'solid';
		r1t.style.borderColor = bordeColor;
		r1t.style.cursor = cursor;
    }

    if (bottom) {
        var rbot = document.createElement('DIV');
        rbot.style.fontSize = '1px';
        rbot.style.height = '5px';
        rbot.style.lineHeight = '0px';
        rbot.style.display = 'block';
        rbot.style.margin = '0px';
        rbot.style.padding = '0px';

        var r1b = document.createElement('DIV');
        r1b.style.fontSize = '0px';
        r1b.style.height = '0px';
        r1b.style.display = 'block';
        r1b.style.marginLeft = left ? '5px' : '0px';
        r1b.style.marginRight = right ? '5px' : '0px';
        r1b.style.marginTop = '0px';
        r1b.style.marginBottom = '0px';
        r1b.style.lineHeight = '0px';
        r1b.style.overflow = 'hidden';
        r1b.style.borderTopWidth = '1px';
        r1b.style.borderTopStyle = 'solid';
		r1b.style.borderColor = bordeColor;
		r1b.style.cursor = cursor;
    }

    var r2 = document.createElement('DIV');
    r2.style.fontSize = '0px';
    r2.style.height = '1px';
    r2.style.display = 'block';
    r2.style.backgroundPosition = '-4px 0px';
    r2.style.marginLeft = left ? '3px' : '0px';
    r2.style.marginRight = right ? '3px' : '0px';
    r2.style.marginTop = '0px';
    r2.style.marginBottom = '0px';
    r2.style.padding = '0px';
    r2.style.lineHeight = '0px';
    r2.style.overflow = 'hidden';
    r2.style.borderLeftWidth = (left ? '2' : '1') + 'px';
    r2.style.borderLeftStyle = 'solid';
    r2.style.borderRightWidth = (right ? '2' : '1') + 'px';
    r2.style.borderRightStyle = 'solid';
	r2.style.borderColor = bordeColor;
	r2.style.backgroundColor = fondoColor;
	r2.style.backgroundImage = fondoImagen;
	r2.style.backgroundRepeat = fondoRepite;
	r2.style.cursor = cursor;

    var r3 = document.createElement('DIV');
    r3.style.fontSize = '0px';
    r3.style.height = '1px';
    r3.style.display = 'block';
    r3.style.backgroundPosition = '-2px -1px';
    r3.style.marginLeft = left ? '2px' : '0px';
    r3.style.marginRight = right ? '2px' : '0px';
    r3.style.marginTop = '0px';
    r3.style.marginBottom = '0px';
    r3.style.padding = '0px';
    r3.style.lineHeight = '0px';
    r3.style.overflow = 'hidden';
    r3.style.borderLeftWidth = '1px';
    r3.style.borderLeftStyle = 'solid';
    r3.style.borderRightWidth = '1px';
    r3.style.borderRightStyle = 'solid';
	r3.style.borderColor = bordeColor;
	r3.style.backgroundColor = fondoColor;
	r3.style.backgroundImage = fondoImagen;
	r3.style.backgroundRepeat = fondoRepite;
	r3.style.cursor = cursor;

    var r4 = document.createElement('DIV');
    r4.style.fontSize = '0px';
    r4.style.height = '2px';
    r4.style.display = 'block';
    r4.style.backgroundPosition = '-1px -2px';
    r4.style.marginLeft = left ? '1px' : '0px';
    r4.style.marginRight = right ? '1px' : '0px';
    r4.style.marginTop = '0px';
    r4.style.marginBottom = '0px';
    r4.style.padding = '0px';
    r4.style.lineHeight = '0px';
    r4.style.overflow = 'hidden';
    r4.style.borderLeftWidth = '1px';
    r4.style.borderLeftStyle = 'solid';
    r4.style.borderRightWidth = '1px';
    r4.style.borderRightStyle = 'solid';
	r4.style.borderColor = bordeColor;
	r4.style.backgroundColor = fondoColor;
	r4.style.backgroundImage = fondoImagen;
	r4.style.backgroundRepeat = fondoRepite;
	r4.style.cursor = cursor;

    if (top) {
        rtop.appendChild(r1t);
        rtop.appendChild(r2);
        rtop.appendChild(r3);
        rtop.appendChild(r4);
    }

    var rbody = document.createElement('DIV');
    rbody.style.backgroundPosition = '0px -4px';
    rbody.style.borderLeftWidth = '1px';
    rbody.style.borderLeftStyle = 'solid';
    rbody.style.borderRightWidth = '1px';
    rbody.style.borderRightStyle = 'solid';
	rbody.style.borderColor = bordeColor;
    if (document.all) rbody.style.width = '100%';
    rbody.style.paddingLeft = '4px';
    rbody.style.paddingRight = '4px';
	rbody.style.backgroundColor = fondoColor;
	rbody.style.backgroundImage = fondoImagen;
	rbody.style.backgroundRepeat = fondoRepite;
	rbody.style.cursor = cursor;

    o.parentNode.insertBefore(rbody, o);
    rbody.appendChild(o);

    if (bottom) {
        var delta = (rbody.firstChild.style.pixelHeight) ? rbody.firstChild.style.pixelHeight : parseInt(rbody.firstChild.offsetHeight);
        var d2 = delta + 7;
        var d3 = delta + 6;
        var d4 = delta + 4;
        var r2b = r2.cloneNode(false);
        r2b.style.backgroundPosition = '-4px -' + d2 + 'px';
        var r3b = r3.cloneNode(false);
        r3b.style.backgroundPosition = '-2px -' + d3 + 'px';
        var r4b = r4.cloneNode(false);
        r4b.style.backgroundPosition = '-1px -' + d4 + 'px';
        rbot.appendChild(r4b);
        rbot.appendChild(r3b);
        rbot.appendChild(r2b);
        rbot.appendChild(r1b);
    }

    if (top) {
        rbody.parentNode.insertBefore(rtop, rbody);
    }

    if (bottom) {
        if (rbody.nextSibling) {
            rbody.parentNode.insertBefore(rbot, rbody.nextSibling);
        }else{
            rbody.parentNode.appendChild(rbot);
        }
    }
}
