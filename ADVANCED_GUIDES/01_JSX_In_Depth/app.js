 
import React from "react";
import ReactDOM from 'react-dom';


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



import {CustomButton} from './CustomButton.js';

function WarninButton()
{
	return(<CustomButton url='http://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Warning-icon.png' />);
}


ReactDOM.render(<WarninButton />,document.getElementById('cont1'));



// ------------------------------ Uso de la notación de puntos para JSX Tipo  ----------------------------------------





























// otros ejemplos creados por mi mismo 

import {FeedbackMessage,Header} from './app2.js';
// import  Header from './app2';


var clientes = [
					{nombre:"cliente1",apellido:"apellido1",edad:20},
					{nombre:"cliente2",apellido:"apellido2",edad:30},
					{nombre:"cliente3",apellido:"apellido3",edad:35},
					{nombre:"cliente4",apellido:"apellido4",edad:15}
				]


ReactDOM.render(<FeedbackMessage  />,document.getElementById('cont2'));
ReactDOM.render(<Header clientes={clientes} />,document.getElementById('cont3'));
//ReactDOM.render(<FeedbackMessage />,document.getElementById('cont2')); 



















