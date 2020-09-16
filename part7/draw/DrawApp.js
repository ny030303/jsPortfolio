class DrawApp {
	constructor(){
		this.canvas = document.querySelector("#myCanvas");
		this.ctx = this.canvas.getContext("2d");

		this.draw = false;
		this.isMouseOut = false;

		this.prevX = 0;
		this.prevY = 0;

		this.points = [];


		document.addEventListener("mousedown", (e) => {
			if (!this.isCanvasOut(e)) {
			this.isMouseOut = false;
			this.draw = true;
			this.prevX = e.offsetX;
			this.prevY = e.offsetY;
			console.log("그리기 시작");
			}
		});

		document.addEventListener("mouseup", (e) => {
			this.draw = false;
			console.log("그리기 종료");
		});

		this.canvas.addEventListener("mousemove", (e)=>{
			this.move(e);
		});

		document.addEventListener("mousemove", (e)=>{
			this.isMouseOut = this.isCanvasOut(e);
		});

		$(".btn-color").on("click", (e) => {
			let color = $(e.target).data("color");
			this.ctx.strokeStyle = color;
		});

		$("#my-color-picker > div").on("click", (e)=>{
			let color = $("#my-color-picker > div").css("backgroundColor");
			this.ctx.strokeStyle = color;
		});

		$(".btn-origin").on("click", (e)=>{
			this.ctx.clearRect(
				0, 0,
				this.canvas.clientWidth, 
				this.canvas.clientHeight);
		});

	}

	isCanvasOut(e) {
		let left = this.canvas.offsetLeft;
		let top = this.canvas.offsetTop;
		let w = this.canvas.clientWidth;
		let h = this.canvas.clientHeight;

		return (e.clientX < left || e.clientX > left + w 
			|| e.clientY < top || e.clientY > top + h );
	}

	move(e){
		if(!this.draw) return;
		if(this.isMouseOut) {
			this.ctx.moveTo(this.prevX, this.prevY);
			this.prevX = e.offsetX;
			this.prevY = e.offsetY;
			return;
		}

		this.points.push({x: e.offsetX, y: e.offsetY});

		let i;

		// for (i = 1; i < this.points.length)

		
		this.ctx.beginPath();
		this.ctx.moveTo(this.prevX, this.prevY);
		this.ctx.lineTo(e.offsetX, e.offsetY);
		this.ctx.stroke();
		this.ctx.closePath();
		this.prevX = e.offsetX;
		this.prevY = e.offsetY;
	}
}