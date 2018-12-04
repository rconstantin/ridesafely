'use strict';

function visibilityDuringGame() {
	$('.meta').hide();
	$('#infoButton').hide();
	$('#topCamera').show()
	$('#chaseCamera').show();
	$('#score').show();
}

function visibilityOutsideGame() {
	$('.meta').show();
	$('#infoButton').show();
	$('#topCamera').hide()
	$('#chaseCamera').hide();
	$('#score').hide();
	
}

function hideAll() {
	$('.meta').hide();
	$('#infoButton').hide();
	$('#topCamera').hide()
	$('#chaseCamera').hide();
	$('#score').hide();
}

export {visibilityDuringGame, visibilityOutsideGame, hideAll};