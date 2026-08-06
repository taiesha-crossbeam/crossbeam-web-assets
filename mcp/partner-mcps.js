/* Partner MCPs page behaviour. Deferred, so it runs after the embeds parse. */

(function(){
  /* Move each continuation chunk's children into the grid it belongs to, then drop the
     empty wrapper. querySelectorAll returns document order, so chunks are appended in the
     order they were pasted. This block runs before the tab and marquee scripts, which
     measure panel heights and need the real DOM in place first. */
  var TARGET = {wall: '.tm-wall', panels: '#mmPanels'};
  var wraps = document.querySelectorAll('.pm-adopt');
  for (var i = 0; i < wraps.length; i++) {
    var w = wraps[i];
    var into = document.querySelector(TARGET[w.getAttribute('data-into')]);
    if (!into) continue;
    while (w.firstElementChild) into.appendChild(w.firstElementChild);
    if (w.parentNode) w.parentNode.removeChild(w);
  }
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

