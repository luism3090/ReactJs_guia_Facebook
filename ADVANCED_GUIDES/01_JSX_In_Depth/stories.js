import React from "react";

export class HsitoriaFoto extends React.Component
{
	render()
	{
		return <h2>Este es el component PhotoStory la historia es: {this.props.msjHistoria} </h2>;
	}
}


export class HistoriaVideo extends React.Component
{
	render()
	{
		return <h2>Este es el component VideoStory la historia es: {this.props.msjHistoria}</h2>;
	}
}



export class PhotoStory extends React.Component
{
	render()
	{
		return <h2>Este es el component PhotoStory la historia es: {this.props.story} </h2>;
	}
}


export class VideoStory extends React.Component
{
	render()
	{
		return <h2>Este es el component VideoStory la historia es: {this.props.story}</h2>;
	}
}

 