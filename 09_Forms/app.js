
// ------------------------------- FORMS ------------------------------------


// Los elementos de formulario HTML funcionan un poco diferente de otros elementos del DOM en React, 
// porque los elementos de formulario mantienen naturalmente un estado interno. 
// Por ejemplo, este formulario en HTML normal acepta un solo nombre:


// <form>
//   <label>
//     Name:
//     <input type="text" name="name" />
//   </label>
//   <input type="submit" value="Submit" />
// </form>


// Este formulario tiene el comportamiento de formulario HTML predeterminado de navegar a una nueva 
// página cuando el usuario envía el formulario. Si desea este comportamiento en React, sólo funciona.
//  Pero en la mayoría de los casos, es conveniente tener una función JavaScript que maneje el envio
//   del formulario y tenga acceso a los datos que el usuario ingresó en el formulario
// La forma estándar de lograr esto es con una técnica llamada "componentes controlados".


// -------------------------------------- componentes controlados ----------------------------------------


// En HTML, los elementos de formulario como <input>, <textarea>, y <select> Normalmente mantienen su propio 
// estado y lo actualizan basándose en la entrada del usuario. En React, el estado mutable 
// se mantiene normalmente en la propiedad state de los componentes y sólo se actualiza con setState().

// Podemos combinar los dos haciendo que el estado de React sea la "single source of truth" 
// "fuente única de la verdad". A continuación, el componente de React que renderea un formulario también 
// puede controlar lo que sucede en ese formulario en una entrada de datos por un usuario. 
// A un elemento de formulario de entrada de datos cuyo valor es controlado por React se le denomina 
// "componente controlado" 

// Por ejemplo, si queremos hacer el ejemplo anterior registrar el nombre cuando se envía, 
// podemos escribir el formulario como un componente controlado:


// Mi ejemplo 

class EnviarForm extends React.Component 
{
	constructor(props)
	{
		super(props);

		this.state = ({nombre: ''});

		this.cambiarNombre = this.cambiarNombre.bind(this);
		this.submitForm = this.submitForm.bind(this); 

	}

	cambiarNombre(event)
	{
		this.setState({nombre: event.target.value})
	}

	submitForm(event)
	{
		event.preventDefault();
		alert('El nombre enviado es '+this.state.nombre);
	}

	render()
	{
		return(
					<form>
						<label>
							Nombre:
						</label>
						<input type="text" value={this.state.nombre}  onChange={this.cambiarNombre} />
						<button onClick={this.submitForm} >Enviar</button> 
					</form>
				)
	}


}

ReactDOM.render(<EnviarForm />,document.getElementById('cont1'));



// ejemplo de la documentacion de React de facebook 

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}



ReactDOM.render(<EnviarForm />,document.getElementById('cont2'));


// Dado que el atributo value se establece en nuestro elemento de formulario, el valor que se mostrará siempre 
// será this.state.value, haciendo que el estado React sea el estado verdadero o el estado correcto . 
// Dado que handleChange se ejecuta en cada pulsación de tecla para actualizar el estado de React, 
// el valor mostrado se actualizará según el tipo de usuario.


// Con un componente controlado, cada mutación "Cambio" de estado tendrá una función de controlador asociada. 
// Esto hace que sea sencillo modificar o validar la entrada del usuario. Por ejemplo, si quisiéramos
//  hacer cumplir que los nombres se escriban con todas las letras mayúsculas, podríamos escribir 
//  handleChange como:


// handleChange(event) {
//   this.setState({value: event.target.value.toUpperCase()});
// }


// --------------------------- La etiqueta textarea ------------------------------


// En HTML, un elemento <textarea> define su texto por sus hijos 


// <textarea>
//   Hello there, this is some text in a text area
// </textarea>

// En React, un elemento <textarea> usa el atributo value en su lugar. De esta forma, un formulario usando un 
// elemento <textarea> Se puede escribir de forma muy similar a un formulario que utiliza una entrada
//  de una sola línea:



// Mi ejemplo creado por mi mismo

class EnviarResumen extends React.Component
{
	constructor()
	{
		super();

		this.state = ({resumen:'Escriba el resumen de su elemento DOM favorito'});

		this.cambiarResumen = this.cambiarResumen.bind(this);
		this.envioResumen = this.envioResumen.bind(this);
	}

	cambiarResumen(event)
	{
		this.setState({resumen: event.target.value})
	}

	envioResumen(event)
	{
		alert("tu resumen de tu elemento DOM favorito es: "+this.state.resumen);
		event.preventDefault();
	}

	render()
	{
		const tmpFormEnvioResumen = (
										<form onSubmit={this.envioResumen}>
											<label>Resumen:</label>
										    <textarea cols="30" rows="5" value={this.state.resumen} onChange={this.cambiarResumen} ></textarea>
										   	<button type="submit">Enviar</button>
										</form>
							  		)

		return tmpFormEnvioResumen;


	}
}

ReactDOM.render(<EnviarResumen />,document.getElementById('cont3'));


// ejemplo de la documentacion de React js de facebook


class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


ReactDOM.render(<EssayForm />,document.getElementById('cont4'))


// Observe que this.state.value se inicializa en el constructor, de modo que el área de texto
//  comienza con ese texto en él.



//  -------------------------------- El tag select -------------------------------------

// En Html, <select> Crea una lista desplegable. Por ejemplo, este código HTML crea una lista desplegable de sabores:


// <select>
//   <option value="grapefruit">Grapefruit</option>
//   <option value="lime">Lime</option>
//   <option selected value="coconut">Coconut</option>
//   <option value="mango">Mango</option>
// </select>


// Tenga en cuenta que la opción Coconut se selecciona inicialmente, debido al atributo selected . 
// React, en lugar de utilizar este atributo selected, utiliza el atributo value en la 
// etiqueta de raíz del select. Esto es más conveniente en un componente controlado porque solo es 
// necesario actualizarlo en un solo lugar. Por ejemplo:


// Mi ejemplo realizado por mi mismo

class SelectSabor extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = ({sabor:'vainilla'});

		this.envioSabor = this.envioSabor.bind(this);
		this.cambioSabor = this.cambioSabor.bind(this);

	}

	envioSabor(event)
	{
		event.preventDefault();
		alert("Tu sabor preferido es " + this.state.sabor);
		
	}

	cambioSabor(event)
	{
		this.setState({sabor:event.target.value});
	}

	render()
	{
		const tmpSelectSabor = (
								<form onSubmit={this.envioSabor} >
									<label>
										Seleciona tu sabor favorito :
									</label>
									<select  onChange={this.cambioSabor} value={this.state.sabor} >
										<option value="limon" >Limon</option>
										<option value="fresa">Fresa</option>
										<option value="vainilla">Vainilla</option>
										<option value="chocolate">Chocolate</option>
									</select>
									<button type="submit" >Enviar</button> 
								</form>
						 );

		return tmpSelectSabor;
	}

}


ReactDOM.render(<SelectSabor />,document.getElementById('cont5'));


// ejemplo de la documentacion de React de Facebook


class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('cont6')
);


// En general, esto hace que <input type="text">, <textarea> , y <select> Todos funcionen de manera muy 
// similar - todos ellos aceptan un atributo de value que puede utilizar para implementar un componente controlado.



// ---------------------------- Manejo de múltiples entradas --------------------------------------


// Cuando necesite manejar varios elementos de entrada controlados, puedes agregar un atributo "name" a
//  cada elemento y dejar que la función del manejador elija qué hacer en función del valor de event.target.name.

// Por ejemplo: 


// ejemplo creado por mi mismo

class EnviarReservacion extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = ({checkGoHotel: true, numberVisits: 1});

		this.cambioSomeForm = this.cambioSomeForm.bind(this); 
		this.enviado = this.enviado.bind(this); 
	}

	cambioSomeForm(event)
	{

		const target = event.target;
		var valor = "";
		if(target.type === 'checkbox')
		{
			valor = target.checked;
		}
		else
		{
			valor = target.value;
		}
		const nombre = target.name;

		this.setState({[nombre]:valor});


	}

	enviado(event)
	{
		event.preventDefault();
		alert("usted eligio " + this.state.checkGoHotel + " con numero de visitantes " + this.state.numberVisits);
	}

	render()
	{	
		const tmpEnvioReservacion = (
										<form onSubmit={this.enviado}>
											<label >ir a hotel:</label>
											<input type="checkbox" name="checkGoHotel" checked={this.state.checkGoHotel} onChange={this.cambioSomeForm} />
											<br />
											<label >Numero de visitantes</label>
											<input type="number" name="numberVisits" value={this.state.numberVisits} onChange={this.cambioSomeForm} />		
											<button type="submit">Enviar</button>
										</form>
									 );
		
		return tmpEnvioReservacion;

	}
}


ReactDOM.render(<EnviarReservacion />,document.getElementById('cont7'));


// Ejemplo de la documentacion de React de Facebook

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation />,
  document.getElementById('cont8')
);




// Observe cómo usamos la sintaxis de ES6 "computed property name"  "de nombre de propiedad calculada"  
//para actualizar la key de estado  correspondiente al nombre de entrada dado:

// this.setState({
//   [name]: value
// });


// Es equivalente a este código ES5:

// var partialState = {};
// partialState[name] = value;
// this.setState(partialState);


// Además, dado que setState () fusiona automáticamente un estado parcial con el estado actual, 
// sólo necesitábamos llamarlo con las partes modificadas.


// -------------------- Alternativas a los componentes controlados --------------------------------


// A veces puede ser tedioso utilizar componentes controlados, ya que necesita escribir un controlador 
// de eventos para cada elemento en el que sus datos pueden cambiar y canalizar todo el estado de entrada a través 
// de un componente React. Esto puede llegar a ser particularmente molesto cuando se está convirtiendo una
//  base de código preexistente a React, o la integración de una aplicación de React con una biblioteca
//   de no-React. En estas situaciones, es posible que desee comprobar componentes no controlados, 
// https://facebook.github.io/react/docs/uncontrolled-components.html
//   una técnica alternativa para implementar formularios de entrada.































