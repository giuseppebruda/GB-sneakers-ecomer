let padreProductos = document.getElementById("padreProductos");
let openCar = document.getElementById("openCar"); 
let miCarrito = document.getElementById("miCarrito");
let precioTotal = document.getElementById("precioTotal")
let agregados = document.getElementById("agregados")
//primero crear el array para generar el carrito
let carrito = [];
//cargar carrito desde el localstorage
carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];
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
        const repeat = carrito.some((productoRepetido)=> productoRepetido.id === producto.id);
        if (repeat){
            carrito.map((item) =>{
                if (item.id === producto.id) {
                    item.cantidad++;
                }
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `sumaste un par de ${producto.nombre} `,
                    showConfirmButton: true,
                    timer: 1500
                })
            })
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `las ${producto.nombre} se agregaron con exito al carrito`,
                showConfirmButton: true,
                timer: 1500
            })
        carrito.push({
            id:producto.id,
            nombre : producto.nombre,
            precio : producto.precio,
            cantidad: producto.cantidad

        })
        }   
        costos()
        actualizarCarrito()
        console.log(carrito);
    })
    });
};
verProductos()
//funcion para ver el carrito en pantalla 
const verCarrito = () => {
    miCarrito.innerHTML = ""
    carrito.forEach((productoCarrito) =>{
        let containerCarrito = document.createElement("div");
        containerCarrito.classList.add("card__carrito");
        containerCarrito.innerHTML = ""
        containerCarrito.innerHTML =`
        <div class="card__carrito">
        <h2 class="card__nombreCarrito">${productoCarrito.nombre}</h2>
        <p class="card__precioCarrito"> precio: $${productoCarrito.precio} </p>
        <p class= "cantidas">${productoCarrito.cantidad} <p/>
        <div>
            <button class="btn btn-primary" id="restar${productoCarrito.id}">-</button>
            <button class="btn btn-primary" id="sumar${productoCarrito.id}">+</button>
            <button class="btn colorBoton" id="eliminar${productoCarrito.id}">Eliminar</button>
        </div>
    </div>
        `
    miCarrito.appendChild(containerCarrito);
    // sumar productos al carrito 
    const botonSumar = document.getElementById(`sumar${productoCarrito.id}`);
    botonSumar.addEventListener("click", () =>{
        sumarProducto(productoCarrito.id)
        costos()
    })
    //restar producto
    const botonRestar = document.getElementById(`restar${productoCarrito.id}`);
    botonRestar.addEventListener("click", () => {
        restarProducto(productoCarrito.id);
        costos()
    });
    // eliminar producto 
    const botonEliminar = document.getElementById(`eliminar${productoCarrito.id}`);
    botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(productoCarrito.id);
        costos()
    });
    })
    
}
//le doy el evento de mostrar el carrito a mi boton 
openCar.addEventListener("click", () => {
verCarrito()
}) 
//funcion sumar
const sumarProducto = (id) => {
    const producto = carrito.find(productoCarrito => productoCarrito.id === id);
    producto.cantidad++;
    verCarrito();
    actualizarCarrito()
}
//funcion restar 
const restarProducto = (id) => {
    const producto = carrito.find( productoCarrito => productoCarrito.id === id);
    producto.cantidad > 1 ? producto.cantidad-- : eliminarDelCarrito ()
    actualizarCarrito()
    verCarrito()
}

//funcion eliminar 
const eliminarDelCarrito = (id) => {
    carrito = carrito.filter((productoCarrito) => productoCarrito.id !== id)
    actualizarCarrito()
    verCarrito()
}
let comprarCarrito = document.getElementById("comprar")
comprarCarrito.addEventListener("click", () =>{
    carrito=[];
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'compra finalizada con exito',
        showConfirmButton: false,
        timer: 1500
    })
    verCarrito();
    costos()
    localStorage.clear();
}
)
function costos (){
    precioTotal.innerHTML= carrito.reduce((acc, item)=> acc + item.precio * item.cantidad,0);
    agregados.innerHTML =carrito.reduce((acc,iten)=> acc + (iten.precio * iten.cantidad),0)
}

// aca dejo el llamado a la poke api con el fin de ver los objetos por consola para su posterior uso 
// const callApi = () => {
//     fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(res => res.json())
//     .then(data => 
//         console.log(data);)
//     .catch(e => console.error(e) )
// }

// callApi()





