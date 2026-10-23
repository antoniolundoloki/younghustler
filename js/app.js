/* ==========================================================================
   YOUNG HUSTLER — app.js
   Lógica geral do site: preloader, navbar, hero, produtos, carrinho UI,
   pesquisa, favoritos, galeria, FAQ, newsletter, contacto, conta, animações.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------------------
     PRELOADER
  --------------------------------------------------------------------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
      document.body.classList.remove("no-scroll");
    }, 1900);
  });

  /* ---------------------------------------------------------------------
     CURSOR ANIMADO
  --------------------------------------------------------------------- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if(dot && ring && matchMedia("(hover:hover)").matches){
    let mx=0,my=0, rx=0, ry=0;
    window.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+"px"; dot.style.top=my+"px"; });
    (function loop(){ rx += (mx-rx)*0.18; ry += (my-ry)*0.18; ring.style.left=rx+"px"; ring.style.top=ry+"px"; requestAnimationFrame(loop); })();
    document.querySelectorAll("a, button, .product-card, .cat-card").forEach(el=>{
      el.addEventListener("mouseenter", ()=> ring.classList.add("grow"));
      el.addEventListener("mouseleave", ()=> ring.classList.remove("grow"));
    });
  }

  /* ---------------------------------------------------------------------
     NAVBAR — scroll state + mobile menu
  --------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const onScrollNav = () => {
    if(window.scrollY > 60) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScrollNav);
  onScrollNav();

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }));

  /* ---------------------------------------------------------------------
     SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal, .editorial-lines").forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     PARALLAX suave na secção editorial
  --------------------------------------------------------------------- */
  const parallaxImg = document.querySelector(".editorial-parallax");
  if(parallaxImg){
    document.addEventListener("scroll", () => {
      const rect = parallaxImg.parentElement.getBoundingClientRect();
      const offset = rect.top * -0.08;
      parallaxImg.style.transform = `translateY(${offset}px) scale(1.1)`;
    });
  }

  /* ---------------------------------------------------------------------
     TOASTS
  --------------------------------------------------------------------- */
  function yhToast(msg){
    const wrap = document.getElementById("toast-wrap");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span>${msg}</span>`;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => { el.classList.remove("show"); setTimeout(()=>el.remove(), 400); }, 2600);
  }
  window.yhToast = yhToast;

  /* ---------------------------------------------------------------------
     PRODUTOS — render grid, filtros, ordenação
  --------------------------------------------------------------------- */
  const grid = document.getElementById("product-grid");
  let currentFilter = "Todos";
  let currentSort = "recentes";

  function productMedia(p){
    if(p.imagens && p.imagens.length){
      return `<img src="${p.imagens[0]}" alt="${p.nome}" loading="lazy">`;
    }
    return `<div class="product-placeholder">
        <img src="images/marca/logo-yh-white.png" alt="">
        <b>${p.nome}</b><span>YOUNG HUSTLER</span>
      </div>`;
  }

  function starIcons(rating){
    const full = Math.round(rating);
    let out = "";
    for(let i=0;i<5;i++){
      out += `<svg viewBox="0 0 20 20" style="${i<full ? "" : "opacity:.25"}"><path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L10 14.9 4.4 18l1.4-6.2L1 7.5l6.4-.6z"/></svg>`;
    }
    return out;
  }

  function renderProducts(){
    let list = YH_PRODUCTS.filter(p => currentFilter === "Todos" || p.categoria === currentFilter);
    if(currentSort === "menor-preco") list = [...list].sort((a,b)=>a.preco-b.preco);
    else if(currentSort === "maior-preco") list = [...list].sort((a,b)=>b.preco-a.preco);
    else if(currentSort === "mais-vendidos") list = [...list].sort((a,b)=>b.avaliacao-a.avaliacao);
    else list = [...list].sort((a,b)=> (b.novo?1:0) - (a.novo?1:0));

    grid.innerHTML = list.map(p => `
      <div class="product-card reveal in-view" data-id="${p.id}">
        <div class="product-media">
          ${p.novo ? '<span class="product-badge">NOVO</span>' : ''}
          <button class="fav-btn ${YHFavorites.has(p.id)?'active':''}" data-fav="${p.id}" aria-label="Adicionar aos favoritos">
            <svg viewBox="0 0 24 24" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.5C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.8 19.5 16.4 12 21 12 21z"/></svg>
          </button>
          ${productMedia(p)}
          <button class="quick-add" data-quickview="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            VER PRODUTO
          </button>
        </div>
        <div class="product-info">
          <div class="p-cat">${p.categoria}</div>
          <div class="p-name">${p.nome}</div>
          <div class="p-price">${yhFormatKz(p.preco)}</div>
          <div class="p-meta">
            <div class="p-stars">${starIcons(p.avaliacao)}</div>
            <div class="swatches">
              ${p.cores.map((c,i)=>`<span class="swatch ${i===0?'selected':''}" style="background:${c.hex}" title="${c.nome}"></span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = Number(btn.dataset.fav);
        const active = YHFavorites.toggle(id);
        btn.classList.toggle("active", active);
        btn.classList.add("bump");
        setTimeout(()=>btn.classList.remove("bump"), 400);
        yhToast(active ? "Adicionado aos favoritos" : "Removido dos favoritos");
      });
    });

    grid.querySelectorAll(".product-media, .product-info").forEach(el => {
      el.addEventListener("click", (e) => {
        if(e.target.closest(".fav-btn")) return;
        const card = el.closest(".product-card");
        openQuickView(Number(card.dataset.id));
      });
    });
  }

  document.querySelectorAll(".chip[data-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-filter]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.dataset.filter;
      renderProducts();
    });
  });
  document.getElementById("sort-select")?.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  renderProducts();
  document.addEventListener("yh:favorites-updated", () => {
    grid.querySelectorAll(".fav-btn").forEach(btn => {
      btn.classList.toggle("active", YHFavorites.has(Number(btn.dataset.fav)));
    });
  });

  /* ---------------------------------------------------------------------
     QUICK VIEW (página/modal do produto)
  --------------------------------------------------------------------- */
  const qvOverlay = document.getElementById("quickview-overlay");
  const qvContent = document.getElementById("quickview-content");
  let qvState = { id:null, cor:null, tamanho:null, qtd:1, img:0 };

  function openQuickView(id){
    const p = yhGetProduct(id);
    if(!p) return;
    qvState = { id, cor: p.cores[0].nome, tamanho: p.tamanhos[0], qtd: 1, img: 0 };
    renderQuickView(p);
    openOverlay(qvOverlay);
  }
  window.yhOpenQuickView = openQuickView;

  function renderQuickView(p){
    const mainImg = p.imagens[qvState.img] || null;
    qvContent.innerHTML = `
      <div class="qv-grid">
        <div class="qv-media">
          ${mainImg ? `<img src="${mainImg}" alt="${p.nome}">` : `<div class="product-placeholder" style="position:absolute;inset:0;">
              <img src="images/marca/logo-yh-white.png" alt=""><b>${p.nome}</b><span>YOUNG HUSTLER</span></div>`}
          ${p.imagens.length > 1 ? `<div class="qv-thumbs">
            ${p.imagens.map((im,i)=>`<img src="${im}" data-thumb="${i}" style="${i===qvState.img?'box-shadow:0 0 0 2px #fff;':''}">`).join("")}
          </div>` : ""}
        </div>
        <div class="qv-body">
          <div class="qv-cat">${p.categoria} · STREETWEAR PREMIUM</div>
          <div class="qv-name">${p.nome}</div>
          <div class="qv-price">${yhFormatKz(p.preco)}</div>
          <p class="qv-desc">${p.descricao}</p>

          <div class="qv-block">
            <div class="qv-label">COR — <span data-cor-label>${qvState.cor}</span></div>
            <div class="swatches">
              ${p.cores.map(c=>`<span class="swatch ${c.nome===qvState.cor?'selected':''}" data-cor="${c.nome}" style="width:26px;height:26px;background:${c.hex}"></span>`).join("")}
            </div>
          </div>

          <div class="qv-block">
            <div class="qv-label">TAMANHO</div>
            <div class="size-grid">
              ${p.tamanhos.map(t=>`<span class="size-opt ${t===qvState.tamanho?'selected':''}" data-tam="${t}">${t}</span>`).join("")}
            </div>
          </div>

          <div class="qv-qty">
            <div class="qty-ctrl">
              <button data-qv-qty="-1">−</button>
              <span data-qv-qty-val>${qvState.qtd}</span>
              <button data-qv-qty="1">+</button>
            </div>
            <span style="font-size:.8rem;color:var(--gray-500)">${p.stock} disponíveis</span>
          </div>

          <div class="qv-actions">
            <button class="btn btn-outline" id="qv-add-cart">ADICIONAR AO CARRINHO</button>
            <button class="btn btn-dark" id="qv-buy-now">
              COMPRAR AGORA
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          <ul class="qv-trust">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Produto original</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Qualidade premium</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Entrega nacional</li>
          </ul>
        </div>
      </div>
    `;

    qvContent.querySelectorAll("[data-thumb]").forEach(t => t.addEventListener("click", () => {
      qvState.img = Number(t.dataset.thumb);
      renderQuickView(p);
    }));
    qvContent.querySelectorAll("[data-cor]").forEach(s => s.addEventListener("click", () => {
      qvState.cor = s.dataset.cor;
      renderQuickView(p);
    }));
    qvContent.querySelectorAll("[data-tam]").forEach(s => s.addEventListener("click", () => {
      qvState.tamanho = s.dataset.tam;
      renderQuickView(p);
    }));
    qvContent.querySelectorAll("[data-qv-qty]").forEach(b => b.addEventListener("click", () => {
      qvState.qtd = Math.max(1, qvState.qtd + Number(b.dataset.qvQty));
      qvContent.querySelector("[data-qv-qty-val]").textContent = qvState.qtd;
    }));
    qvContent.querySelector("#qv-add-cart").addEventListener("click", () => {
      YHCart.add(p.id, qvState.cor, qvState.tamanho, qvState.qtd);
      yhToast(`${p.nome} adicionado ao carrinho`);
      bumpCartIcon();
    });
    qvContent.querySelector("#qv-buy-now").addEventListener("click", () => {
      YHCart.add(p.id, qvState.cor, qvState.tamanho, qvState.qtd);
      closeOverlay(qvOverlay);
      openOverlay(document.getElementById("cart-overlay"));
    });
  }
  document.querySelectorAll("[data-quickview]").forEach(btn=>{
    btn.addEventListener("click",(e)=>{ e.stopPropagation(); openQuickView(Number(btn.dataset.quickview)); });
  });

  /* ---------------------------------------------------------------------
     OVERLAY helpers (genérico para todos os modais/painéis)
  --------------------------------------------------------------------- */
  function openOverlay(el){ el.classList.add("open"); document.body.classList.add("no-scroll"); }
  function closeOverlay(el){ el.classList.remove("open"); document.body.classList.remove("no-scroll"); }
  document.querySelectorAll("[data-close-overlay]").forEach(btn=>{
    btn.addEventListener("click", () => closeOverlay(btn.closest(".overlay")));
  });
  document.querySelectorAll(".overlay").forEach(ov => {
    ov.addEventListener("click", (e) => { if(e.target === ov) closeOverlay(ov); });
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") document.querySelectorAll(".overlay.open").forEach(closeOverlay);
  });
  window.yhOpenOverlay = openOverlay;
  window.yhCloseOverlay = closeOverlay;

  /* ---------------------------------------------------------------------
     CARRINHO — painel lateral
  --------------------------------------------------------------------- */
  const cartOverlay = document.getElementById("cart-overlay");
  const cartCountEls = document.querySelectorAll(".cart-count");
  const cartBody = document.getElementById("cart-body");
  const cartFoot = document.getElementById("cart-foot");

  function bumpCartIcon(){
    cartCountEls.forEach(el => { el.classList.add("bump"); setTimeout(()=>el.classList.remove("bump"),400); });
  }

  function renderCart(){
    cartCountEls.forEach(el => el.textContent = YHCart.count());
    if(!YHCart.items.length){
      cartBody.innerHTML = `<div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <p>O seu carrinho está vazio.</p>
        </div>`;
      cartFoot.innerHTML = "";
      return;
    }
    cartBody.innerHTML = YHCart.items.map((it,i) => {
      const p = yhGetProduct(it.id);
      const img = p.imagens[0] || "images/marca/logo-yh.png";
      return `
      <div class="cart-item">
        <img src="${img}" alt="${p.nome}">
        <div class="ci-info">
          <b>${p.nome}</b>
          <div class="ci-meta">${it.cor} · ${it.tamanho}</div>
          <div class="ci-row">
            <div class="qty-ctrl">
              <button data-ci-qty="-1" data-i="${i}">−</button>
              <span>${it.qtd}</span>
              <button data-ci-qty="1" data-i="${i}">+</button>
            </div>
            <b>${yhFormatKz(p.preco * it.qtd)}</b>
          </div>
          <button class="ci-remove" data-ci-remove="${i}">Remover</button>
        </div>
      </div>`;
    }).join("");

    const subtotal = YHCart.subtotal();
    cartFoot.innerHTML = `
      <div class="cart-totals"><span>Subtotal</span><span>${yhFormatKz(subtotal)}</span></div>
      <div class="cart-totals"><span>Entrega</span><span>Calculada no checkout</span></div>
      <div class="cart-totals total"><span>Total</span><span>${yhFormatKz(subtotal)}</span></div>
      <button class="btn btn-dark btn-full" id="go-checkout" style="margin-top:16px;">FINALIZAR COMPRA
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
      <button class="btn btn-outline btn-full" id="clear-cart" style="margin-top:10px;">LIMPAR CARRINHO</button>
    `;
    cartBody.querySelectorAll("[data-ci-qty]").forEach(b=>{
      b.addEventListener("click", () => {
        const i = Number(b.dataset.i);
        YHCart.setQty(i, YHCart.items[i].qtd + Number(b.dataset.ciQty));
      });
    });
    cartBody.querySelectorAll("[data-ci-remove]").forEach(b=>{
      b.addEventListener("click", () => YHCart.remove(Number(b.dataset.ciRemove)));
    });
    cartFoot.querySelector("#go-checkout")?.addEventListener("click", () => {
      closeOverlay(cartOverlay);
      openOverlay(document.getElementById("checkout-overlay"));
      renderCheckoutSummary();
    });
    cartFoot.querySelector("#clear-cart")?.addEventListener("click", () => YHCart.clear());
  }

  document.addEventListener("yh:cart-updated", renderCart);
  renderCart();

  document.querySelectorAll("[data-open-cart]").forEach(b => b.addEventListener("click", () => openOverlay(cartOverlay)));

  /* ---------------------------------------------------------------------
     CHECKOUT
  --------------------------------------------------------------------- */
  const checkoutOverlay = document.getElementById("checkout-overlay");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutSummary = document.getElementById("checkout-summary");
  const checkoutSuccess = document.getElementById("checkout-success");

  function renderCheckoutSummary(){
    const subtotal = YHCart.subtotal();
    const entregaSel = checkoutForm.querySelector('input[name="entrega"]:checked')?.value || "normal";
    const entrega = entregaSel === "levantamento" ? 0 : 2500;
    checkoutSummary.innerHTML = `
      ${YHCart.items.map(it=>{
        const p = yhGetProduct(it.id);
        return `<div class="cart-totals"><span>${p.nome} (${it.cor}, ${it.tamanho}) × ${it.qtd}</span><span>${yhFormatKz(p.preco*it.qtd)}</span></div>`;
      }).join("")}
      <div class="cart-totals"><span>Subtotal</span><span>${yhFormatKz(subtotal)}</span></div>
      <div class="cart-totals"><span>Entrega</span><span>${entrega === 0 ? "Grátis" : yhFormatKz(entrega)}</span></div>
      <div class="cart-totals total"><span>Total</span><span>${yhFormatKz(subtotal + entrega)}</span></div>
    `;
  }
  checkoutForm?.querySelectorAll('input[name="entrega"]').forEach(r => r.addEventListener("change", renderCheckoutSummary));

  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!YHCart.items.length){ yhToast("O seu carrinho está vazio"); return; }
    const fd = new FormData(checkoutForm);
    const dados = Object.fromEntries(fd.entries());
    const order = yhCreateOrderFromCart(dados);
    YHCart.clear();
    checkoutForm.style.display = "none";
    checkoutSummary.style.display = "none";
    checkoutSuccess.style.display = "block";
    checkoutSuccess.querySelector("[data-order-code]").textContent = order.codigo;
  });

  document.querySelector("#checkout-overlay [data-close-overlay-reset]")?.addEventListener("click", () => {
    checkoutForm.reset();
    checkoutForm.style.display = "block";
    checkoutSummary.style.display = "block";
    checkoutSuccess.style.display = "none";
  });

  /* ---------------------------------------------------------------------
     RASTREAMENTO DE ENCOMENDA
  --------------------------------------------------------------------- */
  const trackForm = document.getElementById("track-form");
  const trackResult = document.getElementById("track-result");
  trackForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigo = document.getElementById("track-code").value;
    const order = yhFindOrder(codigo);
    if(!order){
      trackResult.innerHTML = `<p style="color:var(--gray-500);margin-top:16px;">Não encontrámos nenhuma encomenda com o código <b>${codigo}</b>. Verifique e tente novamente.</p>`;
      return;
    }
    const stage = yhOrderStageIndex(order);
    trackResult.innerHTML = `
      <div class="timeline">
        ${YH_ORDER_STAGES.map((s,i)=>`
          <div class="timeline-step ${i<=stage?'done':''}">
            <div class="timeline-dot"></div>
            <div><b>${s}</b><span>${i<=stage ? "Concluído" : "Pendente"}</span></div>
          </div>`).join("")}
      </div>`;
  });

  /* ---------------------------------------------------------------------
     PESQUISA
  --------------------------------------------------------------------- */
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  document.querySelectorAll("[data-open-search]").forEach(b => b.addEventListener("click", () => {
    openOverlay(searchOverlay);
    setTimeout(()=>searchInput.focus(), 350);
  }));

  function runSearch(term){
    term = term.trim().toLowerCase();
    if(!term){ searchResults.innerHTML = ""; return; }
    const found = YH_PRODUCTS.filter(p => p.nome.toLowerCase().includes(term) || p.categoria.toLowerCase().includes(term));
    if(!found.length){
      searchResults.innerHTML = `<div class="search-empty">Sem resultados para "${term}"</div>`;
      return;
    }
    searchResults.innerHTML = found.map(p => `
      <div class="search-result" data-goto="${p.id}">
        ${p.imagens[0] ? `<img src="${p.imagens[0]}" alt="">` : `<img src="images/marca/logo-yh-white.png" alt="" style="background:#000;padding:6px;">`}
        <div><b>${p.nome}</b><span>${p.categoria} · ${yhFormatKz(p.preco)}</span></div>
      </div>`).join("");
    searchResults.querySelectorAll("[data-goto]").forEach(el => el.addEventListener("click", () => {
      closeOverlay(searchOverlay);
      openQuickView(Number(el.dataset.goto));
    }));
  }
  searchInput?.addEventListener("input", (e) => runSearch(e.target.value));

  /* ---------------------------------------------------------------------
     GALERIA + LIGHTBOX
  --------------------------------------------------------------------- */
  const galleryImgs = Array.from(document.querySelectorAll("[data-gallery-item] img")).map(img => img.src);
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImg = document.getElementById("lightbox-img");
  let lbIndex = 0;
  function showLightbox(i){
    lbIndex = (i + galleryImgs.length) % galleryImgs.length;
    lightboxImg.src = galleryImgs[lbIndex];
  }
  document.querySelectorAll("[data-gallery-item]").forEach((el,i) => {
    el.addEventListener("click", () => { showLightbox(i); openOverlay(lightboxOverlay); });
  });
  document.getElementById("lb-prev")?.addEventListener("click", () => showLightbox(lbIndex-1));
  document.getElementById("lb-next")?.addEventListener("click", () => showLightbox(lbIndex+1));
  document.addEventListener("keydown", (e) => {
    if(!lightboxOverlay.classList.contains("open")) return;
    if(e.key === "ArrowRight") showLightbox(lbIndex+1);
    if(e.key === "ArrowLeft") showLightbox(lbIndex-1);
  });

  /* ---------------------------------------------------------------------
     FAQ ACCORDION
  --------------------------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight = null; });
      if(!isOpen){ item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------------------------------------------------------------------
     NEWSLETTER
  --------------------------------------------------------------------- */
  const nlForm = document.getElementById("newsletter-form");
  nlForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletter-email");
    const msg = document.getElementById("newsletter-msg");
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!valid){
      msg.textContent = "Introduza um email válido.";
      msg.className = "nl-msg err";
      return;
    }
    msg.textContent = "Obrigado! Já faz parte da família YH.";
    msg.className = "nl-msg ok";
    input.value = "";
  });

  /* ---------------------------------------------------------------------
     FORMULÁRIO DE CONTACTO
  --------------------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("contact-msg");
    msg.textContent = "Mensagem enviada! A nossa equipa responde em breve.";
    msg.className = "form-msg ok";
    contactForm.reset();
  });

  /* ---------------------------------------------------------------------
     CONTA — tabs + login/registo + favoritos + pedidos
  --------------------------------------------------------------------- */
  const accountOverlay = document.getElementById("account-overlay");
  document.querySelectorAll("[data-open-account]").forEach(b => b.addEventListener("click", () => {
    openOverlay(accountOverlay);
    renderAccountPanel();
  }));

  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.style.display = "none");
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).style.display = "block";
    });
  });

  function renderAccountPanel(){
    const user = YHAccount.current();
    const loggedArea = document.getElementById("account-logged");
    const guestArea = document.getElementById("account-guest");
    if(user){
      guestArea.style.display = "none";
      loggedArea.style.display = "block";
      document.getElementById("account-name").textContent = user.nome;
      document.getElementById("account-email").textContent = user.email;

      const orders = yhGetOrders();
      document.getElementById("account-orders").innerHTML = orders.length ? orders.map(o => `
        <div class="cart-item" style="align-items:flex-start;">
          <div class="ci-info">
            <b>${o.codigo}</b>
            <div class="ci-meta">${new Date(o.data).toLocaleDateString("pt-PT")} · ${o.itens.length} artigo(s)</div>
            <div class="ci-row"><span></span><b>${yhFormatKz(o.total)}</b></div>
          </div>
        </div>`).join("") : `<div class="acc-empty">Ainda não fez nenhum pedido.</div>`;

      const favs = YHFavorites.ids.map(id => yhGetProduct(id)).filter(Boolean);
      document.getElementById("account-favorites").innerHTML = favs.length ? favs.map(p => `
        <div class="cart-item">
          <img src="${p.imagens[0] || 'images/marca/logo-yh.png'}" alt="">
          <div class="ci-info"><b>${p.nome}</b><div class="ci-meta">${yhFormatKz(p.preco)}</div></div>
        </div>`).join("") : `<div class="acc-empty">Ainda não tem produtos favoritos.</div>`;
    }else{
      guestArea.style.display = "block";
      loggedArea.style.display = "none";
    }
  }
  document.addEventListener("yh:account-updated", renderAccountPanel);
  document.addEventListener("yh:favorites-updated", renderAccountPanel);

  document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("login-nome").value.trim() || "Cliente YH";
    const email = document.getElementById("login-email").value.trim();
    YHAccount.login(nome, email);
    yhToast(`Bem-vindo, ${nome}!`);
  });
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    YHAccount.logout();
    yhToast("Sessão terminada");
  });

  /* ---------------------------------------------------------------------
     Ano no rodapé
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

});
