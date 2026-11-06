/* ============================================================
   SM BRAND — Advanced Motion, Interactions & Product Logic
   Integrated with Three.js, GSAP ScrollTrigger, Lenis, Lucide Icons
   ============================================================ */
(function () {
  'use strict';

  var WA = '923102261760';
  var doc = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && matchMedia('(pointer:fine)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var SM = (window.SM = window.SM || {});
  var lenis = null;

  /* ---------- Helpers ---------- */
  SM.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  SM.waLink = function (text) {
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
  };

  SM.quote = function (name) {
    window.open(SM.waLink('Salam SM Brand, mujhe ' + name + ' ka firm quote aur delivery time chahiye.'), '_blank', 'noopener');
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  SM.$ = $;
  SM.$$ = $$;

  // Global event delegation for quote buttons
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-quote]');
    if (b) {
      e.preventDefault();
      SM.quote(b.getAttribute('data-quote'));
    }
  });

  /* ---------- Fallback for no GSAP or reduced motion ---------- */
  if (!hasGsap || reduce) {
    doc.classList.add('no-anim');
  } else {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(function () {
      if (!document.body.classList.contains('sm-ready')) doc.classList.add('no-anim');
    }, 2500);
  }

  /* ---------- Lenis Smooth Scroll Integration ---------- */
  function initLenis() {
    if (!window.Lenis || reduce) return;
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 0.95
    });

    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      })(0);
    }

    // In-page anchor links with smooth offset
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href') === '#') return;
      var target = $(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -95 });
      }
    });
  }

  /* ---------- Header / Scroll Progress / Mobile Menu ---------- */
  function initChrome() {
    var header = $('.header'), bar = $('.progress'), lastY = 0;

    function onScroll() {
      var y = window.scrollY || 0;
      var maxH = doc.scrollHeight - innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (maxH > 0 ? y / maxH : 0) + ')';

      if (header) {
        if (y > lastY && y > 160 && !document.body.classList.contains('menu-open')) {
          header.classList.add('hide');
        } else {
          header.classList.remove('hide');
        }
      }
      lastY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile Hamburger Navigation
    var burger = $('.burger'), menu = $('.mobile-menu');
    if (burger && menu) {
      var toggleMenu = function (open) {
        burger.setAttribute('aria-expanded', open);
        menu.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
        if (lenis) open ? lenis.stop() : lenis.start();
      };
      burger.addEventListener('click', function () {
        toggleMenu(burger.getAttribute('aria-expanded') !== 'true');
      });
      $$('a', menu).forEach(function (a) {
        a.addEventListener('click', function () { toggleMenu(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') toggleMenu(false);
      });
    }

    // Smooth Page Curtain Transition
    var curtain = $('.curtain');
    if (curtain) {
      window.addEventListener('pageshow', function () { curtain.classList.remove('on'); });
      document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href]');
        if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(href)) return;
        if (href.split('#')[0] === location.pathname.split('/').pop()) return;
        e.preventDefault();
        curtain.classList.add('on');
        setTimeout(function () { location.href = href; }, 280);
      });
    }

    // Dynamic Cursor Spotlight (Fine Pointers)
    var glow = $('.cursor-glow');
    if (glow && fine && !reduce) {
      var gx = 0, gy = 0, tx = 0, ty = 0;
      window.addEventListener('pointermove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        glow.classList.add('on');
      });
      (function loop() {
        gx += (tx - gx) * 0.12;
        gy += (ty - gy) * 0.12;
        glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ---------- Typography Split Text Effect ---------- */
  function splitText() {
    $$('[data-split]').forEach(function (el) {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = '1';
      el.classList.add('split');
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(' '));
                return;
              }
              var w = document.createElement('span');
              w.className = 'w';
              var i = document.createElement('span');
              i.textContent = part;
              w.appendChild(i);
              frag.appendChild(w);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1) {
            walk(n);
          }
        });
      })(el);
    });
  }

  /* ---------- Advanced GSAP & ScrollTrigger Animations ---------- */
  function initAnimations() {
    if (!hasGsap || reduce) return;

    // Split Headings Reveal
    $$('.split').forEach(function (el) {
      var words = $$('.w > span', el);
      var trigger = el.closest('.hero') ? null : { trigger: el, start: 'top 88%', once: true };
      gsap.set(words, { yPercent: 110, opacity: 0 });
      var cfg = {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.045,
        delay: el.dataset.delay ? +el.dataset.delay : 0
      };
      if (trigger) cfg.scrollTrigger = trigger;
      gsap.to(words, cfg);
    });

    // Generic Scroll Reveals
    $$('[data-reveal]').forEach(function (el) {
      var kind = el.getAttribute('data-reveal');
      var from = { opacity: 0 };
      if (kind === 'scale') from.scale = 0.94;
      else if (kind !== 'fade') from.y = 35;
      var delay = el.dataset.delay ? +el.dataset.delay : 0;
      gsap.fromTo(el, from, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.05,
        ease: 'expo.out',
        delay: delay,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });

    // Staggered Groups
    $$('[data-stagger]').forEach(function (group) {
      var kids = Array.prototype.slice.call(group.children);
      gsap.fromTo(kids, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true }
      });
    });

    // Subtle Parallax Elements
    $$('[data-parallax]').forEach(function (el) {
      var amt = parseFloat(el.getAttribute('data-parallax')) || 0.15;
      gsap.to(el, {
        yPercent: amt * -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Animated Metric Counters
    $$('[data-count]').forEach(function (el) {
      var end = parseFloat(el.dataset.count), obj = { val: 0 };
      var suffix = el.dataset.suffix || '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            val: end,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: function () {
              el.innerHTML = Math.round(obj.val).toLocaleString('en-US') + '<em>' + suffix + '</em>';
            }
          });
        }
      });
    });

    // Process Timeline Step Highlighting
    var steps = $$('.step');
    steps.forEach(function (s) {
      ScrollTrigger.create({
        trigger: s,
        start: 'top 65%',
        end: 'bottom 40%',
        onToggle: function (self) {
          s.classList.toggle('active', self.isActive);
        }
      });
    });

    // Marquee Velocity Acceleration on Scroll
    var track = $('.marquee-track');
    if (track) {
      var tw = gsap.to(track, { xPercent: -50, repeat: -1, duration: 36, ease: 'none' });
      track.style.animation = 'none';
      ScrollTrigger.create({
        onUpdate: function (self) {
          var dir = self.direction || 1;
          var v = Math.min(4.5, 1 + Math.abs(self.getVelocity()) / 320);
          gsap.to(tw, {
            timeScale: v * dir,
            duration: 0.25,
            overwrite: true,
            onComplete: function () {
              gsap.to(tw, { timeScale: dir, duration: 1.2 });
            }
          });
        }
      });
    }

    // Hero Text Staggered Entrance
    var heroItems = $$('.hero [data-in]');
    if (heroItems.length) {
      gsap.from(heroItems, { opacity: 0, y: 32, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.25 });
    }
  }

  /* ---------- Pointer Interactions (Spotlight, 3D Tilt, Magnetic) ---------- */
  function bindPointerFx(root) {
    root = root || document;

    // Spotlight coordinate tracking on tiles & cards
    $$('.tile, .pcard, .finder', root).forEach(function (t) {
      if (t.dataset.fx) return;
      t.dataset.fx = '1';
      t.addEventListener('pointermove', function (e) {
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    if (!fine || reduce) return;

    // Restrained, subtle 3D tilt
    $$('[data-tilt]', root).forEach(function (el) {
      if (el.dataset.tiltOn) return;
      el.dataset.tiltOn = '1';
      var max = parseFloat(el.dataset.tilt) || 4;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        if (hasGsap) {
          gsap.to(el, {
            rotateY: x * max,
            rotateX: -y * max,
            duration: 0.45,
            ease: 'power2.out',
            transformPerspective: 1200
          });
        }
      });
      el.addEventListener('pointerleave', function () {
        if (hasGsap) {
          gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
        }
      });
    });

    // Subtle Magnetic Buttons
    $$('[data-magnetic]', root).forEach(function (b) {
      if (b.dataset.magOn) return;
      b.dataset.magOn = '1';
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        if (hasGsap) {
          gsap.to(b, { x: x * 0.12, y: y * 0.15, duration: 0.35, ease: 'power3.out' });
        }
      });
      b.addEventListener('pointerleave', function () {
        if (hasGsap) {
          gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
        }
      });
    });
  }
  SM.bindFx = bindPointerFx;

  /* ---------- Product API & Fallback Data ---------- */
  SM.fetchProducts = function (category) {
    var base = window.SM_API_BASE || '';
    var fallback = (window.SM_FALLBACK || []).filter(function (p) {
      return !category || p.category === category;
    });
    if (!base) return Promise.resolve(fallback);

    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { ctrl && ctrl.abort(); }, 5000);

    return fetch(base + '/api/products' + (category ? '?category=' + encodeURIComponent(category) : ''), ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) {
        if (!r.ok) throw new Error('Bad response');
        return r.json();
      })
      .then(function (d) {
        return Array.isArray(d) && d.length ? d : fallback;
      })
      .catch(function (e) {
        console.warn('SM Brand: Backend unreachable, loading high-res offline catalog.', e);
        return fallback;
      })
      .then(function (res) {
        clearTimeout(timer);
        return res;
      });
  };

  SM.fetchProduct = function (key) {
    var base = window.SM_API_BASE || '';
    var local = (window.SM_FALLBACK || []).filter(function (p) {
      return p.slug === key || String(p.id) === key;
    })[0];
    if (!base) return Promise.resolve(local || null);

    return fetch(base + '/api/products/' + encodeURIComponent(key))
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .catch(function () {
        return local || null;
      });
  };

  // Upgraded Product Card Template (Inspired by Reference Image 2 Status Pill)
  SM.cardHTML = function (p) {
    var url = window.SM_PRODUCT_URL(p.slug);
    var img = window.SM_ASSET_URL(p.img);
    var isHot = /best|hot|new/i.test(p.badge || '');
    var pillClass = isHot ? 'status-pill orange' : 'status-pill active';
    var pillText = p.badge || 'In Stock';

    return '<article class="pcard" data-tag="' + SM.esc(p.tag || '') + '">' +
      '<a class="thumb" href="' + SM.esc(url) + '" aria-label="' + SM.esc(p.name) + '">' +
      '<div style="position:absolute;top:12px;left:12px;z-index:3">' +
      '<span class="' + pillClass + '"><span class="led"></span> ' + SM.esc(pillText) + '</span>' +
      '</div>' +
      '<img src="' + SM.esc(img) + '" alt="' + SM.esc(p.name) + '" loading="lazy" onerror="this.onerror=null;this.src=SM.fallbackImg(this.alt)">' +
      '</a>' +
      '<div class="pbody">' +
      '<h4><a href="' + SM.esc(url) + '">' + SM.esc(p.name) + '</a></h4>' +
      '<div class="spec">' + SM.esc(p.spec || '') + '</div>' +
      '<div class="pfoot">' +
      '<div class="price">' + SM.esc(p.price_label || p.price || '') + '</div>' +
      '<button class="btn btn-primary btn-sm" data-quote="' + SM.esc(p.name) + '" type="button">Quote <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
      '</div></div></article>';
  };

  SM.fallbackImg = function (title) {
    var t = String(title || 'SM Brand').replace(/[<>&"']/g, '').slice(0, 40);
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='640'><rect width='800' height='640' fill='#17191C'/><rect x='300' y='200' width='200' height='200' rx='28' fill='#d96b32'/><text x='400' y='325' font-family='sans-serif' font-weight='800' font-size='72' text-anchor='middle' fill='#ffffff'>SM</text><text x='400' y='500' font-family='sans-serif' font-weight='600' font-size='26' text-anchor='middle' fill='#A5A5A0'>" + t + "</text></svg>";
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  };

  SM.renderCards = function (container, list, filter) {
    var items = list.filter(function (p) {
      return !filter || filter === 'all' || p.tag === filter;
    });
    if (!items.length) {
      container.innerHTML = '<div class="state">Is category me abhi koi product nahi. WhatsApp pe direct poochein.</div>';
      return;
    }
    container.innerHTML = items.map(function (p) { return SM.cardHTML(p); }).join('');
    bindPointerFx(container);
    if (window.lucide) {
      lucide.createIcons();
    }
    var cards = $$('.pcard', container);
    if (hasGsap && !reduce) {
      gsap.fromTo(cards, { opacity: 0, y: 36, scale: 0.97 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.07,
        clearProps: 'transform,opacity'
      });
      setTimeout(function () { ScrollTrigger.refresh(); }, 120);
    }
  };

  SM.productList = function (opts) {
    var container = $(opts.container);
    if (!container) return;
    container.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
    var all = [], active = 'all';
    SM.fetchProducts(opts.category).then(function (list) {
      all = list;
      SM.renderCards(container, all, active);
    });
    $$(opts.filters + ' .fbtn').forEach(function (b) {
      b.addEventListener('click', function () {
        $$(opts.filters + ' .fbtn').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        active = b.dataset.f;
        SM.renderCards(container, all, active);
      });
    });
  };

  /* ---------- Interactive Machine Finder Wizard ---------- */
  SM.initFinder = function () {
    var btn = $('#finderBtn');
    if (!btn) return;

    function pickRecommendation() {
      var what = $('#f_product') ? $('#f_product').value : 'Carton Boxes';
      var vol = $('#f_volume') ? $('#f_volume').value : 'mid';
      var bud = $('#f_budget') ? $('#f_budget').value : 'mid';
      var rec;

      if (vol === 'low') {
        rec = bud === 'low'
          ? { n: 'Combo Kit Starter', p: 'Rs 18,500', note: 'Tensioner + Sealer + 2 Rolls. Chhote volume ke liye sab se sasta aur asaan setup.' }
          : { n: 'SM-450 Eco Semi-Auto', p: 'Rs 195,000', note: '15 straps/min, 200 se kam boxes/day ke liye ideal. Low maintenance, fast operation.' };
      } else if (vol === 'high') {
        rec = bud === 'high'
          ? { n: 'SM-950 High-Speed', p: 'Rs 1,250,000', note: '45 straps/min continuous full-auto conveyor line machine, heavy industrial grade.' }
          : { n: 'SM-801 Auto Arch', p: 'Rs 895,000', note: '35 straps/min, PP/PET compatible, high speed export line strapping.' };
      } else {
        rec = bud === 'low'
          ? { n: 'SM-450 Eco Semi-Auto', p: 'Rs 195,000', note: 'Budget me behtareen machine. Fast carton strapping with easy operation.' }
          : { n: 'SM-601 Pro Semi-Auto', p: 'Rs 285,000', note: '200–1200 cartons/day ke liye Pakistan ka #1 best-seller. 1 year warranty + free installation.' };
      }

      if (what === 'Bricks / Tiles' && vol !== 'low') {
        rec = { n: 'SM-810 Side Seal Auto', p: 'Rs 945,000', note: 'Bricks, tiles aur ceramic bundles ke liye specialized side-seal automatic machine.' };
      }
      if (what === 'Pallets / Export' && bud !== 'low' && vol === 'low') {
        rec = { n: 'ZP-19 Battery Tool', p: 'Rs 148,000', note: 'Cordless PET strapping tool pallets aur export containers ke liye. Compressor ki zaroorat nahi.' };
      }
      return rec;
    }

    function showResult() {
      var r = pickRecommendation();
      var nameEl = $('#finderResult .rec-name');
      var noteEl = $('#finderResult .rec-note');
      var waBtn = $('#finderResult .rec-wa');

      if (nameEl) nameEl.innerHTML = SM.esc(r.n) + ' • <b>' + SM.esc(r.p) + '</b>';
      if (noteEl) noteEl.textContent = r.note;
      if (waBtn) waBtn.setAttribute('data-quote', r.n);

      if (hasGsap && !reduce) {
        gsap.fromTo('#finderResult', { opacity: 0.4, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' });
      }
    }

    btn.addEventListener('click', showResult);
    $$('#f_product, #f_volume, #f_budget').forEach(function (s) {
      s.addEventListener('change', showResult);
    });
    showResult();
  };

  /* ---------- Quote & Lead Submission ---------- */
  SM.initQuoteForm = function () {
    var form = $('#quoteForm');
    if (!form) return;
    var submitting = false;

    function field(id) { return document.getElementById(id); }
    function setInvalid(id, bad) {
      var el = field(id);
      if (el) el.closest('.field').classList.toggle('invalid', bad);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return;

      var name = (field('q_name') ? field('q_name').value : '').trim();
      var wa = (field('q_wa') ? field('q_wa').value : '').trim();
      var digits = wa.replace(/\D/g, '');
      var okName = name.length >= 2;
      var okWa = digits.length >= 10 && digits.length <= 14;

      setInvalid('q_name', !okName);
      setInvalid('q_wa', !okWa);
      if (!okName || !okWa) return;

      var city = field('q_city') ? field('q_city').value : 'Karachi';
      var need = field('q_need') ? field('q_need').value : 'Strapping Machine';
      var msg = (field('q_msg') ? field('q_msg').value : '').trim();

      var text = 'Salam SM Brand, mujhe quote chahiye.\n' +
        'Name: ' + name + '\n' +
        'WhatsApp: ' + wa + '\n' +
        'City: ' + city + '\n' +
        'Requirement: ' + need +
        (msg ? '\nNote: ' + msg : '');

      window.open(SM.waLink(text), '_blank', 'noopener');

      var note = $('#quoteMsg');
      if (note) note.classList.add('show');
      var submitBtn = form.querySelector('button[type=submit]');
      if (submitBtn) submitBtn.disabled = true;
      submitting = true;

      setTimeout(function () {
        if (submitBtn) submitBtn.disabled = false;
        submitting = false;
      }, 4000);

      // Save lead to backend if API base is configured
      if (window.SM_API_BASE) {
        fetch(window.SM_API_BASE + '/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            whatsapp: wa,
            city: city,
            need: need,
            message: msg,
            source_page: location.pathname.split('/').pop() || 'contact.html'
          })
        }).catch(function (err) {
          console.warn('SM Brand: Backend lead logging deferred.', err);
        });
      }
    });

    $$('#quoteForm .input').forEach(function (i) {
      i.addEventListener('input', function () {
        i.closest('.field').classList.remove('invalid');
      });
    });
  };

  /* ---------- Lucide Icons Initializer ---------- */
  function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  SM.initIcons = initLucideIcons;

  /* ---------- System Boot ---------- */
  function boot() {
    initLenis();
    initChrome();
    splitText();
    bindPointerFx();
    initAnimations();
    SM.initFinder();
    SM.initQuoteForm();
    initLucideIcons();

    document.body.classList.add('sm-ready');
    if (hasGsap) {
      setTimeout(function () { ScrollTrigger.refresh(); }, 400);
    }
    window.addEventListener('load', function () {
      hasGsap && ScrollTrigger.refresh();
      initLucideIcons();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
