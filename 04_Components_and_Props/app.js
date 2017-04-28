
// Los componentes le permiten dividir la interfaz de usuario en piezas independientes y reutilizables,
//  y pensar en cada pieza de forma aislada.

// Conceptualmente, los componentes son como las funciones de JavaScript. 
// Aceptan entradas arbitrarias (llamadas "props") y devuelven elementos React que describen 
// lo que debería aparecer en la pantalla.



//  -------------------- Componentes funcionales y de clase ----------------------


// La forma más sencilla de definir un componente es escribir una función JavaScript:


function Welcome1(props)
{
	return <h1>Hola, {props.name}</h1>;
}


// Esta función es un componente React válido porque acepta un solo argumento de objeto "props"
//  con datos y devuelve un elemento React. Llamamos a tales componentes "funcionales" 
//  porque son  literalmente funciones de JavaScript.



// También puede utilizar una clase ES6 para definir un componente:


class Welcome2 extends React.Component 
{
	render()
	{
		return <h1>Hola, {this.props.name}</h1>;
	}
}

// Los dos componentes anteriores son equivalentes desde el punto de vista de React.


// Las clases tienen algunas características adicionales que discutiremos en las siguientes secciones.
//  Hasta entonces, utilizaremos componentes funcionales para su concisión.



// ---------------------- Rendereando un Componente  --------------------------------------


// Anteriormente, sólo encontramos elementos React que representan las etiquetas DOM:

const element1 = <div />;

// Sin embargo, los elementos también pueden representar componentes definidos por el usuario:

const element2 = <Welcome2 name="Sara" /> 



// Cuando React ve un elemento que representa un componente definido por el usuario, 
// pasa los atributos JSX a este componente como un solo objeto. Llamamos a este objeto "props".


// Por ejemplo, este código muestra "Hello, Sara" en la página:


function Welcome3(props)
{
	return <h1>Hello, {props.name}</h1>;
}

const element3 = <Welcome3 name="Sara" />;

ReactDOM.render(element3
				,
				document.getElementById("cont1")
				);


// Repasemos lo que sucede en este ejemplo:

// 1. Llamamos a ReactDOM.render () con el elemento <Welcome name="Sara" />

// 2. React llama a el componente Welcome3 con {name: 'Sara'} como valores de props 

// 3. Nuestro componente  Welcome3 regresa un elemento <h1>Hello, Sara</h1> como resultado

// 4. React DOM actualiza eficientemente el DOM para que coincida con <h1>Hello, Sara</h1>.


// Advertencia: 

// Siempre inicie los nombres de los componentes con una letra mayúscula.

// Por ejemplo, <div /> representa una etiqueta DOM, pero <Welcome3 /> representa un componente
// y requiere que Welcome esté en el ámbito.


// ------------------------ Composición de componentes  -------------------------------


// Los componentes pueden referirse a otros componentes en su salida. 
// Esto nos permite usar la misma abstracción de componentes para cualquier nivel de detalle. 
// Un botón, un formulario, un diálogo, una pantalla: en las aplicaciones de React, 
// todos estos se expresan comúnmente como componentes.


// Por ejemplo, podemos crear un componente App que renderé Welcome muchas veces:


function App(props)
{
	return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render	(<div>
					<App name="Edite" />
					<App name="Cahal" />
					<App name="Sara" />
				</div>
					,
					document.getElementById('cont2')
				)


// Por lo general, las nuevas aplicaciones React tienen un componente de aplicación único en la parte superior. 
// Sin embargo, si integra React en una aplicación existente, puede comenzar de abajo hacia arriba 
// con un pequeño componente como Button y gradualmente trabajar su camino a la parte superior 
// de la jerarquía de vista.


// Advertencia: 

// Los componentes deben devolver un solo elemento raíz. Por eso hemos añadido un <div> para contener todos los 
// elementos que vengan del componente <Welcome />


// ------------------------------  Extracción de componentes --------------------------------


// No tenga miedo de dividir los componentes en componentes más pequeños.


// Por ejemplo, considere este componente de comentario:


function Comentario(props)
{
	const comentario = 	(
							<div className="Comment">
						      <div className="UserInfo">
						        <img className="Avatar"
						             src={props.author.avatarUrl}
						             alt={props.author.name} width="100px" height="100px"/>
						        <div className="UserInfo-name">
						          {props.author.name}
						        </div>
						      </div>
						      <div className="Comment-text">
						        {props.text}
						      </div>
						      <div className="Comment-date">
						        {props.date.toLocaleDateString()}
						      </div>
						    </div>
						);

	return comentario;
}

const datosComentario = 
{
	text:"React Js",
	date: new Date(),
	author:
	{
		 name: 'Anónimo',
    	 avatarUrl: "http://devstickers.com/assets/img/pro/cew3.png"
	} 
	
	

};


ReactDOM.render	(	<Comentario 
						 	date={datosComentario.date}
						    text={datosComentario.text}
						    author={datosComentario.author}
						/>
					,
					document.getElementById('cont3')
				)


// Acepta user (un objeto), urlFoto (una cadena) y date (una fecha) como props, y describe un comentario
// en un sitio web de medios sociales.

// Este componente puede ser difícil de cambiar debido a la anidación, y también es difícil 
// reutilizar partes individuales de la misma. Vamos a extraer algunos componentes de ella.



// En primer lugar, vamos a extraer la imagen o que es lo mismo el Avatar:

function Avatar(props)
{
	const avatar = 	(
						<img className="Avatar" 
							src={props.algo}
							alt={props.algo}
						/>
						,
						document.getElementById('cont4')
					);
}

// El Avatar no necesita saber que está siendo rendereado dentro de un Comentario. 
// Esta es la razón por la que hemos dado a su prop un nombre más genérico: el user en lugar de autor.












