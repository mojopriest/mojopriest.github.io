$(document).ready(function(){
	$.fn.audioPlayer = function(){
		var object = $(this),
			currentAudio = 0,
			allAudio = $("ul>li>a", object),
			myAudio,
			currentHref,
			pauseState = true,
			format = ".wav",
			MSIE8 = ($.browser.msie) && ($.browser.version <= 8);
			MSIE = ($.browser.msie);
			
			if(!MSIE8){
				init()
			}else{
				object.css({display:"none"})
			}
			function init(){
				if(MSIE){
					format = ".mp3"
				}
				myAudio = new Audio()
				myAudio.addEventListener("timeupdate",timeUpdate);
				$("#prevSound",object).click(prevAudio).hover(over,out);
				$("#nextSound",object).click(nextAudio).hover(over,out);
				$("#playSound",object).click(playAudio).hover(over,out);
				$("#stopSound",object).click(stopAudio).hover(over,out);
				$("#tracerLine",object).click(changeTime);
				$("#volumeInd",object).click(changeVolume);
				changeAudio();
				
				$("#playSound",object).addClass('stoped');

    			object.unselectable = "on"; 
       			object.css({'-moz-user-select': 'none', '-khtml-user-select': 'none', '-webkit-user-select': 'none', '-o-user-select': 'none', 'user-select': 'none'});
			};
			function over(){
				$(this).find("img").stop(true, true).animate({top:-28}, 300, "easeInOutCubic");
			}
			function out(){
				$(this).find("img").stop(true, true).animate({top:0}, 300, "easeInOutCubic");
			}
			function changeAudio(){
				myAudio.pause();
				currentHref = allAudio.eq(currentAudio).attr("href").substring(allAudio.eq(currentAudio).attr("href").lastIndexOf('.'), allAudio.eq(currentAudio).attr("href").lenght)+format;
				myAudio.setAttribute("src", currentHref);
				myAudio.setAttribute("preload", "auto");
				if(!pauseState){
					myAudio.play();
				}
			}
			function changeVolume(e){
				var changeVolumePercent = (e.pageX-$(this).offset().left)/($(this).width())*100;
				myAudio.volume=1*changeVolumePercent/100;
				$("#volume",object).stop(true, true).animate({width:e.pageX-$(this).offset().left}, 500, "easeOutCubic");;
			}
			function changeTime (e){
				var changePercent = (e.pageX-$(this).offset().left)/($(this).width())*100;
				myAudio.currentTime = myAudio.duration*changePercent/100;
			}
			function timeUpdate (){
				var tmp = this.currentTime/this.duration*100;

				$("#timeLine",object).stop(true).animate({width:($("#tracerLine",object).width()/100) * tmp}, 500, "easeOutExpo");

				if(this.currentTime>=this.duration){
					nextAudio();
				}
			}
			function playAudio(){
				if(!pauseState){
					pauseState = true;
					myAudio.pause();
					$(this).addClass('stoped');
					//$(this).find("img").eq(1).stop(true, true).animate({opacity:0}, 300, "easeInOutCubic");
				}else{
					pauseState = false;
					myAudio.play();
					$(this).removeClass('stoped');
					//$(this).find("img").eq(1).stop(true, true).animate({opacity:1}, 300, "easeInOutCubic");
				}
				return false;
			}
			function stopAudio(){
				$(this).addClass('stoped');

				pauseState = true;
				myAudio.pause();
				myAudio.currentTime=0;
				
				//$("#playSound",object).find("img").eq(1).stop(true, true).animate({opacity:0}, 300, "easeInOutCubic");
				return false;
			}
			function nextAudio(){
				currentAudio++
				if(currentAudio>allAudio.length-1){
					currentAudio=0;
				}
				changeAudio();
				return false;
			}
			function prevAudio(){
				currentAudio--;
				if(currentAudio<0){
					currentAudio=allAudio.length-1;
				}
				changeAudio();
				return false;
			}

			
	}
})