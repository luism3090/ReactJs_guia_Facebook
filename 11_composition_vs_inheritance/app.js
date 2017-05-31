


// --------------------------------------- Composition vs herencia -------------------------------------------------


// React tiene un modelo de composición potente, y recomendamos usar composición en lugar de herencia para reutilizar 
// código entre componentes.


// En esta sección, consideraremos algunos problemas que los desarrolladores nuevos de React a menudo tienen con 
// la herencia y se muestra cómo podemos resolverlos con la composición.



// ------------------------------------------- Contención -------------------------------------------------- 


// Algunos componentes no conocen a sus hijos con antelación. Esto es especialmente común para componentes como 
// Sidebar o Dialog que representan "cajas" genéricas.


// Recomendamos que estos componentes utilicen el prop especial de 'children' para pasar los elementos props 
// de los children directamente a su salida:


// function FancyBorder(props) {
//   return (
//     <div className={'FancyBorder FancyBorder-' + props.color}>
//       {props.children}
//     </div>
//   );
// }

// Esto permite que otros componentes les pasen children arbitrarios anidando el JSX:}


// function WelcomeDialog() 
// {
//   return (
//     <FancyBorder color="blue" >
//       <h1 className="Dialog-title">
//         Welcome
//       </h1>
//       <p className="Dialog-message">
//         Thank you for visiting our spacecraft!
//       </p>
//     </FancyBorder>
//   );
// }


// Mi ejemplo creado por mi mismo 

function MarcoContenedor(props)
{
	return(
				<div className={"marco-"+props.color} >
					{props.children}
				</div>
			);
}

function BodyContenedor()
{
	return(
				<MarcoContenedor color="blue" >
					<h1 className="titulo-dialogo" >Bienvenido</h1>
					<h4 className="mensaje-dialogo">Gracias por visitar nuestro sitio</h4>
				</MarcoContenedor >
		  )
}

ReactDOM.render(<BodyContenedor />,document.getElementById('cont1'));


// Ejemplo de la documentacion de React js de facebook


function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('cont2')
);


// Cualquier cosa dentro de la etiqueta JSX <FancyBorder> Se pasa en el componente FancyBorder como una propiedad props hija. 
// Puesto que FancyBorder convierte {props.children} dentro de un <div>. Los elementos pasados ​​aparecen en la salida final.


// Si bien esto es menos común, a veces es posible que necesite múltiples "holes" "agujeros" en un componente. 
// En tales casos usted puede subir su propia convención en vez de usar a children :


// function SplitPane(props) 
// {
//   return (
//     		<div className="SplitPane">
//       			<div className="SplitPane-left">
//         			{props.left}
//       			</div>
//       			<div className="SplitPane-right">
//         			{props.right}
//       			</div>
//     		</div>
//   );
// }


// function App() 
// {
//   return (
//     		<SplitPane
//   			    left={<Contacts />}
//       			right={<Chat />} 
//       		/>
//   );
// }


// Ejemplo hecho por mi mismo 


function ContainerChat()
{
  return <div className="chat" ></div>;
}

function ContainerContactos()
{
  return <div className="contactos" ></div>;
}

function ContainerPrincipal(props)
{
  return (
            <div className="container-main">
              
                <div className="contChats" >
                   {props.chats}
                </div>

                <div className="contContacts" >
                  {props.contacts}
                </div>

            </div>
        )
}

ReactDOM.render(<ContainerPrincipal chats={<ContainerChat />} 
                                    contacts={<ContainerContactos />} 
                />
                ,
                document.getElementById('cont3'));



// Ejemplo de la documentacion de React Js de facebook


function Contacts() {
  return <div className="contactos" />;
}

function Chat() {
  return <div className="chat" />;
}

function SplitPane(props) {
  return (
    <div className="contenedor">
      <div className="contChats">
        {props.left}
      </div>
      <div className="contContacts">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Chat />
      }
      right={
        <Contacts />
      } />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('cont4')
);


// Los elementos React como <Contacts />  y <Chat /> son sólo objetos, por lo que se pueden pasar como props,
//  como cualquier otro dato.


// ----------------------------------------- Especialización -------------------------------------------------


// A veces pensamos en los componentes como "casos especiales" de otros componentes. Por ejemplo, podríamos decir que un
//  WelcomeDialog es un caso especial de Dialog.


// En React, esto también se logra por la composición, donde un componente más "específico" renderea a uno más "genérico" 
// y lo configura con props:


// Ejemplo creado por mi mismo 

function CompRaiz(props)
{
	return(
			<div className={"border-" + props.color }>
				 {props.children}
			</div>
		  )
}

function CompMsjs(props)
{
	return(
			<CompRaiz color="blue">
				<h1 className="contBienvenida">
					 {props.msjBienvenida}
				</h1>
				<h4 className="contMsj">
					 {props.msj}
				</h4>
			</CompRaiz>
		  )
}

function CompPrincipal()
{
	return (
				<CompMsjs msjBienvenida="Bienvenido" msj="Gracias por su visita a nuestra página" />
			)
}


ReactDOM.render(<CompPrincipal />,document.getElementById("cont5"));



// Ejemplo de la documentacion de ReactJs de Facebook 


function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('cont6')
);


// La composición funciona igual de bien para los componentes definidos como clases:


// Ejemplo creado por mi mismo 

function CompRaiz2(props)
{
	  return(
				<div className={"border-"+props.color} >
					{props.children}
				</div>
			)
}

function CompMensajes(props)
{
	  return(
	  			<CompRaiz2 color="blue">
		  			<h1 className="tituloMsj">
		  				{props.msjtTitulo}
		  			</h1>
		  			<h4 className="contMsj" >
		  				{props.contMsj}
		  			</h4>
		  			 {props.children}
	  			</CompRaiz2>
			)
}

class CompLogin extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = ({login:''});

		this.cambioLogin = this.cambioLogin.bind(this);
		this.logearse = this.logearse.bind(this);
	}

	cambioLogin(e)
	{
		this.setState({login:e.target.value});
	}

	logearse()
	{
		const nombre = this.state.login;

		alert('Bienvenido, '+nombre);
	}

	render()
	{
	  return(
	  			<CompMensajes 	msjtTitulo="Bievenido a nuestro sitio"
	  							contMsj="¿Cómo deberíamos referirnos a usted?"
	  			 >
	  				<input 	value={this.state.login}
	  						onChange={this.cambioLogin}
	  						
	  				/>
	  				<input type="button" value="Aceptar" onClick={this.logearse} />
	  			</CompMensajes>
			)
	}



}


ReactDOM.render(<CompLogin />,document.getElementById('cont7'));



// Ejemplo de la documentacion de ReactJs de Facebook 



function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

ReactDOM.render(
  <SignUpDialog />,
  document.getElementById('cont8')
);


// ------------------------------ Entonces, ¿qué pasa con la herencia? -----------------------------------------


// En Facebook, utilizamos React en miles de componentes y no hemos encontrado casos de uso en los que recomendaríamos 
// crear jerarquías de herencia de componentes.

// Los props y la composición le brindan toda la flexibilidad necesaria para personalizar la apariencia y el comportamiento 
// de un componente de una manera explícita y segura.

// Recuerde que los componentes pueden aceptar objetos arbitrarios, incluyendo valores primitivos, elementos React o funciones.

// Si desea reutilizar la funcionalidad que no sea de interfaz de usuario entre los componentes, le sugerimos extraerlo 
// en un módulo JavaScript independiente. Los componentes pueden importarlo y utilizar esa función, objeto o una clase, sin extenderlo.


























