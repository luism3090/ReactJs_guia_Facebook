

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
// construir una versión que tome su modelo de datos y renderice la interfaz de usuario, y que no
// tenga interactividad.  Lo mejor es desacoplar estos procesos porque la construcción de una versión 
// estática requiere mucho escribir y no pensar, y añadirle  interactividad requiere 
// mucho estar pensando y no mucha escritura. Veremos por qué.

// Para crear una versión estática de la aplicación que procesa su modelo de datos, tendra que crear componentes 
// que reutilicen otros componentes y pasen datos mediante props. Los props son una manera 
// de pasar los datos de padres a hijos. Si está familiarizado con el concepto de estado, no use 
// el estado en absoluto para construir esta versión estática. El estado se reserva sólo para la 
// interactividad, es decir, los datos que cambian con el tiempo. Dado que se trata de una versión 
// estática de la aplicación, no la necesita.

// Puede construir de arriba hacia abajo o de abajo hacia arriba. Es decir, puede iniciar con la 
// construcción de los componentes más arriba en la jerarquía (es decir, comenzando con FilterableProductTable)
//  o con los más bajos en él (ProductRow). En los ejemplos más sencillos, suele ser más fácil 
//  ir de arriba abajo, y en proyectos más grandes, es más fácil ir de abajo hacia arriba y hacer
//   pruebas a medida que construyes


// Al final de este paso, tendrá una biblioteca de componentes reutilizables que rendearan su modelo de datos. 
// Los componentes solo tendrán un metodo render() ya que esta es una versión estática de su aplicación. 
// El componente en la parte superior de la jerarquía (FilterableProductTable) tomará su modelo de datos 
// como un prop. Si se realiza un cambio en su modelo de datos subyacente y vuelve a llamar a ReactDOM.render(),
//  la interfaz de usuario se actualizará. Es fácil ver cómo se actualiza su interfaz de usuario y dónde 
//  hacer cambios, ya que no hay nada complicado sucediendo. "one-way data flow " 
//  "El flujo de datos unidireccional de React " 
//  (también llamado enlace unidireccional) (also called one-way binding) mantiene todo lo modular y rápido.


// Simplemente consulte los documentos React
// https://facebook.github.io/react/docs/hello-world.html
//  si necesita ayuda para ejecutar este paso.


// -------------------- Una breve pausa: Props vs State  ----------------------------------


// Hay dos tipos de datos "modelo" en React: "props y estado". "props and state" Es importante entender la distinción 
// entre los dos; puede leer "the official React docs" en el enlace de abajo  si no está seguro de cuál es la diferencia.
// --> https://facebook.github.io/react/docs/state-and-lifecycle.html 


// ----- Paso 3: Identificar la representación mínima (pero completa) del estado de la interfaz de usuario ----------


// Para que tu interfaz de usuario sea interactiva, debes ser capaz de activar cambios en el modelo de 
// datos subyacente. React hace esto fácil con el estado.

// Para crear correctamente tu aplicación, primero debes pensar en el conjunto mínimo de estados mutables que 
// tu aplicación necesitara. La clave aquí es secar: No te repitas. Calcule la representación mínima absoluta 
// del estado que su aplicación necesita y calcule todo lo que necesita bajo demanda. Por ejemplo, si está 
// creando una lista TODO, mantenga un array de los elementos TODO alrededor; No mantenga una variable 
// de estado independiente para el conteo. En su lugar, cuando desea renderear el conteo de TODO, simplemente 
// tome el tamaño del array de elementos TODO.

// Piense en todas las piezas de datos en nuestra aplicación de ejemplo. Tenemos:

// * La lista original de productos
// * El texto de búsqueda introducido por el usuario
// * El valor de la casilla de verificación
// * La lista filtrada de productos

// Veamos a través de cada uno y averiguaemos cuál es el estado. Simplemente haga tres preguntas sobre 
// cada pieza de datos:

// 1. ¿Se pasa de un padre a través de los props? Si es así, probablemente no es estado.

// 2. ¿Se mantiene sin cambios con el tiempo? Si es así, probablemente no es estado.

// 3. ¿Se puede calcular en función de cualquier otro estado o props en su componente? 
// Si es así, no es estado.


// La lista original de productos se pasa como props, por lo que no es estado. El texto de búsqueda 
// y la casilla de verificación parecen ser estados ya que cambian con el tiempo y no se pueden 
// calcular de nada. Y finalmente, la lista filtrada de productos no es estado porque puede ser calculada
// combinando la lista original de productos con el texto de búsqueda y el valor de la casilla de verificación.

// Así que finalmente, nuestro estado es:

// * El texto de búsqueda introducido por el usuario
// * El valor de la casilla de verificación


// -------------------- Paso 4: Identifique dónde debe vivir su estado -----------------------------


// Mi ejemplo creado por mi mismo 

class CompFormBusqueda extends React.Component
{
	render()
	{

		return(
				<div>
					<input type="text"  placeholder="buscar .." value={this.props.filtroBusqueda} />
					<br/>
					<input type="checkbox" checked={this.props.enStock} /> Mostrar solo productos en stock
				</div>
			  )
		
	}
}

class CompCabeceraTable extends React.Component
{
	render()
	{
		return (<tr><th colSpan='2' >{this.props.producto.categoria}</th></tr>);
	}
			
		  
}

class CompRowsBodyTabla extends React.Component
{
	render()
	{
		let row = "";

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
					<tr style={{color:'red'}} >
						<td>{this.props.producto.nombre}</td>
						<td>{this.props.producto.precio}</td>
					</tr>
				  )  
		}

		return row;
	}
			
		  
}

class CompCreateTabla extends React.Component
{
	
	render()
	{
		let rows1 = [];
		let categoria = null;

		this.props.productos.forEach( (producto ) => 
		{

			if(producto.nombre.indexOf(this.props.filtroBusqueda) === -1 ||  ( !producto.stocked && this.props.enStock ) )
			{
				return '';
			}

	     	if(categoria !== producto.categoria)
	     	{
	     		rows1.push(<CompCabeceraTable producto={producto} key={producto.categoria} />)
	     	}

	     	rows1.push(<CompRowsBodyTabla producto={producto} key={producto.nombre} />);

	     	categoria= producto.categoria;


	    });


		
		return(
				<div>
					<table>
						<thead>
						<tr>
							<td>Nombre</td>
							<td>Precio</td>
						</tr>
						</thead>
						<tbody>
							{rows1}
						</tbody>
					</table>
				</div>
			  )
	}

}

class CompRaiz2 extends React.Component
{

	constructor(props)
	{
		super(props);

		this.state = { filtroBusqueda:'' , enStock:false };
	}

	render()
	{

		return(
				<div>
				<CompFormBusqueda filtroBusqueda={this.state.filtroBusqueda} enStock={this.state.enStock} />
				<CompCreateTabla filtroBusqueda={this.state.filtroBusqueda} enStock={this.state.enStock} productos={this.props.productos}/>
				</div>
			  )
		
	}
	
}


const productos1 = [
					  {categoria:"Sporting Goods", precio:'$49.99', stocked:true, nombre:"Football"},
					  {categoria: 'Sporting Goods', precio: '$9.99', stocked: true, nombre: 'Baseball'},
					  {categoria: 'Sporting Goods', precio: '$29.99', stocked: false, nombre: 'Basketball'},
					  {categoria: 'Electronics', precio: '$99.99', stocked: true, nombre: 'iPod Touch'},
					  {categoria: 'Electronics', precio: '$399.99', stocked: false, nombre: 'iPhone 5'},
					  {categoria: 'Electronics', precio: '$199.99', stocked: true, nombre: 'Nexus 7'}
				  ];



ReactDOM.render(<CompRaiz2 productos={productos1} />,document.getElementById('cont3'));




// Ejemplo de la documentacion de REact js de facebook 



 class ProductCategoryRow2 extends React.Component {
  render() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
}

class ProductRow2 extends React.Component {
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

class ProductTable2 extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) => {

      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow2 category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow2 product={product} key={product.name} />);
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

class SearchBar2 extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} />
        <p>
          <input type="checkbox" checked={this.props.inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
  }

  render() {
    return (
      <div>
        <SearchBar2
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <ProductTable2
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
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
  document.getElementById('cont4')
);




// OK, así que hemos identificado cual es el conjunto mínimo de estados de la aplicación. A continuación, 
// necesitamos identificar qué componente muta, o posee, este estado. Recuerde: React maneja muy bien el flujo
// de datos unidireccional en la jerarquía de componentes. Puede que no esté claro de inmediato 
// qué componente debe poseer qué estado. Esta es a menudo la parte más difícil para los novatos de 
// poder entender, por lo que sigue estos pasos para que se le facilite:

// -- Para cada parte del estado en su aplicación:

// * Identificar cada componente que Renderea algo basado en ese estado.

// * Busque un componente de propietario común (un solo componente por encima de todos los componentes que
//  necesitan el estado en la jerarquía).

// * El componente propietario común u otro componente más arriba en la jerarquía debe poseer el estado.

// * Si no puede encontrar un componente en el que tenga sentido ser propietario del estado, cree un 
// nuevo componente simplemente para mantener el estado y agregarlo en algún lugar de la jerarquía por encima
// del componente propietario común.

// -- Pasemos por esta estrategia para nuestra aplicación :

// * ProductTable2 necesita filtrar la lista de productos en función del estado y el filtro de busqueda 
// y SearchBar2 necesita mostrar el texto de búsqueda y el estado marcado.

// * El componente propietario común es FilterableProductTable2.

// * Conceptualmente tiene sentido para el texto del filtro y el valor comprobado para vivir en 
//   FilterableProductTable2


// Bien, así que hemos decidido que nuestro estado vive en FilterableProductTable2. Primero, agregue una propiedad 
// de instancia this.state = {filterText: '', inStockOnly: false} al constructor de FilterableProductTable2 
// para reflejar el estado inicial de su aplicación. Luego, pase filterText y inStockOnly a ProductTable2
// y SearchBar como un prop. Por último, utilice estos props para filtrar las filas en ProductTable2 
// y establecer  los valores de los campos de formulario en SearchBar2.

// Puede empezar a ver cómo se comportará su aplicación: defina filterText como "ball" y refresque su aplicación.
//  Verá que la tabla de datos se actualiza correctamente.


// NOTA: 

// El componente de propietario común es el componente de mayor jerarquía osea el que esta mas arriba
// y por ende es el que renderea los componentes de menor jerarquía o menor nivel.

// En el siguiente ejemplo el componente propietario comun es FilterableProductTable ya que esta mas arriba en 
// la jerarquía y manda a llamar o a renderear a los otros componentes "SearchBar" y "ProductTable" 
// dentro de él.


// class FilterableProductTable extends React.Component {
//   render() 
//   {
// 	    return (
// 	      <div>
// 	        <SearchBar/>
// 	        <ProductTable/>
// 	      </div>
// 	    );
//   }
// }



// -------------------------- Paso 5: Agregar flujo de datos inverso ----------------------------------------


// Ejemplo creado por mi mismo 


class CompHeadTabla extends React.Component
{
	render()
	{
		return(
				<tr><th colSpan={'2'}>{this.props.producto.categoria}</th></tr>
			  )
		
	}
}


class CompRenderBodyTabla extends React.Component
{
	render()
	{

		let row = "";

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
							<td style={{color:'red'}}>{this.props.producto.nombre}</td>
							<td>{this.props.producto.precio}</td>
						</tr>
				      )
		}

		return(
				row
			  )
	}
}


class CompSearch extends React.Component
{
	constructor(props)
	{
		super(props);

		this.cambioFiltroSearch = this.cambioFiltroSearch.bind(this);
		this.cambioEnStock = this.cambioEnStock.bind(this);

	}

	cambioFiltroSearch(e)
	{
		this.props.functCambioFiltroSearch(e.target.value);
	}

	cambioEnStock(e)
	{
		this.props.functCambioEnStock(e.target.checked);
	}

	render()
	{
		return(
				<div>
					<input type="text" value={this.props.filtroSearch} onChange={this.cambioFiltroSearch} />
					<br />
					<input type="checkbox" value={this.props.enStock} onChange={this.cambioEnStock} />
					Mostrar solo productos disponibles
				</div>
			  )
	}
}

class CompFilterTabla extends React.Component
{
	render()
	{

		let filas = [];
		let categoria = null;

		this.props.productos.forEach((producto) => 
		{

			if(  producto.nombre.indexOf(this.props.filtroSearch) === -1  || ( !producto.stocked && this.props.enStock ) )
			{
				return '';
			}

			if(producto.categoria !== categoria)
			{
				filas.push(<CompHeadTabla producto={producto} key={producto.categoria} />);
			}

			filas.push(<CompRenderBodyTabla producto={producto}  key={producto.nombre} />);

			categoria = producto.categoria;

		})


		return(
				<div>
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Precio</th>
							</tr>
						</thead>
						<tbody>
							{filas}
						</tbody>
					</table>
				</div>
			  )
	}
}

class ComponentMain extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {filtroSearch: '' , enStock: false};

		this.functCambioEnStock = this.functCambioEnStock.bind(this);
		this.functCambioFiltroSearch = this.functCambioFiltroSearch.bind(this);

	}

	functCambioEnStock(enStock)
	{
		this.setState({enStock:enStock})
	}

	functCambioFiltroSearch(filtroSearch)
	{
		this.setState({filtroSearch:filtroSearch})
	}


	render()
	{
		return(
				<div>
					<CompSearch 
								productos={this.props.productos}
								filtroSearch={this.state.filtroSearch} 
								enStock={this.state.enStock}
								functCambioFiltroSearch={this.functCambioFiltroSearch}
								functCambioEnStock={this.functCambioEnStock}

					/>
					<CompFilterTabla 
										productos={this.props.productos}
										filtroSearch={this.state.filtroSearch} 
										enStock={this.state.enStock}
					/>
				</div>
			  )
	}
}


const productos2 = [
					  {categoria:"Sporting Goods", precio:'$49.99', stocked:true, nombre:"Football"},
					  {categoria: 'Sporting Goods', precio: '$9.99', stocked: true, nombre: 'Baseball'},
					  {categoria: 'Sporting Goods', precio: '$29.99', stocked: false, nombre: 'Basketball'},
					  {categoria: 'Electronics', precio: '$99.99', stocked: true, nombre: 'iPod Touch'},
					  {categoria: 'Electronics', precio: '$399.99', stocked: false, nombre: 'iPhone 5'},
					  {categoria: 'Electronics', precio: '$199.99', stocked: true, nombre: 'Nexus 7'}
				  ];

ReactDOM.render(<ComponentMain productos={productos2} />,document.getElementById('cont5'));



 
//Ejemplo de la documentacion de React Js de Facebook 


class ProductCategoryRow3 extends React.Component {
  render() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
}

class ProductRow3 extends React.Component {
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

class ProductTable3 extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    console.log(this.props.inStockOnly)
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow3 category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow3 product={product} key={product.name} />);
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

class SearchBar3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  
  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar3
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <ProductTable3
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
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
  <FilterableProductTable3 products={PRODUCTS} />,
  document.getElementById('cont6')
);


// Hasta ahora, hemos creado una aplicación que se ejecuta correctamente en función de los props y el estado que
//  fluye por la jerarquía. Ahora es el momento de soportar el flujo de datos de otra manera: los componentes 
//  de formulario de profundidad en la jerarquía necesitan actualizar el estado en FilterableProductTable3.

// React hace explícito este flujo de datos para facilitar el entender de cómo funciona el programa, 
// pero requiere un poco más de escritura que la vinculación de datos bidireccional tradicional.

// Si intenta escribir o marcar la casilla en la versión actual del ejemplo, verá que React ignora su entrada. 
// Esto es intencional, ya que hemos establecido el valor prop de la entrada a ser siempre igual al estado pasado
// de FilterableProductTable3.

// Pensemos en lo que queremos que suceda. Queremos asegurarnos de que siempre que el usuario cambie el formulario, 
// actualizamos el estado para reflejar la entrada del usuario. Dado que los componentes sólo deben actualizar 
// su propio estado, FilterableProductTable3 pasará callbacks a SearchBar3 que se disparará siempre que el estado 
// debe actualizarse. Podemos usar el evento onChange en las entradas para ser notificado de ello. 
// Las devoluciones de llamada pasadas por FilterableProductTable3 llamarán setState() y la aplicación se actualizará.

// Aunque esto suena complejo, es realmente sólo unas pocas líneas de código. Y es realmente explícito 
// cómo sus datos fluyen a lo largo de la aplicación.



// ----------------------------------- Y eso es todo -----------------------------------------------


// Con suerte, esto le da una idea de cómo pensar sobre la construcción de componentes y aplicaciones con React.
// Si bien puede ser un poco más de mecanografía de lo que está acostumbrado, recuerde que el código 
// se lee mucho más de lo que está escrito, y es extremadamente fácil de leer este código modular, explícito.
// A medida que empiece a construir grandes bibliotecas de componentes, apreciará esta explicidad y modularidad,
// y con la reutilización de código, sus líneas de código comenzarán a encogerse. :)





















































































