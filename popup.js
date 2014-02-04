/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2014 Bryan Martin

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/

$( document ).ready( function() {
	// allows easy object storage and retrieval through localstorage
	Storage.prototype.setObject = function(key, value) {
		this.setItem(key, JSON.stringify(value));
	}
	Storage.prototype.getObject = function(key) {
		var value = this.getItem(key);
		return value && JSON.parse(value);
	}

	// set all the colors and attach event listeners for changes
	setColors()
	$(".squadColor").change(barUpdateSquadColor)
	$(".teamColor").change(barUpdateTeamColor)
	$(".enemyColor").change(barUpdateEnemyColor)
	
	$("#squad .number").change(inputUpdateSquadColor)
	$("#team .number").change(inputUpdateTeamColor)
	$("#enemy .number").change(inputUpdateEnemyColor)
	
	$("input[name='colorSetting']").change(radioUpdateColor)
	
	// update by reloading the tab
	$("#update").click(function(){
		console.log("updating")
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.reload(tab.id);
		});
	})
} )

function setColors() {
	
	// set remembered color selection
	if(!localStorage.getObject('colorSetting')) {
		localStorage.setObject('colorSetting','Default')
		$('#Default').prop('checked', true)
	} else {
		setting = localStorage.getObject('colorSetting')
		$('#'+setting).prop('checked', true)
	}
	
	radioUpdateColor()
	
	setColorSquad()
	setColorTeam()
	setColorEnemy()
}

// locks the colors from being changed
function lockColors(lock) {
	$(".squadColor").prop('disabled', lock)
	$(".teamColor").prop('disabled', lock)
	$(".enemyColor").prop('disabled', lock)
	
	$("#squad .number").prop('disabled', lock)
	$("#team .number").prop('disabled', lock)
	$("#enemy .number").prop('disabled', lock)
}

// updates the colors based on the selected radio button
function radioUpdateColor() {
	button = $("input[name=colorSetting]:radio:checked")[0]
	switch(button.id) {
		case "Default":
			localStorage.setObject('colorSetting', 'Default')
			console.log("Setting color to Default")
			lockColors(true)
			color = {
						squad:{r:107,g:209,b:12},
						team:{r:0,g:169,b:255},
						enemy:{r:255,g:85,b:0}
					}
			break
		case "DEUTERANOPIA":
			localStorage.setObject('colorSetting', 'DEUTERANOPIA')
			console.log("Setting color to DEUTERANOPIA")
			lockColors(true)
			color = {
						squad:{r:69,g:0,b:65},
						team:{r:0,g:0,b:100},
						enemy:{r:198,g:45,b:0}
					}
			break
		case "TRITANOPIA":
			localStorage.setObject('colorSetting', 'TRITANOPIA')
			console.log("Setting color to TRITANOPIA")
			lockColors(true)
			color = {
						squad:{r:0,g:8,b:183},
						team:{r:0,g:94,b:243},
						enemy:{r:159,g:18,b:0}
					}
			break
		case "PROTANOPIA":
			localStorage.setObject('colorSetting', 'PROTANOPIA')
			console.log("Setting color to PROTANOPIA")
			lockColors(true)
			color = {
						squad:{r:0,g:57,b:86},
						team:{r:33,g:33,b:255},
						enemy:{r:33,g:101,b:0}
					}
			break
		case "Custom":
			localStorage.setObject('colorSetting', 'Custom')
			console.log("Setting color to Custom")
			lockColors(false)
			return
	}
	
	// update the colors
	localStorage.setObject("squadColor", color.squad)
	localStorage.setObject("teamColor", color.team)
	localStorage.setObject("enemyColor", color.enemy)
	var squadcolor = "rgb("+ color.squad.r +","+ color.squad.g +","+ color.squad.b +")"
	var teamcolor = "rgb("+ color.team.r +","+ color.team.g +","+ color.team.b +")"
	var enemycolor = "rgb("+ color.enemy.r +","+ color.enemy.g +","+ color.enemy.b +")"
	$("#squad").css("background-color", squadcolor)
	$("#team").css("background-color", teamcolor)
	$("#enemy").css("background-color", enemycolor)
	
	$(".squadColor[name='squadR']").val(color.squad.r)
	$(".squadColor[name='squadG']").val(color.squad.g)
	$(".squadColor[name='squadB']").val(color.squad.b)
	$("#squad .redVal").val(color.squad.r)
	$("#squad .greenVal").val(color.squad.g)
	$("#squad .blueVal").val(color.squad.b)
	
	$(".teamColor[name='teamR']").val(color.team.r)
	$(".teamColor[name='teamG']").val(color.team.g)
	$(".teamColor[name='teamB']").val(color.team.b)
	$("#team .redVal").val(color.team.r)
	$("#team .greenVal").val(color.team.g)
	$("#team .blueVal").val(color.team.b)
	
	$(".enemyColor[name='enemyR']").val(color.enemy.r)
	$(".enemyColor[name='enemyG']").val(color.enemy.g)
	$(".enemyColor[name='enemyB']").val(color.enemy.b)
	$("#enemy .redVal").val(color.enemy.r)
	$("#enemy .greenVal").val(color.enemy.g)
	$("#enemy .blueVal").val(color.enemy.b)
}

// sets and updates the squad color
function setColorSquad() {
	console.log("setting squad color")
	if(!localStorage.getObject("squadColor")){
		localStorage.setObject("squadColor", {
										r: $(".squadColor[name='squadR']").val(),
										g: $(".squadColor[name='squadG']").val(),
										b: $(".squadColor[name='squadB']").val()
									})
	} else {
		color = localStorage.getObject("squadColor")
		$(".squadColor[name='squadR']").val(color.r)
		$(".squadColor[name='squadG']").val(color.g)
		$(".squadColor[name='squadB']").val(color.b)
	}
	barUpdateSquadColor()
}

// sets and updates the team color
function setColorTeam() {
	console.log("setting team color")
	if(!localStorage.getObject("teamColor")){
		localStorage.setObject("teamColor", {
										r: $(".teamColor[name='teamR']").val(),
										g: $(".teamColor[name='teamG']").val(),
										b: $(".teamColor[name='teamB']").val()
									})
	} else {
		color = localStorage.getObject("teamColor")
		$(".teamColor[name='teamR']").val(color.r)
		$(".teamColor[name='teamG']").val(color.g)
		$(".teamColor[name='teamB']").val(color.b)
	}
	barUpdateTeamColor()
}

// sets and updates the enemy color
function setColorEnemy() {
	console.log("setting enemy color")
	if(!localStorage.getObject("enemyColor")){
		localStorage.setObject("enemyColor", {
										r: $(".enemyColor[name='enemyR']").val(),
										g: $(".enemyColor[name='enemyG']").val(),
										b: $(".enemyColor[name='enemyB']").val()
									})
	} else {
		color = localStorage.getObject("enemyColor")
		$(".enemyColor[name='enemyR']").val(color.r)
		$(".enemyColor[name='enemyG']").val(color.g)
		$(".enemyColor[name='enemyB']").val(color.b)
	}
	barUpdateEnemyColor()
}

// updates the squad color from the input boxes
function inputUpdateSquadColor() {
	color = {
				r: $("#squad .redVal").val(),
				g: $("#squad .greenVal").val(),
				b: $("#squad .blueVal").val()
			}
	localStorage.setObject("squadColor", color)
	var squadcolor = "rgb("+ color.r +","+ color.g +","+ color.b +")"
	$("#squad").css("background-color", squadcolor)
	$(".squadColor[name='squadR']").val(color.r)
	$(".squadColor[name='squadG']").val(color.g)
	$(".squadColor[name='squadB']").val(color.b)
}

// updates the team color from the input boxes
function inputUpdateTeamColor() {
	color = {
				r: $("#team .redVal").val(),
				g: $("#team .greenVal").val(),
				b: $("#team .blueVal").val()
			}
	localStorage.setObject("teamColor", color)
	var teamcolor = "rgb("+ color.r +","+ color.g +","+ color.b +")"
	$("#team").css("background-color", teamcolor)
	$(".teamColor[name='teamR']").val(color.r)
	$(".teamColor[name='teamG']").val(color.g)
	$(".teamColor[name='teamB']").val(color.b)
}

// updates the enemy color from the input boxes
function inputUpdateEnemyColor() {
	color = {
				r: $("#enemy .redVal").val(),
				g: $("#enemy .greenVal").val(),
				b: $("#enemy .blueVal").val()
			}
	localStorage.setObject("enemyColor", color)
	var enemycolor = "rgb("+ color.r +","+ color.g +","+ color.b +")"
	$("#enemy").css("background-color", enemycolor)
	$(".enemyColor[name='enemyR']").val(color.r)
	$(".enemyColor[name='enemyG']").val(color.g)
	$(".enemyColor[name='enemyB']").val(color.b)
}

// updates the squad color from the slider bars
function barUpdateSquadColor() {
	color = {
				r: $(".squadColor[name='squadR']").val(),
				g: $(".squadColor[name='squadG']").val(),
				b: $(".squadColor[name='squadB']").val()
			}
	localStorage.setObject("squadColor", color)
	var squadcolor = "rgb("+ color.r +","+ color.g +","+ color.b +")"
	$("#squad").css("background-color", squadcolor)
	$("#squad .redVal").val(color.r)
	$("#squad .greenVal").val(color.g)
	$("#squad .blueVal").val(color.b)
}

// updates the team color from the slider bars
function barUpdateTeamColor() {
	color = {
				r: $(".teamColor[name='teamR']").val(),
				g: $(".teamColor[name='teamG']").val(),
				b: $(".teamColor[name='teamB']").val()
			}
	localStorage.setObject("teamColor", color)
	var teamcolor = "rgb("+ color.r +","+ color.g +","+ color.b +")"
	$("#team").css("background-color", teamcolor)
	$("#team .redVal").val(color.r)
	$("#team .greenVal").val(color.g)
	$("#team .blueVal").val(color.b)
}

// updates the enemy color from the slider bars
function barUpdateEnemyColor() {
	color = {
				r: $(".enemyColor[name='enemyR']").val(),
				g: $(".enemyColor[name='enemyG']").val(),
				b: $(".enemyColor[name='enemyB']").val()
			}
	localStorage.setObject("enemyColor", color)
	var enemycolor = "rgb("+ color.r +","+ color.g +","+ color.b +")"
	$("#enemy").css("background-color", enemycolor)
	$("#enemy .redVal").val(color.r)
	$("#enemy .greenVal").val(color.g)
	$("#enemy .blueVal").val(color.b)
}

