/* Stu Pender — Portfolio
   Small progressive-enhancement layer. The site is fully readable
   without JS; this adds a mobile menu, a gentle scroll-reveal, and
   the footer year. */

(function () {
    'use strict';

    // Signals to CSS that JS is on, so reveal animations can apply.
    document.documentElement.classList.add('js');

    /* ---- Mobile nav toggle ---- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.site-nav');
    if (toggle && nav) {
        var setOpen = function (open) {
            nav.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        };
        toggle.addEventListener('click', function () {
            setOpen(!nav.classList.contains('open'));
        });
        // Close after tapping a link.
        nav.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') { setOpen(false); }
        });
        // Close on Escape.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); }
        });
        // Close when tapping outside the header.
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('open') && !e.target.closest('.site-header')) { setOpen(false); }
        });
    }

    /* ---- Scroll-reveal: fade sections up as they enter view ---- */
    var targets = document.querySelectorAll('.hero, .project, .subsection-head, .card, .skill-col, .about-panel, .contact-list, .section-head');
    targets.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        targets.forEach(function (el) { io.observe(el); });
    } else {
        targets.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- Footer year ---- */
    var year = document.getElementById('year');
    if (year) { year.textContent = new Date().getFullYear(); }
})();

/* =================================================================
   Ambient sound — a lightweight port of my "Music for Airports"
   generative piece: many sample loops of different lengths that
   rarely realign. Samples load only when a visitor turns sound on.
   ================================================================= */
(function () {
    var toggles = document.querySelectorAll('.sound-toggle');
    if (!toggles.length) { return; }
    var chip = document.querySelector('.now-playing');

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
    var ctx = null, master = null, intervals = [], playing = false;

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
            .then(function (ab) { return ctx.decodeAudioData(ab); })
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
        if (!ctx) { return; }
        getSample(inst, note).then(function (o) {
            if (!ctx || ctx.state === 'closed') { return; }
            var src = ctx.createBufferSource();
            src.buffer = o.buffer;
            src.playbackRate.value = Math.pow(2, o.distance / 12);
            src.connect(master);
            src.start(ctx.currentTime + delay);
        }).catch(function () {});
    }
    function startLoop(inst, note, lenSec, delay) {
        playSample(inst, note, delay);
        intervals.push(setInterval(function () { playSample(inst, note, delay); }, lenSec * 1000));
    }
    function reflect() {
        toggles.forEach(function (t) {
            t.setAttribute('aria-pressed', String(playing));
            t.setAttribute('aria-label', playing ? 'Pause ambient sound' : 'Play ambient sound');
        });
        if (chip) {
            if (playing) { chip.removeAttribute('hidden'); }
            else { chip.setAttribute('hidden', ''); }
        }
    }
    function start() {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { return; }
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.45;
        master.connect(ctx.destination);
        LOOPS.forEach(function (l) { startLoop(l[0], l[1], l[2], l[3]); });
        playing = true;
        reflect();
    }
    function stop() {
        intervals.forEach(clearInterval);
        intervals = [];
        if (ctx) { ctx.close(); ctx = null; master = null; }
        playing = false;
        reflect();
    }
    toggles.forEach(function (t) {
        t.addEventListener('click', function () { playing ? stop() : start(); });
    });
})();
