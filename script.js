/* Stu Pender — Portfolio
   Progressive enhancement: a small client-side router (so the ambient audio
   survives page-to-page navigation), the ambient "Music for Airports" engine
   (lives in memory, never restarts), a gentle scroll-reveal, mobile menu, and
   the footer year. Everything works as plain links if JS is off. */

(function () {
    'use strict';
    document.documentElement.classList.add('js');

    /* =============================================================
       AMBIENT AUDIO — a lightweight port of my "Music for Airports"
       generative piece. The engine is created once and kept alive in
       this closure, so navigating between pages never restarts it.
       The toggle mutes/unmutes (smooth fade) while it keeps evolving.
       ============================================================= */
    var VOL = 0.45;
    var LIBRARY = {
        'Guitar Sustain': [
            { note: 'A',  octave: 4, file: 'audio/mfa/guitar-sustain/A4.mp3' },
            { note: 'C#', octave: 5, file: 'audio/mfa/guitar-sustain/C#5.mp3' },
            { note: 'E',  octave: 5, file: 'audio/mfa/guitar-sustain/E5.mp3' },
            { note: 'G#', octave: 5, file: 'audio/mfa/guitar-sustain/G#5.mp3' },
            { note: 'A',  octave: 5, file: 'audio/mfa/guitar-sustain/A5.mp3' }
        ],
        'Eno & Fripp': [
            { note: 'F#', octave: 2, file: 'audio/mfa/eno-fripp/F#2.mp3' },
            { note: 'C#', octave: 3, file: 'audio/mfa/eno-fripp/C#3.mp3' }
        ]
    };
    var LOOPS = [
        ['Guitar Sustain', 'F4',  11.1, 0.0],
        ['Guitar Sustain', 'Ab4', 10.0, 3.1],
        ['Guitar Sustain', 'C5',  12.1, 5.6],
        ['Guitar Sustain', 'Db5', 15.5, 9.6],
        ['Guitar Sustain', 'Eb5', 17.3, 10.2],
        ['Guitar Sustain', 'F5',  18.6, 11.1],
        ['Guitar Sustain', 'Ab5', 23.1, 14.1],
        ['Eno & Fripp',    'C#3', 30.0, 15.1],
        ['Eno & Fripp',    'F#2', 30.0, 25.1]
    ];
    var OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var bufferCache = {};
    var actx = null, master = null, started = false, muted = false;

    function noteValue(n, o) { return o * 12 + OCTAVE.indexOf(n); }
    function distance(n1, o1, n2, o2) { return noteValue(n1, o1) - noteValue(n2, o2); }
    function flatToSharp(n) { return { Bb: 'A#', Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#' }[n] || n; }
    function nearest(bank, n, o) {
        return bank.slice().sort(function (a, b) {
            return Math.abs(distance(n, o, a.note, a.octave)) - Math.abs(distance(n, o, b.note, b.octave));
        })[0];
    }
    function fetchSample(path) {
        if (bufferCache[path]) { return Promise.resolve(bufferCache[path]); }
        var url = encodeURI(path).replace(/#/g, '%23');
        return fetch(url)
            .then(function (r) { return r.arrayBuffer(); })
            .then(function (ab) { return actx.decodeAudioData(ab); })
            .then(function (buf) { bufferCache[path] = buf; return buf; });
    }
    function getSample(inst, noteOct) {
        var m = /^(\w[b#]?)(\d)$/.exec(noteOct);
        var note = flatToSharp(m[1]), oct = parseInt(m[2], 10);
        var s = nearest(LIBRARY[inst], note, oct);
        return fetchSample(s.file).then(function (buf) {
            return { buffer: buf, distance: distance(note, oct, s.note, s.octave) };
        });
    }
    function playSample(inst, note, delay) {
        if (!actx) { return; }
        getSample(inst, note).then(function (o) {
            if (!actx || actx.state === 'closed') { return; }
            var src = actx.createBufferSource();
            src.buffer = o.buffer;
            src.playbackRate.value = Math.pow(2, o.distance / 12);
            src.connect(master);
            src.start(actx.currentTime + delay);
        }).catch(function () {});
    }
    function startLoop(inst, note, lenSec, delay) {
        playSample(inst, note, delay);
        setInterval(function () { playSample(inst, note, delay); }, lenSec * 1000);
    }
    function ensureStarted() {
        if (started) { return; }
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { return; }
        actx = new AC();
        master = actx.createGain();
        master.gain.value = 0;
        master.connect(actx.destination);
        LOOPS.forEach(function (l) { startLoop(l[0], l[1], l[2], l[3]); });
        started = true;
    }
    function ramp(to) {
        if (!master || !actx) { return; }
        var t = actx.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.setValueAtTime(master.gain.value, t);
        master.gain.linearRampToValueAtTime(to, t + 0.4);
    }
    function toggleSound() {
        if (!started) {
            ensureStarted();
            muted = false;
        } else {
            muted = !muted;
        }
        if (actx && actx.state === 'suspended') { actx.resume(); }
        ramp(muted ? 0 : VOL);
        reflectSound();
    }
    function reflectSound() {
        var on = started && !muted;
        document.querySelectorAll('.sound-toggle').forEach(function (t) {
            t.setAttribute('aria-pressed', String(on));
            t.setAttribute('aria-label', on ? 'Mute ambient sound' : 'Play ambient sound');
        });
    }

    /* =============================================================
       PER-PAGE INIT — runs on first load and after each page swap.
       (The audio engine above is NOT re-created here.)
       ============================================================= */
    var revealObserver = null;

    function setupReveal() {
        if (revealObserver) { revealObserver.disconnect(); }
        var targets = document.querySelectorAll(
            '.hero, .project, .subsection-head, .card, .skill-col, .about-panel, ' +
            '.contact-list, .section-head, .cs-head, .cs-figure, .cs-section, .work-more'
        );
        targets.forEach(function (el) { el.classList.add('reveal'); });
        if ('IntersectionObserver' in window) {
            revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
            targets.forEach(function (el) {
                if (!el.classList.contains('is-visible')) { revealObserver.observe(el); }
            });
        } else {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
        }
    }

    function initPage() {
        var year = document.getElementById('year');
        if (year) { year.textContent = new Date().getFullYear(); }

        var toggle = document.querySelector('.nav-toggle');
        var nav = document.querySelector('.site-nav');
        if (toggle && nav && !toggle.dataset.wired) {
            toggle.dataset.wired = '1';
            toggle.addEventListener('click', function () {
                var open = nav.classList.toggle('open');
                toggle.setAttribute('aria-expanded', String(open));
            });
        }

        document.querySelectorAll('.sound-toggle').forEach(function (t) {
            if (t.dataset.wired) { return; }
            t.dataset.wired = '1';
            t.addEventListener('click', toggleSound);
        });
        reflectSound();

        setupReveal();
    }

    /* =============================================================
       CLIENT-SIDE ROUTER — swaps <header> + <main> for internal page
       links without a full reload, so the audio keeps playing. Falls
       back to normal navigation on any error or unsupported case.
       ============================================================= */
    function norm(p) { return p.replace(/index\.html$/, '').replace(/(.)\/$/, '$1'); }

    function swapTo(href, doPush) {
        fetch(href).then(function (r) { return r.text(); }).then(function (html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var newMain = doc.querySelector('main');
            var newHeader = doc.querySelector('.site-header');
            if (!newMain) { location.href = href; return; }
            var curHeader = document.querySelector('.site-header');
            if (newHeader && curHeader) { curHeader.replaceWith(newHeader); }
            document.querySelector('main').replaceWith(newMain);
            if (doc.title) { document.title = doc.title; }
            if (doPush) { history.pushState({}, '', href); }
            initPage();
            var hash = new URL(href, location.origin).hash;
            var target = hash ? document.querySelector(hash) : null;
            if (target) { target.scrollIntoView(); } else { window.scrollTo(0, 0); }
        }).catch(function () { location.href = href; });
    }

    document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) { return; }
        var a = e.target.closest('a');
        if (!a) { return; }
        if (a.target === '_blank' || a.hasAttribute('download')) { return; }
        var raw = a.getAttribute('href');
        if (!raw || raw.charAt(0) === '#') { return; }   // in-page hash: let the browser scroll
        var url;
        try { url = new URL(a.href); } catch (err) { return; }
        if (url.origin !== location.origin) { return; }  // external
        if (!(/\.html$/.test(url.pathname) || norm(url.pathname) === norm(location.pathname) || url.pathname === '/' )) { return; }
        if (!/\.html$/.test(url.pathname) && url.pathname !== '/' ) { return; } // non-page asset (e.g. PDF)

        e.preventDefault();
        if (norm(url.pathname) === norm(location.pathname)) {
            history.pushState({}, '', url.href);
            var t = url.hash ? document.querySelector(url.hash) : null;
            if (t) { t.scrollIntoView(); } else { window.scrollTo(0, 0); }
            return;
        }
        swapTo(url.href, true);
    });

    window.addEventListener('popstate', function () { swapTo(location.href, false); });

    /* ---- Boot ---- */
    initPage();
})();
