// 1. DADOS (JSON)

const data = {
  produtos: [
    { id: 1, nome: "Africa Twin", preco: 80000, categoria: "Trail", imagem: "imagens/twin.jpg", descricao: "Moto aventureira de alta cilindrada", emEstoque: true },
    { id: 2, nome: "Yamaha MT-09", preco: 60000, categoria: "Naked", imagem: "imagens/mt-09.jpg", descricao: "Moto naked potente", emEstoque: true },
    { id: 3, nome: "Yamaha MT-07", preco: 45000, categoria: "Naked", imagem: "imagens/mt-07.jpg", descricao: "Moto leve e divertida", emEstoque: true },
    { id: 4, nome: "NC 750X", preco: 50000, categoria: "Trail", imagem: "imagens/NC-750X.jpg", descricao: "Moto confortável para viagens", emEstoque: true },
    { id: 5, nome: "Kawasaki Z400", preco: 38000, categoria: "Naked", imagem: "imagens/z400.jpg", descricao: "Moto esportiva de entrada", emEstoque: true },
    { id: 6, nome: "Honda Sahara 300", preco: 32000, categoria: "Trail", imagem: "imagens/sahara 300.jpg", descricao: "Nova Sahara", emEstoque: true },
    { id: 7, nome: "Honda XRE 300", preco: 30000, categoria: "Trail", imagem: "imagens/XRE-300.jpg", descricao: "Versátil para cidade e estrada", emEstoque: true },
    { id: 8, nome: "Honda 160 2021", preco: 15000, categoria: "Urbano", imagem: "imagens/160 boladona do pae.jpg", descricao: "Moto econômica", emEstoque: true }
  ]
};

// 2. ELEMENTOS DO DOM

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// 3. FUNÇÕES

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.border = "1px solid black";
  card.style.padding = "10px";
  card.style.margin = "10px";

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="${produto.imagem}" style="width:100%; height:120px; object-fit:cover;">
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="btn-details">Ver detalhes</button>
    <button class="btn-highlight">Destacar</button>
  `;

  const btnDetails = card.querySelector(".btn-details");
  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  const btnHighlight = card.querySelector(".btn-highlight");
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = [...new Set(data.produtos.map(p => p.categoria))];

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.innerText = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const text = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  return data.produtos.filter(prod => {
    const matchName = prod.nome.toLowerCase().includes(text);
    const matchCategory = category === "Todas" || prod.categoria === category;

    return matchName && matchCategory;
  });
}

// 4. EVENTOS
searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(data.produtos);
});

// 5. INICIALIZAÇÃO
renderCategories();
renderProducts(data.produtos);