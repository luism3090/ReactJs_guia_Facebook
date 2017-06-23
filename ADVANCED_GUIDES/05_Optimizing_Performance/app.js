

// Internamente, React utiliza varias técnicas inteligentes para minimizar el número de operaciones DOM 
// costosas necesarias para actualizar la interfaz de usuario. Para muchas aplicaciones, el uso de React 
// conducirá a una interfaz de usuario rápida sin hacer mucho trabajo para optimizar específicamente para
//  el rendimiento. Sin embargo, hay varias maneras de acelerar su aplicación React.


// ------------------------- usa la build de produccion  ----------------------------------


// Si está comparando o experimentando problemas de rendimiento en sus aplicaciones React, 
// asegúrese de probar con la build de producción minificada.

// De forma predeterminada, React incluye muchas advertencias útiles. Estas advertencias son muy útiles
//  en el desarrollo. Sin embargo, hacen React más grande y más lento así que usted debe cerciorarse
//   de utilizar la versión de la producción al subir su aplicación.

// Si no está seguro de si su proceso de compilación está configurado correctamente, puede comprobarlo 
// instalando React Developer Tools para Chrome. Si visita un sitio con React en modo de producción,
//  el icono tendrá un fondo oscuro: 

// https://facebook.github.io/react/img/docs/devtools-prod.png 


// Si visita un sitio con React en modo de desarrollo, el icono tendrá un fondo rojo: 

// https://facebook.github.io/react/img/docs/devtools-dev.png


// Se espera que utilice el modo de desarrollo al trabajar en su aplicación y el modo de producción 
// al implementar su aplicación a los usuarios. A continuación encontrará instrucciones para crear 
// su aplicación para la producción. 


// --------------------------- Crear la aplicación React  ---------------------------------


// Si su proyecto se construye con Create React App, https://github.com/facebookincubator/create-react-app
// ejecute: 

// npm run build

// Esto creará una app de producción de su aplicación en la carpeta build/ de su proyecto. 

// Recuerde que esto sólo es necesario antes de implementar en la producción. Para un desarrollo
//  normal, utilice npm start.


// ----------------------- Single-File builds  -----------------------------------------


// Ofrecemos versiones listas para la producción de React y React DOM como archivos individuales:

// <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
// <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script> 

// Recuerde que sólo los archivos React que terminan con .min.js son adecuados para la producción.


//  -------------------------------------- Brunch ------------------------------------


//  Para una build de producción Brunch más eficiente, instale el complemento uglify-js-brunch: plugin:
// https://github.com/brunch/uglify-js-brunch 

// # If you use npm
// npm install --save-dev uglify-js-brunch

// # If you use Yarn
// yarn add --dev uglify-js-brunch


// A continuación, para crear una generación de producción, agregue el indicador -p al comando de compilación: 

// brunch build -p

// Recuerde que sólo necesita hacer esto para las compilaciones de producción. No debes pasar -p flag
//  o aplicar este plugin en desarrollo porque ocultará las advertencias React útiles y hará las 
//  compilaciones mucho más lentas. 


// ---------------------------------------- Browserify ---------------------------------------------


// Para la generación de producción de Browserify más eficiente, instale algunos complementos:


// # If you use npm
// npm install --save-dev bundle-collapser envify uglify-js uglifyify 

// # If you use Yarn
// yarn add --dev bundle-collapser envify uglify-js uglifyify 


// Para crear una generación de producción, asegúrese de agregar estas transformaciones 
// (el orden es importante):


// * La transformación envify asegura que el entorno de compilación adecuado esté establecido. 
// Hacerlo global (-g). 

// * La transformación uglifyify elimina las importaciones de desarrollo. Hágalo global también (-g). 

// * El complemento bundle-collapser reemplaza los identificadores de módulo largos con números.

// * Por último, el paquete resultante se canaliza a uglify-js para el mangling (leer por qué).


// browserify ./index.js \
//   -g [ envify --NODE_ENV production ] \
//   -g uglifyify \
//   -p bundle-collapser/plugin \
//   | uglifyjs --compress --mangle > ./bundle.js


// Nota: 
// El nombre del paquete es uglify-js, pero el binario que proporciona se denomina uglifyjs.
// Esto no es un error tipográfico.


// Recuerde que sólo necesita hacer esto para las compilaciones de producción. No debes aplicar 
// estos complementos en el desarrollo porque ocultarán advertencias útiles de React y harán 
// que las compilaciones sean mucho más lentas.


// ------------------------------------------ Rollup ---------------------------------------------------


// Para la compilación de producción Rollup más eficiente, instale algunos complementos:

// # If you use npm
// npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify 

// # If you use Yarn
// yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-uglify


// Para crear una generación de producción, asegúrese de agregar estos complementos 
// (el orden es importante):

// * El complemento de reemplazo asegura que se establezca el entorno de compilación correcto. 

// * El plugin commonjs proporciona soporte para CommonJS en Rollup.

// * El plugin uglify comprime y mangle el paquete final.


// plugins: [
//   // ...
//   require('rollup-plugin-replace')({
//     'process.env.NODE_ENV': JSON.stringify('production')
//   }),
//   require('rollup-plugin-commonjs')(),
//   require('rollup-plugin-uglify')(),
//   // ...
// ]

// Para obtener un ejemplo completo de configuración, 
// vea este tema ---> https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0

// Recuerde que sólo necesita hacer esto para las compilaciones de producción. No debes aplicar 
// el plugin uglify o el complemento de reemplazo con el valor 'producción' en desarrollo porque
//  ocultarán advertencias de React útiles y harán que las compilaciones sean mucho más lentas. 


// ------------------------------------- Webpack ------------------------------------------


// Nota: Si utiliza Create React App, 
// siga las instrucciones ---> https://facebook.github.io/react/docs/optimizing-performance.html#create-react-app 
// Esta sección sólo es relevante si configura el paquete web directamente


// Para la compilación de producción de webpack más eficiente, asegúrese de incluir estos 
// complementos en su configuración de producción: 

// new webpack.DefinePlugin({
//   'process.env': {
//     NODE_ENV: JSON.stringify('production')
//   }
// }),
// new webpack.optimize.UglifyJsPlugin() 


// Puede obtener más información al respecto en 
// webpack documentation --> https://webpack.js.org/guides/production/

// Recuerde que sólo necesita hacer esto para las compilaciones de producción. No debes aplicar 
// UglifyJsPlugin o DefinePlugin con valor de "producción" en desarrollo porque ocultarán 
// advertencias de React útiles y harán que las compilaciones sean mucho más lentas. 


// Recuerde que sólo necesita hacer esto para las compilaciones de producción. No debes aplicar
//  UglifyJsPlugin o DefinePlugin con valor de "producción" en desarrollo porque ocultarán 
//  advertencias de React útiles y harán que las compilaciones sean mucho más lentas. 


// ---------------------- Componentes de perfiles con un tab de Rendimiento de Chrome  -------------------------

// En el modo de desarrollo, puede visualizar cómo los componentes se montan, se actualizan y se desmonta,
//  utilizando las herramientas de rendimiento de los navegadores compatibles. Por ejemplo: 


// https://facebook.github.io/react/img/blog/react-perf-chrome-timeline.png 


// Para hacerlo en Chrome: 


// 1. Cargar su aplicación con? React_perf en la cadena de consulta 
// (por ejemplo, http: // localhost: 3000 /? React_perf). 

// 2. Abra la pestaña Rendimiento de Chrome DevTools y pulse Grabar. 

// 3. Realice las acciones que desee perfilar. No grabe más de 20 segundos o es posible que Chrome se bloquee. 

// 4. Para de grabar.

// 5. Los eventos de reacción se agruparán bajo la etiqueta Tiempo de usuario. 


// Tenga en cuenta que los números son relativos para que los componentes se vuelvan más
 // rápidos en la producción. Sin embargo, esto debería ayudarle a darse cuenta cuando la interfaz
 //  de usuario no relacionada se actualiza por error, y la profundidad y frecuencia con que se producen
 //   las actualizaciones de la interfaz de usuario.


// Actualmente, Chrome, Edge e IE son los únicos navegadores compatibles con esta característica, 
// pero utilizamos la API de tiempo de usuario estándar, por lo que esperamos que más navegadores 
// agreguen soporte para ella.


// ---------------------------------- Evite la reconciliación  ----------------------------------------


// React crea y mantiene una representación interna de la interfaz de usuario renderizada. 
// Incluye los elementos React que devuelve de sus componentes. Esta representación permite 
// que React evite crear nodos DOM y acceda a los ya existentes más allá de la necesidad, 
// ya que puede ser más lento que las operaciones en objetos JavaScript. A veces se conoce como 
// un "DOM virtual", pero funciona de la misma manera en React Native. 


// Cuando los componentes de un componente o el cambio de estado, React decide si una actualización 
// DOM real es necesario mediante la comparación del elemento recién devuelto con el prestado anteriormente.
//  Cuando no son iguales, React actualizará el DOM. 


// En algunos casos, su componente puede acelerar todo esto por ecima de la función de ciclo de vida 
// shouldComponentUpdate, que se activa antes de que se inicie el proceso de re-rendering. 
// La implementación predeterminada de esta función devuelve true, dejando React para realizar
//  la actualización:


// shouldComponentUpdate(nextProps, nextState) {
//   return true;
// }

// Si sabe que en algunas situaciones su componente no necesita actualizarse, 
// puede devolver false de shouldComponentUpdate para omitir todo el proceso de renderizado,
//  incluyendo render() en este componente y debajo.


// ------------------------ ShouldComponentUpdate en acción ---------------------------------


// Aquí hay un subárbol de componentes. Para cada uno, SCU indica lo que shouldComponentUpdate devuelto, 
// y vDOMEq indica si los elementos de React rendidos eran equivalentes. Finalmente, el color
//  del círculo indica si el componente tuvo que ser reconciliado o no. 


// https://facebook.github.io/react/img/docs/should-component-update.png 


// Debido a que shouldComponentUpdate devolvió false para el subárbol con raíz en C2, React
//  no intentó renderizar C2, y por lo tanto ni siquiera tuvo que invocar a shouldComponentUpdate en C4 y C5. 

// Para C1 y C3, shouldComponentUpdate devolvió true, por lo que React tuvo que bajar a las hojas
//  y comprobarlas. Para C6 shouldComponentUpdate devuelto true, y como los elementos renderizados 
//  no eran equivalentes React tenía que actualizar el DOM.

// El último caso interesante es C8. React tenía que renderizar este componente, pero como los 
// elementos React devueltos eran iguales a los renderizados anteriormente, no tenía que actualizar el DOM.

// Tenga en cuenta que React sólo tenía que hacer las mutaciones DOM para C6, que era inevitable. 
// Para C8, rescató comparando los elementos de React rendidos, y para el subárbol de C2 y C7,
//  ni siquiera tuvo que comparar los elementos como nos rescató en shouldComponentUpdate, 
//  y render no se llamó. 


// ------------ Ejemplos -----------------------


// Si la única forma en que su componente cambia siempre es cuando cambia la variable props.color o state.count,
//  Usted podría usar a shouldComponentUpdate para checarlo:

class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    //debugger;
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
  	 //debugger;
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {

  	 //debugger;
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState( state => ({count: state.count + 1}) ) } >
        Count: {this.state.count}
      </button>
    );
  }
} 


ReactDOM.render(<CounterButton />,document.getElementById('cont1'));


// En este código, shouldComponentUpdate sólo está comprobando si hay algún cambio en props.color o state.count. 
// Si estos valores no cambian, el componente no se actualiza. Si su componente se vuelve más complejo, podría utilizar
// un patrón similar que hace una "comparación superficial" entre todos los campos de props y estado para
// determinar si el componente debe actualizarse. Este patrón es bastante común que React proporciona un ayudante 
// para usar esta lógica - solo hereda de React.PureComponent. Así que este código es una forma más sencilla de 
// lograr lo mismo: 


class CounterButton2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}


 ReactDOM.render(<CounterButton2 />,document.getElementById('cont2'));



// La mayor parte del tiempo, puede utilizar React.PureComponent en vez de escribir su propio shouldComponentUpdate. 
// Sólo hace una comparación superficial, por lo que no se puede utilizar si los props o el estado pueden haber sido
//  mutados de una manera que una comparación superficial se perdería. 

// Esto puede ser un problema con estructuras de datos más complejas. Por ejemplo, supongamos que desea que un 
// componente ListOfWords muestre una lista de palabras separada por comas, con un componente principal de WordAdder 
// que le permite hacer clic en un botón para agregar una palabra a la lista. Este código no funciona correctamente: 



class ListOfWords extends React.PureComponent {
  render() {
    // debugger;
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    // debugger;
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and causes a bug
    // debugger;
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    //debugger;
    return (

      <div>
        <button onClick={this.handleClick} >Click</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

ReactDOM.render(<WordAdder />,document.getElementById('cont3'));


// El problema es que PureComponent hará una comparación simple entre los viejos y nuevos valores de this.props.words 
// Dado que este código modifica las palabras array en el método handleClick de WordAdder, los valores antiguos y nuevos
//  de this.props.words se compararán como iguales, aunque las palabras reales en la matriz hayan cambiado. Por lo tanto,
//   el ListOfWords no se actualizará aunque tenga nuevas palabras que se deben renderizar. 




// ------------------------------------- El poder de no mutar datos ------------------------------------------


// La forma más sencilla de evitar este problema es evitar mutación de valores que se esten utilizando como objetos o estado. 
// Por ejemplo, el método handleClick anterior podría volver a escribirse utilizando concat de esta manera:


// handleClick() {
//   this.setState(prevState => ({
//     words: prevState.words.concat(['marklar'])
//   }));
// } 

// ES6 soporta una sintaxis de propagación 'spread syntax '
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator  
// para arrays que puede hacer esto más fácil. Si utiliza Create React App,
// esta sintaxis está disponible de forma predeterminada.


// handleClick() {
//   this.setState(prevState => ({
//     words: [...prevState.words, 'marklar'],
//   }));
// };


// También puede reescribir el código que muta objetos para evitar la mutación, de manera similar. Por ejemplo, 
// digamos que tenemos un objeto denominado colormap y queremos escribir una función que cambia el colormap.right a ser 'blue'.
//  Podríamos escribir:


// function updateColorMap(colormap) {
//   colormap.right = 'blue';
// }

// Para escribir esto sin modificar el objeto original, podemos usar el método Object.assign:

// function updateColorMap(colormap) {
//   return Object.assign({}, colormap, {right: 'blue'});
// }

// UpdateColorMap devuelve un objeto nuevo, en lugar de modificar el antiguo. Object.assign está en ES6 y requiere un polyfill.

// Hay una propuesta de JavaScript para agregar propiedades de propagación de objetos para facilitar 
// la actualización de objetos sin mutación:


// function updateColorMap(colormap) {
//   return {...colormap, right: 'blue'};
// }

// Si utiliza Create React App, tanto Object.assign como la sintaxis de extensión de objetos están disponibles de 
// forma predeterminada.


// ----------------------- Uso de estructuras de datos inmutables ------------------------------------


// Immutable.js  https://github.com/facebook/immutable-js 
// es otra manera de resolver este problema. Proporciona colecciones inmutables y persistentes que funcionan
// a través del intercambio estructural: 

// * Inmutable: una vez creada, una colección no puede ser alterada en otro momento.

// * Persistente: se pueden crear nuevas colecciones a partir de una colección anterior y una mutación como, por ejemplo, 
// set. La colección original sigue siendo válida una vez creada la nueva colección. 

// * Compartición estructural: se crean nuevas colecciones usando la misma estructura que la colección original, 
// reduciendo al mínimo la copia para mejorar el rendimiento.


// La inmutabilidad hace que los cambios de seguimiento sean baratos. Un cambio siempre dará lugar a un nuevo objeto, 
// por lo que sólo es necesario comprobar si la referencia al objeto ha cambiado. Por ejemplo, en este código regular de JavaScript:


// const x = { foo: 'bar' };
// const y = x;
// y.foo = 'baz';
// x === y; // true


// Aunque y fue editado, ya que es una referencia al mismo objeto que x, esta comparación devuelve true.
//  Puede escribir código similar con immutable.js:


// const SomeRecord = Immutable.Record({ foo: null });
// const x = new SomeRecord({ foo: 'bar' });
// const y = x.set('foo', 'baz');
// x === y; // false


// En este caso, dado que se devuelve una nueva referencia al mutar x, podemos asumir con seguridad que x ha cambiado. 



// Otras dos bibliotecas que pueden ayudar a usar datos inmutables son ininterrumpidas-inmutable e inmutabilidad-ayudante.
//  "seamless-immutable and immutability-helper."

// https://github.com/kolodny/immutability-helper 

// https://github.com/rtfeldman/seamless-immutable


// Las estructuras de datos inmutables le brindan una manera barata de realizar un seguimiento de los cambios en los objetos, 
// que es todo lo que necesitamos para implementar shouldComponentUpdate. Esto a menudo puede proporcionarle un buen 
// impulso de rendimiento.










