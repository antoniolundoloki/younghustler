/* ==========================================================================
   YOUNG HUSTLER — produtos.js
   Catálogo de demonstração. No futuro, isto vem de uma API / base de dados.
   ========================================================================== */

const YH_PRODUCTS = [
  {
    id: 1,
    nome: "T-Shirt Oversized YH",
    categoria: "T-Shirts",
    preco: 10000,
    descricao: "Corte oversized premium com caimento solto, tecido encorpado e estampa gráfica de grandes dimensões. Feita para quem veste com atitude.",
    imagens: ["images/produtos/tshirt1-branca.png", "images/produtos/tshirt1-preta.png", "images/produtos/tshirt1-bege.png", "images/produtos/tshirt1-castanho.png", "images/produtos/tshirt1-azul.png", "images/produtos/tshirt1-verde.png", , "images/produtos/tshirt1-cinza.png"],
    cores: [
      {nome:"Branco", hex:"#f5f5f5"},
      {nome:"Preto", hex:"#111111"},
      {nome:"Bege", hex:"#ffeaea"},
      {nome:"Castanho", hex:"#7e5236"},
      {nome:"Azul Bebé", hex:"#95d8ff"},
      {nome:"Verde", hex:"#364e3f"},
      {nome:"Cinza", hex:"gray"}

    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: "100%",
    avaliacao: 4.9,
    destaque: true,
    novo: true
  },
  {
    id: 2,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-branco.png", "images/produtos/regata1-preto.png", "images/produtos/regata1-bege.png", "images/produtos/regata1-castanho.png", "images/produtos/regata1-azul.png", "images/produtos/regata1-verde.png", "images/produtos/regata1-cinza.png"],
    cores: [
      {nome:"Branco", hex:"#f5f5f5"},
      {nome:"Preto", hex:"#111111"},
      {nome:"Bege", hex:"#ffeaea"},
      {nome:"Castanho", hex:"#7e5236"},
      {nome:"Azul Bebé", hex:"#95d8ff"},
      {nome:"Verde", hex:"#364e3f"},
      {nome:"Cinza", hex:"gray"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },
  {
    id: 3,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-branco.png",
      "images/produtos/casaco1-preto.png",
      "images/produtos/casaco1-bege.png",
      "images/produtos/casaco1-castanho.png",
      "images/produtos/casaco1-azul.png",
      "images/produtos/casaco1-verde.png",
      "images/produtos/casaco1-cinza.png"
    ],
    cores: [
      {nome:"Branco", hex:"#f5f5f5"},
      {nome:"Preto", hex:"#111111"},
      {nome:"Bege", hex:"#ffeaea"},
      {nome:"Castanho", hex:"#7e5236"},
      {nome:"Azul Bebé", hex:"#95d8ff"},
      {nome:"Verde", hex:"#364e3f"},
      {nome:"Cinza", hex:"gray"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 18,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
  {
    id: 4,
    nome: "Boné YH",
    categoria: "Bonés",
    preco: 8000,
    descricao: "Boné estruturado de seis painéis, bordado YH frontal e fecho ajustável. O toque final para completar qualquer look da marca.",
    imagens: [],
    cores: [
      {nome:"Preto", hex:"#111111"},
      {nome:"Branco", hex:"#f5f5f5"}
    ],
    tamanhos: ["Único"],
    stock: 60,
    avaliacao: 4.7,
    destaque: true,
    novo: false
  },
  {
    id: 5,
    nome: "Mochila YH",
    categoria: "Mochilas",
    preco: 25000,
    descricao: "Mochila resistente à água com compartimento acolchoado para portátil, bolsos internos organizadores e logótipo YH refletor.",
    imagens: [],
    cores: [
      {nome:"Preto", hex:"#111111"}
    ],
    tamanhos: ["Único"],
    stock: 15,
    avaliacao: 4.9,
    destaque: true,
    novo: false
  },
  {
    id: 6,
    nome: "Carteira YH",
    categoria: "Carteiras",
    preco: 5000,
    descricao: "Carteira em couro sintético premium com múltiplos compartimentos para cartões e logótipo YH gravado a relevo.",
    imagens: [],
    cores: [
      {nome:"Preto", hex:"#111111"}
    ],
    tamanhos: ["Único"],
    stock: 34,
    avaliacao: 4.6,
    destaque: true,
    novo: false
  },
  {
    id: 7,
    nome: "Chaveiro YH",
    categoria: "Chaveiros",
    preco: 3000,
    descricao: "Chaveiro emborrachado com o símbolo YH em relevo. Um pequeno detalhe, uma grande identidade.",
    imagens: [],
    cores: [
      {nome:"Preto", hex:"#111111"}
    ],
    tamanhos: ["Único"],
    stock: 80,
    avaliacao: 4.5,
    destaque: true,
    novo: false
  },
  {
    id: 8,
    nome: "Capa para Smartphone",
    categoria: "Capas",
    preco: 7000,
    descricao: "Capa de proteção reforçada com acabamento fosco e logótipo YH. Disponível para os modelos de iPhone mais recentes.",
    imagens: [],
    cores: [
      {nome:"Preto", hex:"#111111"},
      {nome:"Branco", hex:"#f5f5f5"}
    ],
    tamanhos: ["iPhone 11","iPhone 12","iPhone 13","iPhone 14","iPhone 15","iPhone 16"],
    stock: 50,
    avaliacao: 4.4,
    destaque: true,
    novo: false
  },







//*****  Acrescentar mais produtos  *****

// ***** Zona das T-Shits de todas as cores

  {
    id: 9,
    nome: "T-Shirt Normal YH",
    categoria: "T-Shirts",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/tshirt1-preta.png"],
    cores: [
      {nome:"Preto", hex:"#111111"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },
  {
    id: 10,
    nome: "T-Shirt Normal YH",
    categoria: "T-Shirts",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/tshirt1-bege.png"],
    cores: [
      {nome:"Bege", hex:"#ffeaea"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },
  {
    id: 11,
    nome: "T-Shirt Normal YH",
    categoria: "T-Shirts",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/tshirt1-cinza.png"],
    cores: [
      {nome:"Cinza", hex:"#d3d3d3"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },
  {
    id: 12,
    nome: "T-Shirt Normal YH",
    categoria: "T-Shirts",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/tshirt1-verde.png"],
    cores: [
      {nome:"Verde", hex:"#228B22"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },
  {
    id: 13,
    nome: "T-Shirt Normal YH",
    categoria: "T-Shirts",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/tshirt1-castanho.png"],
    cores: [
      {nome:"Castanho", hex:"#8B4513"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },
  {
    id: 14,
    nome: "T-Shirt Normal YH",
    categoria: "T-Shirts",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/tshirt1-azul.png"],
    cores: [
      {nome:"Azul", hex:"#0000ff"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },



    // ***** Zona das camisas Regadas de todas as cores

    {
    id: 15,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-preto.png"],
    cores: [
      {nome:"Preto", hex:"#111111"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },

  {
    id: 16,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-bege.png"],
    cores: [
      {nome:"Bege", hex:"#ffeaea"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },

  {
    id: 17,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-azul.png"],
    cores: [
      {nome:"Azul", hex:"#0000ff"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },

  {
    id: 18,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-castanho.png"],
    cores: [
      {nome:"Castanho", hex:"#8B4513"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },

  {
    id: 19,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-cinza.png"],
    cores: [
      {nome:"Cinza", hex:"#d3d3d3"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },

  {
    id: 20,
    nome: "T-Shirt Regatas YH",
    categoria: "Regatas",
    preco: 6000,
    descricao: "T-shirt em algodão 100% penteado, corte reto e serigrafia do logótipo YH no peito. A base do guarda-roupa Young Hustler — simples, resistente e versátil para o dia a dia.",
    imagens: ["images/produtos/regata1-verde.png"],
    cores: [
      {nome:"Verde", hex:"#228B22"}
    ],
    tamanhos: ["XS","S","M","L","XL","XXL"],
    stock: 42,
    avaliacao: 4.8,
    destaque: true,
    novo: false
  },


  // ***** Zona dos Casacos de todas as cores

  {
    id: 21,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-verde.png"],
    cores: [
      {nome:"Verde", hex:"#228B22"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 22,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
  {
    id: 22,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-bege.png"],
    cores: [
      {nome:"Bege", hex:"#ffeaea"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 24,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
  {
    id: 23,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-verde.png"],
    cores: [
      {nome:"Verde", hex:"#228B22"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 18,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
  {
    id: 24,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-castanho.png"],
    cores: [
      {nome:"Castanho", hex:"#8B4513"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 18,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
  {
    id: 25,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-azul.png"],
    cores: [
      {nome:"Azul", hex:"#0000ff"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 18,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
  {
    id: 26,
    nome: "Casaco YH (Hoodie)",
    categoria: "Casacos",
    preco: 15000,
    descricao: "Hoodie premium em moletão pesado, capuz forrado, bolso canguru e bordado YH no peito. A peça mais icónica da coleção — conforto e presença em qualquer ocasião.",
    imagens: [
      "images/produtos/casaco1-cinza.png"],
    cores: [
      {nome:"Cinza", hex:"#d3d3d3"}
    ],
    tamanhos: ["S","M","L","XL","XXL"],
    stock: 18,
    avaliacao: 5,
    destaque: true,
    novo: false
  },
];

function yhFormatKz(valor){
  return valor.toLocaleString("pt-PT") + " Kz";
}

function yhGetProduct(id){
  return YH_PRODUCTS.find(p => p.id === Number(id));
}
