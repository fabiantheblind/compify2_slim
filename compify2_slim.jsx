﻿// =====================================================================// compify2_slim.jsx by fabiantheblind Nov 2010 based on://// compify2.jsx by Joseph M. Morgan - April 2005 based on://// Compify.jsx Byron Nash, Edited and Improved by Paul Tuersley  October 2004//// this script is provided as is and has no warrenty at all// see the readme.txt for more inf// =====================================================================main();function main() {var currentProject = app.project;// Get projectvar itemCollection = null;if (itemCollection == null) {	itemCollection = currentProject.rootFolder.items;}var frameRate = 12;// this is disabled the variable doesen't do anything right nowvar duration = 1 / frameRate;var scaleWidth = 1000;var scaleHeight = 1000;var myValues = [itemCollection, frameRate, duration, scaleWidth, scaleHeight];var userInfo = myValues;// ========================================================================================// NOTE!!!!// by testing if anything was returned by the createDialog function, you know whether// the user ok'ed or cancelled. This main body of the script will only execute if something// was returned (i.e if userInfo isn't null);// ========================================================================================if (userInfo) {	var suffix;	var targetItems;	// Will hold items to compify	var destinationFolder = userInfo[0];	var frameRate = userInfo[1];	var duration = userInfo[2];	var scaleWidth = userInfo[3];	var scaleHeight = userInfo[4];	// ==============================================	// create undo group	// ==============================================	app.beginUndoGroup("Compify2_slim");	var targetFolderName = prompt("Enter the name for the target folder", "target " + Date().toString());	var selectionsTargetFolder = app.project.items.addFolder(targetFolderName);	var projectItems = currentProject.items;	// list of items in project	writeLn("based on Compify and Compify2: Byron Nash, Paul Tuersley, Joe Morgan");	var createdCompositions = new Array();	// array for storing all the comps made	var selectedItems = app.project.selection;	// set selected import items to an array	if (selectedItems.length > 0) {		// check to see if anything is selected		targetItems = app.project.selection;		// if so the use the selection	}	else {		// if not, use entire project contents		// targetItems = new Array();		// for (j = 0; j < projectItems.length; j++) { // add project list to an array		// targetItems[j] = projectItems[j + 1];		alert("nothing is selected. Sry.\nI will stop working now");	}}for (i = 0; i <= targetItems.length; i++) {	// loop through the project	var currentItem = targetItems[i];	if (currentItem instanceof FootageItem) {		// check for footage items		var fileExtensionPosition = currentItem.name.lastIndexOf(".");		// find file extension		// ==================		// Extract the suffix		// ==================		suffix = currentItem.name.substring(fileExtensionPosition + 1, currentItem.name.length);		// =====================================================		// add suffux to comp name and remove the file extension		// =====================================================		var curName = currentItem.name.substring(0, fileExtensionPosition) + suffix;		// =======================================================		// Truncate comp name if it exceeds the 31 character limit		// =======================================================		if (curName.length > 30) {		curName = curName.slice(0, 29 - suffix.length) + suffix;		}		// ====================		// setup comp variables		// ====================		var curWidth = currentItem.width;		var curHeight = currentItem.height;		var curAspect = currentItem.pixelAspect;		var curduration = currentItem.duration;		var curRate = currentItem.frameRate;		// ==================================================		// Calcualte the new width and height (scale to comp)		// ==================================================		// if (curWidth > scaleWidth || curHeight > scaleHeight) {		// var widthRatio = scaleWidth / curWidth;		// var heightRatio = scaleHeight / curHeight;		// var newScale = Math.max(widthRatio, heightRatio) * 100; // preserve 1 to 1 aspect ratio		// }		// =====================================		// Handle the duration and rate settings		// =====================================		if (curduration == 0) {		curduration = duration		// set duration to dialog value if it is a still image		}		if (curRate < 1) {		curRate = frameRate		// set frame rate to dialog value if it is a still image		}		// =========================		// create comp and add layer		// =========================		var newComposition = destinationFolder.addComp(curName, curWidth, curHeight, curAspect, 1 / 12, curRate);		newComposition.parentFolder = selectionsTargetFolder;		addCompToRenderQueue(newComposition);		var layerItems = newComposition.layers;		// variable for collection of layer objects in Comp		var newLayer = layerItems.add(currentItem);		// add layer		newLayer.scale.setValue([100, 100]);		// Scale it as close to the comp as we can		// newLayer("ADBE Effect Parade").addProperty("ADBE Fractal"); // Add the "Fractal" effect testing!!!		// the preset has to be located next to the script		applyKeylightPreset(newLayer);		createdCompositions[createdCompositions.length] = newComposition;		// add comp to array	}}writeLn("Created " + createdCompositions.length + " Comps");app.endUndoGroup();}function applyKeylightPreset(newLayer) {	var thisScript = new File($.fileName);	var containingFolder = new Folder(thisScript.parent.absoluteURI);	// alert("This script is in " + containingFolder.absoluteURI);	// this path is next to the script	var presetPath = containingFolder.absoluteURI + "/BH_hoehle_keylight.ffx";	newLayer.enabled = true;	var myPreset = File(presetPath);	newLayer.applyPreset(myPreset);	}	function addCompToRenderQueue(curComp) {	var RQitem = app.project.renderQueue.items.add(curComp);	//add item to the Render Queue	// right now this is BH_hoehle_rendersettings	RQitem.applyTemplate("BH_hoehle_rendersettings");	// make it realy one frame long. this seems to be a bug or my mistake don't know	RQitem.timeSpanDuration = curComp.frameDuration;	// right now this is BH_hoehle_outputsettings you could use photoshop	// but this has the alpha masked not direct	RQitem.outputModule(1).applyTemplate("BH_hoehle_outputsettings");		app.project.renderQueue.showWindow(false);	// hide the RQ window if "true" it comes to front}// } // closing