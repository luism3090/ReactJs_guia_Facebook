
// --------------------------------- Uncontrolled Components --------------------------------------


// En la mayoría de los casos, recomendamos el uso de componentes controlados para 
// implementar formularios. En un componente controlado, los datos de formulario son manejados
//  por un componente React. La alternativa son los componentes no controlados, donde los 
//  datos del formulario son manejados por el propio DOM.

// Para escribir un componente no controlado, en lugar de escribir un controlador de eventos
//  para cada actualización de estado, puede utilizar una referencia 'ref' para obtener valores de 
//  formulario desde el DOM.


// Por ejemplo, este código acepta un solo nombre en un componente no controlado: 


class CompForm extends React.Component
{
	constructor(props)
	{
		super(props);

		this.handlerEnvio = this.handlerEnvio.bind(this); 
	}


	handlerEnvio(e)
	{
		e.preventDefault();
		alert('Los datos enviados son ' + this.refInputNombre.value);
	}

	render()
	{
		return(
				<form onSubmit={this.handlerEnvio}>
					<label>Nombre</label>
					<input type='text'  ref={(input) => this.refInputNombre = input} />
					<input type='submit' value='Enviar' />
				</form>
			  )
	}	
}


ReactDOM.render(<CompForm />,document.getElementById('cont1'));


// Dado que un componente no controlado mantiene la fuente verdadera en el DOM, a veces es 
// más fácil integrar el código React y non-React al usar componentes no controlados. 
// También puede ser un poco menos código si desea ser rápido y sucio. De lo contrario, 
// normalmente debe utilizar componentes controlados.


// Si todavía no está claro qué tipo de componente debe utilizar para una situación particular, 
// puede encontrar este artículo en entradas controladas y no controladas para ser útil.

// articulo --> https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/



 // ------------------------ Valores por default ------------------------------------------


//  En el ciclo de vida de renderizacion de React , el atributo value en los elementos de formulario 
//  reemplazará el valor en el DOM. Con un componente no controlado, a menudo quieres que React 
//  especifique el valor inicial, Se Puede dejar las actualizaciones posteriores sin control. 
//  pero para manejar este caso, se puede especificar un atributo defaultValue en lugar de value.


class CompForm2 extends React.Component
{
	constructor(props)
	{
		super(props);

		this.handlerEnvio = this.handlerEnvio.bind(this); 
	}


	handlerEnvio(e)
	{
		e.preventDefault();
		alert('Los datos enviados son ' + this.refInputNombre.value);
	}

	render()
	{
		return(
				<form onSubmit={this.handlerEnvio}>
					<label>Nombre</label>
					<input type='text'  
						   ref={(input) => this.refInputNombre = input} 
						   defaultValue="Luis" />
					<input type='submit' value='Enviar' />
				</form>
			  )
	}	
}


ReactDOM.render(<CompForm2 />,document.getElementById('cont2'));


// Igualmente : 

// <input type="checkbox"> y <input type="radio"> soportan defaultChecked,
//  and <select> and <textarea> soportan defaultValue.




























