const socket = io();

const productList = document.getElementById("productList");
const form = document.getElementById("productForm");

socket.on("products", products => {
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <li>
        ${p.title} - $${p.price}
        <button onclick="deleteProduct('${p.id}')">Eliminar</button>
      </li>
    `;
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    id: Date.now().toString(),
    title: document.getElementById("title").value,
    price: document.getElementById("price").value
  };

  socket.emit("addProduct", product);
  form.reset();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
