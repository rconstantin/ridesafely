'use strict';
import {setActiveCamera, hoveringCamera, trailingCamera} from './cameraControls';

function infoButton() 
{
	$('#infoButton').css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9",
	  "position": "fixed",
	  "title": "This Interactive Game represents my Fall 2018 HES Capstone Project."
	  
	}) // adds CSS
	.append("<img width='42' height='42' src='images/infoButton.png'/>")
	.tooltip({
     
    	disabled: true,
    	close: function( event, ui ) { $(this).tooltip('disable'); }
	});

	$('#infoButton').on('click', function () {
	    $(this).tooltip('enable').tooltip('open');
	});
}

function selectCameraView()
{
	$('#topCamera').css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9",
	  "title":"Click Me for Top Camera View."
	  
	}) // adds CSS
	.append("<img width='42' height='42' src='images/camera-icon-red.png'/>")
	.tooltip({
     
    	disabled: true,
    	close: function( event, ui ) { $(this).tooltip('disable'); }
	});
	$('#topCamera').on('click', function() {
		setActiveCamera(hoveringCamera);
	});
	$( "#topCamera" ).hover(
  		function() {
    		$( this ).append( $( "<span class='cameraDisplay'> Click Me for Top Camera View!</span>" ) );
  			}, function() {
    		$( this ).find( "span:last" ).remove();
        });

	$('#chaseCamera').css(
	{ "z-index":"2",
	  "background":"rgba(0,0,0,0)", "opacity":"0.9",
	  "title":"Click Me for Trailing Camera View."
	  
	}) // adds CSS
	.append("<img width='42' height='42' src='images/camera-icon.png'/>")
	.tooltip({
     
    	disabled: true,
    	close: function( event, ui ) { $(this).tooltip('disable'); }
	});
	$('#chaseCamera').on('click', function() {
		setActiveCamera(trailingCamera);
	});
	$( "#chaseCamera" ).hover(
  		function() {
    		$( this ).append( $( "<span class='cameraDisplay'> Click Me for Trailing Camera View!</span>" ) );
  			}, function() {
    		$( this ).find( "span:last" ).remove();
        });

}


export {infoButton, selectCameraView};