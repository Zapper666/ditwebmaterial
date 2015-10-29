// project
	// ui-form-adv.html
		$('.datepicker-adv-doc-1').datepicker();

		$('.datepicker-adv-doc-2').datepicker({
			format: "dd-mmm-yyyy",
			selectMonths: true,
			selectYears: 30
		});

	// ui-modal.html
		var toastText = 1;

		$('#toast-1').on('click', function () {
			$('body').toast({
				content: 'Simple toast ' + toastText + ' with some text',
				show: function () {
					toastText++;
				}
			});
		});

		$('#toast-2').on('click', function () {
			$('body').toast({
				content: '<a data-dismiss="toast">Dismiss</a><div class="toast-text">Simple toast ' + toastText + ' with some text and a simple <a href="javascript:void(0)">link</a>.</div>',
				show: function () {
					toastText++;
				}
			});
		});

	// ui-progress.html
		$('.finish-loading').on('click', function(e) {
			e.stopPropagation();
			$($(this).attr('data-target')).addClass('el-loading-done');
		});

		$('#el-loading-tile-wrap .tile-active-show').each(function (index) {
			var $this = $(this),
			    timer;

			$this.on('hide.bs.tile', function(e) {
				clearTimeout(timer);
			});

			$this.on('show.bs.tile', function(e) {
				if (!$('.el-loading', $this).hasClass('el-loading-done')) {
					timer = setTimeout(function() {
						$('.el-loading', $this).addClass('el-loading-done');
						$this.prepend('<div class="tile-sub"><p>Additional information<br><small>Aliquam in pharetra leo. In congue, massa sed elementum dictum, justo quam efficitur risus, in posuere mi orci ultrices diam.</small></p></div>');
					}, 6000);
				};
			});
		});



//gallery

$(document).ready(function(){
  $("[class^='thumbnail-']").click(function(){
    $("[class^='thumbnail-']").slideToggle("fast");
    $(this).next("[class^='large-']").slideToggle();
  });
  
  $(".close").click(function(){
    $("[class^='large-']:visible").toggle();
    $("[class^='thumbnail-']").fadeToggle("fast");; 
  }); 
  
});

new WOW().init();

//video

var video_player = document.getElementById("video_player");
video = video_player.getElementsByTagName("video")[0],
video_links = video_player.getElementsByTagName("figcaption")[0],
source = video.getElementsByTagName("source"),
link_list = [],
vidDir = "http://demosthenes.info/assets/videos/",
currentVid = 0,
allLnks = video_links.children,
lnkNum = allLnks.length;
video.removeAttribute("controls");
video.removeAttribute("poster");

(function() {
function playVid(index) {
 video_links.children[index].classList.add("currentvid");
    source[1].src = vidDir + link_list[index] + ".webm";  
	source[0].src = vidDir + link_list[index] + ".mp4";
    currentVid = index;
    video.load();
	video.play();
}

for (var i=0; i<lnkNum; i++) {
var filename = allLnks[i].href;
link_list[i] = filename.match(/([^\/]+)(?=\.\w+$)/)[0];
(function(index){
        allLnks[i].onclick = function(i){
        i.preventDefault();  
		for (var i=0; i<lnkNum; i++) {
		allLnks[i].classList.remove("currentvid");
		}
		playVid(index);
        }    
    })(i);
}
video.addEventListener('ended', function () {
    allLnks[currentVid].classList.remove("currentvid");
    if ((currentVid + 1) >= lnkNum) { nextVid = 0 } else { nextVid = currentVid+1 }
    playVid(nextVid);
})

video.addEventListener('mouseenter', function() {
    video.setAttribute("controls","true");
})

video.addEventListener('mouseleave', function() {
    video.removeAttribute("controls");
})

var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
			for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }}
            return index;
        };}
    return indexOf.call(this, needle);
};
 	var focusedLink = document.activeElement;
 	index = indexOf.call(allLnks, focusedLink);
 	
document.addEventListener('keydown', function(e) {
if (index) {
	var focusedElement = document.activeElement;
    if (e.keyCode == 40 || e.keyCode == 39) { // down or right cursor
    var nextNode = focusedElement.nextElementSibling;
    if (nextNode) { nextNode.focus(); } else { video_links.firstElementChild.focus(); }
    }
   if (e.keyCode == 38 || e.keyCode == 37) { // up or left cursor
    var previousNode = focusedElement.previousElementSibling;
    if (previousNode) { previousNode.focus(); } else { video_links.lastElementChild.focus(); }
    }
 }
});

})();  

function createGrid(transform, xx, yy, isHorizon){
  var elemWidth, elemHeight;

  if(isHorizon){
    elemWidth = window.innerWidth/4;
    elemHeight = window.innerHeight/3;
  }else{
    elemWidth = window.innerWidth/3;
    elemHeight = window.innerHeight/4;
  }

  var xPos = elemWidth * xx;
  var yPos = elemHeight * yy;


  var curTopLeft  = {x: transform.topLeft.x, y: transform.topLeft.y};
  var curTopRight = {x: transform.topRight.x, y: transform.topRight.y};
  var curBotLeft  = {x: transform.bottomLeft.x, y: transform.bottomLeft.y};
  var curBotRight = {x: transform.bottomRight.x, y: transform.bottomRight.y};

  var targetTopLeft  = {x: xPos, y: yPos};
  var targetTopRight = {x: xPos + elemWidth, y: yPos};
  var targetBotLeft  = {x: xPos, y: yPos + elemHeight};
  var targetBotRight = {x: xPos + elemWidth, y: yPos + elemHeight};

  var curObject = {rate0: 1, rate1: 1, rate2: 1, rate3: 1, rate4: 1};

  function onUpdateGridHandler(){
    var tempTopLeftX = curTopLeft.x * curObject.rate + targetTopLeft.x * (1 - curObject.rate);
    var tempTopLeftY = curTopLeft.y * curObject.rate + targetTopLeft.y * (1 - curObject.rate);

    var tempTopRightX = curTopRight.x * curObject.rate + targetTopRight.x * (1 - curObject.rate);
    var tempTopRightY = curTopRight.y * curObject.rate + targetTopRight.y * (1 - curObject.rate);

    var tempBotLeftX = curBotLeft.x * curObject.rate + targetBotLeft.x * (1 - curObject.rate);
    var tempBotLeftY = curBotLeft.y * curObject.rate + targetBotLeft.y * (1 - curObject.rate);

    var tempBotRightX = curBotRight.x * curObject.rate + targetBotRight.x * (1 - curObject.rate);
    var tempBotRightY = curBotRight.y * curObject.rate + targetBotRight.y * (1 - curObject.rate);

    transform.topLeft.x = tempTopLeftX;
    transform.topLeft.y = tempTopLeftY;

    transform.topRight.x = tempTopRightX;
    transform.topRight.y = tempTopRightY;

    transform.bottomLeft.x = tempBotLeftX;
    transform.bottomLeft.y = tempBotLeftY;

    transform.bottomRight.x = tempBotRightX;
    transform.bottomRight.y = tempBotRightY;

  }

  function onUpdate0GridHandler(){

    var tempTopLeftX = curTopLeft.x * curObject.rate0 + targetTopLeft.x * (1 - curObject.rate0);
    var tempTopLeftY = curTopLeft.y * curObject.rate0 + targetTopLeft.y * (1 - curObject.rate0);

    transform.topLeft.x = tempTopLeftX;
    transform.topLeft.y = tempTopLeftY;
  }

  function onUpdate1GridHandler(){

    var tempTopRightX = curTopRight.x * curObject.rate1 + targetTopRight.x * (1 - curObject.rate1);
    var tempTopRightY = curTopRight.y * curObject.rate1 + targetTopRight.y * (1 - curObject.rate1);


    transform.topRight.x = tempTopRightX;
    transform.topRight.y = tempTopRightY;

  }

  function onUpdate2GridHandler(){

    var tempBotLeftX = curBotLeft.x * curObject.rate2 + targetBotLeft.x * (1 - curObject.rate2);
    var tempBotLeftY = curBotLeft.y * curObject.rate2 + targetBotLeft.y * (1 - curObject.rate2);

    transform.bottomLeft.x = tempBotLeftX;
    transform.bottomLeft.y = tempBotLeftY;

  }

  function onUpdate3GridHandler(){

    var tempBotRightX = curBotRight.x * curObject.rate3 + targetBotRight.x * (1 - curObject.rate3);
    var tempBotRightY = curBotRight.y * curObject.rate3 + targetBotRight.y * (1 - curObject.rate3);

    transform.bottomRight.x = tempBotRightX;
    transform.bottomRight.y = tempBotRightY;

  }

 TweenLite.to(curObject,.4, {rate0: 0, onUpdate: onUpdate0GridHandler, ease: "Power2.easeOut"});
  TweenLite.to(curObject,.4, {rate1: 0, onUpdate: onUpdate1GridHandler, ease: "Power1.easeOut"});
  TweenLite.to(curObject,.4, {rate2: 0, onUpdate: onUpdate2GridHandler, ease: "Power4.easeOut"});
  TweenLite.to(curObject,.4, {rate3: 0, onUpdate: onUpdate3GridHandler, ease: "Power3.easeOut"});

  //console.log(transform)
  var cover = $(transform.element).find(".cover")[0]
  TweenLite.to(cover,.4, {opacity: 0, ease: "Power1.easeOut"});
}
function pileElement(transform, num, maxNumber){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  // -----------------------------

  var camera = {
    focus : 400,
    self : {
      x : 0,
      y : 0,
      z : 0
    },
    rotate : {
      x : 0,
      y : 0,
      z : 0
    },
    up : {
      x : 0,
      y : 1,
      z : 0
    },
    zoom : 1,
    display : {
      x : width/2,
      y : height/2,
      z : 0
    }
  };

  // ================================

  var y = -10 * (num + 1) + window.innerHeight /2 * .8;
  var width = 400;
  var height = 400 * 9 / 16;
  var topLeftPos  = {x: -width/2, z: -height};
  var topRightPos = {x : width/2, z: -height};
  var botLeftPos  = {x : -width/2, z: 0};
  var botRightPos = {x : width/2, z: 0};

  var topScale = ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - topLeftPos.z))* camera.zoom;
  var botScale = ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - botLeftPos.z))* camera.zoom; //console.log("topScale: " + topScale); //console.log("BotScale: " + botScale);

  var targetTopLeftX = topScale * topLeftPos.x;
  var targetTopLeftY = topScale * y;

  var targetTopRightX = topScale * topRightPos.x;
  var targetTopRightY = topScale * y;

  var targetBotLeftX = botScale * botLeftPos.x;
  var targetBotLeftY = botScale * y;

  var targetBotRightX = botScale * botRightPos.x;
  var targetBotRightY  = botScale * y;

  var halfWidth = window.innerWidth/2;
  var halfHeight = window.innerHeight/2;

  // --------------------------------------

  transform.topLeft.x = targetTopLeftX + halfWidth;
  transform.topLeft.y = targetTopLeftY + halfHeight;


  transform.topRight.x = targetTopRightX + halfWidth;
  transform.topRight.y = targetTopRightY + halfHeight;

  transform.bottomLeft.x = targetBotLeftX + halfWidth;
  transform.bottomLeft.y = targetBotLeftY + halfHeight;

  transform.bottomRight.x = targetBotRightX + halfWidth;
  transform.bottomRight.y = targetBotRightY + halfHeight;


};

function createPile(transform, num){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  // -----------------------------

  var camera = {
    focus : 400,
    self : {
      x : 0,
      y : 0,
      z : 0
    },
    rotate : {
      x : 0,
      y : 0,
      z : 0
    },
    up : {
      x : 0,
      y : 1,
      z : 0
    },
    zoom : 1,
    display : {
      x : width/2,
      y : height/2,
      z : 0
    }
  };

  // ================================
  var halfWidth = window.innerWidth/2;
  var halfHeight = window.innerHeight/2;

  var y = -10 * (num + 1) + window.innerHeight /2 * .8;
  var width = 400;
  var height = 400 * 9 / 16;
  var topLeftPos  = {x: -width/2, z: -height};
  var topRightPos = {x : width/2, z: -height};
  var botLeftPos  = {x : -width/2, z: 0};
  var botRightPos = {x : width/2, z: 0};

  var topScale = ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - topLeftPos.z))* camera.zoom;
  var botScale = ((camera.focus-camera.self.z) / ((camera.focus-camera.self.z) - botLeftPos.z))* camera.zoom; //console.log("topScale: " + topScale); //console.log("BotScale: " + botScale);

  var targetTopLeftX = topScale * topLeftPos.x + halfWidth;
  var targetTopLeftY = topScale * y + halfHeight;

  var targetTopRightX = topScale * topRightPos.x + halfWidth;
  var targetTopRightY = topScale * y + halfHeight;

  var targetBotLeftX = botScale * botLeftPos.x+ halfWidth;
  var targetBotLeftY = botScale * y+ halfHeight;

  var targetBotRightX = botScale * botRightPos.x+ halfWidth;
  var targetBotRightY  = botScale * y+ halfHeight;

  var curTopLeft  = {x: transform.topLeft.x, y: transform.topLeft.y};
  var curTopRight = {x: transform.topRight.x, y: transform.topRight.y};
  var curBotLeft  = {x: transform.bottomLeft.x, y: transform.bottomLeft.y};
  var curBotRight = {x: transform.bottomRight.x, y: transform.bottomRight.y};

  var targetTopLeft  = {x: targetTopLeftX, y: targetTopLeftY};
  var targetTopRight = {x: targetTopRightX, y: targetTopRightY};
  var targetBotLeft  = {x: targetBotLeftX, y: targetBotLeftY};
  var targetBotRight = {x: targetBotRightX, y: targetBotRightY};

  var curObject = {rate0: 1, rate1: 1, rate2: 1, rate3: 1, rate4: 1};


  function onUpdate0GridHandler(){

    var tempTopLeftX = curTopLeft.x * curObject.rate0 + targetTopLeft.x * (1 - curObject.rate0);
    var tempTopLeftY = curTopLeft.y * curObject.rate0 + targetTopLeft.y * (1 - curObject.rate0);

    transform.topLeft.x = tempTopLeftX;
    transform.topLeft.y = tempTopLeftY;
  }

  function onUpdate1GridHandler(){

    var tempTopRightX = curTopRight.x * curObject.rate1 + targetTopRight.x * (1 - curObject.rate1);
    var tempTopRightY = curTopRight.y * curObject.rate1 + targetTopRight.y * (1 - curObject.rate1);


    transform.topRight.x = tempTopRightX;
    transform.topRight.y = tempTopRightY;

  }

  function onUpdate2GridHandler(){

    var tempBotLeftX = curBotLeft.x * curObject.rate2 + targetBotLeft.x * (1 - curObject.rate2);
    var tempBotLeftY = curBotLeft.y * curObject.rate2 + targetBotLeft.y * (1 - curObject.rate2);

    transform.bottomLeft.x = tempBotLeftX;
    transform.bottomLeft.y = tempBotLeftY;

  }

  function onUpdate3GridHandler(){

    var tempBotRightX = curBotRight.x * curObject.rate3 + targetBotRight.x * (1 - curObject.rate3);
    var tempBotRightY = curBotRight.y * curObject.rate3 + targetBotRight.y * (1 - curObject.rate3);

    transform.bottomRight.x = tempBotRightX;
    transform.bottomRight.y = tempBotRightY;

  }


  TweenLite.to(curObject,.4, {rate0: 0, onUpdate: onUpdate0GridHandler, ease: "Power1.easeOut"});
  TweenLite.to(curObject,.4, {rate1: 0, onUpdate: onUpdate1GridHandler, ease: "Power1.easeOut"});
  TweenLite.to(curObject,.4, {rate2: 0, onUpdate: onUpdate2GridHandler, ease: "Power3.easeOut"});
  TweenLite.to(curObject,.4, {rate3: 0, onUpdate: onUpdate3GridHandler, ease: "Power3.easeOut"});


  var cover = $(transform.element).find(".cover")[0];
  TweenLite.to(cover,.4, {opacity: 1, ease: "Power1.easeIn"});


  // --------------------------------------

  /*
  transform.topLeft.x = targetTopLeftX + halfWidth;
  transform.topLeft.y = targetTopLeftY + halfHeight;


  transform.topRight.x = targetTopRightX + halfWidth;
  transform.topRight.y = targetTopRightY + halfHeight;

  transform.bottomLeft.x = targetBotLeftX + halfWidth;
  transform.bottomLeft.y = targetBotLeftY + halfHeight;

  transform.bottomRight.x = targetBotRightX + halfWidth;
  transform.bottomRight.y = targetBotRightY + halfHeight;*/


};


(function () {
// create PerspectiveTransfrom
  var elem = document.getElementById("t-content00");
  var width = 400;
  var height = 225;
  var useBackFacing = true;
  var curCount;
  var $elem = $(".t-content");
  var isHorizon = false;
  var isAnimation = true;
  var isOpen = true;
  if(window.innerWidth > window.innerHeight) isHorizon = true;



  var transformArr = [];

  //console.log(typeof $elem);
  $elem.each(function (index) {
    var transform = new PerspectiveTransform(this, width, height, true);
    transformArr.push(transform);
  });

  curCount = transformArr.length - 1;

  //

  $elem.each(function (index) {
    var transform = transformArr[index]
    pileElement(transform, index);
  });

  function animation(){
    isAnimation = true;
    var transformCount = transformArr.length -curCount - 1;
    var xx, yy;

    if(isHorizon){
      xx = transformCount % 4;
      yy = parseInt(transformCount / 4);
    }else{
      xx = transformCount % 3;
      yy = parseInt(transformCount / 3);
    }

    createGrid(transformArr[curCount], xx, yy, isHorizon);

    curCount--;
    if(curCount >= 0) {

      setTimeout(animation, 100);
    }
    else isAnimation = false;
  }


  function animation2(){
    isAnimation = true;

    createPile(transformArr[curCount], curCount)

    curCount++;
    if(curCount <= transformArr.length-1) setTimeout(animation2, 50);
    else isAnimation = false;
  };




  function loop(){

    $elem.each(function (index) {
        transformArr[index].update();
    });

    requestAnimationFrame(loop);
  };

  loop();

  setTimeout(animation, 500);


  $("#toggle").click(function(ev){
    if(!isAnimation){

      if(isOpen) {
        curCount = 0;
        animation2();
      }
      else {
        curCount = transformArr.length - 1;
        animation();
      }

      isOpen = !isOpen;
    }
  });
})();


//Chart Dapodik//

$(function(){
      var $ppc = $('.progress-pie-chart'),
        percent = parseInt($ppc.data('percent')),
        deg = 360*percent/100;
      if (percent > 50) {
        $ppc.addClass('gt-50');
      }
      $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
      $('.ppc-percents span').html(percent+'%');
    });
   

//================//
  //Mobile View//
//===============//

