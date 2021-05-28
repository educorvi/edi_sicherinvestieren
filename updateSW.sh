# Script to update te version number in the service worker on release
sed -i "s/v[0-9]\+\.[0-9]\+\.[0-9]\+/v$1/" ./sw.js
