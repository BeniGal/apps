function OCanvas(id) {

	this.htmlObj = document.getElementById('myCanvas');
	this.ctx = this.htmlObj.getContext('2d');

	this.started = 0;
	this.paused = -1;

	this.objects = [];
	this.vectors = [];
	this.scalars = [];
	this.colors = [];

	this.init = function(){

		this.vectors.g = new OVector(
			new OPoint(100, 100, this.ctx),
			0.1,
			Math.PI * 3/2,
			'#0D0', 2, 1,
			this.ctx
		);
		this.vectors.v = new OVector(
			new OPoint(100, 100, this.ctx),
			0,
			Math.PI * 3/2,
			'#0F0', 2, 1,
			this.ctx
		);

		this.objects.ball = new OCircle(
			new OPoint(
				this.htmlObj.width/2,
				this.htmlObj.height/6,
				this.ctx
			),
			15, '#B44', '#F44', 2,
			this.ctx
		);

		this.clear();
		this.background(255, 255, 255, 0.9);
		this.draw();
	}

	this.work = function() {

		this.clear();
		this.background(255, 255, 255, 0.9);
		this.update();
		this.draw();

		if (this.started && this.paused < 0) {
			setTimeout('canvas2D.work()', 1);
		}
	}

	this.draw = function() {

		this.objects.ball.Draw();
		this.vectors.v.Draw();

	}

	this.update = function() {

		if ((this.objects.ball.O.y + this.objects.ball.r + this.objects.ball.prototype.width + this.vectors.v.mod) >= this.htmlObj.height) {

				this.vectors.v.mod *= 0.85;
				this.vectors.v.mod = -(this.vectors.v.mod);

		} else {

			this.vectors.v.mod += this.vectors.g.mod;

		}

		this.objects.ball.O.y += this.vectors.v.mod;
	}

	this.clear = function() {
		this.ctx.clearRect(0, 0, this.htmlObj.width, this.htmlObj.height);
	}

	this.background = function(R, G, B, A) {

		this.ctx.beginPath();
		this.ctx.fillStyle='rgba('+R+','+G+','+B+','+A+')';
		this.ctx.fillRect(0, 0, this.htmlObj.width, this.htmlObj.height);
	}
}