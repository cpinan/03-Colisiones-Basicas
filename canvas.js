var CANVAS_WIDTH = 760;
var CANVAS_HEIGHT = 480;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var Game = function()
{

	var example = new Example();

	this.init = function()
	{
		example.init();
		requestAnimFrame(game.thread);
	};

	this.draw = function()
	{
		context.save();

		context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		example.draw(context);

		context.restore();
	};

	this.update = function(dt)
	{
		example.update(dt);
	};


	this.thread = function()
	{
		var now = new Date().getTime(), dt = (1 / (now - (time || now)));
    	time = now;

		game.draw();
		game.update(dt);
		requestAnimFrame(game.thread);
	};

};

var game = new Game();
game.init();