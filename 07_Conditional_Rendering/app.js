// ------------------------------ Conditional Rendering ------------------------------

// En React, puede crear componentes distintos que encapsulen el comportamiento que necesita. 
// A continuación, puede procesar sólo algunos de ellos, dependiendo del estado de su aplicación.

// La representación condicional en React funciona de la misma manera en que las condiciones 
// funcionan en JavaScript. Utilice operadores JavaScript como if o el operador condicional para 
// crear elementos que representen el estado actual y permita que React actualice la interfaz 
// de usuario para que coincida con ellos.

// Considere estos dos componentes:

function UserGreeting(props)
{
	return <h1>Welcome back!</h1>;
}

function GuestGreeting()
{
	return <h1>Please sign up</h1>;
}


// Crearemos un componente de Saludo que muestre cualquiera de estos componentes dependiendo de si un 
// usuario está conectado:

































































