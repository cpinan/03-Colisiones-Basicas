var Rectangle = function(x, y, width, height)
{
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