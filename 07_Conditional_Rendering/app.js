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

// Puede utilizar variables para almacenar elementos. Esto puede ayudarle a hacer una parte del componente 
// condicionalmente mientras que el resto de la salida no cambia.

// Considere estos dos nuevos componentes que representan los botones de cerrar sesion y de inicio de sesión:



















































