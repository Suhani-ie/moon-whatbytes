
(function(){
  var header = document.getElementById('mnavHeader');
  var burger = document.getElementById('mnavBurger');

  // Scroll state
  window.addEventListener('scroll', function(){
    if(window.scrollY > 20){
      header.classList.add('mnav-scrolled');
    } else {
      header.classList.remove('mnav-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  burger.addEventListener('click', function(){
    var isOpen = header.classList.toggle('mnav-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close on nav link click (mobile)
  document.querySelectorAll('.mnav-links a').forEach(function(link){
    link.addEventListener('click', function(){
      header.classList.remove('mnav-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();



(function(){
  var call = document.getElementById('mhCall');
  var modal = document.getElementById('mhModal');
  var cursor = document.getElementById('mhCursor');
  var allowBtn = document.getElementById('mhAllowBtn');
  var recPill = document.getElementById('mhRecPill');
  var assistant = document.getElementById('mhAssistant');
  var msgEl = document.getElementById('mhMsg');
  var optionsWrap = document.getElementById('mhOptions');
  var options = optionsWrap.querySelectorAll('.mh-option');

  var message = "Hey — what do you need?";

  function resetStage(){
    modal.classList.remove('mh-show');
    cursor.classList.remove('mh-show');
    allowBtn.classList.remove('mh-clicked');
    recPill.classList.remove('mh-show');
    assistant.classList.remove('mh-show');
    msgEl.textContent = '';
    options.forEach(function(o){ o.classList.remove('mh-show'); });
  }

  function typeMessage(text, el, speed, cb){
    var i = 0;
    function step(){
      if(i <= text.length){
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (cb) { cb(); }
    }
    step();
  }

  function placeCursorOnAllow(){
    var callRect = call.getBoundingClientRect();
    var btnRect = allowBtn.getBoundingClientRect();
    cursor.style.left = (btnRect.left - callRect.left + btnRect.width/2 - 7) + 'px';
    cursor.style.top = (btnRect.top - callRect.top - 30) + 'px';
    cursor.classList.add('mh-show');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        cursor.style.left = (btnRect.left - callRect.left + btnRect.width/2 - 7) + 'px';
        cursor.style.top = (btnRect.top - callRect.top + btnRect.height/2 - 7) + 'px';
      });
    });
  }

  function runLoop(){
    resetStage();
    setTimeout(function(){ modal.classList.add('mh-show'); }, 600);
    setTimeout(function(){ placeCursorOnAllow(); }, 1500);
    setTimeout(function(){
      allowBtn.classList.add('mh-clicked');
      modal.classList.remove('mh-show');
      cursor.classList.remove('mh-show');
    }, 2500);
    setTimeout(function(){ recPill.classList.add('mh-show'); }, 2950);
    setTimeout(function(){ assistant.classList.add('mh-show'); }, 3600);
    setTimeout(function(){ typeMessage(message, msgEl, 35); }, 4200);
    setTimeout(function(){
      options.forEach(function(o, idx){
        setTimeout(function(){ o.classList.add('mh-show'); }, idx * 150);
      });
    }, 5600);
    setTimeout(runLoop, 9200);
  }

  // pause loop when off-screen to save resources
  var started = false;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !started){ started = true; runLoop(); }
    });
  }, { threshold: 0.2 });
  obs.observe(call);
})();



(function(){
  var items = document.querySelectorAll('.mfaq-item');

  items.forEach(function(item){
    var btn = item.querySelector('.mfaq-q');
    var answer = item.querySelector('.mfaq-a');

    // Height-based animation without relying on display:block/none transitions
    btn.addEventListener('click', function(){
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      if(isOpen){
        // Close: animate height to 0
        var h = answer.scrollHeight;
        answer.style.height = h + 'px';
        answer.removeAttribute('hidden');
        requestAnimationFrame(function(){
          answer.style.transition = 'height 0.3s cubic-bezier(.2,.8,.2,1)';
          answer.style.height = '0px';
        });
        answer.addEventListener('transitionend', function end(){
          answer.style.height = '';
          answer.style.transition = '';
          answer.setAttribute('hidden', '');
          answer.removeEventListener('transitionend', end);
        });
        btn.setAttribute('aria-expanded', 'false');
      } else {
        // Open
        answer.removeAttribute('hidden');
        answer.style.height = '0px';
        answer.style.overflow = 'hidden';
        var targetH = answer.scrollHeight;
        requestAnimationFrame(function(){
          answer.style.transition = 'height 0.35s cubic-bezier(.2,.8,.2,1)';
          answer.style.height = targetH + 'px';
        });
        answer.addEventListener('transitionend', function end(){
          answer.style.height = '';
          answer.style.transition = '';
          answer.style.overflow = '';
          answer.removeEventListener('transitionend', end);
        });
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();



(function(){
  var form = document.getElementById('mffForm');
  var note = document.getElementById('mffNote');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      note.textContent = "Static preview — connect this to your email list provider before launch.";
    });
  }
})();



(function(){
  var toggle = document.getElementById('mprToggle');
  if(!toggle) return;
  var opts = toggle.querySelectorAll('.mpr-toggle-opt');
  var annualEls = document.querySelectorAll('.mpr-price-annual');
  var monthlyEls = document.querySelectorAll('.mpr-price-monthly');

  opts.forEach(function(opt){
    opt.addEventListener('click', function(){
      opts.forEach(function(o){ o.classList.remove('mpr-toggle-active'); });
      opt.classList.add('mpr-toggle-active');
      var mode = opt.getAttribute('data-mode');
      if(mode === 'annual'){
        annualEls.forEach(function(el){ el.classList.remove('mpr-hide'); });
        monthlyEls.forEach(function(el){ el.classList.add('mpr-hide'); });
      } else {
        annualEls.forEach(function(el){ el.classList.add('mpr-hide'); });
        monthlyEls.forEach(function(el){ el.classList.remove('mpr-hide'); });
      }
    });
  });

  var form = document.getElementById('mcoForm');
  var note = document.getElementById('mcoNote');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      note.textContent = "This is a static preview — wire this up to your form handler before launch.";
    });
  }
})();
