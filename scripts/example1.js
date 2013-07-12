/*
* Ejemplo de colisiones en los bordes
*/
var Example = function()
{
	var ball;
	var poder;

	var xspeed, yspeed;
	var friccion;
	var gravedad;

	var impulso;
	var viento;

	// Arreglo para manejar los cuadrados verdes que veremos.
	var array_border;

	// Reseteamos la pelota a su posición inicial
	var reset = function()
	{
		ball.x = 300;
		ball.y = 150;
		xspeed = 0;
		yspeed = 0;
	};

	this.init = function()
	{
		ball = {
			imagen: new Image(),
			x: 300,
			y: 300,
			width: 0,
			height: 0,
			cargado: false,
			rotacion: 0
		};
		ball.imagen.src = "resources/pelota.png";

		ball.imagen.onload = function()
		{
			ball.width = this.width;
			ball.height = this.height;
			ball.cargado = true;
		};

		poder = 0.3;

		xspeed = 0;
		yspeed = 0;
		friccion = 0.95;
		gravedad = 0.1;

		impulso = 0.75;
		viento = 0.0;

		array_border = [];

		// Rectangulo izquierda verde
		array_border.push(new Rectangle(0, 0, 40, CANVAS_HEIGHT)); 
		// Rectangulo derecha verde
		array_border.push(new Rectangle(CANVAS_WIDTH - 40, 0, 40, CANVAS_HEIGHT)); 
		// Rectangulo arriba verde
		array_border.push(new Rectangle(0, 0, CANVAS_WIDTH, 40));
		// Rectangulo abajo verde
		array_border.push(new Rectangle(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, CANVAS_HEIGHT - 40)); 

	};

	this.draw = function(context)
	{
		context.save();

		if(ball.cargado)
		{
			context.translate(ball.x + ball.width * 0.5, ball.y + ball.height * 0.5);
			context.rotate(ball.rotacion * (Math.PI / 180));
			context.translate(-(ball.x + ball.width * 0.5), -(ball.y + ball.height * 0.5));
			context.drawImage(ball.imagen, ball.x, ball.y, ball.width, ball.height);
		}

		context.restore();

		/*
		* Aqui dibujamos los rectangulos en el canvas
		* para que podamos verlos y saber contra que chocamos.
		*/

		if(array_border.length > 0)
		{
			for(var i = 0; i < array_border.length; i++)
			{
				array_border[i].draw(context);
			}
		}

	};

	this.update = function(dt)
	{
		if(KEY_STATES.UP)
			yspeed -= poder * impulso;

		if(KEY_STATES.DOWN)
			yspeed += poder * impulso;

		if(KEY_STATES.LEFT)
			xspeed -= poder;

		if(KEY_STATES.RIGHT)
			xspeed += poder;

		xspeed += viento;
		xspeed *= friccion;
		yspeed += gravedad;

		ball.x += xspeed;
		ball.y += yspeed;

		ball.rotacion += xspeed;

		// Creamos nuestro método para manejar colisiones
		manejarColisiones();

	};

	/*
	* Metodo basico para manejo de colisiones, este concepto
	* puede ser medio complicado asi que si revisan el blog
	* ahi veran mejor la explicacion
	* Visitar: www.carlospinan.com xD
	*/
	var manejarColisiones = function()
	{
		// Validamos de tener rectangulos (en realidad es obvio pero bueno xD)
		if(array_border.length > 0)
		{
			// Recorremos nuestro arreglo de rectangulos
			for(var i = 0; i < array_border.length; i++)
			{
				// Obtenemos los puntos del rectangulo
				var left   = array_border[i].x;
				var top    = array_border[i].y;
				var right  = left + array_border[i].width;
				var bottom = top + array_border[i].height;

				/*
				* Aqui realizamos la interseccion de 2 rectangulos
				* La comparacion viene asi:
				* objA = pelota ; objB = uno de los muros (hay 4 muros)
				* Si el punto izquierdo del objA es menor o igual a la derecha del rectangulo.
				* Si el punto derecho del objA es >= al izquierdo del muro
				* Si el punto de arriba del objA es <= que el de abajo del muro
				* Si el punto de abajo del objA es >= que el de arriba del muro
				* Entonces existe interseccion.
				* Si hable chino revisa mi blog xD
				*/
				if(ball.x <= right && ball.x + ball.width >= left && 
					ball.y <= bottom && ball.y + ball.height >= top)
				{
					// Reseteamos los valores
					reset();
					break;
				}

			}
		}

	};


	return this;
};