## dubtrack-tweaks

Adds extra functionality to [dubtrack.fm](https://www.dubtrack.fm), such as spacebar mute, auto-updub and linking to currently playing SoundCloud songs. Originally a [gist](https://gist.github.com/patricknelson/4b729ec234a35d4b8cc9) which has since been moved here.

### Features


 - Automatically "updub" (upvote) songs a few seconds after they start (or visiting a room).
 - Allows you to mute music by simply pressing the spacebar anywhere within the window (except in chat).
 - Added the "Permalink" to the right of song titles so that now you can FINALLY visit *currently*
   playing SoundCloud (and YouTube) songs by simply clicking a link.

### Installation Instructions

1. In chrome, download/install Tampermonkey here: **[Download Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)**
3. Click this link to open the script in Tampermonkey and click "Install": **[dubtrack-tweaks.user.js](https://rawgit.com/patricknelson/dubtrack-tweaks/master/dubtrack-tweaks.user.js )**
    1. Note: If this doesn't work, manually set this up by going into Tampermonkey options, click "Create new Script" and then copy/paste the entire contents of the file above.
4. Visit [dubtrack.fm](https://www.dubtrack.fm) and enter a room.
5. Make sure Tampermonkey is enabled (click the Tampermonkey icon and select "Enabled").

**Note:** These instructions are for Chrome users, but installation should be very similar if you're using Firefox. For Firefox, you'll need to setup and use Greasemonkey instead of Tampermonkey which can be found here: http://userscripts-mirror.org/about/installing.html
