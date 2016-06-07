/**
 * dubtrack-tweaks (originally "dubtrack-upvote")
 *
 * For more information and installation instructions, please see:
 * https://github.com/patricknelson/dubtrack-tweaks/
 */

// ==UserScript==
// @name         dubtrack-tweaks
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically "updub" (upvote) tracks after a few seconds.
// @author       Patrick Nelson (pat@catchyour.com) a.k.a. chunk_split()
// @site         https://github.com/patricknelson/dubtrack-tweaks/
// @match        *://dubtrack.fm/*
// @match        *://www.dubtrack.fm/*
// @grant        unsafeWindow
// @updateURL    https://rawgit.com/patricknelson/dubtrack-tweaks/master/dubtrack-tweaks.user.js
// ==/UserScript==

(function($, console, Dubtrack) {
	'use strict';

	$(function() {
		console.log("Loaded dubtrack-tweaks.");

		/**
		 * AUTO UPDUB/UPVOTE
		 */
		setInterval(function() {
			// Don't do anything if a vote has already been case (i.e. if this song is downvoted as well).
			if ($(".voted").length === 0) $(".dubup").click();
		}, 5000);


		/**
		 * SPACEBAR MUTE
		 */
		var muteButton = $(".icon-mute");
		$("body").keypress(function(event){
			var nodeName = event.target.nodeName;
			if (event.keyCode != 32) return;
			if (nodeName == "INPUT" || nodeName == "TEXTAREA") return;
			muteButton.click();
		});

	});

})(unsafeWindow.$, unsafeWindow.console, unsafeWindow.Dubtrack);
