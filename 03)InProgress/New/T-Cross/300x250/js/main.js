// function getStyle(el, styleProp) {
//   if (window.getComputedStyle) {
//     var y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
//   }
//   else if (el.currentStyle) {
//     var y = el.currentStyle[styleProp];
//   }
//   return y;
// }

// var lineLeftWidth = parseInt(getStyle(line[0], "width"), 10);
// var lineRightWidth = parseInt(getStyle(line[1], "width"), 10);


TweenMax.set("img", { rotation: 0.05, force3D: true });
TweenMax.set(".tl", { transformOrigin: "0% 0%" });

var globalTimeline = null;

var disableHideDat = false;

var maxLoops = 100;
var numLoops = 0;
// maxLoops = 2;

var initAd = function () {
  trace("initAd");

  var gtl = new TimelineMax({ paused: true, onComplete: onLoop });
  var cl = "";

  gtl.addLabel("start", cl + "+=0.00"); cl = "start";
  gtl.set('.tf', { opacity: 0 }, cl + "+=0");

  gtl.set(cta, { opacity: 0, scale: 1, transformOrigin: "121px 187px" }, cl + "+=0.00");
  // gtl.set('.stoerer', { x: 135, opacity: 0 }, cl + "+=0.00");

  gtl.addLabel("fadein", cl + "+=0.10"); cl = "fadein";
  gtl.to('.logo', 0.0, { opacity: 1, ease: Power1.easeOut }, cl + "+=0.0");
  gtl.to('.tf-disc', 0.3, { opacity: 1, ease: Power1.easeOut }, cl + "+=0.2");

  gtl.addLabel("phase1", cl + "+=0.5"); cl = "phase1";
  gtl.staggerTo('.tf0', 0.3, { opacity: 1, ease: Power1.easeOut }, 0.8, cl + "+=0.0");

  gtl.addLabel("phase2", cl + "+=2.5"); cl = "phase2";
  gtl.staggerTo('.tf0', 0.3, { opacity: 0, ease: Power1.easeOut }, 0.0, cl + "+=0.0");
  gtl.staggerTo('.tf1', 0.3, { opacity: 1, ease: Power1.easeOut }, 1.3, cl + "+=0.8");

  // // gtl.addLabel("phase3", cl + "+=4.5"); cl = "phase3";
  // // gtl.to('.stoerer', 0.5, { opacity: 1, x: 0, ease: Power1.easeOut }, cl + "+=0.0");

  gtl.addLabel("phase3", cl + "+=4.5"); cl = "phase3";
  gtl.to(dealer_wrap_start, 0.3, { opacity: 0, ease: Power1.easeOut }, cl + "+=0.0");
  gtl.to(btn_info, 0.3, { opacity: 0, ease: Power1.easeOut }, cl + "+=0.0");
  gtl.to(bgImg, 0.3, { opacity: 0, ease: Power1.easeOut }, cl + "+=0.0");
  gtl.to('.tf', 0.3, { opacity: 0, ease: Power1.easeOut }, cl + "+=0.0");
  gtl.to('.logo', 0.3, { opacity: 0, ease: Power1.easeOut }, cl + "+=0.0");
  gtl.to(overlay_info, 1.0, { opacity: 1.0, ease: Sine.easeOut }, cl + "+=0.00");
  gtl.to(html_legal_text, 0.2, { opacity: 1.0, ease: Power1.easeInOut }, cl + "+=1.00");

  gtl.addLabel("phase4", cl + "+=5.7"); cl = "phase4";
  gtl.to(overlay_info, 0.3, { opacity: 0.0, ease: Sine.easeOut }, cl + "+=0.00");
  gtl.to(dealer_wrap, 0.3, { opacity: 1.0, ease: Sine.easeOut }, cl + "+=0.00");
  gtl.staggerTo('.tf2', 0.3, { opacity: 1, ease: Power1.easeOut }, 0.10, cl + "+=1.0");
  gtl.to(cta, 0.3, { opacity: 1.0, ease: Power1.easeInOut }, cl + "+=1.4");
  gtl.to(cta, 0.2, { scale: 1.03, repeat: 3, yoyo: true, ease: Power1.easeInOut }, cl + "+=2.4");

  gtl.addLabel("fadeout", cl + "+=6.5"); cl = "fadeout";
  gtl.to(cta, 0.2, { opacity: 0, ease: Power1.easeOut }, cl + "+=0.1");

  gtl.seek("fadein");

  trace("animation length (one loop) ::: " + gtl.duration() + " ::: maxLoops ::: " + maxLoops);

  globalTimeline = gtl;
  gtl.timeScale(1);

};

function showDAT(e) {
  if (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
  console.log("clicked");
  TweenMax.to(overlay_info, 0.3, { opacity: 1, ease: Power2.easeOut });
  TweenMax.to(content, 0.3, { opacity: 0, ease: Power2.easeIn });
  TweenMax.to(btn_info, 0.3, { opacity: 0, ease: Power2.easeIn });
  TweenMax.to(btn_close, 0.3, { opacity: 1, ease: Power2.easeIn });
  close_pane.style.display = "block";

}

function hideDAT(e) {
  if (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  if (!disableHideDat) {
    TweenMax.to(overlay_info, 0.3, { opacity: 0, ease: Power2.easeIn });
    TweenMax.to(btn_close, 0.3, { opacity: 0, ease: Power2.easeIn });
    close_pane.style.display = "none";
    TweenMax.to(content, 0.3, { opacity: 1, ease: Power2.easeOut });
    TweenMax.to(btn_info, 0.3, { opacity: 1, ease: Power2.easeOut });
  }

}

function addListener() {
  dat_pane.addEventListener("click", showDAT);
  close_pane.addEventListener("click", hideDAT);
}

var onLoop = function () {

  if ((numLoops == 1 && maxLoops == 1) || (maxLoops > 0 && numLoops > maxLoops)) {
    return;
  }

  numLoops++;

  trace("onLoop ::: loop " + numLoops + " of " + maxLoops);

  if (maxLoops == -1 || numLoops < maxLoops) {
    playFullLoop();
  } else if (numLoops == maxLoops) {
    playLastLoop();
  }
};

function playFullLoop() {
  trace("playFullLoop ::: timestamp: " + (new Date()).getTime());
  showAd();
  globalTimeline.play("fadein");
  // globalTimeline.seek("fadeout");
}

function playLastLoop() {
  trace("playLastLoop ::: timestamp: " + (new Date()).getTime());
  showAd();
  // globalTimeline.tweenFromTo("fadein", "fadeout");
}


function showAd() {
  TweenMax.set(container_ad, { display: "block" });
  TweenMax.to(container_ad, 0.3, { opacity: 1 });
}





function onClickExit() {
  trace("exitClickHandler");
  EB.clickthrough();
}

function handleSVData(data) {
  document.getElementById("html_dealer_headline_0_start").innerHTML = adkit.getSVData("dc_dealer_headline_0");
  document.getElementById("html_dealer_headline_0").innerHTML = adkit.getSVData("dc_dealer_headline_0");
  document.getElementById("html_dealer_address_line_0").innerHTML = adkit.getSVData("dc_dealer_address_line_0");
  document.getElementById("html_dealer_address_line_1").innerHTML = adkit.getSVData("dc_dealer_address_line_1");

}


function onWindowLoaded() {
  //trace("onWindowLoaded");
  //container_ad.addEventListener("click", onClickExit);
  //handleSVData();

  addListener();
  initAd();
  sctData();
  onLoop();
}

window.onload = onWindowLoaded;


//   function initAdKit() {
//       adkit.onReady(onWindowLoaded);
//   }
//
// window.onload = initAdKit;