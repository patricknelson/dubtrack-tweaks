/**
 * dubtrack-tweaks (originally "dubtrack-upvote")
 *
 * FEATURES:
 *
 *  - Automatically "updub" (upvote) songs a few seconds after they start (or visiting a room).
 *  - Allows you to mute music by simply pressing the spacebar anywhere within the window (except in chat).
 *  - Added the "Permalink" to the right of song titles so that now you can FINALLY visit *currently*
 *    playing SoundCloud (and YouTube) songs by simply clicking a link.
 *
 * INSTRUCTIONS:
 *
 * 1. In chrome, download/install Tampermonkey here: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
 * 2. In Tampermonkey options, go to "Create new Script"
 * 3. Copy/paste these entire contents.
 * 4. Visit dubtrack.fm and enter a room.
 * 5. Make sure Tampermonkey is enabled (click the Tampermonkey icon and select "Enabled").
 *
 * Note: These instructions are for Chrome users, but installation should be very similar if you're
 * using Firefox. For Firefox, you'll need to setup and use Greasemonkey instead of Tampermonkey
 * which can be found here: http://userscripts-mirror.org/about/installing.html
 */

// ==UserScript==
// @name         Dubtrack upvote
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatically "updub" (upvote) tracks after a few seconds.
// @author       Patrick Nelson (pat@catchyour.com) a.k.a. chunk_split()
// @site         https://gist.github.com/patricknelson/4b729ec234a35d4b8cc9
// @match        *://dubtrack.fm/*
// @match        *://www.dubtrack.fm/*
// ==/UserScript==

(function($, console) {
	'use strict';

	$(function() {
		/**
		 * AUTO UPDUB/UPVOTE
		 */

		setInterval(function() {
			// Don't do anything if a vote has already been case (i.e. if this song is downvoted as well).
			if ($(".voted").length == 0) $(".dubup").click();
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


		/**
		 * SONG LINKING
		 */
		var currentSongID = null;
		setInterval(function() {
			if (currentSongID != getCurrentSongID()) {
				// Reset song link.
				setSongLink('');
				console.log("Song changed, fetching URL...");
				currentSongID = getCurrentSongID();
				getSongURL(currentSongID, function(url) {
					setSongLink(url);
				});
			}
		}, 1000);

		var setSongLink = function(url) {
			if (getSongLink().length == 0) $(".currentSong").append('<em class="currentSongLink"></em>');
			var html = '';
			if (url) html = ' &nbsp;&ndash;&nbsp; (<a target="_blank" style="text-decoration: underline;" href="' + url + '">Permalink</a>)';
			getSongLink().html(html);
		};

		var getSongLink = function() {
			return $(".currentSongLink");
		};

		// Just an abstracted shortcut for getting currently playing song.
		var getCurrentSongID = function() {
			return Dubtrack.room.model.attributes.currentSong.fkid;
		};

		// Quick and dirty method for fetching URL to currently playing SoundCloud song.
		var getSongURL = function(songID, callback) {
			// Quick method for skipping YouTube songs (they are strings, SoundCloud is
			if (isNaN(parseInt(songID))) {
				callback('https://www.youtube.com/watch?v=' + songID);
			} else {
				var consumerKey = Dubtrack.config.keys.soundcloud;
				var url = 'https://api.soundcloud.com/tracks/' + songID + '?consumer_key=' + consumerKey;

				// Setup request to retrieve detailed track information about this song so we can extract the URL.
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.withCredentials = false;
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						var data = JSON.parse(xhr.responseText);
						callback(data.permalink_url);
					}
				};
				xhr.send();
			}
		}

	});

})(unsafeWindow.$, unsafeWindow.console);
