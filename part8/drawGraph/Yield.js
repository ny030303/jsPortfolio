class Fireworks {
    constructor(e){
        let rect = e.target.getBoundingClientRect();
        // this.x = rect.left + (rect.right - rect.left) / 2 - 2.5;
        // this.y = rect.top + (rect.bottom - rect.top) / 2 - 2.5;
        this.x = e.clientX;
        this.y = e.clientY;
        this.dom = e.target;

        this.list = [];

        for(let i = 0; i < 50; i++){
            this.makeRandomDiv();
        }
        
        for(let i = 0; i < 50; i++){
            $("body").append(this.list[i]);
            
            let dx = Math.random() * 200 - 100;
            let dy = Math.random() * 200 - 100;

            $(this.list[i]).animate(
                {
                    top: this.y + dy + 'px',
                    left: this.x + dx + 'px',
                    opacity:0.1,
                }, 1000, "linear",function(e){
                    $(this).remove();
                });
        }
    }

    makeRandomDiv(){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let div = $("<div>").css({width:"5px", 
                        height:"5px", 
                        backgroundColor:`rgba(${r}, ${g}, ${b}, 0.5)`,
                        position:'absolute',
                        top:this.y + 'px',
                        left:this.x + 'px'
                    });
        this.list.push(div);
    }
}

$.fn.yield = function(){
    this.on("click", (e) => {
        let fire = new Fireworks(e);
    });
}