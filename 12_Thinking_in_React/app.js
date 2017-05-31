

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

https://facebook.github.io/react/img/blog/thinking-in-react-components.png





















































































