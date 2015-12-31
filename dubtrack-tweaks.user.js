/**
 * dubtrack-tweaks (originally "dubtrack-upvote")
 *
 * For more information and installation instructions, please see:
 * https://github.com/patricknelson/dubtrack-tweaks/
 */

// ==UserScript==
// @name         dubtrack-tweaks
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  Automatically "updub" (upvote) tracks after a few seconds.
// @author       Patrick Nelson (pat@catchyour.com) a.k.a. chunk_split()
// @site         https://github.com/patricknelson/dubtrack-tweaks/
// @match        *://dubtrack.fm/*
// @match        *://www.dubtrack.fm/*
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
		var currentSongID = null, currentSongLink = null;
		setInterval(function() {
			if (currentSongID != getCurrentSongID()) {
				// Reset song link.
				setSongLink('');
				console.log("Song changed, fetching URL...");
				currentSongID = getCurrentSongID();
				getSongURL(currentSongID, function(url) {
					setSongLink(url);
				});
			} else if (currentSongLink != getSongLink().find("a").attr("href")) {
				// It's possible that the HTML on the page went out of sync with the plug-in. This can easily happen
				// if the site decides to clobber/overwrite our modifications. So... let's reassert our dominance! Meow.
				console.log("Fixing current song link.");
				setSongLink(currentSongLink);
			}
		}, 1000);

		var setSongLink = function(url) {
			currentSongLink = url;
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

})(unsafeWindow.$, unsafeWindow.console, unsafeWindow.Dubtrack);
