

function sctData(params) {
    //	Wenn	Werte	nicht	als	Funktionsparameter	uebergeben	werden,
    //	GET-Parameter	benutzen
    if (!params) {
        params = window.location.search.substring(1);
    }
    //	Wenn	'params'	vorhanden,	die	Werte	in	Content-Object	einlesen
    //	Key	=	ID	von	DIV	Tag,	Value	=	Inhalt
    if (params) {
        window.sctContent = {};
        var s = params.split('&');
        if (!s.length) return;
        for (var i = 0; i < s.length; i++) {
            var parts = s[i].split('=');
            window.sctContent[unescape(parts[0])] =
                unescape(decodeURIComponent(parts[1]));
        }
    }


    //	Ansonsten	wird	angenommen,	Content-Object	wurde	ueber
    //	Einbindung	einer	JS	Datei	gesetzt
    if (window.sctContent) {
        for (var key in window.sctContent) {
            if (window.sctContent.hasOwnProperty(key)) {
                sctSetValue(key, window.sctContent[key]);
            }
        }
    }
    fillRepetiveContent();
}

function fillRepetiveContent(){
    // document.getElementById("html_vw_start").innerHTML = html_vw.innerHTML;
    // document.getElementById("html_dealer_headline_0_start").innerHTML = html_dealer_headline_0.innerHTML;
}

/**
 *    Setzt    einen    Wert
 */
function sctSetValue(key, value) {
    var elem = document.getElementById(key);
    if (elem != null) {
            elem.innerHTML = value;
        }
    }


/**
 *   Google Web Designer
 *    Laesst    das    Banner    zu    einer    bestimmten    Szene    Springen    und    prueft    anschliessend
 *    ob    die    Szene    auch    tatsaechlich    gesetzt    wurde
 */
function sctGotoLabel (szene) {
switch (szene) {
	case "Adresse":
      globalTimeline.tweenFromTo("phase4", "fadeout");
			return true;
			break;
			}
			return false;
	}



