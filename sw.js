/* eslint-disable no-unused-vars,no-undef */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');


if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({ prefix: 'siInvest' })
//Change this value every time before you build
const LATEST_VERSION = 'v0.8.4'
self.addEventListener('activate', (event) => {
    console.log(`%c ${LATEST_VERSION} `, 'background: #ddd; color: #0000ff')
    if (caches) {
        caches.keys().then((arr) => {
            arr.forEach((key) => {
                if (key.indexOf('siInvest-precache') < -1) {
                    caches.delete(key).then(() => console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000'))
                } else {
                    caches.open(key).then((cache) => {
                        cache.match('version').then((res) => {
                            if (!res) {
                                cache.put('version', new Response(LATEST_VERSION, { status: 200, statusText: LATEST_VERSION }))
                            } else if (res.statusText !== LATEST_VERSION) {
                                caches.delete(key).then(() => console.log(`%c Cleared Cache ${LATEST_VERSION}`, 'background: #333; color: #ff0000'))
                            } else console.log(`%c Great you have the latest version ${LATEST_VERSION}`, 'background: #333; color: #00ff00')
                        })
                    })
                }
            })
        })
    }
})

workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
    /\.(?:js|css|html|json)$/,
    new workbox.strategies.NetworkFirst({
        chacheName: 'app'
    })
);
workbox.routing.registerRoute(
    /\.(?:png|jpg|ico|svg)$/,
    new workbox.strategies.StaleWhileRevalidate({
        chacheName: 'images'
    })
);
