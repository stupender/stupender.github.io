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
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        // Close the menu after tapping a link.
        nav.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
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
