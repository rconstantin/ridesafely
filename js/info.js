'use strict';

function infoButton() 
{
	$('a').css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9",
	  "position": "fixed",
	  "title":"Press '1' for Top Camera, '2' for Chase Camera."
	  
	}) // adds CSS
	.append("<img width='42' height='42' src='images/infoButton.png'/>")
	.tooltip({
     
    	disabled: true,
    	close: function( event, ui ) { $(this).tooltip('disable'); }
	});

	$('a').on('click', function () {
	    $(this).tooltip('enable').tooltip('open');
	});
}



export {infoButton};