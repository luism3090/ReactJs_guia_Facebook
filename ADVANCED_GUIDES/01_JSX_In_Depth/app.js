


 // ---------------------------------------- JSX In Depth -----------------------------------------


// Fundamentalmente, JSX sólo proporciona azúcar sintáctico para la función React.createElement
//  (componentes, props, ... child). de el código JSX:

// <MyButton color="blue" shadowSize={2}>
//   Click Me
// </MyButton>

// Compila en:

// React.createElement(
//   MyButton,
//   {color: 'blue', shadowSize: 2},
//   'Click Me'
// )


// tu tambien puedes usar el cierre automatico de formulario de etiquetas if no hay hijos ejemplo:

// <div className="sidebar" />

// compila en:

// React.createElement(
//   'div',
//   {className: 'sidebar'},
//   null
// )


// Si desea probar cómo algunos JSX específicos se convierten en JavaScript,Puedes probar en 
// https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&targets=&browsers=&builtIns=false&debug=false&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D



// --------------------------- Especificación del tipo de elemento React -------------------------------------


// La primera parte de una etiqueta JSX determina el tipo del elemento React.

// Las letras mayúsculas indican que la etiqueta JSX se refiere a un componente React. Estas etiquetas 
// se compilan en una referencia directa a la variable nombrada, por lo que si utiliza la expresión JSX, 
// <Foo /> debe estar en el scope.


// ----------------------------- REact debe estar en el Scope -------------------------------


// Dado que JSX se compila en llamadas a React.createElement, la biblioteca React también debe estar
//  siempre en el ámbito de su código JSX.

// Por ejemplo, ambas importaciones son necesarias en este código, aunque React y CustomButton no están 
// directamente referenciados desde JavaScript:


// // import React from 'react';
// import CustomButton from './CustomButton';

// function WarningButton() {
//   // return React.createElement(CustomButton, {color: 'red'}, null);
//   return <CustomButton color="red" />;
// }

import React from "react";
import ReactDOM from 'react-dom';


import {CustomButton} from './CustomButton.js';

function WarninButton()
{
	return(<CustomButton url='http://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Warning-icon.png' />);
}


ReactDOM.render(<WarninButton />,document.getElementById('cont1'));



// ------------------------------ Uso de la notación de puntos para JSX Tipo  ----------------------------------------


// También puede hacer referencia a un componente React utilizando la notación de puntos desde dentro de JSX. Esto es conveniente si 
// tiene un solo módulo que exporta muchos componentes de React.children Por ejemplo, si MyComponents.DatePicker es un componente,
// puede utilizarlo directamente desde JSX con:



// mi ejemplo creado por mi mismo

const MiComponente = {
	Saludo : function Saludo(props)
	{
		return(<h2>Hola mundo {props.mensaje}</h2>);
	},
	SumaNumeros : function SumaNumeros(props)
	{ 
		return(<h2>La suma de los números es: {props.num1+props.num2} </h2>);
	}
}

function MostrarSaludo()
{
	return(		<div>
					<MiComponente.Saludo mensaje={"ReactJs"}/>
					<MiComponente.SumaNumeros num1={5} num2={5} />
				</div>
			);
}


ReactDOM.render(<MostrarSaludo />,document.getElementById('cont2'));



// ejemplo de la libreria de React js


const MyComponents = 
{
  DatePicker: function DatePicker(props) 
  {
    return <h2>Imagine a {props.color} datepicker here.</h2>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

ReactDOM.render(<BlueDatePicker />,document.getElementById('cont3'));



// ---------------------- Los componentes definidos por el usuario deben estar en mayúsculas -----------------------------------


// Cuando un tipo de elemento comienza con una letra minúscula, se refiere a un componente incorporado como <div> o <span> 
// y resulta en una cadena 'div' o 'span' pasada a React.createElement. Tipos que comienzan con una letra mayúscula 
// como <Foo /> compilan a React.createElement (Foo) y corresponden a un componente definido o importado en su archivo JavaScript.


// Se recomienda nombrar componentes con una letra mayúscula. Si tiene un componente que comienza con una letra minúscula,
//  asignele a una variable mayúscula antes de usarla en JSX.


// Por ejemplo, este código no se ejecutará como se esperaba:


// ¡Incorrecto! Este es un componente y debe haber sido capitalizado:

// function hello(props) {
//   // ¡Correcto! Este uso de <div> es legítimo porque div es una etiqueta HTML válida:
//   return <div>Hello {props.toWhat}</div>;
// }

// function HelloWorld() {
//   // ¡Incorrecto! Reaccionar piensa que es una etiqueta HTML porque no está en mayúsculas:
//   return <hello toWhat="World" />;
// }


// Para arreglar esto, cambiaremos el nombre de hello a Hello y usaremos <Hello /> cuando nos referimos a él:


function Hello(props)
{
	return <div> Hello {props.toWhat}</div>;
}

function HelloWorld()
{
	return <Hello toWhat='World' />;
}


ReactDOM.render(<HelloWorld />,document.getElementById('cont4'));



// ------------------------------ Selección del tipo en Runtime ----------------------------------------------


// No puedes utilizar una expresión general como un tipo de elemento React. Si desea utilizar una expresión general 
// para indicar el tipo del elemento, sólo tiene que asignarlo primero a una variable mayúscula. Esto suele aparecer cuando
//  se desea representar un componente diferente basado en un prop:

// Ejemplo incorrecto :

// import {PhotoStory,VideoStory} from './stories.js'


// const components = {
//   photo: PhotoStory,
//   video: VideoStory
// };

// function Story(props) {
//   // ¡Incorrecto! El tipo JSX no puede ser una expresión.
//   return <components[props.storyType] story={props.story} />;
// }


// Ejemplo Correcto :

// Ejemplo creado por mi mismo 


import {HsitoriaFoto,HistoriaVideo} from './stories.js';

const misComponentes = 
{
	foto:HsitoriaFoto,
	video:HistoriaVideo
};

function Historia(props)
{
	const HistoriaEspecifica = misComponentes[props.tipoHistoria];
	return <HistoriaEspecifica msjHistoria={props.msjHistoria} />
}

ReactDOM.render(<Historia  tipoHistoria={'foto'} msjHistoria={'Mi foto favorita'} />,document.getElementById('cont5'));


// Ejemplo de la documentacion de ReactJs de facebook 


import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // ¡Correcto! El tipo JSX puede ser una variable mayúscula.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}


ReactDOM.render(<Story  storyType={'video'} story={'My favorite video'} />,document.getElementById('cont6'));



 // ----------------------------------------- Props en JSX -------------------------------------------------------------------


//Hay varias maneras diferentes de especificar props en JSX.


// ----------- Expresiones JavaScript como Props  ---------------------


// Puede pasar cualquier expresión JavaScript como props, rodeándola con {}. Por ejemplo, en este JSX:

// <MyComponent foo={1 + 2 + 3 + 4} />

// Para MyComponent, el valor de props.foo será 10 porque se evalúa la expresión 1 + 2 + 3 + 4.


// Para MyComponent, el valor de props.foo será 10 porque se evalúa la expresión 1 + 2 + 3 + 4.

// Si las sentencias y los 'for' bucles no son expresiones en JavaScript, entonces no se pueden usar en JSX directamente. 
// En su lugar, puede poner estos en el código circundante. Por ejemplo:


function NumeroParImpar(props)
{
	let descripcion = "";

	if(props.n1 % 2 == 0)
	{
		descripcion = <strong>Par</strong>;
	}
	else
	{
		descripcion = <strong>Impar</strong>;
	}

	return (<div>El número {props.n1} es un número {descripcion} </div>);

}

ReactDOM.render(<NumeroParImpar n1={5} />,document.getElementById('cont7'));



// Puedes aprender más sobre
// conditional rendering :
// https://facebook.github.io/react/docs/jsx-in-depth.html
// and loops : 
// https://facebook.github.io/react/docs/lists-and-keys.html
// en sus correspondientes sesiones


// --------------------------------------- Cadenas de literales --------------------------------------------


// Puede pasar un literal de cadena como un prop. Estas dos expresiones JSX son equivalentes:


// <MyComponent message="hello world" />

// <MyComponent message={'hello world'} />


// Cuando se pasa un literal de cadena, su valor es HTML-unescaped. Así que estas dos expresiones JSX son equivalentes:


// <MyComponent message="&lt;3" />

// <MyComponent message={'<3'} />


// Este comportamiento generalmente no es relevante. Sólo se menciona aquí para completar.



// -------------------------------- Props Por defecto a "True" ------------------------------------------


// Si no pasa ningún valor para un prop, el valor predeterminado es true. Estas dos expresiones JSX son equivalentes:


// <MyTextBox autocomplete />

// <MyTextBox autocomplete={true} />


// En general, no recomendamos usarlo porque puede confundirse con la abreviatura de objeto ES6 {foo}, 
// que es corta para {foo: foo} en lugar de {foo: true}. Este comportamiento sólo está allí para que coincida con 
// el comportamiento de HTML. 



// ------------------------------------------ Distribución de atributos ---------------------------------------------


// Si ya tienes un objeto 'props', y desea pasarlo en JSX, puede utilizar ... como un operador de "propagación" 
// para pasar todo el objeto de props.

function Saludo(props)
{
	return <h3>Hola {props.nombre} {props.apellido} </h3>;
}


function MiApp1(props)
{
	return <Saludo nombre='Luis' apellido='Molina' />;
}

ReactDOM.render(<MiApp1 />,document.getElementById('cont7'));

function MiApp2(props)
{
	const datos = {nombre: 'Luis', apellido:'Molina'};
	return <Saludo {...datos} />;
}


ReactDOM.render(<MiApp1  />,document.getElementById('cont7'));
ReactDOM.render(<MiApp2  />,document.getElementById('cont8'));


// Los atributos de propagación pueden ser útiles cuando se están construyendo contenedores genéricos. 
// Sin embargo, también pueden hacer su código desordenado por lo que es fácil pasar un montón de props irrelevantes 
// a los componentes que no les importa. Le recomendamos que use esta sintaxis con moderación.



// ------------------------------------------- Children en JSX ---------------------------------------


// En las expresiones JSX que contienen una etiqueta de apertura y una etiqueta de cierre, el contenido entre esas 
// etiquetas se pasa como un prop especial: props.children. Hay varias maneras de pasar a los children:


// --------- cadenas literales ----------------


// Puede poner una cadena entre las etiquetas de apertura y cierre y props.children será solo esa cadena. Esto es útil 
// para muchos de los elementos HTML incorporados. Por ejemplo:

// <MyComponent>Hello world!</MyComponent>


// Esto es JSX válido, y props.children en MyComponent será simplemente la cadena "Hello world!". HTML no se escapa,
//  por lo que generalmente puedes escribir JSX al igual que escribiría HTML de esta manera:

// <div>Esto es válido en HTML &amp; JSX al mismo tiempo.</div>


// JSX elimina espacios en blanco al principio y al final de una línea. También elimina líneas en blanco. 
// Se eliminan las nuevas líneas adyacentes a las etiquetas; Las nuevas líneas que se producen en el medio de literales
//  de cadena se condensan en un solo espacio. Así que todos ellos renderean la misma cosa:


// <div>Hello World</div>

// <div>
//   Hello World
// </div>

// <div>
//   Hello
//   World
// </div>

// <div>

//   Hello World
// </div>


// -------------------------------------------- Children JSX  ------------------------------------------------------


// Puedes proporcionar más elementos JSX como children. Esto es útil para mostrar componentes anidados:


// <MyContainer>
//   <MyFirstComponent />
//   <MySecondComponent />
// </MyContainer>


// Puede mezclar diferentes tipos de children, por lo que puede utilizar cadenas de caracteres junto con children JSX. 
// Esta es otra forma en la que JSX es como HTML, de modo que esto es válido tanto en JSX como en HTML:


// <div>
//   Here is a list:
//   <ul>
//     <li>Item 1</li>
//     <li>Item 2</li>
//   </ul>
// </div>


// ejemplo :


function Mycontenedor()
{
	return <div id='divContenedor'>this.children</div>
}


















































































// otros ejemplos creados por mi mismo 

import {FeedbackMessage,Header} from './app2.js';
// import  Header from './app2';


var clientes = [
					{nombre:"cliente1",apellido:"apellido1",edad:20},
					{nombre:"cliente2",apellido:"apellido2",edad:30},
					{nombre:"cliente3",apellido:"apellido3",edad:35},
					{nombre:"cliente4",apellido:"apellido4",edad:15}
				]


ReactDOM.render(<FeedbackMessage  />,document.getElementById('cont15'));
ReactDOM.render(<Header clientes={clientes} />,document.getElementById('cont16'));
//ReactDOM.render(<FeedbackMessage />,document.getElementById('cont2')); 



















