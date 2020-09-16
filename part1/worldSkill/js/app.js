/*app.js*/
$(function() {
	let slider = $("#slider > div > div").eq(1);


	for(let i = 1; i <= 3; i ++) {
		slider.append(`<img src= "images/slide${i}.jpg">`)
	}

	slider.css({
		overflow :"hidden",
		position :"relative",
	})

	$("#slider img").css({
		position :"absolute",
		right:"100%",
	});
	$("#slider img").eq(0).css({
		position :"absolute",
		right:"0",
	});


	let sliderButton1 = $("#slider > div > div").eq(0);
	let sliderButton2 = $("#slider > div > div").eq(2);

	sliderButton1.append(`<button>&lt;</button>`);
	sliderButton2.append(`<button>&gt;</button>`);

	let now = 0;
	let isSliding = false;
	let intervalCnt = 0;

	let imgs = $("#slider > div > div img");
	$("#slider button").css({
		position:"relative",
		zIndex:"100000",
		width:"100%",
		height:"100%",
		outline:"none",
		cursor:"pointer",
		backgroundColor : "white",
		border:"0",
	})

	function leftSlide() {
		isSliding = true;
		let next = now > 0 ? now - 1 : 2;

		$(imgs[now]).animate({right: "-100%"}, 1000, function(e) {
			isSliding = false;
		});
		$(imgs[next]).css({right:"100%"}).animate({right: "0"}, 1000);
		now = next;

		for (let i = 0; i < 3; i++) {
			$("#slider > span > span").eq(i).css({backgroundColor: i == now ? "#ccc" : "gray"});
		}
	}

	function rightSlide() {
		isSliding = true;
		let next = now < 2 ? now + 1 : 0;

		$(imgs[now]).animate({right: "100%"}, 1000, function(e) {
			isSliding = false;
		});

		$(imgs[next]).css({right:"-100%"}).animate({right: "0"}, 1000);
		now = next;

		for (let i = 0; i < 3; i++) {
			$("#slider > span > span").eq(i).css({backgroundColor: i == now ? "#ccc" : "gray"});
		}
	}

	// let fiveSecIntervalId = setInterval(rightSlide, 5000);
	let fiveSecIntervalId = setInterval(function() {
		intervalCnt++;
		if( intervalCnt > 50 ) {
			rightSlide();
			intervalCnt = 0;
		}
	}, 100);

	$("#slider > div > div > button").on("click", function() {
		if (isSliding) {
			return;
		}
		intervalCnt = 0;
		//clearInterval(fiveSecIntervalId);
		if ($(this).html() == "&lt;") {
			leftSlide();
		} else {
			rightSlide();
		}
		//fiveSecIntervalId = setInterval(rightSlide, 5000);		
	});

	//////////////////////


	//////////////////////


	$("#slider").css({
		position:"relative",
	})

 	$("#slider").append(`<span class="wrapper"><span class="BBB">1</span><span class="BBB">2</span><span class="BBB">3</span></span>`);

	$(".wrapper").css({
		position:"absolute",
		top:"-8%",
		display:"flex",
		justifyContent: "center",
    	width: "98%",
	})

	$(".BBB").css({
		width:"30px",
		height:"30px",
		backgroundColor:"gray",
		margin :"0 20px 20px 0",
		textAlign:"center",
		cursor:"pointer"
	})

	$("#slider > span > span").eq(0).css({backgroundColor: "#ccc"});

	$(".BBB").on("click", function() {
		if (isSliding) {
			return;
		}
		intervalCnt = 0;

		let next = parseInt($(this).html()) - 1;
		// console.log(now, next);
		//clearInterval(fiveSecIntervalId);
		if( now != next ) {
			if( Math.abs(now - next) == 2 ) {
				if( now < next ) {
					leftSlide();
				}
				else {
					rightSlide();
				}
			}
			else{
				if( now > next ) {
					leftSlide();
				}
				else {
					rightSlide();
				}
			}
		}

		//fiveSecIntervalId = setInterval(rightSlide, 5000);	
	});

	
	////////////////////////////////////////

	$("body > nav > ul li a").on("click", function (e) {
		e.preventDefault();
		let href = $(this).attr("href");

		href22 = $(href).offset().top;

		$("html, body").animate({scrollTop : href22 }, 1000)
	})

	////////////

	function transformSectionImg() {
		let nowWTop = parseInt($(window).scrollTop());
		let nowWHeight = parseInt($(window).height());

		let sectionTop1 = parseInt($("#webdesign").offset().top);
		// let sectionBottom1 =sectionTop1 + parseInt($("#webdesign").height());

		let sectionTop2 = parseInt($("#worldskills").offset().top);
		// let sectionBottom2 =sectionTop2 + parseInt($("#worldskills").height());

		let isAnimating = true;
		let isAnimating2 = true;

		function isInSection(wTop, wHeight, sectionId) {
			let sTop = parseInt($(sectionId).offset().top);
			let sHeight = parseInt($(sectionId).height());

			let calcTop = sTop - wTop;
			let calcBottom = sHeight + calcTop;
			return !(calcBottom > 0 && calcTop < wHeight);
		}

		isAnimating = isInSection(nowWTop, nowWHeight, "#webdesign");
		isAnimating2 = isInSection(nowWTop, nowWHeight, "#worldskills");


		if (isAnimating) {
			$("#webdesign > div > img").css({transform:"rotate(10deg)", transition:"0s"})
		}
		else {
			if (prevWTop - nowWTop < 0 && sectionTop1 <= nowWTop) {
				$("#webdesign > div > img").css({transform:"rotate(170deg)", transition:"1s"})
			}
		}

		if (isAnimating2) {
			$("#worldskills > div > img").css({transform:"rotate(-5deg)", transition:"0s"})
		}
		else {
			if (prevWTop - nowWTop < 0 && sectionTop2 <= nowWTop) {
				$("#worldskills > div > img").css({transform:"rotate(170deg)", transition:"1s"})
			}
		}

	}

	$(window).on("resize", function(e) {
		console.log("aa");
		transformSectionImg();
	});

	let prevWTop = $(window).scrollTop();
	$(window).on("scroll", function(e) {

		transformSectionImg();
		prevWTop =  parseInt($(window).scrollTop());
	})

///////////////


	$("#webdesign > div >div").append(`<button>Read more</button>`);
	$("#worldskills > div>div").append(`<button>Read more</button>`);

	webB = true;

	let hidden1 = $("#webdesign .hidden-text");
	let hidden2 = $("#worldskills .hidden-text");

	hidden1.css({
		float:"left",
	})

	hidden2.css({
		float:"left",
	})
	$("#webdesign").css({
		width:"auto",
		height:"auto"
	})

	$("#worldskills").css({
		width:"auto",
		height:"auto"
	})

	$("#webdesign button").css({
		border:"none",
		width:"100px",
		height :"30px",
		cursor:"pointer",
		borderRadius:"20px",
		outline:"none",
		backgroundColor:"#999",
		color: "white",
	}).on("click", function(e) {
		if (webB) {
			hidden1.slideDown(1000);
			$(this).text("Hide");
		} else {
			hidden1.slideUp(1000);
			$(this).text("Read more");
		}
		webB = !webB;
	})

	$("#worldskills button").css({
		border:"none",
		width:"100px",
		height :"30px",
		cursor:"pointer",
		borderRadius:"20px",
		outline:"none",
		backgroundColor:"#999",
		color: "white",
	}).on("click", function(e) {
		if (webB) {
			hidden2.slideDown(1000);
			$(this).text("Hide");
		} else {
			hidden2.slideUp(1000);
			$(this).text("Read more");
		}
		webB = !webB;
	})

	//////////////////////

	$("head").append(`<style>#photos > div > div > p > img {transition: 1s;cursor: pointer} 
		#photos > div > div > p > img:hover {transform: rotate(-2deg);border:8px solid #666; boxShadow:none;}</style>`)
	$("body").append(`<div id="dark-popup">
					    <div class="popupText">
					      <span>&times;</span>
					      <img src="#">
					    </div>
					  </div>`);

$("#dark-popup .popupText").css({
		position:"absolute",
		top: "50%",
		left:"50%",
		transform:"translate(-50%, -50%)"
	}).on("click", function(e) {
		//e.preventDefault();
		// text = false;
		return false;
	})

	$("#dark-popup").css({
		position:"fixed",
		top: "0",
		left :"0",
		display:"none",
		height:"100%",
		width:"100%",
		backgroundColor:"rgba(0,0,0,0.4)",
	}).on("click", function(e) {
			$("#dark-popup").fadeOut();
		})


	
	text = true;

	$("#dark-popup .popupText span").css({
		position:"absolute",
		top: "20px",
		right:"20px",
		fontSize:"30px",
		cursor:"pointer"
	}).on("click", function(e) {
		$("#dark-popup").fadeOut();
	})

	$("#photos > div > div > p > img").on("click", function(e) {
		let src = $(this).attr("src");
		let src22 = src.split("/")[1];

		$("#dark-popup img").attr({src : "images/big_" + src22});
		$("#dark-popup").fadeIn();
	})


	//////////////

	$("body").append(`<div id="dark-popup2">
					    <div class="popupText2">
					      <span>&times;</span>
					      <img src="#">
					      <p></p>
					    </div>
					  </div>`);

	$("#dark-popup2").css({
		position:"fixed",
		top: "0",
		left :"0",
		display:"none",
		width:"100%",
		height:"100%",
		backgroundColor:"rgba(0,0,0,0.4)",
	}).on("click", function(e) {
		$("#dark-popup2").fadeOut();
	})

	$("#dark-popup2 img").css({
		position:"absolute",
		top:"20px",
		left:"20px",
		
	})

	$("#dark-popup2 .popupText2").css({
		position:"absolute",
		top: "50%",
		left:"50%",
		transform:"translate(-50%, -50%)",
		width:"500px",
		height:"250px",
		backgroundColor:"gray",
	}).on("click", function(e) {
		return false;
	})

	$("#dark-popup2 .popupText2 span").css({
		position:"absolute",
		top: "20px",
		right:"20px",
		fontSize:"30px",
		cursor:"pointer"
	}).on("click", function(e) {
		$("#dark-popup2").fadeOut();
	})



	$("#dark-popup2 p").css({
		position:"absolute",
		top:"20px",
		left:"40%",
		color:"white",
		fontSize:"20px",
		lineHeight:"1.6"
	})

	$("li[title]").css({
		cursor:"pointer"
	})

	$("li[title]").on("click", function(e) {
		let photo = $(this).data("photo");
		let country = $(this).data("country");
		let title = $(this).attr("title");
		let name = $(this).text();
		let name22 = $(this).parents("div").eq(0).find("h2").text();

		$("#dark-popup2 img").attr({src: `images/` + photo})
		$("#dark-popup2 p").html(country + `<br>`+title + `<br>`+name + `<br>`+name22 )
		$("#dark-popup2").fadeIn();
	})

})