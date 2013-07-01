/*
* Ejemplo de colisiones con otros objetos
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

	var array_border;
	var coin;

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
		ball.imagen.src = "resource/pelota.png";

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

		// Rectangulo izquierda
		array_border.push(new Rectangle(0, 0, 40, CANVAS_HEIGHT)); 
		// Rectangulo derecha
		array_border.push(new Rectangle(CANVAS_WIDTH - 40, 0, 40, CANVAS_HEIGHT)); 
		// Rectangulo arriba
		array_border.push(new Rectangle(0, 0, CANVAS_WIDTH, 40));
		// Rectangulo abajo
		array_border.push(new Rectangle(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, CANVAS_HEIGHT - 40)); 

		// Creando moneda
		coin = {
			imagen: new Image(),
			x: 400,
			y: 200,
			width: 0,
			height: 0,
			cargado: false
		};

		coin.imagen.src = "resources/coin.png";

		coin.imagen.onload = function()
		{
			coin.width = this.width;
			coin.height = this.height;
			coin.cargado = true;
		};

	};

	this.draw = function(context)
	{

		if(coin.cargado)
		{
			context.save();
			context.drawImage(coin.imagen, coin.x, coin.y, coin.width, coin.height);
			context.restore();
		}

		if(ball.cargado)
		{
			context.save();
			context.translate(ball.x + ball.width * 0.5, ball.y + ball.height * 0.5);
			context.rotate(ball.rotacion * (Math.PI / 180));
			context.translate(-(ball.x + ball.width * 0.5), -(ball.y + ball.height * 0.5));
			context.drawImage(ball.imagen, ball.x, ball.y, ball.width, ball.height);
			context.restore();
		}

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

		manejarColisiones();

	};

	var manejarColisiones = function()
	{
		if(!ball.cargado || !coin.cargado)
			return;

		// Chequea colisión con los bordes
		if(array_border.length > 0)
		{
			for(var i = 0; i < array_border.length; i++)
			{
				var left   = array_border[i].x;
				var top    = array_border[i].y;
				var right  = left + array_border[i].width;
				var bottom = top + array_border[i].height;

				if(ball.x <= right && ball.x + ball.width >= left && 
					ball.y <= bottom && ball.y + ball.height >= top)
				{
					reset();
					break;
				}

			}
		}

		// Chequea colisión con la moneda
		if(ball.x <= coin.x + coin.width && ball.x + ball.width >= coin.x && 
			ball.y <= coin.y + coin.height && ball.y + ball.height >= coin.y)
		{
			coin.x = Math.random() * (CANVAS_WIDTH - 150) + 50;
			coin.y = Math.random() * (CANVAS_HEIGHT - 150) + 50;
		}

	};


	return this;
};