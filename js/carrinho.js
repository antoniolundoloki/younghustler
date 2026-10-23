/* ==========================================================================
   YOUNG HUSTLER — carrinho.js
   Carrinho de compras + Favoritos, persistidos em localStorage
   ========================================================================== */

const YH_CART_KEY = "yh_cart_v1";
const YH_FAV_KEY  = "yh_favorites_v1";

const YHCart = {
  items: [],

  load(){
    try{
      const raw = localStorage.getItem(YH_CART_KEY);
      this.items = raw ? JSON.parse(raw) : [];
    }catch(e){ this.items = []; }
    return this.items;
  },

  save(){
    try{ localStorage.setItem(YH_CART_KEY, JSON.stringify(this.items)); }catch(e){}
    document.dispatchEvent(new CustomEvent("yh:cart-updated"));
  },

  add(produtoId, cor, tamanho, qtd = 1){
    const existing = this.items.find(i => i.id === produtoId && i.cor === cor && i.tamanho === tamanho);
    if(existing){
      existing.qtd += qtd;
    }else{
      this.items.push({ id: produtoId, cor, tamanho, qtd });
    }
    this.save();
  },

  remove(index){
    this.items.splice(index, 1);
    this.save();
  },

  setQty(index, qtd){
    if(qtd < 1) qtd = 1;
    this.items[index].qtd = qtd;
    this.save();
  },

  clear(){
    this.items = [];
    this.save();
  },

  count(){
    return this.items.reduce((acc, i) => acc + i.qtd, 0);
  },

  subtotal(){
    return this.items.reduce((acc, i) => {
      const p = yhGetProduct(i.id);
      return acc + (p ? p.preco * i.qtd : 0);
    }, 0);
  }
};

const YHFavorites = {
  ids: [],

  load(){
    try{
      const raw = localStorage.getItem(YH_FAV_KEY);
      this.ids = raw ? JSON.parse(raw) : [];
    }catch(e){ this.ids = []; }
    return this.ids;
  },

  save(){
    try{ localStorage.setItem(YH_FAV_KEY, JSON.stringify(this.ids)); }catch(e){}
    document.dispatchEvent(new CustomEvent("yh:favorites-updated"));
  },

  toggle(id){
    const i = this.ids.indexOf(id);
    if(i === -1){ this.ids.push(id); } else { this.ids.splice(i, 1); }
    this.save();
    return this.has(id);
  },

  has(id){
    return this.ids.includes(id);
  }
};

YHCart.load();
YHFavorites.load();
