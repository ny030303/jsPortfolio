class App {
	constructor(){
		this.canvas = $("#myCanvas")[0];
		this.ctx = this.canvas.getContext("2d");
		
		this.x = 135;
		this.y = 450;
		this.speed = 5;
		this.keyArray = [];
		this.gameOver = false;

		this.enemyList = [];

		for(let i = 0; i < 7; i++){
			this.enemyList.push(new Enemy());
		}

		document.addEventListener("keydown", (e)=>{
			this.keyArray[e.keyCode] = true;
		});

		document.addEventListener("keyup", (e)=>{
			this.keyArray[e.keyCode] = false;
		});

		this.time = 0;
		this.beforeTime = 0;

		this.frame = setInterval( ()=>{
			this.update();
			this.render();
		}, 1000 / 30);
	}

	addEnemy(count) {
		for (let i = 0; i < count; i++) {
			this.enemyList.push(new Enemy());
		}
	}

	update(){
		if (this.gameOver) {
			return;
		}
		if(this.keyArray[37]){
			this.x -= this.speed;
			if(this.x < 0){
				this.x = 0;
			}
		}

		if(this.keyArray[39]){
			this.x += this.speed;
			if(this.x > 270){
				this.x = 270;
			}
		}

		for(let i = 0; i < this.enemyList.length; i++){
			this.enemyList[i].update();

			if (this.enemyList[i].checkCol(this.x, this.x + 30, this.y, this.y +50)) {
				this.gameOver = true;
				break;
			}
		}

		this.time += 1000 / 30;
		if (this.time - this.beforeTime >= 10 * 1000) {
			this.addEnemy(10);
			this.beforeTime = this.time;
		}

	}

	render(){
		this.ctx.clearRect(0, 0, 300, 500);
		this.ctx.strokeStyle = "#000";
		this.ctx.strokeRect(0, 0, 300, 500);
		this.ctx.fillStyle = "#f0f";
		this.ctx.fillRect(this.x, this.y, 30, 50);

		for(let i = 0; i < this.enemyList.length; i++){
			this.enemyList[i].render(this.ctx);
		}

		this.ctx.fillStyle = "#000";
		this.ctx.font = "15px Arial";
		this.ctx.fillText("시간 : " + Math.floor(this.time / 10)/ 100, 10, 20);
	}
	
}


$(function(){
	let app = new App();

}); 