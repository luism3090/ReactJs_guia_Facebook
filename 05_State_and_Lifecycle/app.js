//   ------------------ State and Lifecycle ------------------- 

// Considere el ejemplo del reloj de tictac de una de las secciones anteriores.

// Hasta ahora sólo hemos aprendido una forma de actualizar la interfaz de usuario.

// Llamamos a ReactDOM.render() para cambiar la salida renderizada:

function reloj()
{
	const element = (
						<div>
							<h1>Hola mundo</h1>
							<h2>Son las {new Date().toLocaleTimeString()}</h2>
						</div>
					);

	ReactDOM.render(
		element,
		document.getElementById('cont1')
	);
}

setInterval(reloj,1000);


// En esta sección, aprenderemos a hacer que el componente Clock sea verdaderamente reutilizable y encapsulado.
//  Establecerá su propio temporizador y se actualizará cada segundo.

// Podemos empezar por encapsular cómo se ve el reloj:


function Clock(props)
{
	const tmpClock = (
							<div>
						      <h1>Hola, Mundo!</h1>
						      <h2>Son las {props.date.toLocaleTimeString()}.</h2>
						    </div>
						);

	return tmpClock;
}

function Reloj2()
{
	ReactDOM.render(
					<Clock date={new Date()} />
					,
					document.getElementById("cont2")
					);
}

setInterval(Reloj2,1000);


// Sin embargo, se pierde un requisito fundamental: el hecho de que el reloj establece un temporizador 
// y actualiza la interfaz de usuario cada segundo debe ser un detalle de implementación del reloj.


// Idealmente queremos escribir esto una vez y tener la actualización del reloj en sí:


// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );


// Para implementar esto, necesitamos agregar "state" al componente Clock.

// Estado es similar a los props, pero es privado y totalmente controlado por el componente.

// Hemos mencionado antes que los componentes definidos como clases tienen algunas características adicionales. 
// El estado local es exactamente eso: una característica disponible solamente para las clases.



// -------------------------- Convertir una función en una clase ---------------------------


//Puede convertir un componente funcional como Reloj a una clase en cinco pasos:


// 1. Crea una clase ES6 con el mismo nombre que extienda React.Component.

// 2. Añada un único método vacío llamado render ().

// 3. Mueve el cuerpo de la función al método render ().

// 4. Reemplace los props con this.props en el render () body.

// 5. Elimine la declaración de función vacía restante.


class Clock2 extends React.Component 
{
	render()
	{
		return (	<div>
						<h1>Hola mundo</h1>
						<h2>Son las {this.props.date.toLocaleTimeString()}</h2>
					</div>
				);
	}
}


function renderClock()
{
	ReactDOM.render(	<Clock date={new Date()}/>
					,
					document.getElementById('cont3')
				);
}

setInterval(renderClock,1000);


// Clock2 es ahora definida como una clase en lugar de una función.

// Esto nos permite usar características adicionales como el estado local y los hooks del ciclo de vida.



// ------------------------  Agregar estado local a una clase  --------------------------------


// Vamos a mover la fecha de los props al estado en tres pasos:


// 1) Reemplace this.props.date con this.state.date en el método render():

// class Clock extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }


//  2) Agregue el constructor de clase "constructor" que asigne el estdo inicial this.state:

// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }


// Observe cómo pasamos props al constructor base:


// constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }


// Los componentes de la clase siempre deben llamar al constructor base usando props.


// 3) Remueva la propiedad date de el elemento <Clock />

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );

// Posteriormente agregaremos el código del temporizador al componente en sí.


// El resultado se ve así:

class Clock3 extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {date:new Date()}
	}

	render()
	{
		return 	(
					<div>
						<h1>Hola mundo</h1>
						<h2>Son las {this.state.date.toLocaleTimeString()}</h2>
					</div>
				)
	}
}


ReactDOM.render (	<Clock3 />
				,
				document.getElementById('cont4')
			);


// A continuación, haremos que el reloj configure su propio temporizador y se actualice cada segundo



// ------------------------- Añadiendo métodos de ciclo de vida a una clase ------------------------------------


// En aplicaciones con muchos componentes, es muy importante liberar los recursos que toman los componentes
//  cuando se destruyen.

// Queremos configurar un temporizador cada vez que el reloj sea renderizado al DOM por primera vez.
//  Esto se llama "mounting" montaje en React.

// También queremos borrar ese temporizador cada vez que se elimina el DOM producido por el reloj. 
// Esto se llama "unmounting" desmontando en React.

// Podemos declarar métodos especiales en la clase de componente para ejecutar algún código cuando un componente
//  se monta y se desmonta:


// class Clock extends React.Component
// {
// 	constructor(pros)
// 	{
// 		super(props)
// 		this.state = {date:new Date()}
// 	}

// 	componentDidMount()
// 	{

// 	}

// 	componentWillUnmount()
// 	{

// 	}

// 	render()
// 	{
// 		return (
// 					<div>
// 						<h1>Hola mundo</h1>
// 						<h1>Son las {this.state.date.toLocaleTimeString()} </h1>
// 					</div>
// 				)
// 	}
// }


// Estos métodos se denominan "hooks del ciclo de vida".


// El hook componentDidMount() se ejecuta después de que la salida del componente se ha procesado en el DOM. 
// Este es un buen lugar para configurar un temporizador:

// componentDidMount()
// {
// 	this.timerID = setInterval(
// 								() => this.tick()
// 								,
// 								1000
// 								)
// }

// Tenga en cuenta cómo guardamos el ID del temporizador justo en esto.

// Mientras this.props es creado por el propio React y this.state tiene un significado especial, eres libre 
// de agregar campos adicionales a la clase manualmente si necesitas guardar algo que no se usa para la salida visual.

// Si no utiliza algo en render(), no debería estar en el estado.

// Derribaremos el temporizador en el hooks del ciclo de vida componentWillUnmount():

// componentWillUnmount()
// {
// 		clearInterval(this.timerID);
// }


// Finalmente, implementaremos el método tick() que se ejecuta cada segundo.

// Utilizará this.setState() para programar actualizaciones en el estado local del componente:


class Clock4 extends React.Component
{
	constructor(props)
	{
		
		super(props)
		this.state = {date:new Date()};
	}

	componentDidMount()
	{
		
		this.timerID = setInterval(() => this.tick(),1000);
	}

	componentWillUnmount()
	{
		
		clearInterval(this.timerID)
	}

	tick()
	{
		
		this.setState({
			date:new Date()
		});
	}

	render()
	{

		return (
			      <div>
			        <h1>Hello, world!</h1>
			        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			      </div>
    			);
	}

}

ReactDOM.render(<Clock4 />
				,
				document.getElementById('cont5')
				)


// Ahora el reloj marca cada segundo.

// Repasemos rápidamente lo que está pasando y el orden en que se llaman los métodos:

// 1) Cuando <Clock4 /> se pasa a ReactDOM.render(), React llama al constructor del componente Clock4 . Dado que Clock4 
// necesita mostrar la hora actual, inicializa this.state con un objeto que incluye la hora actual. 
// Posteriormente actualizaremos este estado.

// 2) React luego llama al método render() del componente Clock4. Así es como React aprende lo que se debe mostrar
//  en la pantalla. React a continuación, actualiza el DOM para que coincida con la salida de renderizado del reloj.

// 3) Cuando la salida del componente Clock4 es insertada en el DOM, React llama al hook del ciclo 
// de vida componentDidMount(). En su interior, el componente Clock4 le pide al navegador que configure un
//  temporizador para llamar tick() una vez por segundo.

// 4) Cada segundo el navegador llama al método tick(). Dentro de él, el componente Clock4 programa una 
// actualización de la interfaz de usuario llamando a setState() con un objeto que contiene la hora actual. 
// Gracias a la llamada a setState(), React sabe que el estado ha cambiado y llama al método 
// render() de nuevo para saber qué debería estar en la pantalla. Esta vez, this.state.date en el método render()
//  será diferente, y por lo tanto la salida render incluirá el tiempo actualizado. 
//  Ract actualiza el DOM en consecuencia.


// 5) Si el componente Clock4 se elimina del DOM, React llama al hook del ciclo de vida componentWillUnmount() 
// para que el temporizador se detenga.




// --------------------------------- Uso correcto del 'state' estado  -------------------------------------------



// Hay tres cosas que debe saber acerca de setState().

// 1. No modifique el estado directamente 

// Por ejemplo, esto no volverá a representar un componente:

// Error

// this.state.comment = 'Hello';

// En su lugar, utilice setState ():

//Correcto 

// this.setState({comment:'Hello'});

// El único lugar donde se puede asignar this.state es el constructor.



// --------------------  Las actualizaciones de estado pueden ser asíncronas ---------------------------------------


// React puede enlazar varias llamadas setState() en una sola actualización para el rendimiento.

// Debido a que this.props y this.state pueden actualizarse de forma asíncrona, no debe confiar en sus valores
//  para calcular el siguiente estado.


// Por ejemplo, este código puede fallar al actualizar el contador:

// Error

this.setState({
	counter:this.state.counter + this.props.increment
})


// Para solucionarlo, utilice una segunda forma de setState() que acepte una función en lugar de un objeto.
//  Esta función recibirá el estado anterior como el primer argumento y los props en el momento en el que se aplica
//   la actualización como el segundo argumento:

//correcto

// this.setState(prevState,props) => ({
// 	counter: prevState.counter + props.increment 
// })


// Usamos una función "arrow function" o de flecha arriba, pero también funciona con funciones regulares:


// this.setState(function(prevState,props){
// 	return {
// 			counter: prevState.counter + props.increment
// 	};
	
// });



//  ---------------------------- Las actualizaciones de estado son funcionadas ------------------------------


// Cuando llama a setState(), React fusiona el objeto que proporciona en el estado actual. Por ejemplo, 
// su estado puede contener varias variables independientes:


 constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }


// A continuación, puede actualizarlos independientemente con llamadas setState() independientes:

componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }

// La fusión es superficial, por lo que this.setState({comments}) deja this.state.posts intacto,
//  pero reemplaza completamente this.state.comments.



































