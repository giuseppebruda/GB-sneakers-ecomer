let padreProductos = document.getElementById("padreProductos");
let openCar = document.getElementById("openCar"); 
let miCarrito = document.getElementById("miCarrito");

//primero crear el array para generar el carrito
let carrito = [];
//funcion actualizar carrito para actualizar el storage y monitorear por consola que todo funcione
function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
console.log(localStorage);
}

// crear y mostrar los productos 
const verProductos = () =>{
    productos.forEach((producto) => {
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("card__container");
        cardContainer.innerHTML = `
    <img class="card__img" src="${producto.imagen}" alt="">
    <div class="card__body">
        <h3 class="card__nombre">${producto.nombre}</h3>
        <p class="card__precio"> ${producto.precio} </p>
    </div>
    <button class="comprar" id="cardBtn${producto.id}">comprar</button>
    `;
        padreProductos.appendChild(cardContainer)
    // Comprar
    let comprar = document.getElementById(`cardBtn${producto.id}`)
    comprar.addEventListener("click", ()=>{
        carrito.push({
            id:producto.id,
            nombre : producto.nombre,
            precio : producto.precio
        })
        //actualizarCarrito()
        console.log(carrito);
    })
    });
};
verProductos()

const verCarrito = () => {
    carrito.forEach((productoCarrito) =>{
        let containerCarrito = document.createElement("div");
        containerCarrito.classList.add("card__carrito");
        containerCarrito.innerHTML =`
        <div class="card__carrito">
        <h3 class="card__nombreCarrito">${productoCarrito.nombre}</h3>
        <p class="card__precioCarrito"> ${productoCarrito.precio} </p>
    </div>
        `
    miCarrito.appendChild(cardContainer)
    })
}






