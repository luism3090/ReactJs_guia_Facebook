//  ---------------------------- Lists and Keys -------------------------------------------------------

// Primero, revisemos cómo transformas las listas en JavaScript.


// Dado el código siguiente, usamos la función map() para tomar una array de números y duplicar sus valores. 
// Asignamos el nuevo array devuelto por map() a la variable doble y la registramos:


const numbers = [1,2,3,4,5];
const doble = numbers.map((number) => number * 2);
console.log(doble);


// Este código registra [2, 4, 6, 8, 10] en la consola.

// En React, la transformación de arrays en listas de elementos es casi idéntica.



// ------------------------ Renderiando Multiples componentes -------------------------------------


// Puede crear colecciones de elementos e incluirlas en JSX con llaves {}.

// A continuación, realizamos un bucle a través del array numbers usando la función map() de Javascript .
// Devolvemos un elemento <li> para cada item. Finalmente, asignamos el array resultante de elementos a 
// la lista de items "listItems" :


const numbers2 = [1,2,3,4,5];

const listItems2 = numbers2.map((number) => 
	<li >{number}</li>
);

console.log(listItems2);


// Incluimos todo el arreglo listItems2 dentro de un elemento <ul> y lo rendereamos a el DOM

ReactDOM.render(<ul>{listItems2}</ul>,document.getElementById('cont1'))


// Este código muestra una lista de números entre 1 y 5.


// ------------------------- Componente básico de lista ----------------------------------


// Por lo general, tu renderizarias listas dentro de un componente.

// Podemos refactorizar el ejemplo anterior en un componente que acepte un array de números y genere una 
// lista desordenada de elementos.

function ListaNumeros(props)
{
	
	const listaNumeros = props.arrayNums.map( (numero) => 
												<li> {numero} </li> 
											);

	return (
				<ul>{listaNumeros}</ul>
			)


}

const arrayNums = [1,2,3,4,5];


ReactDOM.render(<ListaNumeros arrayNums={arrayNums} />,document.getElementById('cont2'));


// Al ejecutar este código, se le dará una advertencia de que se debe proporcionar una clave para los elementos 
// de la lista. Una "clave" es un atributo de cadena especial que debe incluir al crear listas de elementos. 
// Vamos a discutir por qué es importante en la siguiente sección.


// Asignemos una clave a los elementos de nuestra lista dentro de arrayNums.map() y solucionemos el 
// problema clave que falta.

function ListaNumeros2(props)
{
	const listaNumeros2 = props.arrayNums.map( (num,index) => <li key={num.toString()} > { num } </li>)

	return (
				<ul>{listaNumeros2}</ul>
			)
}


const arrayNums2 = [1,2,3,4,5];

ReactDOM.render(<ListaNumeros2 arrayNums ={arrayNums2} />,document.getElementById('cont3'))
					


// ------------------------------ Keys ------------------------------------------


// Las keys ayudan a React a identificar qué elementos han cambiado, se agregan o se eliminan. 
// Las keys se deben colocar en los elementos dentro del array para darles una identidad estable:


// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//   <li key={number.toString()}>
//     {number}
//   </li>
// );


// La mejor manera de elegir una key es usar una cadena que identifique de forma única a un elemento 
// de lista entre sus hermanos. La mayoría de las veces usas IDs de tus datos como keys "claves":


// const todoItems = todos.map((todo) =>
//   <li key={todo.id}>
//     {todo.text}
//   </li>
// );


// Cuando no tiene IDs estables para elementos procesados, puedes utilizar el índice del elemento 
// como key como último recurso:


// const todoItems = todos.map((todo, index) =>
//   // Sólo haga esto si los elementos no tienen IDs estables
//   <li key={index}>
//     {todo.text}
//   </li>
// );


// No recomendamos el uso de índices para las claves si los elementos se pueden reordenar, ya que sería lento. 
// Usted puede leer una explicación en profundidad sobre por qué son necesarias las keys si está interesado.
// https://facebook.github.io/react/docs/reconciliation.html#recursing-on-children


// ----------------------- Extracción de componentes con keys -----------------------------------


// Las keys sólo tienen sentido en el contexto de la array circundante.

// Por ejemplo, si extrae un componente ListItem, debe mantener la key en los elementos del <ListItem /> en 
// el array en lugar de en el elemento <li> raiz en el propio ListItem


// Ejemplo: Uso incorrecto de keys


function ListItem(props)
{
	const value = props.value;

	return (
				<li key={value.toString()} >{value}</li>
			)
}

function NumberList2(props)
{

	const numbers =  props.numbers;
	const listItems = numbers.map((number) => 
			<ListItem value={number} />
		)

	return (
				<ul>
					{listItems}
				</ul>
			)
	
}

const numbers3 = [10,9,8,7,6];

ReactDOM.render(<NumberList2 numbers={numbers3}/>,document.getElementById('cont4'))


// Ejemplo: Uso correcto de las keys




















































