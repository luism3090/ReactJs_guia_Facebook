import React from "react";
//import ReactDOM from 'react-dom';

export class FeedbackMessage extends React.Component {
    render() {
        return (
            <div>
                Hola!
            </div>
        )
    }

};


function Tbody (props)
{
	
	return(
				<tr>
					<td>{props.cliente.nombre}</td>
					<td>{props.cliente.apellido}</td>
					<td>{props.cliente.edad}</td>
				</tr>
		  )
	
}

export class Header extends React.Component {

    render() {

    	var rows = [];

    	this.props.clientes.forEach((cliente,index) => 
    	{
    		var row = (<Tbody cliente={cliente} key={index}/>);

    		rows.push(row);
    	})

        return (
            <table>
                <thead>
                <tr>
                	<th>Nombre</th>
                	<th>Apellido</th>
                	<th>Edad</th>
                </tr>
                </thead>
                <tbody>
                	{rows}
                </tbody>
            </table>
        )
    }

}



// ReactDOM.render(<FeedbackMessage />,document.getElementById('cont2'));


