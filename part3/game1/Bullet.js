class Bullet {
	constructor(target, stage){
		this.stage = stage;
		let direction = Math.floor(Math.random() * 4); // 0, 1, 2, 3
		switch(direction) {
			case 0: //왼쪽
				this.x = -30;
				this.y = Math.random() * stage.offsetHeight;
				break;
			case 1://아래쪽
				this.x = Math.random() * stage.offsetWidth;
				this.y = stage.offsetHeight + 30;
				break;
			case 2://오른쪽
				this.x = stage.offsetWidth + 30;
				this.y = Math.random() * stage.offsetHeight;
				break;
			case 3: //위쪽
				this.x = Math.random() * stage.offsetWidth;
				this.y = -30;
				break;
		}
		
		this.speed = Math.random() * 10 + 10;
		this.target = target;

		this.radius = 5;

		this.dom = document.createElement("div");
		this.dom.style.borderRadius='50%';
		this.dom.style.width='10px';
		this.dom.style.height='10px';
		this.dom.style.backgroundColor = 'red';
		this.dom.style.position = 'absolute';
		this.dom.style.left = this.x + 'px';
		this.dom.style.top = this.y + 'px';

		this.dirX = 0;
		this.dirY = 0;

		this.reset();

		stage.appendChild(this.dom);
	}

	reset(){
		let dx = this.target.x - this.x;
		let dy = this.target.y - this.y;
		let distance = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
		this.dirX = dx / distance;
		this.dirY = dy / distance;
	}

	update() {
		this.x += this.dirX * this.speed / (1000 / 60);
		this.y += this.dirY * this.speed / (1000 / 60);

		if(this.x > this.stage.offsetWidth + 30 || 
			this.x < -30 ||
			this.y > this.stage.offsetHeight + 30 ||
			this.y < -30) {
			this.reset();
		}

		this.dom.style.left = this.x + 'px';
		this.dom.style.top = this.y + 'px';
	}
}