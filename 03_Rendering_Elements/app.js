
// --------------------- Rendering Elements ---------------------


// Los elementos son los bloques de construcción más pequeños de las aplicaciones de React.

// Un elemento describe lo que desea ver en la pantalla:

const element1 = <h1>Hello, World</h1>;
  
// A diferencia de los elementos DOM del navegador, los elementos React son objetos sencillos y 
// son baratos de crear. React DOM se encarga de actualizar el DOM para que coincida con los elementos React.

// Nota: 
// Uno podría confundir elementos con un concepto más ampliamente conocido de "componentes". 
// Introduciremos los componentes en la siguiente sección. 
// Los componentes son los que estan hechos de elementos  
// y le animamos a leer esta sección antes de saltar adelante.


// -------------- Renderizando un elemento en el DOM -------------------------------

 
// Digamos que hay un div en algun lugar en tu archivo html 

// <div id="root"></div>

// Llamamos a esto un nodo DOM "raíz" porque todo dentro de él será administrado por React DOM

// Las aplicaciones construidas con sólo React suelen tener un único nodo DOM raíz. 
// Si está integrando React en una aplicación existente, puede tener tantos nodos DOM raíz aislados como desee.

// Para convertir un elemento React en un nodo DOM raíz, pase ambos a ReactDOM.render ():


const element2 = <h1>Hello, world</h1>;

ReactDOM.render(element2,document.getElementById('root1'));

// Muestra "Hello World" en la página.


// ------------------ Actualización del elemento renderizado # -----------------------


// Los elementos de react son inmutables. Una vez que cree un elemento, no podrá cambiar sus hijos o atributos.
// Un elemento es como un solo fotograma en una película: representa la interfaz de usuario en un determinado momento.


// Considere este ejemplo de reloj tictac:

function reloj()
{
	const element3 = 	(
							<div>
								<h1>Hola mundo</h1>
								<h2>Son las {new Date().toLocaleTimeString()}</h2>
							</div>
						);

	ReactDOM.render(element3,document.getElementById('root2'));

}

setInterval(reloj,1000);


// esto Llama a ReactDOM.render () cada segundo desde una llamada setInterval ().


// Nota: 
// En la práctica, la mayoría de las aplicaciones de React sólo llaman ReactDOM.render () una vez.
//  En las siguientes secciones aprenderemos cómo se encapsula este código en componentes con estado.

// Recomendamos no omitir temas porque se basan unos en otros.


// ---------- React sólo actualizaciones Lo que es necesario # ----------

// React DOM compara el elemento y sus hijos con el anterior y sólo aplica las actualizaciones DOM 
// necesarias para llevar el DOM al estado deseado.


// Puede verificarlo mediante la inspección del último ejemplo (reloj tictac) con las herramientas del navegador:

// Aunque creamos un elemento que describe todo el árbol de la interfaz de usuario en cada reloj, 
// sólo el nodo de texto cuyo contenido ha cambiado se actualiza por React DOM.


// En nuestra experiencia, pensar en cómo la interfaz de usuario debe mirar en un momento dado en lugar
//  de cómo cambiarlo en el tiempo elimina toda una clase de errores.




