(function($){

	//Checking if an element is scrolled into the view
	function isScrolledIntoView(elem)
	{
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom+800));//(elemBottom <= docViewBottom) &&
	}


	//OnLoad of all images display the content
	$(window).load(function(){
		$(".foo").fadeOut(500, function(){
		});
		$(".main-content").css({"display":"block"});
	});



	$(document).ready(function(){

		var anim_angle=360;
		var isRunning=false;
		var viewed=false;

		//For smooth scrolling via the right floating buttons
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 500);
					return false;
				}
			}
		});


		$(document).on("scroll", function(){
			
			var distFromTop=$(this).scrollTop();
			$('.blurred').css('opacity', distFromTop/150);
			if( distFromTop <= 300 ) {

				$('#head-text').css({top:distFromTop+200});

			} else {

				$('#head-text').css({top:500});
			}

			
			if(!viewed && isScrolledIntoView("#skill-bars")) {
				viewed=true;
				jQuery(document).ready(function(){
					jQuery('.skillbar').each(function(){
						jQuery(this).find('.skillbar-bar').animate({
							width:jQuery(this).attr('data-percent')
						},2000);
					});
				});
			}
		});


		//On click event for change text
		$("#change-text, .spin-text").on("click", function(ev) {
			$("#change-text").removeClass("breath");

			setTimeout(function()
				{$("#change-text").css({'-webkit-transform':'rotate('+anim_angle+'deg)','-moz-transform':'rotate('+anim_angle+'deg)', '-ms-transform':'rotate('+anim_angle+'deg)','-o-transform':'rotate('+anim_angle+'deg)', '-webkit-transition-duration':'500ms', '-moz-transition-duration':'500ms', '-o-transition-duration':'500ms', '-ms-transition-duration':'500ms'});
			}
			,10);

			setTimeout(function()
				{if (!isRunning){
					isRunning=true;

					anim_angle+=360;
					$(".spin-text").find(".visible").fadeOut(200, function(){
						if (0==$(".spin-text").find(".visible").next().length) 
						{
							$(".spin-text").find(".visible").siblings().first().removeClass("hidden").addClass("visible").removeAttr("style");
						}
						else 
						{
							$(".spin-text").find(".visible").next().removeClass("hidden").addClass("visible").removeAttr("style");
						}

						$(this).addClass("hidden").removeClass("visible");

					});
				}

				isRunning=false;
				$("#change-text").addClass("breath");
			}
			, 500);


		});

	});



}(jQuery));