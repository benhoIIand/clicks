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
			this.fill 	= genRandomColour(this.o);
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

	genRandomColour = function(o) {
		return Math.floor(Math.floor(Math.random()*256)) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',';
	};

	mouseClicked = function(e) {
		if(!active) {
			timer = setInterval(animate, 10);
			doc.querySelector('#text').style.fontSize = '2000%';
			active = true;
		}
		var ring = new Ring(e.clientX, e.clientY, 10);
		ring.draw();
		rings.push(ring);
		clicks++;
		doc.querySelector('#text').innerHTML = clicks;
	},

	animate = function() {
		ctx.clearRect(0, 0, doc.width, doc.height);
		for(var i=0; i<rings.length; i++) {
			rings[i].expand();
		}
		if(milliseconds > 15000) {
			win.removeEventListener('click', mouseClicked);

			if(rings.length === 0) {
				clearInterval(timer);
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
	}
}(document, window));