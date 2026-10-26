// Site-wide analytics. Fill in IDs below; any left blank is skipped.
(function () {
    var GA4_ID = 'G-MZVZM6DFS4';  // e.g. 'G-XXXXXXXXXX'
    var CLARITY_ID = '';      // e.g. 'abcd1234ef'
    var AHREFS_KEY = '';      // Ahrefs Web Analytics data-key
    var ADS_CONVERSION = '';  // optional, e.g. 'AW-123456789/AbC-D_efG-h12_34-567'

    function load(src, attrs) {
        var s = document.createElement('script');
        s.async = true;
        s.src = src;
        for (var k in attrs || {}) s.setAttribute(k, attrs[k]);
        document.head.appendChild(s);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };

    if (GA4_ID) {
        load('https://www.googletagmanager.com/gtag/js?id=' + GA4_ID);
        gtag('js', new Date());
        gtag('config', GA4_ID);
        if (ADS_CONVERSION) gtag('config', ADS_CONVERSION.split('/')[0]);
    }

    if (CLARITY_ID) {
        window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
        load('https://www.clarity.ms/tag/' + CLARITY_ID);
    }

    if (AHREFS_KEY) load('https://analytics.ahrefs.com/analytics.js', { 'data-key': AHREFS_KEY });

    // Capture gclid and UTM params from the landing URL into hidden form fields
    var params = new URLSearchParams(location.search);
    ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term'].forEach(function (key) {
        var val = params.get(key);
        if (val) {
            // Store in sessionStorage so it persists across page navigations
            sessionStorage.setItem(key, val);
        }
    });
    // On any page with a form, populate the hidden fields from sessionStorage
    document.addEventListener('DOMContentLoaded', function () {
        ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term'].forEach(function (key) {
            var el = document.getElementById(key);
            var val = sessionStorage.getItem(key);
            if (el && val) el.value = val;
        });
    });

    // Lead conversion: the consultation form redirects to /thanks/
    if (location.pathname.replace(/\/$/, '') === '/thanks') {
        var role = new URLSearchParams(location.search).get('role') || '';
        gtag('event', 'generate_lead', { form_name: 'consultation', role: role });
        if (ADS_CONVERSION) gtag('event', 'conversion', { send_to: ADS_CONVERSION });
    }
})();
