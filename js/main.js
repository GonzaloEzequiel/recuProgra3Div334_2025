let frutas = [
    { id: "1", nombre: "arandano", precio: "5000", rutaDeLaImagen: "../img/arandano.jpg" },
    { id: "2", nombre: "banana", precio: "1000", rutaDeLaImagen: "../img/banana.jpg" },
    { id: "3", nombre: "frambuesa", precio: "4000", rutaDeLaImagen: "../img/frambuesa.png" },
    { id: "4", nombre: "frutilla", precio: "3000", rutaDeLaImagen: "../img/frutilla.jpg" },
    { id: "5", nombre: "kiwi", precio: "2000", rutaDeLaImagen: "../img/kiwi.jpg" },
    { id: "6", nombre: "mandarina", precio: "800", rutaDeLaImagen: "../img/mandarina.jpg" },
    { id: "7", nombre: "manzana", precio: "1500", rutaDeLaImagen: "../img/manzana.jpg" },
    { id: "8", nombre: "naranja", precio: "9000", rutaDeLaImagen: "../img/naranja.jpg" },
    { id: "9", nombre: "pera", precio: "2500", rutaDeLaImagen: "../img/pera.jpg" },
    { id: "10", nombre: "anana", precio: "3000", rutaDeLaImagen: "../img/anana.jpg" },
    { id: "11", nombre: "pomelo-amarillo", precio: "2000", rutaDeLaImagen: "../img/pomelo-amarillo.jpg" },
    { id: "12", nombre: "pomelo-rojo", precio: "2000", rutaDeLaImagen: "../img/pomelo-rojo.jpg" },
    { id: "13", nombre: "sandia", precio: "10000", rutaDeLaImagen: "../img/sandia.jpg" }
]

/**
 * la funcion inicializa la funcionalidad básica de la página
 * imprimiendo 
 *      los datos del alumno                solicitado en la consigna 2
 *      los productos del array original    solicitado en la consigna 3
 *      los datos del carrito almacenado en el localStorage (en el caso de que se refresque la página habiendo agregado productos previamente)
 */
function init() {
    imprimirDatosAlumno();
    imprimirProductos(frutas);
    mostrarCarrito();
}

/**
 * La función firma en consola y en el nav con los datos del alumno
 * función flecha
 */
const imprimirDatosAlumno = () => {

    const alumno = {
        dni: "33111296",
        nombre: "Gonzalo Ezequiel",
        apellido: "Pérez"
    }

    //imprimo en consola
    console.log(`Mi nombre es ${alumno.nombre} ${alumno.apellido}, y mi número de DNI es ${alumno.dni}`);

    //tomo el elemento de clase "nombreAlumno" y cambio el contenido del texto
    document.querySelector(".nombre-alumno").textContent = `${alumno.apellido}, ${alumno.nombre}`;
}
/**
 * La función "imprime" los objetos de un array dado, manipulando el DOM y agregando por cada objeto del array una tarjeta con su información (y su respectivo botón)
 * @param {*} array el array de objetos a imprimir
 * función expresada
 */
const imprimirProductos = function(array) {

    //tomo el elemento contenedor de los productos
    let contenedorProductos = document.querySelector(".contenedor-productos");
    //y lo limpio previa vez que se vayan a mostrar
    contenedorProductos.innerHTML = "";

    //Aquí elijo iterar mediante el forEach (porCada) pues es más simple de leer, y si usara un bucle for clásico debería considerar el caso quese agreguen productos al array original...
    //y por cada elemento del array de objetos que recibe
    array.forEach(producto => {

        //creo su tarjeta
        const tarjeta = document.createElement("div");
        //y estructuro para mostrar los datos del objeto iterado, y le añado funcionalidad al botón tomando como argumento el id del objeto iterado
        tarjeta.innerHTML += `
            <div class="card-producto">
                <img src="${producto.rutaDeLaImagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        //agrego la tarjeta al contenedor
        contenedorProductos.appendChild(tarjeta);
    });
}

//tomo el elemento input (buscador)
const inputBarraBusqueda = document.querySelector(".barra-busqueda");
//y le agrego un escuchador de eventos por cada vez que una tecla se presione (en realidad cuando quito el dedo de la tecla), llamando a la función de filtro
inputBarraBusqueda.addEventListener("keyup", filtrarProductos);
/**
 * La función recibe un array de objetos, y llama a la función de imprimirProductos según la modificación del elemento input
 * función declarada
 */
function filtrarProductos() {

    //defino el textoIngresado como el valor del elemento dentro del buscador
    let textoIngresado = inputBarraBusqueda.value;
    //y aplico un filtro sobre el array original, que devuelve un nuevo array sólo con los elementos cuyo nombre incluyan parte del valor ingresado en su nombre
    //este resultado se lo paso a la función imprimir
    imprimirProductos(frutas.filter(fruta => fruta.nombre.toLowerCase().includes(textoIngresado.toLowerCase())));
}

// ----------------------------- SECCION CARRITO

//tomo y creo los elementos necesarios para esta operacion, el contenedor-carrito, la lista de productos, contador y precio
let seccionCarrito = document.getElementById("items-carrito");
const listaProductos = document.createElement("ul");
let contadorCarrito = document.getElementById("contador-carrito");
const precioTotal = document.getElementById("precio-total");

/**
 * La función mostrará el valor del carrito en pantalla, si no tiene productos dentro, o si tiene mostrará cuántos y el valor total de la suma de sus precios 
 */
function mostrarCarrito() {
    
    //traigo el carrito del localStorage
    let carrito = obtenerCarrito();
    //y veo cuanto productos tiene dentro
    let cantElementos = carrito.length;

    //muestro el carrito por consola
    console.log("Carrito en consola:");
    console.log(carrito); 
    
    //limpio el contenido de la lista por cada ejecución, evitando acumulaciones por llamadas anteriores
    listaProductos.innerHTML = "";

    //si el carrito tiene elementos
    if(carrito.length) {

        //remuevo el elemento <p> "No hay elementos en el carrito."
        seccionCarrito.innerHTML = "";
        //agrego el botón que permitirá vaciar el carrito, enunciado #9
        seccionCarrito.appendChild(btnVaciarCarrito);
        //y modifico el elemento que muestra la cantidad de elementos
        contadorCarrito.textContent = cantElementos;

        //luego por cada uno de los elementos del carrito, muestro su nombre y precio, 
        // añadiendo funcionalidad al botón que permite quitarlo del carrito, usando como argumento el id del objeto iterado
        // y añadiendo el contador y botones solicitados en el enunciado #7
        carrito.forEach(producto => {
            listaProductos.innerHTML += `
                <li class="bloque-item">
                    <p class="nombre-item">${producto.nombre} - $${producto.precio}</p>
                    <span>
                        <button class="cant" id="menos" onclick="quitarDelCarrito(${producto.id})">-</button>                    
                        ${producto.cantidad}                    
                        <button class="cant" id="mas" onclick="agregarAlCarrito(${producto.id})">+</button>
                    </span>
                    <button class="boton-eliminar" onclick="quitarTodos(${producto.id})">Eliminar</button>
                </li>
            `;
        });

        //agrego al DOM la lista de productos dentro del carrito
        seccionCarrito.appendChild(listaProductos);
        //y modifico el precio total en pantalla empleando el método reduce, que suma el precio de cada elemento y devuelve el total acumulado (dejando los dos decimales heredados)
        precioTotal.textContent = `$${carrito.reduce((totalAcumulado, prod) => totalAcumulado += Number(prod.precio), 0).toFixed(2)}`;
    } 
    //si el carrito está vacío
    else {
        //muestro la cantidad de elementos
        contadorCarrito.textContent = 0;
        //vuelvo a mostrar el mensaje original
        seccionCarrito.innerHTML = "<p>No hay elementos en el carrito.</p>";
        //agrego la imagen del carrito vacío, enunciado #9
        seccionCarrito.innerHTML += `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE5CpZWbCXJkN3jZQGfPnbLspEkaj1x1s9rg&s" alt="carrito-vacio" class="carrito-img">`
        //y modifico el precio
        precioTotal.textContent = "$0.00";
    }    
}
/**
 * Agrega al carrito el producto recibido por parámetro
 * @param {*} id identificador numérico unívoco del producto a agregar al carrito
 */
function agregarAlCarrito(id) {

    //traigo el carrito del localStorage
    carrito = obtenerCarrito();
    //busco el producto cuyo atributo "id" se corresponda con el recibido como argumento
    let producto = frutas.find(fruta => fruta.id == id);

    //veo si ya existe en el carrito
    let productoExistente = carrito.find(item => item.id == id);
    //si existe
    if(productoExistente) {

        //sumo 1 al atributo creado cant
        productoExistente.cantidad++
    } 
    //y  sino, lo agrego al carrito con cant 1
    else {
        producto.cantidad = 1;
        carrito.push(producto);
    }    

    //guardo en localStorage y muestro el carrito en el DOM
    guardarCarrito(carrito);
    mostrarCarrito();
}
/**
 * Quita del carrito el producto recibido recibido por parámetro
 * @param {*} id identificador numérico unívoco del producto a quitar del carrito
 */
function quitarDelCarrito(id) {

    //traigo el carrito del localStorage
    carrito = obtenerCarrito();

    //almaceno el índice del producto cuyo atributo "id" se corresponda con el recibido como argumento
    let auxIndex = carrito.findIndex(prod => prod.id == id);
    
    //si este existe en carrito
    if(auxIndex != -1) {
        //y hay más de uno, le quito uno a la cantidad del elemento indexado en el carrito
        if (carrito[auxIndex].cantidad > 1) {
            carrito[auxIndex].cantidad--;

        } else {
            //y si era el último lo remuevo
            carrito.splice(auxIndex, 1);
        }
    }

    //guardo en localStorage y muestro el carrito en el DOM
    guardarCarrito(carrito);
    mostrarCarrito();
}

/**
 * Quita del carrito todos los producto de un mismo id recibido como parámetro
 * @param {*} id identificador numérico unívoco del producto a quitar del carrito
 */
function quitarTodos(id) {

    //traigo el carrito del localStorage
    carrito = obtenerCarrito();
    //"corto" el array carrito en el índice del producto cuyo atributo "id" se corresponda con el recibido como argumento
    carrito.splice(carrito.findIndex(prod => prod.id == id), 1);

    //guardo en localStorage y muestro el carrito en el DOM
    guardarCarrito(carrito);
    mostrarCarrito();
}

// ----------------------------- SECCION CARRITO LocalStorage
/**
 * Lee o crea el carrito según corresponda
 * @returns devuelve el valor del carrito
 */
function obtenerCarrito() {
    
    //mediante un operador verifico la existencia del "carrito" en el localStorage
    // si existía lo parseo, si el carrito no existía lo creo como array vacío
    let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    return carrito;
}
/**
 * Guarda en el localStorage el valor del carrito tras una operación
 * @param {*} carrito el carrito a guardar
 */
function guardarCarrito(carrito) {
    //paso el carrito a string y lo guardo en el localStorage
    let carritoString = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoString);
}

// ----------------------------- SECCIÓN BOTONERA 

//Acá creo los botones y los agrego al contenedor "botonera" que cree en HTML 
let btnOrdenarNombreAsc = document.createElement("button"); btnOrdenarNombreAsc.textContent = "Ordenar por Nombre A-Z";
let btnOrdenarNombreDesc = document.createElement("button"); btnOrdenarNombreDesc.textContent = "Ordenar por Nombre Z-A";
let btnOrdenarPrecioAsc = document.createElement("button"); btnOrdenarPrecioAsc.textContent = "Ordenar por Menor Precio";
let btnOrdenarPrecioDesc = document.createElement("button"); btnOrdenarPrecioDesc.textContent = "Ordenar por Mayor Precio";
let botonera = document.getElementById("botonera");
botonera.appendChild(btnOrdenarNombreAsc);
botonera.appendChild(btnOrdenarNombreDesc);
botonera.appendChild(btnOrdenarPrecioAsc);
botonera.appendChild(btnOrdenarPrecioDesc);

//agrego funcionalidad a los botones cuando se clickeen, todas emplean la funcion filtrarProductos de modo que se puedan ordenar los productos previamente filtrados
//estos reciben el array ordenado según el criterio necesario, empleo la funcionalidad sort
//  para los de orden alfabético: comparo los atributos nombre de cada elemento con el sucesor y los reordena
//  para los de orden numérico: comparo los atributos precio de elemento con el sucesor tomando la diferencia
btnOrdenarNombreAsc.addEventListener("click", () => { filtrarProductos(frutas.sort((a, b) => a.nombre > b.nombre ? 1 : -1 )); });
btnOrdenarNombreDesc.addEventListener("click", () => { filtrarProductos(frutas.sort((a, b) => a.nombre < b.nombre ? 1 : -1 )); });
btnOrdenarPrecioAsc.addEventListener("click", () => { filtrarProductos(frutas.sort((a, b) => a.precio - b.precio )); });
btnOrdenarPrecioDesc.addEventListener("click", () => { filtrarProductos(frutas.sort((a, b) => b.precio - a.precio )); });

//Creo el botón para vaciar el carrito
let btnVaciarCarrito = document.createElement("button");
btnVaciarCarrito.textContent = "Vaciar Carrito";
//y le agrego funcionalidad cuando se clickee
btnVaciarCarrito.addEventListener("click", () => {
    let carrito = obtenerCarrito();
    carrito.forEach((prod) => quitarTodos(prod.id));
});

init();