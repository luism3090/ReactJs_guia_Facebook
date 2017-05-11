// ------------------------------ Conditional Rendering ------------------------------

// En React, puede crear componentes distintos que encapsulen el comportamiento que necesita. 
// A continuación, puede procesar sólo algunos de ellos, dependiendo del estado de su aplicación.

// La representación condicional en React funciona de la misma manera en que las condiciones 
// funcionan en JavaScript. Utilice operadores JavaScript como if o el operador condicional para 
// crear elementos que representen el estado actual y permita que React actualice la interfaz 
// de usuario para que coincida con ellos.

// Considere estos dos componentes:

// function UserGreeting(props)
// {
// 	return <h1>Welcome back!</h1>;
// }

// function GuestGreeting()
// {
// 	return <h1>Please sign up</h1>;
// }


// Crearemos un componente de Saludo que muestre cualquiera de estos componentes dependiendo de si un 
// usuario está conectado:


// Mi ejemplo

function CompSaludo(props)
{
	return <h1>Bienvenido</h1>;
}

function CompLogueo(props)
{
	return <h1>Por favor regístrate</h1>;
}


function CompValidaLogueo(props)
{
	const logueo = props.logueo;
	if(logueo)
	{
		return <CompSaludo />
	}
	else
	{
		return <CompLogueo />
	}

}

ReactDOM.render(<CompValidaLogueo logueo={true} />,document.getElementById("cont1"))


// El ejemplo de react de facebook 


function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('cont2')
);


// Este ejemplo da un saludo diferente dependiendo del valor de isLoggedIn prop.


// Variables del elementos

// Puede utilizar variables para almacenar elementos. Esto puede ayudarte a renderear condicionalmente 
// una parte de el componente mientras que el resto de la salida no cambia.

// Considere estos dos nuevos componentes que representan los botones de cerrar sesion y de inicio de sesión:

// function LoginButton(props) {
//   return (
//     <button onClick={props.onClick}>
//       Login
//     </button>
//   );
// }

// function LogoutButton(props) {
//   return (
//     <button onClick={props.onClick}>
//       Logout
//     </button>
//   );
// }

// En el ejemplo siguiente, crearemos un componente con estado llamado LoginControl.

// esto rendeará ya sea <LoginButton /> o <LogoutButton /> Dependiendo de su estado actual.

// ademas rendeará un <Greeting /> del ejemplo anterior:


// Ejemplo hecho por mi mismo valga la redundancia


class ControlLogin extends React.Component 
{
	constructor(props)
	{
		super(props);


		 this.cerrarSesion = this.cerrarSesion.bind(this);
    	this.iniciarSesion = this.iniciarSesion.bind(this);
		this.state = {estaLogueado: false}

	}

	cerrarSesion()
	{
		this.setState({estaLogueado: false});
	}

	iniciarSesion()
	{
		this.setState({estaLogueado: true});
	}

	render()
	{
		var estaLogueado = this.state.estaLogueado;
		let boton=null;
		if(this.state.estaLogueado)
		{
			boton = <BotonSiEstaLogueado onClick={this.cerrarSesion}/>
		}
		else
		{
			boton = <BotonNoEstaLogueado onClick={this.iniciarSesion}/>
		}

		return(
				<div>
					<Saludar estaLogueado={this.state.estaLogueado}/>
					{boton}
				</div>
			)

	}

}


function SaludoSiEstaLogueado(props)
	{
		return(
					<h1>Bienvenido</h1>
				)
	}

function SaludoNoEstaLogueado(props)
{
	return(
				<h1>Por favor inicia sesión</h1>
			)
}

function BotonSiEstaLogueado(props)
{
	return(
				<button onClick={props.onClick}>Cerrar sesión</button>
			)
}

function BotonNoEstaLogueado(props)
{
	return(
				<button onClick={props.onClick}>Iniciar sesión</button>
			)
}

function Saludar(props)
{
	

	if(props.estaLogueado)
	{
		return <SaludoSiEstaLogueado />
	}
	else
	{
		return <SaludoNoEstaLogueado />
	}

}

ReactDOM.render(<ControlLogin />,document.getElementById('cont3'))



// ejemplo de la libreria de React js de facebook 


class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('cont4')
);


// Aunque declarar una variable y usar una instrucción if es una buena forma de procesar condicionalmente 
// un componente, a veces es posible que desee utilizar una sintaxis más corta. 
// Hay algunas maneras de las condiciones en línea en JSX, que se explican a continuación.



// ---------------------------- condicional en linea con el operador lógico &&   --------------------------------

// Puede incrustar cualquier expresión en JSX envolviéndolas en llaves. Esto incluye el operador 
// lógico && de JavaScript. Puede ser útil para incluir condicionalmente un elemento:

// mi ejemplo

class ImBox extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const msjNoLeidos = this.props.msjNoLeidos;
		return (
				<div>
					<h1>Hola</h1>
				
					{
						msjNoLeidos > 0 && 
						<h2>Tienes {msjNoLeidos} mensajes no leidos</h2>
					}
				</div>

		)
	}
}

var arrayMsjNoLeidos = ["Ract js","Angular Js","Node Js","Backbone Js"];

ReactDOM.render(<ImBox msjNoLeidos={arrayMsjNoLeidos.length}/>,document.getElementById('cont5'));


// El ejemplo de React js de facebook

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('cont6')
);



// Esto Funciona porque en JavaScript, true && expression siempre evalúa a la expression, 
// y false && expression siempre se evalúa como false.


// Por lo tanto, si la condición es verdadera, el elemento justo después de && aparecerá en la salida. 
// Y si la condicion es falsa, React lo ignorará y lo omitirá.


// ----------------------------  condicion en linea If-Else con operador condicional  --------------------------------------


// Otro método para condicionalmente renderizar elementos en línea es usar la condición de operador condicional

// condicion ? true : false

// En el ejemplo siguiente, usamos esta forma para renderear condicionalmente a un pequeño bloque de texto.


// render() {
//   const isLoggedIn = this.state.isLoggedIn;
//   return (
//     <div>
//       The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
//     </div>
//   );
// }

// También se puede utilizar para expresiones más grandes, aunque es menos obvio lo que este pasando:


// render() {
//   const isLoggedIn = this.state.isLoggedIn;
//   return (
//     <div>
//       {isLoggedIn ? (
//         <LogoutButton onClick={this.handleLogoutClick} />
//       ) : (
//         <LoginButton onClick={this.handleLoginClick} />
//       )}
//     </div>
//   );
// }

// Al igual que en JavaScript, depende de usted escoger un estilo apropiado basado en lo que usted y su 
// equipo consideran más legible. Recuerde también que siempre que las condiciones se vuelven demasiado 
// complejas, podría ser un buen momento para extraer un componente.


// ------------------------- Evitar que el componente se renderize  -----------------------------


// En casos raros, es posible que desee que un componente se oculte aunque ya se haya rendereado por 
// otro componente. Para hacer esto devuelva null en lugar de su salida render.

// En el ejemplo siguiente, el componente <WarningBanner /> se renderiza dependiendo del valor del prop 
// llamado warn. Si el valor del prop es falso, entonces el componente no renderiza:

// Mi ejemplo hecho por mi mismo

function BannerPrecaucion(props)
{
	if(!props.mostrarBanner)
	{
		return null;
	}
	else
	{
		return(
					<h2 className="precaucion">Precaución</h2>
				)
	}
}

function BotonToggleBanner(props)
{
	return(	
				<button onClick={props.click}>
					{props.mostrarBanner ? "Ocultar" : "Mostrar" }
				</button>
			)
}

class ControlBanner extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {mostrarBanner:true}

		this.toggleBanner = this.toggleBanner.bind(this);


	}

	toggleBanner()
	{

		this.setState(function(prevState)
		{
			return ({ mostrarBanner: !prevState.mostrarBanner}) 
		})
	}



	render()
		{
			return(	<div>
						<BannerPrecaucion mostrarBanner={this.state.mostrarBanner}/>
						<BotonToggleBanner mostrarBanner={this.state.mostrarBanner}  click={this.toggleBanner} />
					</div>
					)
		}
}


ReactDOM.render(<ControlBanner />,document.getElementById('cont7'));


// ejemplo de la documentacion de ReactJs de Facebook

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
  
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('cont8')
);



// Devolver null desde el método de renderización de un componente no afecta a la activación de los métodos 
// de ciclo de vida del componente. Por ejemplo, componentWillUpdate y componentDidUpdate seguirán siendo llamados.






















