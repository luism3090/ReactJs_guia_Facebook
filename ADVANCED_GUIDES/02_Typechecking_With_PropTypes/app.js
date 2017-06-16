
// ---------------------------------- Typechecking With PropTypes ------------------------------------


// Nota: React.PropTypes está obsoleto a partir de React v15.5. Por favor, utilice la biblioteca
//  prop-types en su lugar: 
//  https://www.npmjs.com/package/prop-types


// A medida que su aplicación crece, puede detectar muchos errores con la 'typechecking' validaciones. 
// Para algunas aplicaciones, puede utilizar extensiones de JavaScript como Flow o TypeScript 
// para clasificar toda su aplicación. Pero incluso si usted no los utiliza, React tiene algunas
 // capacidades incorporadas de typechecking. Para ejecutar typechecking en los props de un componente, 
 // puede asignar la propiedad propTypes especial:


import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() 
  {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};


ReactDOM.render(<Greeting name={'Luis'} />,document.getElementById('cont1'));
ReactDOM.render(<Greeting name={10} />,document.getElementById('cont2'));


// PropTypes exporta una gama de validadores que pueden utilizarse para asegurarse de que los datos 
// que recibe son válidos. En este ejemplo, estamos utilizando PropTypes.string. Cuando se proporciona 
// un valor no válido para un prop, se mostrará una advertencia en la consola de JavaScript. 
// Por razones de rendimiento, propTypes sólo se comprueba en modo de desarrollo.



// --------------------------------------------- PropTypes  ------------------------------------------


//A continuación se muestra un ejemplo que documenta los diferentes validadores proporcionados:



// MyComponent.propTypes = {
//   // Puedes declarar que un prop sea un tipo de dato específico primitivo de JS . Por defecto, estos
//   // son todos opcionales.

//   optionalArray: PropTypes.array,
//   optionalBool: PropTypes.bool,
//   optionalFunc: PropTypes.func,
//   optionalNumber: PropTypes.number,
//   optionalObject: PropTypes.object,
//   optionalString: PropTypes.string,
//   optionalSymbol: PropTypes.symbol,

//  // Cualquier cosa que se puede renderizar: números, cadenas, elementos o una matriz
//  // (o fragmento) que contiene estos tipos.

//   optionalNode: PropTypes.node,

//   // un elemento React

//   optionalElement: PropTypes.element,

//   // También puede declarar que un prop sea una instancia de una clase. Esto utiliza 
//   // El operador instanceof de JS's.

//   optionalMessage: PropTypes.instanceOf(Message),

// // Puede asegurarse de que su prop se limite a valores específicos tratando como un enum.

//   optionalEnum: PropTypes.oneOf(['News', 'Photos']),

//   // Un objeto que podría ser uno de muchos tipos

//   optionalUnion: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//     PropTypes.instanceOf(Message)
//   ]),

//   // Un arreglo de un cierto tipo

//   optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

//   // Un objeto con valores de propiedad de cierto tipo

//   optionalObjectOf: PropTypes.objectOf(PropTypes.number),

//   // Un objeto que toma una forma particular

//   optionalObjectWithShape: PropTypes.shape({
//     color: PropTypes.string,
//     fontSize: PropTypes.number
//   }),

//   // Puedes encadenar cualquiera de los anteriores con `isRequired` para asegurarte de una advertencia
//   // se muestra si no se proporciona el prop.

//   requiredFunc: PropTypes.func.isRequired,

//   // Un valor de cualquier tipo de datos

//   requiredAny: PropTypes.any.isRequired,

// // También puede especificar un validador personalizado. Debe devolver un error
// // objeto si la validación falla. No lanzar la `console.warn` , ya que
//   // no funcionará dentro de `oneOfType`.

//   customProp: function(props, propName, componentName) {
//     if (!/matchme/.test(props[propName])) {
//       return new Error(
//         'Invalid prop `' + propName + '` supplied to' +
//         ' `' + componentName + '`. Validation failed.'
//       );
//     }
//   },

// // También puede suministrar un validador personalizado para `arrayOf` y ` objectOf`.
//  // Debe devolver un objeto Error si la validación falla. El validador
//   // se llamará para cada clave de la matriz u objeto. Los primeros dos
// // de los argumentos del validador son el array o el objeto en sí, y la clave del elemento actual.

//   customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
//     if (!/matchme/.test(propValue[key])) {
//       return new Error(
//         'Invalid prop `' + propFullName + '` supplied to' +
//         ' `' + componentName + '`. Validation failed.'
//       );
//     }
//   })
// };



// -------------------------------------- Requeriendo un único hijo -----------------------------------------------


// Con PropTypes.element puede especificar que sólo un solo child se puede pasar a un componente como children.



class MyComponent extends React.Component {
  render() {
    // Este debe ser exactamente un elemento o sera una advertencia.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};


// sin hijo 
ReactDOM.render(<MyComponent>

				</MyComponent>
				,document.getElementById('cont3'));

// con children
ReactDOM.render(<MyComponent>
					<h2>Hola mundo React Js</h2> 
				</MyComponent>
				,document.getElementById('cont4'));


// Puede definir valores predeterminados para sus props asignándole a la propiedad especial defaultProps :


class Greeting2 extends React.Component {
  render() {
    return (
      <h1>Hola, {this.props.name}</h1>
    );
  }
}

// Especifica los valores predeterminados para los accesorios:
Greeting2.defaultProps = {
  name: 'Extraño'
};

// renderea "Hola, Extraño":
ReactDOM.render(
  <Greeting2 />,
  document.getElementById('cont5')
);


// El defaultProps se utilizará para asegurar que this.props.name tendrá un valor si no fue
//  especificado por el componente principal. Los propTypes typechecking ocurren después de que defaultProps
//   se resuelva, por lo que typechecking también se aplicará a defaultProps.



