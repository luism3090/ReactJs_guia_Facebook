// ------------------- Embedding Expressions in JSX --------------------------


// Puede incrustar cualquier expresión JavaScript en JSX envolviéndola en llaves {} . 
// Por ejemplo, 2 + 2, user.firstName y formatName (user) son todas expresiones válidas:



function formatName(user)
{
	return user.firsName + ' ' +user.lastName;
}

const user = {
	firsName : 'Luis',
	lastName : 'Molina'
};

const element = (
	<h1>
	Hello, {formatName(user)}!
	</h1>
);

ReactDOM.render(element
				,
				document.getElementById('cont1')	
				);


// Dividimos JSX en varias líneas para facilitar la lectura. Si bien no es necesario, 
// al hacer esto, también recomendamos envolverlo entre paréntesis para evitar las 
// trampas de la inserción automática de punto y coma.



//-------------------- JSX es una expresión tambien ------------------------

// Después de la compilación, las expresiones JSX se convierten en objetos JavaScript normales.

// Esto significa que puede usar JSX dentro de instrucciones if y para for, asignarlo a 
// variables, aceptarla como argumentos y devolverla de funciones:


const user2 = {
	firsName : 'Luis',
	lastName : 'Molina'
};

function getGreetin(user2)
{
	if(user2)
	{
		return <h1>Hello, {formatName(user2)}! </h1>
	}
	else
	{
		return <h1>Hello, Stranger  </h1>
	}
}

ReactDOM.render(getGreetin(user2)
				,
				document.getElementById('cont2')	
				);


// -------- Especificación de atributos con JSX----------------- 

// Puede utilizar comillas para especificar literales de cadena como atributos:

const element1 = <div tabIndex="0">React Js</div>;

ReactDOM.render(element1,document.getElementById('cont3'));

// También puede usar llaves para incrustar una expresión JavaScript en un atributo:

const user1 = 
{
	avatarUrl:"https://pbs.twimg.com/profile_images/451924608388591616/CWE80cBY_normal.png"
}

const element2 = <img src={user1.avatarUrl}></img>;

ReactDOM.render(element2,document.getElementById('cont4'));

// No coloque frases entre corchetes al incrustar una expresión JavaScript en un atributo. De lo contrario,
//  JSX tratará el atributo como una cadena literal en lugar de una expresión. 
//  Debe usar comillas (para valores de cadena) o llaves (para expresiones), 
//  pero no ambas en el mismo atributo.



// ------------ Especificación de hijos con JSX  --------------------------

//Si una etiqueta está vacía, puede cerrarla inmediatamente con />, como XML:


 const element3 = <img src={user1.avatarUrl} />;

 ReactDOM.render(element3,document.getElementById('cont5'));


// Las etiquetas JSX pueden contener hijos:

const element4 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

 ReactDOM.render(element4,document.getElementById('cont6'));



// Advertencia: 

// Dado que JSX está más cerca de JavaScript que de HTML, React DOM utiliza la convención de nomenclatura de 
// la propiedad camelCase en lugar de los nombres de atributos HTML. 

// Por ejemplo, la clase se convierte en ClassName en JSX, y tabindex se convierte en tabIndex.


// -------------------- JSX Previene Ataques De Inyección -------------------

// Es seguro incorporar la entrada de usuario en JSX:


const title = <p>"alert()"</p>;

ReactDOM.render(title,document.getElementById('cont7'));

// Esto es seguro:

const element5 = <div>{title}</div>;

ReactDOM.render(element5,document.getElementById('cont8'));


// De forma predeterminada, React DOM escapa a cualquier valor incrustado en JSX antes de procesarlos. Por lo tanto, asegura que nunca se puede inyectar nada que no esté explícitamente escrito en su aplicación. Todo se convierte en una cadena antes de ser procesado. Esto ayuda a prevenir ataques XSS (cross-site-scripting).



// ------------------  JSX representa objetos ------------------------

// Babel compila JSX hasta las llamadas React.createElement ().

// Estos dos ejemplos son idénticos:


const element6 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

ReactDOM.render(element6,document.getElementById('cont9'));


const element7 = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

ReactDOM.render(element7,document.getElementById('cont10'));

// React.createElement () realiza algunas comprobaciones para ayudarle a escribir código sin errores pero esencialmente crea un objeto como este:


// Nota: esta estructura se simplifica

const element8 = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};




// Estos objetos se denominan "elementos React". Puedes pensar en ellos como descripciones de lo que quieres ver en la pantalla. React lee estos objetos y los utiliza para construir el DOM y mantenerlo actualizado.

// Exploraremos la representación de los elementos React en el DOM en la siguiente sección.


// Tip: 
// Le recomendamos que busque un esquema de sintaxis "Babel" para su editor de elección para que tanto el código ES6 como el JSX estén correctamente resaltados.



