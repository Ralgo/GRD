// ---------------------------------------------------------------------- //
//           FormCheq.js (c) ChaTo@usa.net, simplificacion/traduccion     //
//              para Tejedores del Web http://www.dic.uchile.cl/~manual/  //
//              FormChek.js (c) Eric Krock (c) 1997 Netscape              //
// ---------------------------------------------------------------------- //
// Rutinas para verificacion de formularios, basado en FormChek.js
// 18 Feb 97 creado por Eric Krock (c) 1997
//   Netscape Communications Corporation
// 18 Aug 98 modificado por Carlos Castillo (c) 1998 ChaTo
//   Los principales cambios son: esta version es simplificada, para
//   propositos de ensennanza y validacion basica de formularios, y esta
//   adaptada para recibir caracteres del alfabeto espannol (acentos, etc.)
// 
// ---------------------------------------------------------------------- //
//                             RESUMEN                                    //
// ---------------------------------------------------------------------- //
// 
// El objetivo de las siguientes funciones en JavaScript es
// validar los ingresos del usuario en un formulario antes
// de que estos datos vayan al servidor.
//
// Varias de ellas toman un parametro opcional E.O.K (eok) (emptyOK
// - true si se acepta que el valor este vacio, false si no
// se acepta). El valor por omision es el que indique la
// variable global defaultEmptyOK definida mas abajo.
//
// ---------------------------------------------------------------------- //
//                      SINTAXIS DE LAS FUNCIONES                         //
// ---------------------------------------------------------------------- //
//
// FUNCION PARA CHEQUEAR UN CAMPO DE INGRESO:
//
// checkField (theField, desField, theFunction, [,eok] [,f] [,s])
//        verifica que el campo de ingreso theField cumpla con la
//        condicion indicada en la funcion theFunction (que puede ser
//        una de las descritas en "FUNCIONES DE VALIDACION" o cualquier
//        otra provista por el usuario). En caso contrario despliega el
//        string "s" (opcional, hay mensajes por default para las
//        funciones de validacion provistas aqui).
//
// FUNCIONES DE VALIDACION:
//
// none (s [,eok])                        s es algo
// isInteger (s [,eok])                   s representa un entero
// isNumber (s [,eok])                    s es entero o tiene punto decimal
// isAlphabetic (s [,eok])                s tiene solo letras
// isAlphanumeric (s [,eok])              s tiene solo letras y/o numeros
// isEmail (s [,eok])                     s es una direccion de e-mail
// isPhoneNumber (s [,eok])               s tiene solo numeros, (,),-
// isDate (s [,eok])                      s es una fecha
// isTime (s )                            s es una hora
// isDateTime (s )                        s es una fecha y hora
// isName (s [,eok])                      s tiene solo letras, numeros y/o espacios
// isMes (s [,eok])                       s es una mes (1 al 12)
// isRut (s [,eok])                       s es un rut (numero y digito verificador)
// isRangoFecha (s1, s2 [,eok])           s1 es una fecha, s2 es una fecha
//
// FUNCIONES INTERNAS:
//
// isWhitespace (s)                       s es vacio o solo son espacios
// isLetter (c)                           c es una letra
// isDigit (c)                            c es un digito
// isLetterOrDigit (c)                    c es letra o digito
//
// FUNCIONES PARA REFORMATEAR DATOS:
//
// stripCharsInBag (s, bag)               quita de s los caracteres en bag
// stripCharsNotInBag (s, bag)            quita de s los caracteres NO en bag
// stripWhitespace (s)                    quita el espacio dentro de s
// stripInitialWhitespace (s)             quita el espacio al principio de s
//
// FUNCIONES PARA PREGUNTARLE AL USUARIO:
//
// statBar (s)                            pone s en la barra de estado
// warnEmpty (theField, desField, f)      indica que theField esta vacio
// warnInvalid (theField, desField, s, f) indica que theField es invalido
//
// ---------------------------------------------------------------------- //
//                                VARIABLES                               //
// ---------------------------------------------------------------------- //

// Esta variable indica si está bien dejar las casillas
// en blanco como regla general
var defaultEmptyOK = false

// listas de caracteres
var digits = "0123456789";
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyzáéíóúñü"
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ"
var whitespace = " \t\n\r";

// caracteres admitidos en nros de telefono
var phoneChars = "()-+ ";

// caracter separador miles y decimal
var separadorMiles = ".";
var separadorDecimal = ",";

// ---------------------------------------------------------------------- //
//                     TEXTOS PARA LOS MENSAJES                           //
// ---------------------------------------------------------------------- //

// m abrevia "missing" (faltante)
var mMessage = "Validación Fallida:\n\nDebe completar el campo"

// p abrevia "prompt"
var pPrompt = "Validación Fallida:\n\n";
var pAlphanumeric = "Ingrese un texto que contenga sólo letras y/o números";
var pAlphabetic = "Ingrese un texto que contenga sólo letras";
var pInteger = "Ingrese un número entero válido ej.:1" + separadorMiles + "234";
var pNumber = "Ingrese un número válido ej.:1" + separadorMiles + "234" + separadorDecimal + "567";
var pPhoneNumber = "Ingrese un número de teléfono válido ej.:(56-58) 205100";
var pEmail = "Ingrese una dirección de correo electrónico válida ej.:uta@uta.cl";
var pName = "Ingrese un texto que contenga sólo letras, números o espacios";
var pDate = "Ingrese una fecha válida ej.:01-01-2001 (dd-mm-yyyy)";
var pTime = "Ingrese una hora válida ej.: 19:04:25 (hh:mm:ss)";
var pTimeHM = "Ingrese una hora válida ej.: 19:04 (hh:mm)";
var pTimeH = "Ingrese una hora válida ej.: 19 (hh)";
var pDateTime = "Ingrese una fecha y hora válida ej.: 01-01-2001 19:04:25 (dd-mm-yyyy hh:mm:ss)";
var pDateTimeHM = "Ingrese una fecha y hora válida ej.: 01-01-2001 19:04 (dd-mm-yyyy hh:mm)";
var pDateTimeH = "Ingrese una fecha y hora válida ej.: 01-01-2001 19 (dd-mm-yyyy hh)";
var pMes = "Ingrese una mes válida ej.:1 (Enero), 2 (Febrero)..., 12 (Diciembre)";
var pRut = "Ingrese un rut válido ej.:11111111-1";
var pRangoFecha = "Ingrese un rango de fecha válido";
var pRutDig = "Ingrese un rut y dígito verificador válido";

// ---------------------------------------------------------------------- //
//                FUNCIONES PARA MANEJO DE ARREGLOS                       //
// ---------------------------------------------------------------------- //

// JavaScript 1.0 (Netscape 2.0) no tenia un constructor para arreglos,
// asi que ellos tenian que ser hechos a mano. Desde JavaScript 1.1 
// (Netscape 3.0) en adelante, las funciones de manejo de arreglos no
// son necesarias.

function makeArray(n) {
//*** BUG: If I put this line in, I get two error messages:
//(1) Window.length can't be set by assignment
//(2) daysInMonth has no property indexed by 4
//If I leave it out, the code works fine.
//   this.length = n;
   for (var i = 1; i <= n; i++) {
      this[i] = 0
   } 
   return this
}

// ---------------------------------------------------------------------- //
//                  CODIGO PARA FUNCIONES BASICAS                         //
// ---------------------------------------------------------------------- //


// s es vacio
function isEmpty(s)
{   return ((s == null) || (s.length == 0))
}

// s es vacio o solo caracteres de espacio
function isWhitespace (s)
{   var i;
    if (isEmpty(s)) return true;
    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        // si el caracter en que estoy no aparece en whitespace,
        // entonces retornar falso
        if (whitespace.indexOf(c) == -1) return false;
    }
    return true;
}

// Quita todos los caracteres que estan en "bag" del string "s"
function stripCharsInBag (s, bag)
{   var i;
    var returnString = "";

    // Buscar por el string, si el caracter no esta en "bag", 
    // agregarlo a returnString
    
    for (i = 0; i < s.length; i++)
    {   var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }

    return returnString;
}

// Lo contrario, quitar todos los caracteres que no estan en "bag" de "s"
function stripCharsNotInBag (s, bag)
{   var i;
    var returnString = "";
    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        if (bag.indexOf(c) != -1) returnString += c;
    }

    return returnString;
}

// Quitar todos los espacios en blanco de un string
function stripWhitespace (s)
{   return stripCharsInBag (s, whitespace)
}

// La rutina siguiente es para cubrir un bug en Netscape
// 2.0.2 - seria mejor usar indexOf, pero si se hace
// asi stripInitialWhitespace() no funcionaria

function charInString (c, s)
{   for (i = 0; i < s.length; i++)
    {   if (s.charAt(i) == c) return true;
    }
    return false
}

// Quita todos los espacios que antecedan al string
function stripInitialWhitespace (s)
{   var i = 0;
    while ((i < s.length) && charInString (s.charAt(i), whitespace))
       i++;
    return s.substring (i, s.length);
}

// c es una letra del alfabeto espanol
function isLetter (c)
{
    return( ( uppercaseLetters.indexOf( c ) != -1 ) ||
            ( lowercaseLetters.indexOf( c ) != -1 ) )
}

// c es un digito
function isDigit (c)
{   return ((c >= "0") && (c <= "9"))
}

// c es letra o digito
function isLetterOrDigit (c)
{   return (isLetter(c) || isDigit(c))
}

// ---------------------------------------------------------------------- //
//                          NUMEROS                                       //
// ---------------------------------------------------------------------- //

// s es un numero entero (con o sin signo o con separador de miles)
function isInteger (s)
{   var i;
    if (isEmpty(s)) 
       if (isInteger.arguments.length == 1) return defaultEmptyOK;
       else return (isInteger.arguments[1] == true);
    
    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        if( i != 0 ) {
            if (!isDigit(c) && (c != separadorMiles)) return false;
        } else { 
            if (!isDigit(c) && (c != "-") || (c == "+")) return false;
        }
    }
    return true;
}

// s es un numero (entero o flotante, con o sin signo)
function isNumber (s)
{   var i;
    var dotAppeared;
    dotAppeared = false;
    if (isEmpty(s)) 
       if (isNumber.arguments.length == 1) return defaultEmptyOK;
       else return (isNumber.arguments[1] == true);
    
    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        if( i != 0 ) {
            if ( c == separadorDecimal ) {
                if( !dotAppeared )
                    dotAppeared = true;
                else
                    return false;
            } else     
                if (!isDigit(c) && (c != separadorMiles)) return false;
        } else { 
            if ( c == separadorDecimal ) {
                if( !dotAppeared )
                    dotAppeared = true;
                else
                    return false;
            } else     
                if (!isDigit(c) && (c != "-") || (c == "+")) return false;
        }
    }
    return true;
}

// ---------------------------------------------------------------------- //
//                        STRINGS SIMPLES                                 //
// ---------------------------------------------------------------------- //

// s tiene solo letras
function isAlphabetic (s)
{   var i;

    if (isEmpty(s)) 
       if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphabetic.arguments[1] == true);
    for (i = 0; i < s.length; i++)
    {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (!isLetter(c))
        return false;
    }
    return true;
}


// s tiene solo letras y numeros
function isAlphanumeric (s)
{   var i;

    if (isEmpty(s)) 
       if (isAlphanumeric.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphanumeric.arguments[1] == true);

    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        if (! (isLetter(c) || isDigit(c) ) )
        return false;
    }

    return true;
}

// s tiene solo letras, numeros o espacios en blanco
function isName (s)
{
    if (isEmpty(s)) 
       if (isName.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphanumeric.arguments[1] == true);
    
    return( isAlphanumeric( stripCharsInBag( s, whitespace ) ) );
}

// ---------------------------------------------------------------------- //
//                            FONO o EMAIL                                //
// ---------------------------------------------------------------------- //

// s es numero de telefono valido
function isPhoneNumber (s)
{   var modString;
    if (isEmpty(s)) 
       if (isPhoneNumber.arguments.length == 1) return defaultEmptyOK;
       else return (isPhoneNumber.arguments[1] == true);
    modString = stripCharsInBag( s, phoneChars );
    return (isInteger(modString))
}

// s es una direccion de correo valida
function isEmail (s)
{
    if (isEmpty(s)) 
       if (isEmail.arguments.length == 1) return defaultEmptyOK;
       else return (isEmail.arguments[1] == true);
    if (isWhitespace(s)) return false;
    var i = 1;
    var sLength = s.length;
    while ((i < sLength) && (s.charAt(i) != "@"))
    { i++
    }

    if ((i >= sLength) || (s.charAt(i) != "@")) return false;
    else i += 2;

    while ((i < sLength) && (s.charAt(i) != "."))
    { i++
    }

    if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
    else return true;
}

// ---------------------------------------------------------------------- //
//                                FECHA                                   //
// ---------------------------------------------------------------------- //

// s es una fecha valida
function isDate (s)
{
    if (isEmpty(s)) 
       if (isDate.arguments.length == 1) return defaultEmptyOK;
       else return (isDate.arguments[1] == true);
    if (isWhitespace(s)) return false;

    var daysInMonth = new Array;
    var vfecha = new Array();
    var dd, mm, yyyy, c, i, j;

    j = 0;
    vfecha[j] = "";

    for (i=0; i<s.length; i++) {
      c = s.charAt(i);

      if (c == "-" || c == "/") {
        j++;
        vfecha[j] = "";
      }else{
        vfecha[j] += c;
      }
    }

    if (vfecha.length != 3 ) {
      return false;
    }

    dd   = vfecha[0];
    mm   = vfecha[1];
    yyyy = vfecha[2];

    daysInMonth[1] = 31;
    daysInMonth[2] = (yyyy % 4 == 0 && (!(yyyy % 100 == 0) || (yyyy % 400 == 0)) ? 29 : 28);
    daysInMonth[3] = 31;
    daysInMonth[4] = 30;
    daysInMonth[5] = 31;
    daysInMonth[6] = 30;
    daysInMonth[7] = 31;
    daysInMonth[8] = 31;
    daysInMonth[9] = 30;
    daysInMonth[10] = 31;
    daysInMonth[11] = 30;
    daysInMonth[12] = 31;

    if (yyyy == "" || !(yyyy >= 1900 && yyyy <= 2999)) {
      return false;
    }

    if (mm == "" || !(mm >= 1 && mm <= 12)) {
      return false;
    }

    if ((dd == "" || mm == "") || !(dd >= 1 && dd <= daysInMonth[parseInt(mm,10)])) {
      return false;
    }

    return true;
}

// ---------------------------------------------------------------------- //
//                                HORA                                    //
// ---------------------------------------------------------------------- //

// s es una hora valida
function isTime (s)
{
    if (isEmpty(s)) 
       if (isTime.arguments.length == 1) return defaultEmptyOK;
       else return (isTime.arguments[1] == true);
    if (isWhitespace(s)) return false;

    var vhora = new Array();
    var dd, mm, ss, c, i, j;

    j = 0;
    vhora[j] = "";

    for (i=0; i<s.length; i++) {
      c = s.charAt(i);

      if (c == ":") {
        j++;
        vhora[j] = "";
      }else{
        vhora[j] += c;
      }
    }

    if (!(vhora.length >= 1 && vhora.length <= 3)) {
      return false;
    }

    hh = vhora[0];

    if (hh == "" || !(hh >= 00 && hh <= 23)) {
      return false;
    }

	if (vhora.length >= 2) {
        mm = vhora[1];

        if (mm == "" || !(mm >= 00 && mm <= 59)) {
          return false;
        }
    }

	if (vhora.length == 3) {
        ss = vhora[2];

        if (ss == "" || !(ss >= 00 && ss <= 59)) {
          return false;
        }
    }

    return true;
}

// ---------------------------------------------------------------------- //
//                            FECHA Y HORA                                //
// ---------------------------------------------------------------------- //

// s es una hora valida
function isDateTime (s)
{
	s = s.split(" ");
	s1 = s[0];
	s2 = s[1];
	if (!isDate(s1) || !isTime(s2)) {
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------- //
//                                 MES                                    //
// ---------------------------------------------------------------------- //

// s es un mes valido
function isMes (s)
{
    if (isEmpty(s)) 
       if (isMes.arguments.length == 1) return defaultEmptyOK;
       else return (isMes.arguments[1] == true);
    if (isWhitespace(s)) return false;

	var mm = parseInt(s,10);

    if (!(mm >= 1 && mm <= 12)) {
      return false;
    }

    return true;
}

// ---------------------------------------------------------------------- //
//                                 RUT                                    //
// ---------------------------------------------------------------------- //

// s es un rut valido
function isRut (s)
{
    if (isEmpty(s)) 
       if (isRut.arguments.length == 1) return defaultEmptyOK;
       else return (isRut.arguments[1] == true);
    if (isWhitespace(s)) return false;

	var strRut = limpiarRut(s);

	if (strRut != "") {
		drut = strRut.substring(strRut.length-1,strRut.length);
		if (drut == "k") {
			drut = "K";
		}

		nrut = strRut.substring(0,strRut.length-1);
		if (soloNumeros(nrut)) {
			digVerif = digitoVerificador(nrut);
		} else {
			digVerif = " ";
		}

		if (drut != digVerif) {
			return false;
		}
	} else {
		return false;
	}

    return true;
}

function limpiarRut(strRut) {
	var rutspng = "";

	while ((new Number(strRut.charAt(0)) == 0) && (strRut != "")) {
		strRut = strRut.substring(1,strRut.length);
	}

	for (i = 0; i < strRut.length; i ++) {
		if ((strRut.charAt(i) != ".") && (strRut.charAt(i) != "-") && (strRut.charAt(i) != " ")) {
			rutspng = rutspng + strRut.charAt(i);
		}
	}

	return rutspng;
}

function soloNumeros(strIn) {
	var Nros = digits;
	var iaux = 0;
	var CrtrAux;

	for (var i = 0; i < strIn.length; i ++) {
		CrtrAux = strIn.charAt(i);
		if (Nros.indexOf(CrtrAux) != -1) {
			iaux ++;
		}
	}

	if ((iaux != strIn.length) || (strIn.length == 0)) {
		return false;
	} else {
		return true;
	}
}

function digitoVerificador(strRut) {
	var Largo, LargoN, i, Total;
	var Numero = "", Carac, CaracVal;
	var tmpRut, intTmp;

	tmpRut = strRut;
	Largo  = tmpRut.length;
	LargoN = 0;

	for (i = 0; i < Largo; i ++) {
		Carac = parseInt(tmpRut.charAt(i),10);
		if (Carac >= 0 && Carac <= 9) {
			Numero += tmpRut.charAt(i);
			LargoN ++;
		}
	}

	Total=0;
	for (i = LargoN - 1; i >= 0; i --) {
		if ((LargoN - i) < 7) {
			intTmp = LargoN - i + 1;
		} else {
			intTmp = LargoN - i - 5;
		}
		Total += parseInt(Numero.charAt(i),10) * intTmp;
	}

	CaracVal = 11 - (Total % 11);

	if (CaracVal == 10) {
		return("K");
	}

	if (CaracVal >= 0 && CaracVal <= 9) {
		return(CaracVal);
	}

	if (CaracVal == 11) {
		return(0);
	}
}

// ---------------------------------------------------------------------- //
//                             Rango Fecha                                //
// ---------------------------------------------------------------------- //

// s1 es una fecha, s2 es una fecha
function isRangoFecha (s1,s2)
{
	if (isDate(s1) && isDate(s2)) {
	    var vfecha = new Array();
	    var dd, mm, yyyy;

	    j = 0;
	    vfecha[j] = "";

	    for (i=0; i<s1.length; i++) {
	      c = s1.charAt(i);

	      if (c == "-" || c == "/") {
	        j++;
	        vfecha[j] = "";
	      }else{
	        vfecha[j] += c;
	      }
	    }

	    if (vfecha.length != 3 ) {
	      return false;
	    }

	    dd   = vfecha[0];
	    mm   = vfecha[1];
	    yyyy = vfecha[2];

		fecha1 = new Date(yyyy + "/" + mm + "/" + dd);

	    j = 0;
	    vfecha[j] = "";

	    for (i=0; i<s2.length; i++) {
	      c = s2.charAt(i);

	      if (c == "-" || c == "/") {
	        j++;
	        vfecha[j] = "";
	      }else{
	        vfecha[j] += c;
	      }
	    }

	    if (vfecha.length != 3 ) {
	      return false;
	    }

	    dd   = vfecha[0];
	    mm   = vfecha[1];
	    yyyy = vfecha[2];

		fecha2 = new Date(yyyy + "/" + mm + "/" + dd);

		if (fecha1 > fecha2) {
			return false;
		}
	}else{
		return false;
	}

	return true;
}

// ---------------------------------------------------------------------- //
//                                NINGUNA                                 //
// ---------------------------------------------------------------------- //

// s es algo
function none (s)
{
    if (isEmpty(s)) 
       if (none.arguments.length == 1) return defaultEmptyOK;
       else return (none.arguments[1] == true);
    
    return( true );
}

// ---------------------------------------------------------------------- //
//                  FUNCIONES PARA RECLAMARLE AL USUARIO                  //
// ---------------------------------------------------------------------- //

// pone el string s en la barra de estado
function statBar (s)
{   window.status = s
}

// notificar que el campo theField esta vacio
function warnEmpty (theField, desField, f)
{   if (f) theField.focus();
    if (desField.length == 0) {
        alert(mMessage)
        statBar(mMessage)
    }else{
        alert(mMessage + ' "' + desField + '"')
        statBar(mMessage + ' "' + desField + '"')
    }
    return false
}

// notificar que el campo theField es invalido
function warnInvalid (theField, desField, s, f)
{   if (f) theField.focus();
    if (theField.type == "text") {
        theField.select()
    }
    if (desField.length == 0) {
        alert(pPrompt + s)
        statBar(pPrompt + s)
    }else{
        alert(pPrompt + s + '\n\nPara el campo "' + desField + '"')
        statBar(pPrompt + s + ' Para el campo "' + desField + '"')
    }
    return false
}

// el corazon de todo: checkField
function checkField (theField, desField, theFunction, emptyOK, focoOK, s)
{
    var msg;
    if (checkField.arguments.length < 4) {emptyOK = defaultEmptyOK;}
    if (checkField.arguments.length < 5) {focoOK = true;}
    if (checkField.arguments.length == 6) {
        msg = s;
    } else {
        if( theFunction == isAlphabetic ) msg = pAlphabetic;
        if( theFunction == isAlphanumeric ) msg = pAlphanumeric;
        if( theFunction == isInteger ) msg = pInteger;
        if( theFunction == isNumber ) msg = pNumber;
        if( theFunction == isEmail ) msg = pEmail;
        if( theFunction == isPhoneNumber ) msg = pPhoneNumber;
        if( theFunction == isName ) msg = pName;
        if( theFunction == isDate ) msg = pDate;
        if( theFunction == isMes ) msg = pMes;
        if( theFunction == isRut ) msg = pRut;
        if( theFunction == isTime ) {
            if (theField.value.length == 5) {
                msg = pTimeHM;
            }else if (theField.value.length == 2) {
                msg = pTimeH;
            }else{
                msg = pTime;
            }
        }
        if( theFunction == isDateTime ) {
            if (theField.value.length == 16) {
                msg = pDateTimeHM;
            }else if (theField.value.length == 13) {
                msg = pDateTimeH;
            }else{
                msg = pDateTime;
            }
        }
    }

    statBar("");

    if ((emptyOK == true) && (isEmpty(theField.value))) return true;

    if ((emptyOK == false) && (isEmpty(theField.value))) 
        return warnEmpty(theField,desField,focoOK);

    if (theFunction(theField.value) == true) 
        return true;
    else
        return warnInvalid(theField,desField,msg,focoOK);
}

function checkRangoFecha (theField1, theField2, desField, emptyOK, focoOK, s)
{
    var msg;
    if (checkRangoFecha.arguments.length < 4) {emptyOK = defaultEmptyOK;}
    if (checkRangoFecha.arguments.length < 5) {focoOK = true;}
    if (checkRangoFecha.arguments.length == 6) {
        msg = s;
    } else {
        msg = pRangoFecha;
    }

    statBar("");

    if ((emptyOK == true) && ((isEmpty(theField1.value)) && (isEmpty(theField2.value)))) return true;

    if ((emptyOK == false) && ((isEmpty(theField1.value)) && (isEmpty(theField2.value)))) 
        return warnEmpty(theField1,desField,focoOK);

    if (isRangoFecha(theField1.value,theField2.value) == true) 
        return true;
    else
        return warnInvalid(theField2,desField,msg);
}

function checkRutDig (theField1, theField2, desField, s)
{
    var msg;
    if (checkRutDig.arguments.length == 4) {
        msg = s;
    } else {
        msg = pRutDig;
    }

    statBar("");

    if (isRut(theField1.value+theField2.value) == true) 
        return true;
    else
        return warnInvalid(theField2,desField,msg);
}
