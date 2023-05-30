let padreProductos = document.getElementById("padreProductos");
let openCar = document.getElementById("openCar"); 
let carritoContainer = document.getElementById("carritoContainer")

//primero crear el array para generar el carrito
let carrito = [];
carrito = (localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : [];

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
    <button id="cardBtn${producto.id}">comprar</button>
    `;
        padreProductos.appendChild(cardContainer)
    // Comprar
    let comprar = document.getElementById(`cardBtn${producto.id}`)
    comprar.addEventListener("click", ()=>{
        sumarAlCarrito(producto.id);
        console.log(`elegido ${producto.nombre}`);
    })
    });
};
verProductos();
//creando la funcion que me agrega los productos al carrito con el uso del id 
const sumarAlCarrito = (id) => {
    let productoEnCarrito = carrito.find((producto) =>producto.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        let producto = productos.find((producto) => producto.id === id);
        carrito.push(producto)
    }
}
localStorage.getItem("carrito", JSON.stringify(carrito))

//mostrar el carrito por pantalla 
openCar.addEventListener("click", () => {
    const carritoHeader = document.createElement("div");
    carritoHeader.className = "carrito__header";
    carritoHeader.innerHTML= `
    <h1 class="carrito__titulo">carrito</h1>
    <button class="carrito__close">X</button>
    `
    carritoContainer.append(carritoHeader)
    
    carrito.forEach((producto) => {
        let carritoBody = document.createElement("div");
        carritoBody.className = "carrito__body";
        carritoBody.innerHTML = `
        <img class="carrito__img" src="${producto.imagen}" alt="">
        <h3 class="carrito__nombre">${producto.nombre}</h3>
        <p class="cardcarrito__precio"> ${producto.precio} </p>
        `;
        carritoContainer.append(carritoBody)

        let botonEliminar = document.createElement("button");
        botonEliminar.className = "boton__eliminar";
        botonEliminar.innerText = "eliminar"
        carritoContainer.append(botonEliminar)
        botonEliminar.addEventListener
    //total a pagar 
        const total = carrito.reduce((acc, item) => acc + item.precio, 0);

        let totalCarrito = document.createElement("div")
        totalCarrito.innerHTML = `<p>total a pagar: ${total}$</p>`
        carritoContainer.append(totalCarrito)
})
// limpiar el carrito 
let vaciarCarrito = document.createElement("button")
vaciarCarrito.className = "boton__reset"
vaciarCarrito.addEventListener("click", () => {
    vaciarCarrito.textContent = "vaciar carrito"
    localStorage.clear();
})
carritoContainer.append(vaciarCarrito)
    })






