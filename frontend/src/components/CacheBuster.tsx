'use client';

import { useEffect } from 'react';

export default function CacheBuster() {
  useEffect(() => {
    // Aggressive cache busting for Chrome and all browsers
    if (typeof window !== 'undefined') {
      const currentVersion = `v7.0.0-${Date.now()}`; // Timestamp-based version for maximum cache busting
      
      // Immediate cache clearing for Chrome (runs first)
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });
      }
      
      const cacheVersion = sessionStorage.getItem('app-cache-version');
      const lastReload = sessionStorage.getItem('last-reload-time');
      const now = Date.now();
      
      // Force reload if version changed OR if it's been more than 5 minutes since last reload
      if (cacheVersion && cacheVersion !== currentVersion) {
        // Clear all storage
        sessionStorage.clear();
        localStorage.clear();
        
        // Force hard reload with cache bypass
        window.location.href = window.location.href.split('?')[0] + '?v=' + now;
        return;
      } else if (lastReload && (now - parseInt(lastReload)) > 300000) {
        // Reload every 5 minutes to ensure fresh content
        sessionStorage.setItem('last-reload-time', now.toString());
        window.location.href = window.location.href.split('?')[0] + '?v=' + now;
        return;
      } else {
        sessionStorage.setItem('app-cache-version', currentVersion);
        sessionStorage.setItem('last-reload-time', now.toString());
      }
      
      // Additional Chrome-specific cache clearing
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        // Clear Chrome's application cache
        if ('applicationCache' in window) {
          const appCache = (window as any).applicationCache;
          if (appCache && appCache.status !== appCache.UNCACHED) {
            appCache.update();
          }
        }
      }
    }
  }, []);

  return null;
}

