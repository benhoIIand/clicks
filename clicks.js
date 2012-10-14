(function(doc, win) {
	var canvas   	 = null,
		clicks       = null,
		ctx          = null,
		timer        = null,
		milliseconds = false,
		active       = false,
		pressed      = false,
		lastX        = 0,
		lastY        = 0,
		rings        = [],

	Ring = function(x, y, r) {

		this.reset = function() {
			this.x      = x;
			this.y      = y;
			this.r      = r;
			this.o      = 1;
			this.fill 	= '0,0,0,';
			this.colour = '155,155,155,';
		}

		this.expand = function() {
			if(this.r < 50) {
				this.r += 2;
				this.o -= 0.04;
				this.draw();
			} else {
				this.del();
			}
		}

		this.draw = function() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
			ctx.fillStyle   = 'rgba('+this.fill+this.o.toFixed(2)+')';
			ctx.fill();
			ctx.closePath();
		};

		this.del = function() {
			rings.splice(0,1);
		};

		this.reset();
	},

	mouseClicked = function(e) {
		if(!active) {
			timer = setInterval(animate, 10);
			active = true;
		}
		var ring = new Ring(e.clientX, e.clientY, 10);
		ring.draw();
		rings.push(ring);
		clicks++;
	},

	animate = function() {
		ctx.clearRect(0, 0, doc.width, doc.height);
		for(var i=0; i<rings.length; i++) {
			rings[i].expand();
		}
		if(milliseconds > 10000) {
			win.removeEventListener('click', mouseClicked);

			if(rings.length === 0) {
				clearInterval(timer);
				ctx.font = 'italic 50px Calibri';
				var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
				gradient.addColorStop("0","magenta");
				gradient.addColorStop("0.5","blue");
				gradient.addColorStop("1.0","red");
				ctx.fillStyle = gradient;
				ctx.fillText("You clicked "+clicks+" times",canvas.width/2.4,canvas.height/2.2);
			}
		}
		milliseconds += 10
	},

	windowResized = function() {
		canvas.width = doc.width;
		canvas.height = doc.height;
	};

	win.onload = function() {
		canvas = doc.getElementsByTagName('canvas')[0];
		canvas.width = doc.width;
		canvas.height = doc.height;
		ctx = canvas.getContext('2d');

		win.addEventListener('click', mouseClicked);
		win.addEventListener('resize', windowResized);

		ctx.font = 'italic 50px Calibri';
		var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		ctx.fillStyle = gradient;
		ctx.fillText("Click to begin",canvas.width/2.4,canvas.height/2.2);
	}
}(document, window));