
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
		return <h2>El aguar SI se va a hervir</h2>
	}
	return <h2>El agua NO se va a hervir</h2>
}


class Calculadora extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = ({celsius:''});

		this.cambioGrados = this.cambioGrados.bind(this);

	}

	cambioGrados(event)
	{
		const newGradosCelsius = event.target.value;

		this.setState({celsius: newGradosCelsius})
	}

	render()
	{
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


// Mi ejemplo Version 1 hecho por mi mismo

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


// ejemplo de la documentacion de REact js de facebook

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

// Tampoco podemos mostrar el BoilingVerdict de la Calculator2. La Calculator2 no conoce la temperatura 
// actual porque está oculta dentro del TemperatureInput


// ----------------------------- Escribir funciones de conversión ----------------------------


// Primero, escribiremos dos funciones para convertir de Celsius a Fahrenheit y viceversa:


// function toCelsius(fahrenheit) {
//   return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheit(celsius) {
//   return (celsius * 9 / 5) + 32;
// }


// Estas dos funciones convierten los números. Vamos a escribir otra función que toma una temperatura 
// de cadena y una función de convertidor como argumentos y devuelve una cadena. 
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

// Sin embargo, queremos que estas dos entradas estén sincronizadas entre sí. 
// Cuando actualizamos la entrada Celsius, la entrada Fahrenheit debe reflejar la temperatura 
// convertida, y viceversa.


// En React, el estado compartido se logra moviéndolo hasta el antepasado común más cercano de los
//  componentes que lo necesitan. Esto se denomina "lifting state up" o "levantamiento de estado hacia arriba".
//   Removeremos el estado local del TemperatureInput y lo moveremos a la Calculator.

// Si la Calculator posee el estado compartido, se convierte en la "source of truth" o "fuente de verdad"
//  para la temperatura actual en ambas entradas. Puede instruir a ambos a tener valores que
//   sean consistentes entre sí. Dado que los props de ambos componentes de TemperatureInput provienen 
//   del mismo componente Calculator primario, las dos entradas estarán siempre sincronizadas.

// Veamos cómo funciona esto paso a paso.

// Primero, reemplazaremos this.state.temperature con this.props.temperature en el componente TemperatureInput
// Por ahora, vamos a pretender que this.props.temperature ya exista, aunque tendremos que pasarlo 
// de la Calculator en el futuro:

// render() {
//     // Before: const temperature = this.state.temperature;
//     const temperature = this.props.temperature;


// Sabemos que los props son de sólo lectura. Cuando la temperature estaba en el estado local, 
// el componente TemperatureInput podría llamar a this.setState() para cambiarlo. Sin embargo, ahora que la 
// temperature viene del padre como un prop, el TemperatureInput no tiene control sobre él.

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

// La propiedad "prop" de onTemperatureChange se proporcionará junto con el prop de temperature 
//  por el componente calculador padre. Manejará el cambio modificando su propio estado local, 
//  re-renderizando ambas entradas con los nuevos valores. 
//  Veremos la nueva implementación de la Calculator muy pronto.

























