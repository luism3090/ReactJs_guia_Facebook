


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


// ----------------------------------------- Specialization -------------------------------------------------








































