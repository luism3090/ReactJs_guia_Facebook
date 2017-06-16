
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

// ----------------------- Adición de una referencia a un elemento DOM --------------------


// React admite un atributo especial que puede adjuntar a cualquier componente. El atributo ref 
// toma una función de devolución de llamada y la devolución de llamada se ejecutará 
// inmediatamente después de montar o desmontar el componente.

// Cuando se utiliza el atributo ref en un elemento HTML, el retorno de referencia recibe el elemento 
// DOM subyacente como su argumento. Por ejemplo, este código utiliza la devolución de llamada ref para 
// almacenar una referencia a un nodo DOM:



















