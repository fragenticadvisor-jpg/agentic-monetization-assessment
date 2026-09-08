// Shared site behaviour: header scroll shadow, mobile nav toggle, scroll-reveal
(function(){
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function(){
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.getElementById('siteNavToggle');
  var nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
  }
})();

/* Vercel Web Analytics */
(function () {
  var s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);
})();

/* Tally embed loader (email capture forms) — only runs on pages with a Tally iframe */
(function () {
  if (!document.querySelector('iframe[data-tally-src]')) return;
  var d = document, w = 'https://tally.so/widgets/embed.js';
  var v = function () {
    if (typeof Tally !== 'undefined') { Tally.loadEmbeds(); }
    else {
      d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach(function (e) {
        e.src = e.dataset.tallySrc;
      });
    }
  };
  if (typeof Tally !== 'undefined') { v(); }
  else if (d.querySelector('script[src="' + w + '"]') == null) {
    var s2 = d.createElement('script');
    s2.src = w; s2.onload = v; s2.onerror = v;
    d.body.appendChild(s2);
  } else { v(); }
})();
