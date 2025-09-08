// Global site header behavior: mobile toggle + active link + page class
(function(){
  try {
    document.body.classList.add('site-has-global-header');

    var header = document.querySelector('.site-header');
    if (!header) return;

    var toggle = header.querySelector('.nav-toggle');
    var menu = header.querySelector('.nav-menu');
    if (toggle && menu){
      toggle.addEventListener('click', function(){ header.classList.toggle('open'); });
      // Close menu on link click (mobile UX)
      menu.addEventListener('click', function(e){ if (e.target.tagName === 'A') header.classList.remove('open'); });
    }

    // Active link highlight based on current file
    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var links = header.querySelectorAll('.nav-menu a');
    links.forEach(function(a){ a.classList.remove('active'); });
    links.forEach(function(a){
      var href = (a.getAttribute('href')||'').split('#')[0].toLowerCase();
      if (href === current) a.classList.add('active');
    });
  } catch (e) { /* no-op */ }
})();

// Inject a floating chat iframe (bottom-right) that loads chat.html
(function(){
  try {
    // Avoid injecting when inside the chat page itself to prevent recursion
    var current = (location.pathname.split('/').pop() || '').toLowerCase();
    if (current === 'chat.html') return;
    if (window.__globalChatDockInjected) return; window.__globalChatDockInjected = true;

    function inject(){
      var btn = document.createElement('button');
      btn.className = 'chat-toggle'; btn.type = 'button'; btn.setAttribute('aria-label','Open Chat');
      btn.textContent = 'Chat';
      var dock = document.createElement('div');
      dock.className = 'chat-dock';
      var iframe = document.createElement('iframe');
      iframe.src = 'chat.html'; iframe.title = 'AI Chat';
      dock.appendChild(iframe);
      document.body.appendChild(btn);
      document.body.appendChild(dock);
      btn.addEventListener('click', function(){ dock.classList.toggle('open'); });
    }

    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
  } catch (e) { /* no-op */ }
})();
