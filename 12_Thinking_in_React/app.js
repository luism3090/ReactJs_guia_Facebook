

// -------------------------------- Thinking in React ---------------------------------


// React es, en nuestra opinión, la forma principal de construir aplicaciones web grandes y rápidas con JavaScript. 
// Ha escalado muy bien para nosotros en Facebook e Instagram.

// Una de las muchas grandes partes de React es cómo te hace pensar en las aplicaciones a medida que las construyes.
//  En este documento, le guiaremos en el proceso de creación de una tabla de datos de productos que se pueden 
//  buscar utilizando React.


// ----------------------------- Comience Con Una Mock Mockup ------------------------------------------


// Imagina que ya tenemos un API JSON y un Mockup de nuestro diseñador. El Mockup se parece a esto:

// https://facebook.github.io/react/img/blog/thinking-in-react-mock.png

// Nuestra API JSON devuelve algunos datos que tienen este aspecto :

// [
//   {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
//   {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
//   {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
//   {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
//   {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
//   {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
// ];


// ---------------- Paso 1: Romper la interfaz de usuario en una jerarquía de componentes  ------------------------


// Lo primero que querrás hacer es dibujar cajas alrededor de cada componente (y subcomponente) en el Mockup y 
// darles todos los nombres. Si usted está trabajando con un diseñador, ya puede haber hecho esto, 
// así que vaya a hablar con ellos! ¡Sus nombres de capa de Photoshop pueden acabar siendo los nombres de sus componentes React!

// Pero, ¿cómo saber cuál debe ser su propio componente? Simplemente use las mismas técnicas para decidir 
// si debe crear una nueva función u objeto. Una técnica de este tipo es el  "single responsibility principle" o en español
// principio de responsabilidad única,  ver ---> https://en.wikipedia.org/wiki/Single_responsibility_principle
// es decir, un componente idealmente sólo debe hacer una cosa. 
// Si termina creciendo, se debe descomponer en subcomponentes más pequeños.


// Puesto que a menudo está mostrando un modelo de datos JSON a un usuario, verá que si su modelo fue construido correctamente, 
// su interfaz de usuario (y por lo tanto la estructura de su componente) se mostrará muy bien. Esto se debe a que la 
// interfaz de usuario y los modelos de datos tienden a adherirse a la misma arquitectura de información,
// lo que significa que el trabajo de separar la interfaz de usuario en componentes es a menudo trivial.
// Basta con romperlo en componentes que representan exactamente una pieza de su modelo de datos.

// https://facebook.github.io/react/img/blog/thinking-in-react-components.png

// Verás aquí que tenemos cinco componentes en nuestra sencilla aplicación. Hemos puesto en cursiva los datos 
// que cada componente representa.

// 1. FilterableProductTable (orange): Contiene la totalidad del ejemplo

// 2. SearchBar (blue): Recibe todas las entradas de usuario

// 3. ProductTable (green): Muestra y filtra la recopilación de datos basada en la entrada del usuario

// 4. ProductCategoryRow (turquoise): Muestra un encabezado para cada categoría

// 5. ProductRow (red): Muestra una fila para cada producto


// Si observa ProductTable, verá que el encabezado de la tabla (que contiene las etiquetas "Name" y "Price") 
// no es su propio componente. Esta es una cuestión de preferencia, y hay un argumento que debe hacerse de cualquier manera. 
// Para este ejemplo, lo dejamos como parte de ProductTable porque es parte de la prestación de la recopilación de
// datos que es responsabilidad de ProductTable. Sin embargo, si esta cabecera crece para ser compleja 
// (es decir, si tuviéramos que añadir affordances para la clasificación), sin duda tendría sentido para hacer de 
// este su propio componente ProductTableHeader.

// Ahora que hemos identificado los componentes en nuestro Mockup, vamos a organizarlos en una jerarquía. Esto es facil.
//  Los componentes que aparecen dentro de otro componente en el Mockup deben aparecer como un hijo en la jerarquía:

// FilterableProductTable
//  SearchBar
//  ProductTable
//      ProductCategoryRow
//      ProductRow


// ------------------------- Paso 2: Construir una versión estática de React  -----------------------------------


// Ejemplo creado por mi mismo 


class CompBusqueda extends React.Component
{
	
	render()
	{
		return	(
					<div>
						<div>
							<input type="text"  placeholder="Buscar... " />
						</div>
						<div>
						<input type="checkbox" name="prStock" value="a" /> 
							Mostrar solo productos en stock 
						</div>
					</div>
				)
	}
} 

class CompTitulosTablaProductos extends React.Component
{
	render()
	{
		return(
					<tr className="titleProduct" ><td colSpan='2'><strong>{this.props.producto.categoria}</strong></td></tr>
				)
	}
}
class CompRowsTablaProductos extends React.Component
{
	
	render()
	{
		let row;

		if(this.props.producto.stocked)
		{
			row = (
					<tr>
						<td>{this.props.producto.nombre}</td>
						<td>{this.props.producto.precio}</td>
					</tr>
					)
		}
		else
		{
			row = (
					<tr>
						<td style={{color: 'red'}} ><strong>{this.props.producto.nombre}</strong></td>
						<td style={{color: 'red'}}><strong>{this.props.producto.precio}</strong></td>
					</tr>
					)
		}

		return(
				row
				)
	}
}
class CompTablaProductos extends React.Component
{
	render()
	{
		const rowsProductos = [];
		let categoria = null;

		this.props.productos.forEach(function(producto,index)
		{
			if(producto.categoria !== categoria )
			{
				rowsProductos.push(<CompTitulosTablaProductos producto={producto} key={producto.categoria} />);
			}
			rowsProductos.push(<CompRowsTablaProductos producto={producto} key={producto.nombre} />);

			categoria = producto.categoria;
			 
		})


		return	(
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Precio</th>
							</tr>
						</thead>
						<tbody>
							{rowsProductos}
						</tbody>
					</table>
				)
	}
}
class CompRaiz extends React.Component
{
	
	render()
	{

		return	(
					<div>
						<CompBusqueda />
						<CompTablaProductos productos={this.props.productos} />
					</div>
				)
		
	}
}
const productos = [
					  {categoria:"Sporting Goods", precio:'$49.99', stocked:true, nombre:"Football"},
					  {categoria: 'Sporting Goods', precio: '$9.99', stocked: true, nombre: 'Baseball'},
					  {categoria: 'Sporting Goods', precio: '$29.99', stocked: false, nombre: 'Basketball'},
					  {categoria: 'Electronics', precio: '$99.99', stocked: true, nombre: 'iPod Touch'},
					  {categoria: 'Electronics', precio: '$399.99', stocked: false, nombre: 'iPhone 5'},
					  {categoria: 'Electronics', precio: '$199.99', stocked: true, nombre: 'Nexus 7'}
				  ]
ReactDOM.render(<CompRaiz productos={productos} />,document.getElementById('cont1'));






// Ejemplo de la documentacion de React Js de facebook 


class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('cont2'));



// Ahora que tiene su jerarquía de componentes, es hora de implementar su aplicación. La manera más fácil es 
// construir una versión que tome su modelo de datos y renderiza la interfaz de usuario, pero no tiene interactividad. 
// Lo mejor es desacoplar estos procesos porque la construcción de una versión estática requiere mucho escribir y 
// no pensar, y la adición de interactividad requiere mucha reflexión y no mucha escritura. Veremos por qué.









































































