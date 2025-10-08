//creo el array de objetos de los productos
const frutas = [
    { id: 1, nombre: "anana", precio: 10, ruta_img: "img/anana.jpg" },
    { id: 2, nombre: "arandano", precio: 30, ruta_img: "img/arandano.jpg" },
    { id: 3, nombre: "banana", precio: 50, ruta_img: "img/banana.jpg" },
    { id: 4, nombre: "frambuesa", precio: 70, ruta_img: "img/frambuesa.png" },
    { id: 5, nombre: "frutilla", precio: 20, ruta_img: "img/frutilla.jpg" },
    { id: 6, nombre: "kiwi", precio: 15, ruta_img: "img/kiwi.jpg" },
    { id: 7, nombre: "mandarina", precio: 25, ruta_img: "img/mandarina.jpg" },
    { id: 8, nombre: "manzana", precio: 75, ruta_img: "img/manzana.jpg" },
    { id: 9, nombre: "naranja", precio: 120, ruta_img: "img/naranja.jpg" },
    { id: 10, nombre: "pera", precio: 15, ruta_img: "img/pera.jpg" },
    { id: 11, nombre: "pomelo amarillo", precio: 75, ruta_img: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "pomelo rojo", precio: 55, ruta_img: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "sandia", precio: 65, ruta_img: "img/sandia.jpg" },
];

const alumno = {
    dni : 39492599,
    nombre: "Emiliano",
    apellido: "Garcia",
}


//guardo las variables de los elementos del DOM que voy a usar

let contenedorFrutas = document.getElementById("contenedorFrutas");
let contenedorCarrito = document.getElementById("contenedorCarrito");
let barraBusqueda = document.getElementById("barraBusqueda");
let saludoCliente = document.getElementById("saludoCliente");
let contadorCarrito = document.getElementById("contadorCarrito");



//uso console.log para imprimir los datos del alumno usando las backticks y modifico el texto del <p> en el nav para imprimir el nombre y apellido
function imprimirDatosAlumno(alumno){
    console.log(`Bienvenido a mi parcial ${alumno.nombre} ${alumno.apellido} dni ${alumno.dni}`);
    console.log(alumno.nombre + " " + alumno.apellido);
    console.table(carrito);
    saludoCliente.textContent = `Bienvenido ${alumno.nombre} ${alumno.apellido}`;

}


//con esta funcion recibo el array (ya sea el original o con el filtro) y genero el html de forma dinamica para mostrar los productos
function mostrarProductos(array) {
    let cartaProducto = "";
    array.forEach((fruta) => {
        cartaProducto += `
                <div class="card-producto">
                    <img src="${fruta.ruta_img}" alt="${fruta.nombre}" />
                    <h3>${fruta.nombre}</h3>
                    <p>$ ${fruta.precio}</p>
                    <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
                </div> `;
    });
    contenedorFrutas.innerHTML = cartaProducto;
}

//agrego el escuchador de eventos a la barra de busqueda, cada vez que se levanta una tecla llama a la funcion filtrar productos 
barraBusqueda.addEventListener("keyup", () => {
    filtrarProductos();
    
});

//es la funcion que sera llamada por la barra de busqueda, si el array de frutas CONTIENE en el nombre un string igual al de la barra, lo filtra generando otra array y la muestra ocn mosstrar productos
//tambien lo paso a tolowercase para que no sea keysensitive
function filtrarProductos(){
    let valorBusqueda = barraBusqueda.value;

    let productosFiltrados = frutas.filter(f => f.nombre.toLowerCase().includes(valorBusqueda.toLowerCase()));

    mostrarProductos(productosFiltrados);
}

let carrito;
//con esto chequeo si ya existia en memoria interna un carrito y sino creo uno vacio
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarContadorCarrito();
} else {
    carrito = [];
}

//genera dinamicamente el html del carrito añadiendole tambien el boton de eliminar y el total, ademas hace una validacion para cerrar si el carrito esta vacio o no
function mostrarCarrito(){

    let cartaCarrito = "<ul>";
    carrito.forEach((producto, indice) => {
        cartaCarrito +=
        `<li class="bloque-item">
            <p class="nombre-item">${producto.nombre}-$${producto.precio}</p>
            <button class="boton-eliminar" onclick="eliminarElemento(${indice})">Eliminar</button>
        </li>`
        
    });

    cartaCarrito += validarCarrito()

    contenedorCarrito.innerHTML = cartaCarrito;
    
}

//con esta funcion recibo el id de la fruta, genera un find interno donde va comparando el id del objeto con el recibido y si lo encuentra lo pushea al carrito

function agregarACarrito(id){

    let frutaSeleccionada = frutas.find(f => f.id === id);

    carrito.push(frutaSeleccionada);

    console.log(carrito);

    console.log(`id del producto: ${id}`);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
    actualizarContadorCarrito();
}

//recibe un indice y elimina el objeto del array que coincida con el, despues actualiza el carrito

function eliminarElemento(indice){
    console.log(`test de eliminado de indice ${indice}`);

    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    

    mostrarCarrito();
    actualizarContadorCarrito();
    
}

//vacia el carrito y actualiza el html y la memoria interna
function vaciarCarrito(){
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    contenedorCarrito.innerHTML = "";
}

//valida si el carrito tiene elementos o no, si tiene calcula el total y agrega el boton de vaciar carrito y valor
function validarCarrito() {

    if (carrito.length > 0) {
        let total = carrito.reduce((acum, el) => acum + el.precio, 0);  
        return `
                </ul><div id="carrito-footer">
                        <button onclick="vaciarCarrito()">Vaciar carrito</button>
                        <p>Total: $ ${total}</p>
                        </div>`;
                
    }else{
        return "</ul>";
    }
}


function actualizarContadorCarrito() {
    let cantidad = carrito.length;
    contadorCarrito.textContent = `Carrito: ${cantidad} productos`;
    if(cantidad === 0){
        contadorCarrito.innerHTML = ""
}}


//compara cada elemento del array y los ordena de menor a mayor precio en el array original
function ordenarPrecio() {
    frutas.sort((a, b) => a.precio - b.precio);
    mostrarProductos(frutas);
}

// el sort devuelve positivo, negativa o un 0, si es mayor da positivo, si es menor da negativo y si es igual da cero

function ordenarPorNombre(){
    frutas.sort((a, b) => {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
    });
    mostrarProductos(frutas);
}



//funcion iniciadora

function init(){
    imprimirDatosAlumno(alumno);
    mostrarProductos(frutas);
    mostrarCarrito();
    actualizarContadorCarrito();

}

init();