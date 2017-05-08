
// ------------------------ Handling Events ---------------------------

// Manejar eventos con elementos React es muy similar a manejar eventos en elementos DOM. 
// Hay algunas diferencias sintácticas:

// 	* Los eventos de React se nombran usando camelCase, en lugar de minúsculas.

// 	* Con JSX se pasa una función como controlador de eventos, en lugar de una cadena.


// Por ejemplo, el HTML:

// <button onclick="activateLasers()">
//   Activate Laser
// </button>



// Es ligeramente diferente en React:

// <button onClick={activateLasers}>
//   Activate Lasers
// </button>


// Otra diferencia es que no se puede devolver false para evitar el comportamiento predeterminado en React. 
// Debe llamar a preventDefault explícitamente. Por ejemplo, con HTML simple, para evitar el comportamiento 
// de un enlace (link) predeterminado de abrir una nueva página, puede escribir:

// <a href="#" onclick="console.log('The link was clicked.'); return false">
//   Click me
// </a>


// En React, esto podría ser:

// function ActionLink() 
// {
// 	  function handleClick(e) 
// 	  {
// 	    e.preventDefault();
// 	    console.log('The link was clicked.');
// 	  }

// 	  return (
// 			    <a href="#" onClick={handleClick}>
// 			      Click me
// 			    </a>
// 	  );

// }


// Aquí, e es un evento sintético. React define estos eventos sintéticos de acuerdo con las especificaciones 
// de la W3C, por lo que no necesita preocuparse por la compatibilidad entre navegadores. 
// Consulte la guía de referencia de SyntheticEvent para obtener más información.

// Al usar React, generalmente no necesitará llamar a addEventListener para agregar oyentes a un elemento DOM 
// después de que se cree. En su lugar, sólo proporcione un oyente cuando el elemento se renderiza inicialmente.

// Cuando define un componente que utiliza una clase ES6, un patrón común es que un controlador de eventos 
// sea un método en la clase. Por ejemplo, este componente Toggle muestra un botón que permite al usuario
// alternar entre los estados "ON" y "OFF":


 class Toggle extends React.Component
 {
 	constructor(props)
 	{
 		super(props);
 		this.state = {isToggleOn:true};


 		// This binding is necessary to make `this` work in the callback
 		this.handleClick = this.handleClick.bind(this);

 	}

 	handleClick()
 	{
 		this.setState(function(prevState){
 			return {isToggleOn: !prevState.isToggleOn}
 		})
 	}

 	render()
 	{
 		return(	
 					<button onClick={this.handleClick}>
 						{this.state.isToggleOn ? 'ON' : 'OF'}
 					</button>
 				)
 	}
 }

ReactDOM.render(
  <Toggle />,
  document.getElementById('cont1')
);


// Tienes que tener cuidado con el significado de esto en devoluciones de llamada de JSX. 
// En JavaScript, los métodos de clase no están enlazados por defecto. Si olvidó enlazar 
// this.handleClick y pasarlo a onClick, esto estará indefinido cuando la función realmente se llame.

// Esto no es comportamiento específico de React; Es una parte de cómo funcionan las funciones en JavaScript.
//  Generalmente, si se refiere a un método sin () después de él, como onClick = {this.handleClick},
//   debe enlazar ese método.

// Si la llamada a bind te molesta, hay dos maneras de evitar esto. Si estas utilizando la sintaxis de 
//  experimental property initializer syntax , puedes utilizar inicializadores de propiedad para vincular
//  correctamente las devoluciones de llamada:


class LoggingButton1 extends React.Component {

  // Esta sintaxis garantiza que `this` esté enlazado dentro de handleClick.
  // Advertencia: esto es sintaxis * experimental * .

  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

ReactDOM.render(
  <LoggingButton1 />,
  document.getElementById('cont2')
);




// Esta sintaxis está habilitada de forma predeterminada en la aplicación https://github.com/facebookincubator/create-react-app
// Crear de React

// Si no utiliza la sintaxis del inicializador de propiedades, puede utilizar una función de flecha
// en la devolución de llamada:


class LoggingButton2 extends React.Component
{

	handleClick()
	{
		console.log('this is: ', this);
	}


	render(){

		// Esta sintaxis garantiza que `this` esté enlazada dentro de handleClick

		return(
				<button onClick={(e) => this.handleClick(e)}>
					Click me
				</button>
			)
	}
}

ReactDOM.render(
  <LoggingButton2 />,
  document.getElementById('cont3')
);


// El problema con esta sintaxis es que se crea una devolución de llamada diferente cada vez que se 
// procesa el LoggingButton2. En la mayoría de los casos, esto está bien. Sin embargo, 
// si esta devolución de llamada se pasa como un prop para componentes inferiores,
// Esos componentes podrían hacer una representación adicional. Por lo general recomendamos enlazar
// en el constructor o usar la sintaxis de inicializador de propiedad, 
// para evitar este tipo de problema de rendimiento





























































