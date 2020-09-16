class Enemy {
	constructor(){
		this.x;
		this.y;
		this.speed;
		this.color;
		this.size;

		this.reset();
	}

	reset(){
		this.x = this.rand(0, 300); //0 <= x < 300
		this.y = -30;
		this.speed = this.rand(5, 10); // 5 <= spped < 15
		this.color = `rgba(${Math.floor(this.rand(0, 255))}, 
						${Math.floor(this.rand(0, 255))}, 
						${Math.floor(this.rand(0, 255))}, 0.8)`;
		this.size = this.rand(4, 6);
	}

	rand(base, max){
		return Math.random() * max + base;
	}

	update(){
		this.y += this.speed;

		if(this.y > 500){
			this.reset();
		}
	}

	render(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
		// ctx.lineWidth = 0.2;
		ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
		ctx.strokeRect(this.x, this.y, this.size, this.size)
	}

	checkCol(left, right, top, bottom) {
		if (this.x < right && this.y < bottom && this.x + this.size > left && this.y + this.size > top) {
			return true;
		} else {
			return false;
		}
	}
}