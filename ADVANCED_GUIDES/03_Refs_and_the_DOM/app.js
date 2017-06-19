
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


























