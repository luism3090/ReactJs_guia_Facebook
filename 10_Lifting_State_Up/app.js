
// ---------------------------- Lifting State Up --------------------------------------- 


// A menudo, varios componentes necesitan reflejar los mismos datos cambiantes. Recomendamos pasar
//  el estado compartido hasta su ancestro común más cercano. Veamos cómo funciona esto en acción.

// En esta sección, crearemos una calculadora de temperatura que calcula si el agua herviría a una 
// temperatura dada.

// Comenzaremos con un componente llamado BoilingVerdict, Que acepta la temperatura en grados 
// celsius como pararametro prop,  e imprime si eso es suficiente para hervir el agua:

// function BoilingVerdict(props)
// {
// 	if(props.celsius >= 100)
// 	{
// 		return <p>The water would boil</p>
// 	}
	
// 	return <p>The water would not boil</p>
// }


// A continuación, crearemos un componente denominado Calculadora. el cual renderea un input de texto 
// que le permite introducir la temperatura, y mantiene su valor en this.state.temperature.

// Además, renderea los elementos del componente BoilingVerdict para el valor de entrada actual.



// Mi ejemplo creado por mi

function MsjHervirAgua(props)
{
	
	if(props.celsius >= 100)
	{
		return <h4>El agua SI se va a hervir</h4>
	}
	return <h4>El agua NO se va a hervir</h4>
}


class Calculadora extends React.Component
{
	constructor(props)
	{
		//debugger

		super(props);

		this.state = ({celsius:''});

		this.cambioGrados = this.cambioGrados.bind(this);

	}

	cambioGrados(event)
	{
		//debugger
		const newGradosCelsius = event.target.value;

		this.setState({celsius: newGradosCelsius})
	}

	render()
	{
		//debugger

		const celsius = this.state.celsius;

		return(
				<form>
					<fieldset>
						<lengend>Ingrese los grados celsius a calcular</lengend>
						<input type="text" value={celsius} onChange={this.cambioGrados} />
						<br />
						<MsjHervirAgua celsius={ celsius!= "" ? parseFloat(celsius) : 0} />
					</fieldset>
				</form>
			  )
	}
}



ReactDOM.render(<Calculadora />,document.getElementById('cont1'))




// Ejemplo de la documentacion de React Js de facebook

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  	
  constructor(props) 
  {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('cont2')
);


// --------------------------------- añadiendo una segunda entrada -------------------------- 


// Nuestro nuevo requisito es que, además de una entrada Celsius, ofrecemos una entrada Fahrenheit,
//  y se mantienen sincronizados.

// Podemos comenzar extrayendo el componente TemperatureInput de Calculator.  
//tambien añadiremos una priedad 'prop' llamada scala que puede ser "c" o "f":


// Mi ejemplo hecho por mi mismo

const tipoTemperatura = {
							c:'Celsius',
							f:'Fahrenheit'
						}

class Temperatura extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = ({temperatura:''});

		this.cambioTemp = this.cambioTemp.bind(this);
	}


	cambioTemp(event)
	{
		this.setState({temperatura:event.target.value})
	}

	render()
	{
		const temperatura = this.state.temperatura;
		const tipo = this.props.tipo;

		const tmpFormTemp = (
								<fieldset>
									<legend>Ingrese la temperatura en grados {tipoTemperatura[tipo]} </legend>
									<input type="text" value={temperatura} onChange={this.cambioTemp} />
								</fieldset>
							);

		return tmpFormTemp;
	}
}



function Calcular()
{
	
		return(
				<div>
					<Temperatura tipo='c' />
					<Temperatura tipo='f' />
				</div>
			  )

}

ReactDOM.render(
  <Calcular />,
  document.getElementById('cont3')
);


// Ejemplo de la documentacion de REact js de facebook

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />

      </fieldset>
    );
  }
}

class Calculator2 extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator2 />,
  document.getElementById('cont4')
);


// Tenemos dos entradas ahora, pero cuando ingresas la temperatura en una de ellas, la otra no 
// se actualiza. Esto contradice nuestro requisito: queremos mantenerlos sincronizados.

// Tampoco podemos mostrar los elementos html del componente BoilingVerdict desde el componente Calculator2.
 // Ya que el componente  Calculator2 no conoce la temperatura actual porque está oculta dentro del componente 
// TemperatureInput


// ----------------------------- Escribiendo funciones de conversión ----------------------------


// Primero, escribiremos dos funciones para convertir de Celsius a Fahrenheit y viceversa:


// function toCelsius(fahrenheit) {
//   return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheit(celsius) {
//   return (celsius * 9 / 5) + 32;
// }


// Estas dos funciones convierten números. Vamos a escribir otra función que toma un string temperatura 
//  y una función de convertidor como argumentos y devuelve una cadena. 
// La usaremos para calcular el valor de una entrada basada en la otra entrada.

// function tryConvert(temperature, convert) {
//   const input = parseFloat(temperature);
//   if (Number.isNaN(input)) {
//     return '';
//   }
//   const output = convert(input);
//   const rounded = Math.round(output * 1000) / 1000;
//   return rounded.toString();
// }


// Por ejemplo  tryConvert('abc', toCelsius) regresa una cadena vacia y tryConvert('10.22', toFahrenheit) 
//regresa '50.396'


// ---- ------------------------- Lifting State Up ---------------------------------------


// Actualmente, ambos componentes de TemperatureInput mantienen independientemente sus valores en el estado local:

// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {temperature: ''};
//   }

//   handleChange(e) {
//     this.setState({temperature: e.target.value});
//   }

//   render() {
//     const temperature = this.state.temperature;
// }

// Sin embargo, queremos que estas dos entradas estén sincronizadas entre sí. 
// Cuando actualizamos la entrada Celsius, la entrada Fahrenheit debe reflejar la temperatura 
// convertida, y viceversa.

//  En React, el estado compartido se logra moviéndolo hasta el antepasado común más cercano de los
//  componentes que lo necesitan. Esto se denomina "lifting state up" o "levantamiento de estado hacia arriba".
//  Removeremos el estado local del TemperatureInput y lo moveremos a Calculator.

// 	Si Calculator posee el estado compartido, se convierte en la "source of truth" o "fuente de verdad"
//  para la temperatura actual en ambas entradas. Puede instruir a ambos a tener valores que
//   sean consistentes entre sí. Dado que los props de ambos componentes de TemperatureInput provienen 
//   del mismo componente Calculator primario, las dos entradas estarán siempre sincronizadas.

// Veamos cómo funciona esto paso a paso.

// Primero, reemplazaremos this.state.temperature con this.props.temperature en el componente TemperatureInput
// Por ahora, vamos a hacer como si  this.props.temperature ya existiera, aunque tendremos que pasarlo 
// a Calculator en el futuro:

// render() {
//     // Before: const temperature = this.state.temperature;
//     const temperature = this.props.temperature;


// Sabemos que los props son de sólo lectura. Cuando la temperatura estaba en el estado local, 
// el componente TemperatureInput podría llamar a this.setState() para cambiarlo. Sin embargo, ahora que la 
// temperatura viene del padre como un prop, el TemperatureInput no tiene control sobre él.

// // En React, esto se resuelve generalmente haciendo un componente "controlado". Al igual que los  
// elementos de entra <input> del DOM aceptan propiedades "prop" tanto para "value" y como para onChange,
// por lo que se puede personalizar el componente TemperatureInput para que pueda aceptar las propiedades 
// 'props' tanto de temperature como onTemperatureChange de su padre principal "Calculator"

// Ahora, cuando el TemperatureInput quiere actualizar su temperatura, llama a this.props.onTemperatureChange:

//  handleChange(e) {
//     // Before: this.setState({temperature: e.target.value});
//     this.props.onTemperatureChange(e.target.value);


// Tenga en cuenta que no hay ningún significado especial para los nombres de las propiedades "props"
// de  temperature  o onTemperatureChange  en componentes personalizados. Podríamos haberles llamado
// de cualquier otra forma, como nombrarlos value y onChange que es una convención común.

// La propiedad "prop" onTemperatureChange se proporcionará junto con el prop temperature 
//  por el componente calculator padre. Esto Manejará el cambio modificando su propio estado local, 
//  re-renderizando ambas entradas con los nuevos valores. 
//  Veremos la nueva implementación de la Calculator muy pronto.

// Antes de sumergirnos en los cambios en la Calculator, vamos a recapitular nuestros cambios en el 
// componente TemperatureInput. Hemos eliminado el estado local de él, y en vez de leer 
// this.state.temperature, ahora leemos this.props.temperature.  En lugar de llamar a this.setState() 
// cuando queremos hacer un cambio, ahora llamamos this.props.onTemperatureChange(), 
// que será proporcionado por la el componenete Calculator:


// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.props.onTemperatureChange(e.target.value);
//   }

//   render() {
//     const temperature = this.props.temperature;
//     const scale = this.props.scale;
//     return (
//       <fieldset>
//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
//         <input value={temperature}
//                onChange={this.handleChange} />
//       </fieldset>
//     );
//   }
// }

// Ahora pasemos al componente Calculator.

// Almacenaremos la temperatura y la escala de la entrada actual en su estado local. 
// Este es el estado que se "lifted up" "levantó" de las entradas, y servirá como la "fuente de la verdad" 
// para ambos.
// Es la representación mínima de todos los datos que necesitamos conocer para poder renderear ambas entradas

// Por ejemplo, si ingresamos 37 en la entrada Celsius, el estado del componente de Calculator será:

// {
//   temperature: '37',
//   scale: 'c'
// }


// Si posteriormente editamos el campo Fahrenheit para ser 212, el estado de Calculator será:

// {
//   temperature: '212',
//   scale: 'f'
// }


// Podríamos haber almacenado el valor de ambas entradas, pero resultó ser innecesario. 
// Es suficiente para almacenar el valor de la entrada modificada más recientemente, y la escala que representa.
// Podemos entonces inferir el valor de la otra entrada basado solamente en la temperatura y escala actuales.

// Las entradas permanecen sincronizadas porque sus valores se calculan desde el mismo estado:



// Ejemplo creado por mi mismo 


const NombresEscala = {
					f:'Farenheit',
					c:'celsius'
				}

function ACelsius(gradosFarenheit)
{
	////debugger;
	return (gradosFarenheit - 32 ) * 5 / 9; 
}

function AFarenheit(gradosCelsius)
{
	//debugger;
	return (gradosCelsius * 9 / 5 ) + 32; 	
}


function convertirGrados(temperatura,conversion)
{
	//debugger;
	const tempPars = parseFloat(temperatura);
	
	if(Number.isNaN(tempPars))
	{
		return '';
	}

	const gradosConvert = conversion(tempPars);
	const gradosRedon =  Math.round(gradosConvert * 1000) / 1000;
	return gradosRedon.toString();

}


function MsjGrados(props)
{	
	////debugger;

	if(props.grados >= 100)
	{
		return <h4>El agua se va a hervir</h4>
	}
	return <h4>El agua No se va a hervir</h4>
}


class TemplTemperatura extends React.Component
{
	////debugger;

	constructor(props){
		////debugger;
		super(props);

		this.cambioTemperatura = this.cambioTemperatura.bind(this);
	}

	cambioTemperatura(event)
	{
		////debugger;
		this.props.onCambioTemperatura(event.target.value);
	}

	render()
	{
		//debugger;
		const tipo = this.props.escala;
		const temperatura = this.props.temperatura;
		return (
					<div>
						<fieldset>
							<legend>Ingrese la temperatura en {NombresEscala[tipo]}</legend>
							<input type="text" value={temperatura} onChange={this.cambioTemperatura}/>
						</fieldset>
					</div>
				);


	}

}


class CalcularTemperatura extends React.Component
{
	////debugger;

	constructor(props)
	{
		super(props);

		////debugger;

		this.cambioCelsius = this.cambioCelsius.bind(this);
		this.cambioFarenheit = this.cambioFarenheit.bind(this);

		this.state  = { temperatura: '', escala: 'c'}

	}

	cambioCelsius(temperatura)
	{
		////debugger;
		this.setState({escala:'c', temperatura});
	}

	cambioFarenheit(temperatura)
	{
		////debugger;
		this.setState({escala:'f', temperatura});
	}

	render()
	{
		//debugger;
		const escala = this.state.escala; 
		const temperatura = this.state.temperatura;
		const celsius  = escala === 'f' ? convertirGrados(temperatura,ACelsius) : temperatura;
		const farenheit =  escala === 'c' ? convertirGrados(temperatura,AFarenheit) : temperatura;
		
		return(	
					<div>
						<TemplTemperatura escala="c" temperatura={celsius} onCambioTemperatura={this.cambioCelsius} />
						<TemplTemperatura escala="f" temperatura={farenheit} onCambioTemperatura={this.cambioFarenheit} />
						<MsjGrados grados= {parseFloat(celsius)}  />
					</div>
			  )

		
	}
}

ReactDOM.render(<CalcularTemperatura />,document.getElementById('cont5'));



// Ejemplo de la documentaion de ReactJs de facebook


const scaleNames2 = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
	//debugger;
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	//debugger;
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	//debugger;
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  	////debugger;
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
  	//debugger;
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames2[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator5 extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
  	////debugger;
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
  	////debugger;
    this.setState({scale: 'f', temperature});
  }

  render() {
  	//debugger;
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (

      <div>
        <TemperatureInput2
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput2
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator5 />,
  document.getElementById('cont6')
);


// Ahora, sin importar la entrada que se edite, this.state.temperature y this.state.scale en el componente
// Calculator5 se actualizan. Una de las entradas obtiene el valor tal como está, por lo que cualquier
//  entrada de usuario se conserva, y el otro valor de entrada siempre se recalcula basado en él.


// Repasemos lo que sucede cuando editas una entrada:


// * React llama a la función especificada como onChange del <input> en el DOM . En nuestro caso, 
// este es el método handleChange en el componente TemperatureInput.


// * El método handleChange en el componente TemperatureInput llama a this.props.onTemperatureChange() 
// con el nuevo valor deseado. Sus props, incluyendo onTemperatureChange, fueron proporcionados 
// por su componente principal, Calculator5.

// * Cuando se rendereó anteriormente, el componente Calculator5 se ha especificado que 
// onTemperatureChange del Celsius TemperatureInput es el método handleCelsiusChange de Calculator5 
// y onTemperatureChange del Fahrenheit TemperatureInput es el método handleFahrenheitChange de Calculator5.
// Por lo tanto, cualquiera de estos dos métodos de Calculator5 se llama dependiendo de qué entrada 
// hemos editado.


// * React llama al método de renderizado del componente Calculator5 para saber cómo debe ser
//  la interfaz de usuario. Los valores de ambas entradas se recalculan en función de la temperatura
//   actual y de la escala activa. Aquí se realiza la conversión de la temperatura.


// * React llama a los métodos de procesamiento de los componentes individuales de TemperatureInput
//  con sus nuevos props especificados por Calculator5. Aprende lo que su interfaz de usuario 
//  debe mostrar.

// * React DOM actualiza el DOM para que coincida con los valores de entrada deseados. 
//  La entrada que acabamos de editar recibe su valor actual, y la otra entrada se actualiza 
//  a la temperatura después de la conversión.

// Cada actualización pasa por los mismos pasos para que las entradas permanezcan sincronizadas.


// -------------------- Lecciones aprendidas -----------------------------


// Debe haber una sola "source of truth" "fuente de verdad" para cualquier dato que cambie 
// en una aplicación React. Normalmente, el estado se agrega primero al componente que lo necesita 
// para renderizar. Entonces, si otros componentes también lo necesitan, puede elevarlo 
// hasta su antepasado común más cercano. En lugar de intentar sincronizar el estado entre los 
// diferentes componentes, debe confiar en el flujo de datos "top-down data flow." "de arriba hacia abajo".


// El estado de elevación implica la escritura de un código más "calificado" que los enfoques de 
// enlace bidireccional, pero como un beneficio, se necesita menos trabajo para encontrar 
// y aislar los errores. Puesto que cualquier estado "vive" en algún componente y ese componente 
// solo puede cambiarlo, el area de superficie de error se reduce considerablemente. 
// Además, puedes implementar cualquier lógica personalizada para rechazar o transformar la entrada de usuario.


// Si algo se puede derivar de los props o del estado, probablemente no debería estar en el estado.
// Por ejemplo, en lugar de almacenar tanto celsiusValue como fahrenheitValue, almacenamos sólo
// la última temperatura editada y su escala. El valor de la otra entrada siempre se puede calcular
// a partir de ellos en el método render(). Esto nos permite borrar o aplicar el redondeo al otro
// campo sin perder precisión en la entrada del usuario.


// Cuando vea algo malo en la interfaz de usuario, puede utilizar React Developer Tools para 
// inspeccionar los props y desplazarse por el árbol hasta encontrar el componente responsable 
// de actualizar el estado. Esto le permite rastrear los errores a su origen:


















