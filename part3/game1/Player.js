class Player {
	constructor(x, y, width, height, color, speed){
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		this.color = color;
		this.speed = speed;

		this.dom = document.createElement("div");
		this.dom.style.top = this.y + 'px';
		this.dom.style.left = this.x + 'px';
		this.dom.style.position = 'absolute';
		this.dom.style.width = this.w + 'px';
		this.dom.style.height = this.h + 'px';
		this.dom.style.backgroundColor = this.color;
		this.dom.style.borderRadius = '50%';
		//this.dom.style.transition = 'all 0.5s';

		this.parent = null;		

		//this.stage = document.querySelector("#stage");
		this.stage = { style: {width: 800, height: 600}};

		this.destX = x;
		this.destY = y;
		this.prevDistance = Infinity;

		this.keyArray = [];
		this.addEvent();
	}

	addEvent(){
		document.addEventListener("keydown", (e)=>{
			this.keyArray[e.keyCode] = true;
		});

		document.addEventListener("keyup", (e)=>{
			this.keyArray[e.keyCode] = false;
		});
	}

	move(x, y) {
		if(x > this.parent.offsetWidth - this.w) {
			x = this.parent.offsetWidth - this.w;
		}
		if(y > this.parent.offsetHeight - this.h) {
			y = this.parent.offsetHeight - this.h;
		}
		this.destX = x;
		this.destY = y;
		this.prevDistance = Infinity;
	}

	onStage(target){
		this.parent = target;
		target.appendChild(this.dom);
	}

	update(){

		if(this.keyArray[37]){
			this.x -= this.speed / (1000 / 60);
			if( this.x < 0 ) this.x = 0;
		}

		if(this.keyArray[38]) {
			this.y -= this.speed / (1000 / 60);
			if( this.y < 0 ) this.y = 0;
		}

		if(this.keyArray[39]) {
			this.x += this.speed / (1000 / 60);
			let width = this.stage.style.width;
			if( (this.x + this.w) > width ) this.x = width -this.w; 
		}

		if(this.keyArray[40]) {
			this.y += this.speed / (1000 / 60);
			let height = this.stage.style.height;
			if( (this.y + this.h) > height ) this.y = height -this.h; 
		}

		if(this.keyArray[37] || this.keyArray[38] || 
			this.keyArray[39] || this.keyArray[40]) {
			this.move(this.x, this.y);
		}

		this.dom.style.left = this.x + 'px';
		this.dom.style.top = this.y + 'px';

		let dx = this.destX - this.x;
		let dy = this.destY - this.y;
		
		let distance =  Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		if(distance <= 0 ){
			return;
		}

		if(distance >= this.prevDistance) {
			this.x = this.destX;
			this.y = this.destY;
		}else {
			dx = dx / distance * this.speed / (1000 / 60);
			dy = dy / distance * this.speed / (1000 / 60);
			
			this.x += dx;
			this.y += dy;
			this.prevDistance = distance;	
		}

		
		this.dom.style.left = this.x + 'px';
		this.dom.style.top = this.y + 'px';
	}

	checkCollision(other) {
		let dist = Math.pow( 
					(other.x + other.radius) 
					- (this.x + this.w /2), 2 )

				 + Math.pow( 
				 	(other.y + other.radius) 
				 	- (this.y + this.w/2), 2 );


		if(Math.pow(this.w / 2 + other.radius, 2) 
			>= dist) {
			return true;
		}
		
		return false;
	}
}