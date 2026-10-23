/* ==========================================================================
   YOUNG HUSTLER — conta.js
   Conta de cliente (demonstração frontend, sem backend real).
   ========================================================================== */

const YH_USER_KEY = "yh_user_v1";

const YHAccount = {
  current(){
    try{
      const raw = localStorage.getItem(YH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  },

  login(nome, email){
    const user = { nome, email, desde: new Date().toISOString() };
    try{ localStorage.setItem(YH_USER_KEY, JSON.stringify(user)); }catch(e){}
    document.dispatchEvent(new CustomEvent("yh:account-updated"));
    return user;
  },

  logout(){
    try{ localStorage.removeItem(YH_USER_KEY); }catch(e){}
    document.dispatchEvent(new CustomEvent("yh:account-updated"));
  }
};
