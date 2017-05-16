
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









