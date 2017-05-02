// Componentes y Props 


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
	text:"React Js una libreria increible para javascrip",
	date: new Date(),
	author:
	{
		 name: 'Luis Molina',
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

// function Avatar(props) {
//   return (
//     <img className="Avatar"
//       src={props.user.avatarUrl}
//       alt={props.user.name}
//     />
//   );
// }

// El Avatar no necesita saber que está siendo rendereado dentro de un Comentario. 
// Esta es la razón por la que hemos dado a su prop un nombre más genérico: user en lugar de autor.

// Recomendamos nombrar las props desde el punto de vista del componente en lugar 
// del contexto en el que se está utilizando.


// Ahora podemos simplificar el componente Comentario un poco:


// function Comment(props) {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <Avatar user={props.author} />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }


// A continuación, extraeremos un componente UserInfo que renderiza un Avatar junto al nombre del usuario:


// function UserInfo(props) {
//   return (
//     <div className="UserInfo">
//       <Avatar user={props.user} />
//       <div className="UserInfo-name">
//         {props.user.name}
//       </div>
//     </div>
//   );
// }


// Esto nos permite simplificar aún más el comentario:



// function Comment(props) {
//   return (
//     <div className="Comment">
//       <UserInfo user={props.author} />
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }


// Ejemplos : 


// ------------  Ejemplo de la libreria de facebook de react js ---------------


function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className="Avatar"
         src={props.user.avatarUrl}
         alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://www.mastermagazine.info/termino/wp-content/uploads/Usuario-Icono.jpg'
  }
};


ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author} />,
  document.getElementById('cont4')
);


// Extracción de componentes puede parecer un trabajo tedioso al principio, pero tener una paleta de componentes 
// reutilizables vale la pena en aplicaciones más grandes. Una buena regla general es que si una parte de
// su interfaz de usuario se utiliza varias veces (Button, Panel, Avatar) O es bastante complejo por sí mismo 
//  (App, FeedStory, Comment)  Es un buen candidato para ser un componente reutilizable.




// ---------------  Mi ejemplo creado por mi mismo    --------------------



function UserAvatar(props)
{
	const userAvatar = ( 	<div className="userInfo-avatar">
								<img 	src={props.user.url}
										width={props.user.alto} 
										height={props.user.ancho}
								/>
							</div>
						);

	return userAvatar;
}

function UserInfo(props)
{
	const userInfo = 	(	<div>
								<div className="userInfo-nombre">
									<span>{props.user.nombre}</span>
								</div>
								<div className="userInfo-comentario">
									<span>{props.user.texto}</span>
								</div>
							</div>
							
						);

	return userInfo;
}

function UserFecha(props)
{
	const userFecha = 	( 
							<div className="userInfo-fecha">
								<span>{props.user.toLocaleDateString()}</span>
							</div>
						);

	return userFecha;
}

var datosUser=
{
	avatar:
	{
		url:"https://www.mastermagazine.info/termino/wp-content/uploads/Usuario-Icono.jpg",
		alto:"100px",
		ancho:"100px"
	},
	comentario:
	{
		nombre:"Luis Molina",
		texto:"Aprendiendo React Js",
	},
	fecha:new Date()
}

function UserComentario(props)
{
	const userComentario = (
								<div className="userInfo">
									<UserAvatar user={datosUser.avatar} />
									<UserInfo user={datosUser.comentario} />
									<UserFecha user={datosUser.fecha} />
								</div>
							);

	return userComentario;
}

ReactDOM.render(<UserComentario />,document.getElementById('cont5'))





// ---------------------------  Los props son de sólo lectura ---------------------------


// Ya sea que declare un componente como una función o una clase, nunca debe modificar sus propios props.
// Considere esta función sum:

function suma(a,b)
{
	return a + b;
}


// Estas funciones se llaman pure "puras" porque no intentan cambiar sus entradas, y siempre devuelven el mismo 
// resultado para las mismas entradas.



// Por el contrario, esta función es impura porque cambia su propia entrada:


function withdraw(account,amount)
{
	account.total -= amount;
}


// React es bastante flexible pero tiene una sola regla estricta:
// Todos los componentes React deben actuar como funciones puras con respecto a sus props.


// Por supuesto, las interfaces de usuario de aplicaciones son dinámicas y cambian con el tiempo. 
// En la siguiente sección, presentaremos un nuevo concepto de estado "state". 
// State permite que los componentes React modifiquen su salida en el tiempo en respuesta a las 
// acciones del usuario, las respuestas de la red y cualquier otra cosa, sin violar esta regla.




