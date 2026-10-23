/* ==========================================================================
   YOUNG HUSTLER — checkout.js
   Simulação de checkout e rastreamento de encomendas no frontend.
   Pronto para, no futuro, ser ligado a um backend real de pagamentos.
   ========================================================================== */

const YH_ORDERS_KEY = "yh_orders_v1";

function yhGenerateOrderCode(){
  const ano = new Date().getFullYear();
  const num = Math.floor(10000 + Math.random() * 89999);
  return `YH-${ano}-${num}`;
}

function yhSaveOrder(order){
  let orders = [];
  try{
    const raw = localStorage.getItem(YH_ORDERS_KEY);
    orders = raw ? JSON.parse(raw) : [];
  }catch(e){ orders = []; }
  orders.unshift(order);
  try{ localStorage.setItem(YH_ORDERS_KEY, JSON.stringify(orders)); }catch(e){}
  return order;
}

function yhGetOrders(){
  try{
    const raw = localStorage.getItem(YH_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function yhFindOrder(codigo){
  const orders = yhGetOrders();
  return orders.find(o => o.codigo.toUpperCase() === codigo.trim().toUpperCase());
}

const YH_ORDER_STAGES = [
  "Pedido recebido",
  "Pagamento confirmado",
  "Em preparação",
  "Enviado",
  "A caminho",
  "Entregue"
];

/**
 * Simula um estágio "atual" pseudo-aleatório mas estável para um código,
 * apenas para efeitos de demonstração da timeline de rastreamento.
 */
function yhOrderStageIndex(order){
  if(typeof order.estagio === "number") return order.estagio;
  let hash = 0;
  for(const ch of order.codigo) hash += ch.charCodeAt(0);
  return hash % YH_ORDER_STAGES.length;
}

function yhCreateOrderFromCart(dadosCliente){
  const itens = YHCart.items.map(i => {
    const p = yhGetProduct(i.id);
    return {
      id: i.id, nome: p ? p.nome : "Produto",
      cor: i.cor, tamanho: i.tamanho, qtd: i.qtd,
      preco: p ? p.preco : 0
    };
  });
  const subtotal = itens.reduce((a,i)=> a + i.preco*i.qtd, 0);
  const entrega = dadosCliente.entrega === "levantamento" ? 0 : 2500;
  const order = {
    codigo: yhGenerateOrderCode(),
    data: new Date().toISOString(),
    cliente: dadosCliente,
    itens,
    subtotal,
    entregaValor: entrega,
    total: subtotal + entrega,
    estagio: 0
  };
  return yhSaveOrder(order);
}
