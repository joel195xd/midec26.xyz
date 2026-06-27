var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e){let t=document.createElement(`nav`);t.className=`sticky top-0 z-50 bg-cloud-white/80 frosted`,t.innerHTML=`
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
      <a href="/" class="font-control-compressed text-heading font-black tracking-tight text-midnight-ink no-underline">
        MIDEC26
      </a>
      <div class="hidden md:flex items-center gap-8">
        ${r.map(t=>`
          <a href="${t.path===`/`?`/index.html`:t.path+`.html`}"
             class="nav-link ${t.id===e?`active`:``}">
            ${t.label}
          </a>
        `).join(``)}
      </div>
      <a href="/contacto.html" class="btn-outline text-sm hidden md:inline-block">Escríbeme</a>
      <button id="mobile-menu-btn" class="md:hidden flex flex-col gap-1 p-2 bg-transparent border-none cursor-pointer">
        <span class="block w-6 h-[2px] bg-charcoal-text"></span>
        <span class="block w-6 h-[2px] bg-charcoal-text"></span>
        <span class="block w-6 h-[2px] bg-charcoal-text"></span>
      </button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden bg-cloud-white px-6 pb-6">
      ${r.map(t=>`
        <a href="${t.path===`/`?`/index.html`:t.path+`.html`}"
           class="block py-3 nav-link ${t.id===e?`active`:``}">
          ${t.label}
        </a>
      `).join(``)}
    </div>
  `,document.body.prepend(t),document.getElementById(`mobile-menu-btn`)?.addEventListener(`click`,()=>{document.getElementById(`mobile-menu`)?.classList.toggle(`hidden`)})}var r,i=e((()=>{r=[{id:`inicio`,label:`Inicio`,path:`/`},{id:`bio`,label:`Bio`,path:`/bio`},{id:`musica`,label:`Música`,path:`/musica`},{id:`galeria`,label:`Galería`,path:`/galeria`},{id:`tour`,label:`Tour`,path:`/tour`},{id:`contacto`,label:`Contacto`,path:`/contacto`}]}));function a(){let e=document.createElement(`footer`);e.className=`bg-cloud-white border-t border-black/10`,e.innerHTML=`
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 class="font-control-compressed text-heading font-black text-midnight-ink mb-4">MIDEC26</h3>
          <p class="text-body text-charcoal-text leading-body max-w-xs">
            Música, arte y expresión. Esto es solo el comienzo.
          </p>
        </div>
        <div>
          <h4 class="font-control font-medium text-body text-charcoal-text mb-4">Navegar</h4>
          <div class="flex flex-col gap-2">
            <a href="/index.html" class="nav-link">Inicio</a>
            <a href="/bio.html" class="nav-link">Bio</a>
            <a href="/musica.html" class="nav-link">Música</a>
            <a href="/galeria.html" class="nav-link">Galería</a>
            <a href="/tour.html" class="nav-link">Tour</a>
            <a href="/contacto.html" class="nav-link">Contacto</a>
          </div>
        </div>
        <div>
          <h4 class="font-control font-medium text-body text-charcoal-text mb-4">Sígueme</h4>
          <div class="flex flex-col gap-2">
            <a href="#" class="nav-link">Spotify</a>
            <a href="#" class="nav-link">YouTube</a>
            <a href="#" class="nav-link">Instagram</a>
            <a href="#" class="nav-link">TikTok</a>
          </div>
        </div>
      </div>
      <div class="border-t border-black/10 mt-12 pt-8 text-center">
        <p class="text-caption text-charcoal-text/60">&copy; ${new Date().getFullYear()} Midec26. Todos los derechos reservados.</p>
      </div>
    </div>
  `,document.body.appendChild(e)}var o=e((()=>{}));export{t as a,n as i,a as n,i as r,o as t};