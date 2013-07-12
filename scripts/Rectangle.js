/*
* Nuestra clase rectangulo, que nos va a servir a lo largo 
* de muchos de los siguientes artículos para realizar colisiones.
* Aunque podemos hacer colision de segmentos, circulos, rectangulos, etc
* La de rectangulos consume menos memoria.
*/
var Rectangle = function(x, y, width, height)
{
	// Punto X, Y, ancho y alto a y también el color.
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = "#00FF00";

	this.draw = function(context)
	{
		context.save();

		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);

		context.restore();
	};

	return this;
};