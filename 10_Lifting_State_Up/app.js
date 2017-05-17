
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

// Podemos comenzar extrayendo un componente TemperatureInput de Calculator. 
// Vamos a añadir un nuevo soporte de escala que puede ser "c" o "f":









































