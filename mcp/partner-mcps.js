/* Partner MCPs page behaviour. Deferred, so it runs after the embeds parse. */

/* Hero ask box. Until the tool is deployed there is nowhere to hand the query off to,
   so submitting scrolls to the plays. TODO: replace the scroll with
   location.href = MAPPER_URL + '?q=' + encodeURIComponent(q); */
(function(){
  /* Hero ask box -> workflow router.
     Tool names come from each panel's own stack list; the job-language fallback is the
     `match` table from the mapper's mcp-data.js. A published page cannot call a model,
     and does not need to: this is a lookup, not a generation. */
  var form  = document.getElementById('mmAskForm');
  var input = document.getElementById('mmAsk');
  var out   = document.getElementById('mmAnswer');
  if(!form || !input) return;

  var ROUTES  = {"tools":{"pipeline":["6sense","zoominfo","clay","apollo"],"dealintel":["intercom","pendo","gong","amplitude"],"expansion":["stripe","netsuite","gainsight","skilljar"],"attribution":["snowflake","databricks","tableau"]},"jobs":{"pipeline":["pipeline","prospect","prospecting","outbound","new business","greenfield","green field","net new","source","sourced","target","targeting","lead","leads","icp","cold","intent"],"dealintel":["deal intelligence","intelligence","context","enrich","research","brief","call prep","prep","meeting","discovery","competitor","account plan","who knows","co-sell","cosell","co sell","deal","register","registration","route","book","log","close","joint","introduction","intro","warm path"],"expansion":["expansion","expand","retention","retain","churn","renewal","renew","upsell","cross-sell","crosssell","nrr","grr","at risk","at-risk","save","health","adoption","onboarding"],"attribution":["attribution","attribute","report","reporting","roi","influence","influenced","sourced revenue","measure","dashboard","board","qbr","impact","what it was worth"]}};
  var LABELS  = {"pipeline":"Pipeline generation","dealintel":"Deal intelligence","expansion":"Expansion & retention","attribution":"Attribution & reporting"};
  var DISPLAY = {"6sense":"6sense","zoominfo":"ZoomInfo","clay":"Clay","apollo":"Apollo","intercom":"Intercom","pendo":"Pendo","gong":"Gong","amplitude":"Amplitude","stripe":"Stripe","netsuite":"NetSuite","gainsight":"Gainsight","skilljar":"Skilljar","snowflake":"Snowflake","databricks":"Databricks","tableau":"Tableau"};

  function scan(q, table){
    var best = null;
    Object.keys(table).forEach(function(id){
      table[id].forEach(function(kw){
        /* word-start match: catches plurals and gerunds ("renewals", "churning") */
        if(q.indexOf(' ' + kw) !== -1){
          if(!best || kw.length > best.kw.length) best = {id:id, kw:kw};
        }
      });
    });
    return best;
  }

  function show(h, miss){
    if(!out) return;
    out.innerHTML = h;
    out.classList.toggle('miss', !!miss);
    out.classList.add('shown');
  }

  function go(){
    var target = document.getElementById('usecases');
    if(!target) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var raw = input.value.trim();
    if(!raw){ if(out) out.classList.remove('shown'); return; }

    /* pad so ' kw ' matching cannot hit inside a longer word */
    var q = ' ' + raw.toLowerCase().replace(/[^a-z0-9\s+-]/g, ' ').replace(/\s+/g, ' ') + ' ';

    /* a named tool is the strongest signal, then the job wording */
    var hit = scan(q, ROUTES.tools);
    var why = 'tool';
    if(!hit){ hit = scan(q, ROUTES.jobs); why = 'job'; }

    if(!hit){
      show('Nothing in that matched a workflow yet. Name a tool you run, such as '
         + 'Gong, Gainsight or Snowflake, or describe the job: pipeline, renewals, '
         + 'call prep, or attribution.', true);
      return;
    }

    var tab = document.getElementById('tab-' + hit.id);
    if(tab) tab.click();

    show((why === 'tool'
            ? 'You run <span class="kw">' + (DISPLAY[hit.kw] || hit.kw) + '</span>, so start with '
            : 'Matched <span class="kw">&ldquo;' + hit.kw + '&rdquo;</span>, so start with ')
         + '<b>' + (LABELS[hit.id] || hit.id) + '</b>. Showing that workflow below.');
    go();
  });

  input.addEventListener('input', function(){
    if(out && !input.value.trim()) out.classList.remove('shown');
  });
})();

(function(){var L=[["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/logo-white.svg","Crossbeam",24.8],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/hubspot.svg","HubSpot",30.1],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/salesforce.svg","Salesforce",34.0],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/zoom.svg","Zoom",27.0],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/slack.png","Slack",28.7],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/docusign.svg","DocuSign",25.4],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/marketo-marketo-forms.svg","Marketo",23.3],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/stripe.svg","Stripe",34.0],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/salesloft.svg","Salesloft",26.7],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/snowflake.svg","Snowflake",26.8],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/tableau.svg","Tableau",25.5],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/looker.svg","Looker",29.2],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/zapier.svg","Zapier",29.5],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/netsuite.svg","NetSuite",10.4],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/mailchimp.png","Mailchimp",29.8],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/microsoft.svg","Power BI",26.1],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/dbt.svg","dbt",34.0],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/intercom.svg","Intercom",27.1],["https://cdn.jsdelivr.net/gh/taiesha-crossbeam/crossbeam-web-assets@main/img/mcp-logos/gong.svg","Gong",33.5]],t=document.getElementById('mqTrack');if(!t)return;function row(){L.forEach(function(o){var s=document.createElement('span');s.className='mm-marquee-item';var i=document.createElement('img');i.src=o[0];i.alt=o[1];i.decoding='async';i.style.height=o[2]+'px';s.appendChild(i);t.appendChild(s);});}row();row();})();

/* Motion switcher. Pill-slide logic ported from the live Crossbeam MCP page
   (.mcp-uc-tabs), with keyboard support and aria wiring kept. */
(function(){
  var bar = document.getElementById('mmTabs');
  var pill = document.getElementById('mmPill');
  var wrap = document.getElementById('mmPanels');
  if(!bar || !pill || !wrap) return;
  var tabs = [].slice.call(bar.querySelectorAll('.mm-tab'));
  var panels = tabs.map(function(t){ return document.getElementById(t.getAttribute('aria-controls')); });
  function move(btn){
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)';
  }
  function select(i, focus){
    tabs.forEach(function(t, n){
      var on = n === i;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[n].classList.toggle('is-active', on);
      panels[n].setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    move(tabs[i]);
    /* On a narrow bar the tapped tab can sit half off-screen; bring it fully in. */
    if(tabs[i].scrollIntoView) tabs[i].scrollIntoView({block:'nearest', inline:'nearest'});
    if(focus) tabs[i].focus();
    edges();
  }
  /* Fade whichever edge still has hidden tabs beyond it. */
  function edges(){
    var max = bar.scrollWidth - bar.clientWidth;
    bar.classList.toggle('can-l', bar.scrollLeft > 2);
    bar.classList.toggle('can-r', max > 2 && bar.scrollLeft < max - 2);
  }
  bar.addEventListener('scroll', edges, {passive:true});
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ select(i); });
  });
  bar.addEventListener('keydown', function(e){
    var cur = 0;
    tabs.forEach(function(t, n){ if(t.getAttribute('aria-selected') === 'true') cur = n; });
    var next = null;
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (cur + 1) % tabs.length;
    else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (cur - 1 + tabs.length) % tabs.length;
    else if(e.key === 'Home') next = 0;
    else if(e.key === 'End') next = tabs.length - 1;
    if(next !== null){ e.preventDefault(); select(next, true); }
  });
  /* Reserve the tallest panel's height so switching never makes the page jump.
     Inactive panels are position:absolute with inset:0, so they are stretched to the
     wrapper and cannot be measured directly. Releasing `bottom` for the measurement
     gives their true content height WITHOUT moving anything into normal flow, which
     is what made an earlier toggle-based version compound across overlapping runs. */
  function reserve(){
    wrap.style.minHeight = '';
    var tallest = 0;
    panels.forEach(function(p){
      var active = p.classList.contains('is-active');
      if(active){
        tallest = Math.max(tallest, p.offsetHeight);
      } else {
        var prev = p.style.bottom;
        p.style.bottom = 'auto';
        tallest = Math.max(tallest, p.offsetHeight);
        p.style.bottom = prev;
      }
    });
    if(tallest) wrap.style.minHeight = tallest + 'px';
  }
  /* Place the pill without animating on first paint. */
  function init(){
    var a = bar.querySelector('.mm-tab[aria-selected="true"]') || tabs[0];
    pill.style.transition = 'none';
    move(a);
    requestAnimationFrame(function(){ pill.style.transition = ''; });
    reserve();
    edges();
  }
  var rt;
  function onResize(){ clearTimeout(rt); rt = setTimeout(init, 120); }
  if(document.readyState !== 'loading') init();
  else window.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', init);
  window.addEventListener('resize', onResize);
  /* Re-measure once webfonts land, since they change wrapped line counts. */
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(init);
})();


/* Motion switcher. Pill-slide logic ported from the live Crossbeam MCP page
   (.mcp-uc-tabs), with keyboard support and aria wiring kept. */
(function(){
  var bar = document.getElementById('mmTabs');
  var pill = document.getElementById('mmPill');
  var wrap = document.getElementById('mmPanels');
  if(!bar || !pill || !wrap) return;
  var tabs = [].slice.call(bar.querySelectorAll('.mm-tab'));
  var panels = tabs.map(function(t){ return document.getElementById(t.getAttribute('aria-controls')); });
  function move(btn){
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)';
  }
  function select(i, focus){
    tabs.forEach(function(t, n){
      var on = n === i;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[n].classList.toggle('is-active', on);
      panels[n].setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    move(tabs[i]);
    /* On a narrow bar the tapped tab can sit half off-screen; bring it fully in. */
    if(tabs[i].scrollIntoView) tabs[i].scrollIntoView({block:'nearest', inline:'nearest'});
    if(focus) tabs[i].focus();
    edges();
  }
  /* Fade whichever edge still has hidden tabs beyond it. */
  function edges(){
    var max = bar.scrollWidth - bar.clientWidth;
    bar.classList.toggle('can-l', bar.scrollLeft > 2);
    bar.classList.toggle('can-r', max > 2 && bar.scrollLeft < max - 2);
  }
  bar.addEventListener('scroll', edges, {passive:true});
  tabs.forEach(function(t, i){
    t.addEventListener('click', function(){ select(i); });
  });
  bar.addEventListener('keydown', function(e){
    var cur = 0;
    tabs.forEach(function(t, n){ if(t.getAttribute('aria-selected') === 'true') cur = n; });
    var next = null;
    if(e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (cur + 1) % tabs.length;
    else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (cur - 1 + tabs.length) % tabs.length;
    else if(e.key === 'Home') next = 0;
    else if(e.key === 'End') next = tabs.length - 1;
    if(next !== null){ e.preventDefault(); select(next, true); }
  });
  /* Reserve the tallest panel's height so switching never makes the page jump.
     Inactive panels are position:absolute with inset:0, so they are stretched to the
     wrapper and cannot be measured directly. Releasing `bottom` for the measurement
     gives their true content height WITHOUT moving anything into normal flow, which
     is what made an earlier toggle-based version compound across overlapping runs. */
  function reserve(){
    wrap.style.minHeight = '';
    var tallest = 0;
    panels.forEach(function(p){
      var active = p.classList.contains('is-active');
      if(active){
        tallest = Math.max(tallest, p.offsetHeight);
      } else {
        var prev = p.style.bottom;
        p.style.bottom = 'auto';
        tallest = Math.max(tallest, p.offsetHeight);
        p.style.bottom = prev;
      }
    });
    if(tallest) wrap.style.minHeight = tallest + 'px';
  }
  /* Place the pill without animating on first paint. */
  function init(){
    var a = bar.querySelector('.mm-tab[aria-selected="true"]') || tabs[0];
    pill.style.transition = 'none';
    move(a);
    requestAnimationFrame(function(){ pill.style.transition = ''; });
    reserve();
    edges();
  }
  var rt;
  function onResize(){ clearTimeout(rt); rt = setTimeout(init, 120); }
  if(document.readyState !== 'loading') init();
  else window.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', init);
  window.addEventListener('resize', onResize);
  /* Re-measure once webfonts land, since they change wrapped line counts. */
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(init);
})();

