# SkyNexa · Full PWA source · v1.2.1

Build Tomorrow. Bring It to Life.
Developer: Nitai Studio
Support: nitai.grp00@gmail.com

## বাংলায় শুরু করুন

1. ZIP extract করুন। index.html, manifest.webmanifest, sw.js এবং সব icon একই
   folder-এ আছে। আলাদা assets folder বা build process লাগবে না।
2. এই folder-এর ফাইলগুলো একই HTTPS website directory-তে upload করুন।
   index.html যেন সেই published directory-র root-এ থাকে।
3. Edge বা Chrome-এ website খুলে Install app বেছে নিন। Offline ready দেখানোর
   পর installed app বন্ধ করে internet ছাড়াই আবার চালিয়ে দেখুন।
4. Microsoft Store package তৈরির জন্য PWABuilder-এ আপনার HTTPS website URL
   দিন। ZIP-টি source files; এটি signed Windows installer নয়। নিজের Partner
   Center identity ব্যবহার করে package তৈরি ও Store submission করুন।

+ City চাপলে পুরো HUD এবং City Pulse খুলবে; − City চাপলে বন্ধ হবে। শুরুতে
প্যানেল বন্ধ থাকে। Mobile-এ compact Pause ও Settings এবং desktop-এ app menu
দিয়ে ওই controls পাওয়া যাবে।

## Files

index.html                 Complete game: inline HTML, CSS and vanilla JS
manifest.webmanifest       Name, launch URL, desktop display, shortcuts and icons
sw.js                      Versioned offline cache and controlled update lifecycle
logo.png                   Original high-resolution transparent SkyNexa logo
icon-192.png               192 × 192 installation icon
icon-512.png               512 × 512 installation icon
icon-maskable-512.png      Maskable installation icon with safe padding
apple-touch-icon.png       Apple home-screen icon
favicon.svg                Browser tab icon
privacy.html               Privacy and support page
offline.html               Offline recovery page
_headers                   Optional cache/MIME headers for compatible static hosts

The same logo is already embedded in the game. Standalone logo.png is included
for branding; no remote art, sounds, fonts, CDNs, npm or backend are required.
The optional _headers file can be ignored by hosts that do not support it;
serve sw.js as JavaScript and the manifest as application/manifest+json.

## Play and install

Opening index.html directly runs the complete game. Native PWA installation and
service workers require HTTPS, or localhost for development. Upload EVERY
application file together; missing precache files prevent an Offline ready state.
A browser installs from the hosted website. PWABuilder also needs its HTTPS URL.
First visit online, then wait for Offline ready before trying an offline launch.

Start with empty land and 25,000 credits. Lay roads to attract moving visitors,
cars, motorbikes and rickshaws. Add homes, jobs, power, water, services, farms and
animal habitats. No preset settlement is needed. Sound is opt-in and synthesized
locally. Save/load, backups, city statistics, graphics quality and 4K image export
are available from Settings. Touch, mouse and keyboard controls are supported.

## Saves and updates

City progress and preferences stay in browser localStorage. Export a JSON city
backup before changing website address, browser profile or installed app; import
it at the new origin. The package contains no player city or personal save data.

Save & update saves dirty progress before activating a waiting service worker.
A failed save blocks reload. Cache cleanup leaves city saves and other apps alone.
For later releases, bump VERSION in sw.js and publish a matching complete file set.

## Validation

Game, camera, touch logic, save recovery, HUD disclosure and export actions were
checked in the prior source verification. This package also validates manifest
paths, icon sizes, offline cache behavior, ZIP integrity and root file layout.
An actual hosted browser installation and Windows/Store package validation must
be done on your final HTTPS address; no production URL or Store identity is preset.
