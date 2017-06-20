
// -------------------------------------- Refs and the DOM ----------------------------------------- 

// En el flujo típico de datos React , los props son la única forma en que los componentes padres interactúan 
// con sus hijos. Para modificar un child, vuelva a hacerlo con nuevos props. Sin embargo, hay algunos 
// casos en los que es necesario modificar imperativamente a un child fuera del flujo de datos típico. 
// El child a ser modificado podría ser una instancia de un componente React, o podría ser un elemento DOM.
// En ambos casos, React proporciona una escotilla de escape.


// ------------------------------------ Cuándo utilizar Refs ----------------------------------------------- 


// Hay algunos buenos casos de uso para refs:

// * Administración del enfoque, selección de texto o reproducción de medios.

// * Desencadenando animaciones imperativas.

// * Integración con bibliotecas de DOM de terceros.

// Evite usar refs para cualquier cosa que se pueda hacer declarativamente.

// Por ejemplo, en lugar de exponer los métodos open() y close() en un componente Dialog, 
// pase un objeto isOpen a él.


// ------------------------ No utilice demasiadas referencias ------------------------------------


// Su primera inclinación puede ser usar refs para "hacer que las cosas sucedan" en su aplicación. 
// Si este es el caso, tómese un momento y piense más críticamente acerca de dónde debería ser 
// propiedad del estado en la jerarquía de componentes. A menudo, queda claro que el lugar apropiado
//  para "poseer" ese estado está en un nivel más alto en la jerarquía. 
//  Vea la guía de levantamiento de estado https://facebook.github.io/react/docs/lifting-state-up.html 
// para arriba para ejemplos de esto.



// ----------------------- Añadiendo una referencia a un elemento DOM --------------------


// React admite un atributo especial que puede añadir a cualquier componente. El atributo ref 
// toma una función de callback y ese callback se ejecutará inmediatamente después de montar o desmontar
//  el componente.

// Cuando se utiliza el atributo ref en un elemento HTML, el ref de callback recibe el elemento 
// DOM subyacente como su argumento. Por ejemplo, este código utiliza la devolución de llamada ref para 
// almacenar una referencia a un nodo DOM:



class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.msjAlerta = this.msjAlerta.bind(this);
    this.desabilitar = this.desabilitar.bind(this);
     this.habilitar = this.habilitar.bind(this);
  }

  focus(e) {
    // Enfoca explícitamente la entrada de texto utilizando la API de DOM sin procesar
    
    //e.textInput.focus();
    this.textInput.focus();

  }
  msjAlerta()
  {
  	alert(this.textInput.value); 
  }
  desabilitar()
  {
  	this.textInput.disabled = true;
  }
  habilitar()
  {
  	this.textInput.disabled = false;
  }

  render() {
    // Usa  el callback de `ref` para almacenar una referencia a la entrada de texto DOM
    // elemento en un campo de instancia (por ejemplo, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={ (input) => { this.textInput = input; } } />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
        <input
          type="button"
          value="alerta con el valor"
          onClick={this.msjAlerta}
        />
        <input
          type="button"
          value="desabilitar input"
          onClick={this.desabilitar}
        />
        <input
          type="button"
          value="habilitar input"
          onClick={this.habilitar}
        />
      </div>
    );
  }
}


ReactDOM.render(<CustomTextInput />,document.getElementById('cont1'));


// React llamará a el ref callback con el elemento DOM cuando el componente se monta, y lo llamará 
// con null cuando se desmonta.

// El uso de el ref callback es sólo para establecer una propiedad en la clase, es un patrón 
// común para acceder a los elementos DOM. La forma preferida es establecer en el callback ref 
// la propiedad en la referencia de retorno como en el ejemplo anterior. Hay incluso una manera más corta 
// de escribirlo:  ref = {input => this.textInput = input}.



// ------------------------ Añadiendo una referencia a un componente de clase  ------------------------


// Cuando se utiliza el atributo ref en un componente personalizado declarado como una clase,
//  el ref callback recibe la instancia montada del componente como su argumento.
// Por ejemplo, si queremos insertar el CustomTextInput arriba para simular que se haga clic 
// inmediatamente después del montaje:


class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}

ReactDOM.render(<AutoFocusTextInput />,document.getElementById('cont2'));

// Tenga en cuenta que esto sólo funciona si CustomTextInput se declara como una clase:

// class CustomTextInput extends React.Component {
//   // ...
// }


// ----------------------- Refs y componentes funcionales ----------------------------

// No puede utilizar el atributo ref en componentes funcionales porque no tienen instancias:


function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // Esto no funcionará
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}


ReactDOM.render(<Parent />,document.getElementById('cont3'));


// Debe convertir el componente en una clase si necesita una referencia a él, tal como lo hace 
// cuando necesita métodos de ciclo de vida o estado.
// Sin embargo, puede utilizar el atributo ref dentro de un componente funcional siempre y cuando 
// se refiera a un elemento DOM o a un componente de clase:


function CustomTextInput2(props) {
  //  textInput debe declararse aquí para que la referencia de retorno pueda referirse a ella
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  function msjAlerta() {
    alert(textInput.value);
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
      <input
        type="button"
        value="Mensaje"
        onClick={msjAlerta}
      />
    </div>
  );  
}


ReactDOM.render(<CustomTextInput2 />,document.getElementById('cont4'));


// ---------------  Exponiendo DOM Refs a los componentes padres ---------------------------


// En casos excepcionales, es posible que desee tener acceso al nodo DOM de un child desde un 
// componente principal. Esto generalmente no se recomienda porque rompe la encapsulación de 
// componentes, pero ocasionalmente puede ser útil para disparar el focus o medir el tamaño o la 
// posición de un nodo hijo DOM secundario.

// Aunque puede agregar una referencia al componente secundario, esto no es una solución ideal, 
// ya que sólo obtendría una instancia del componente en lugar de un nodo DOM. Además, esto no funcionaría 
// con componentes funcionales.

// En cambio, en tales casos recomendamos colocar un prop especial sobre el child. El child tomará 
// una función prop con un nombre arbitrario (por ejemplo, inputRef) y lo adjuntará al nodo DOM como
//  un atributo ref. Esto permite que el padre pase su devolución de llamada ref al nodo DOM del child 
//  a través del componente en el medio.


// Esto funciona tanto para las clases como para los componentes funcionales.


function CustomTextInput3(props) 
{

  return (
    <div>
    <p>Nombre:<input ref={props.inputRefNombre} placeholder='Nombre' /></p>
    <p>Apellidos:<input ref={props.inputRefApellidos} placeholder='Apellidos'/></p>
    </div>
  );
}

class Parent2 extends React.Component 
{
  render() {
    return (
      <CustomTextInput3
        inputRefNombre={(el) =>{ this.inputElement = el } }
        inputRefApellidos={(el) =>{ this.inputElement = el } }
      />
    );
  }
}

ReactDOM.render(<Parent2 />,document.getElementById('cont5'));


// En el ejemplo anterior, Parent2 pasa su devolución de llamada de referencia como un argumento inputRef 
// en CustomTextInput3 y el CustomTextInput3 pasa la misma función que un atributo ref especial a <input>. 
// Como resultado, this.inputElement en Parent se establecerá en el nodo DOM correspondiente al 
// elemento <input> en el CustomTextInput3.

// Tenga en cuenta que el nombre de la entrada inputRefNombre en el ejemplo anterior no tiene 
// ningún significado especial, ya que es un componente regular prop. Sin embargo, utilizando
// el atributo ref en <input> Es importante, ya que le dice a React que adjunte una referencia 
// a su nodo DOM.

// Esto funciona aunque CustomTextInput3 sea un componente funcional. A diferencia del atributo ref 
// especial que sólo se puede especificar para los elementos DOM y para los componentes de la clase,
// no hay restricciones para los props de componentes comunes como inputRefNombre.

// Otro beneficio de este patrón es que trabaja varios componentes a profundidad. Por ejemplo, 
// imagine que Parent2 no necesitaba ese nodo DOM, pero un componente que renderio Parent2 
// (llamémoslo Grandparent) necesitaba acceso a él. Entonces podríamos dejar que el Grandparent 
// especifique el argumento inputRefNombre en Parent2, y dejar que Parent2 lo "reenvíe" 
// al CustomTextInput3:


function CustomTextInput4(props) {
  debugger;
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

function Parent4(props) {
  debugger;
  return (
    <div>
      My input: <CustomTextInput4 inputRef={props.inputRef} />
    </div>
  );
}


class Grandparent extends React.Component {
  render() {
    return (
      <Parent4
        inputRef={el => this.inputElement = el}
      />
    );
  }
}

ReactDOM.render(<Grandparent />,document.getElementById('cont6'));



// Aquí, la referencia de retorno es especificada por Grandparent. Se pasa al padre como un 
// prop regular llamado inputRef, y el padre lo pasa a CustomTextInput4 como un prop también. 
// Por último, el CustomTextInput4 lee el objeto inputRef y asigna la función pasada como un
// atributo ref al <input>. Como resultado, this.inputElement en Grandparent se establecerá en el
// nodo DOM correspondiente al elemento <input> en CustomTextInput4;


// En todo caso, le recomendamos que no exponga los nodos DOM siempre que sea posible, pero 
// esto puede ser una escotilla de escape útil. Tenga en cuenta que este enfoque requiere 
// que agregue algún código al componente secundario. Si no tiene absolutamente ningún control 
// sobre la implementación de componentes secundarios, su última opción es utilizar 
// findDOMNode(), pero se desaconseja.


// ------------------------- Legacy API: String Refs --------------------------------


// Si trabajó con React antes, podría estar familiarizado con una API más antigua donde el 
// atributo ref es una cadena, como "textInput", y el nodo DOM se accede como this.refs.textInput.
//  eso lo desaconsejamos porque los refs de la cadena tienen algunos problemas, se consideran 
//  en desuso y es probable que se eliminen en una de las versiones futuras. Si está utilizando
//   this.refs.textInput para acceder a refs, le recomendamos usar el patron callback en su lugar.



// ------------------------ Advertencias --------------------------


// Si el callback ref se define como una función en línea, se llamará dos veces durante 
// las actualizaciones, primero con nulo y luego de nuevo con el elemento DOM.
//Esto se debe a que se crea una nueva instancia de la función con cada procesamiento, por
//    lo que React necesita borrar la referencia antigua y configurar la nueva. Puede evitar
//     esto definiendo la referencia de retorno como un método enlazado en la clase, pero tenga
//      en cuenta que no debería importar en la mayoría de los casos.









