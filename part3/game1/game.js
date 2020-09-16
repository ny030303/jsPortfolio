window.onload = function(){

	function refreshRankScore(datas) {
		let rankScore = document.querySelector("#rankScore");

		// rank 리스트 전체 삭제
		while (rankScore.hasChildNodes()) {   
  			rankScore.removeChild(rankScore.firstChild);
		}


		datas.sort(function(a, b){return b - a});

		// rank 리스트 새로 추가
		for( let i=0; i<datas.length; i++ ) {
			let liTag = document.createElement("li");
			liTag.innerHTML = datas[i];			
			rankScore.appendChild(liTag);
		}

	}

	/// 로컬 저장소에 값 가져오기
	let readData = localStorage.getItem("rankData");

	// readData가 널(비었음)이면 빈배열로 초기화
	//   데이터가 있으면 문자열 readData를 Json형태로 변환
	let rankData = [];		
	if( readData != null ) {
		rankData = JSON.parse(readData);
	}

	// rank data 갱신
	refreshRankScore(rankData);

	let player = new Player(375, 275, 25, 25, "#00f", 100);

	let stage = document.querySelector('#stage');
	player.onStage(stage);

	stage.addEventListener('click', function(e){
		if(e.target !== stage){
			return;
		}
		player.move(e.offsetX, e.offsetY);
	});

	let bulletList = [];
	for(let i = 0; i < 50; i++){
		bulletList.push( new Bullet(player, stage) );
	}

	let startTime = new Date(); /// 시작 시간

// 프레임이 셋인터블의 결과를 받음(interval 번호 돌려줌)

	let frame = setInterval(function() {
		player.update();

		for(let i = 0; i < bulletList.length; i++){
			bulletList[i].update();


			// player 가 불렛 만났을때
			if(player.checkCollision(bulletList[i])){
				clearInterval(frame);

				let endTime = new Date(); /// 종료 시간
				let playSec = (endTime.getTime() - startTime.getTime()) / 1000; ///걸린 시간
				rankData.push(playSec);
				refreshRankScore(rankData);

				// 로컬에 저장
				localStorage.setItem("rankData", JSON.stringify(rankData));


				if( rankData.length > 10) {
					localStorage.setItem("rankData", "[]");
				}
				break;
			}
		}

	}, 1000/60);
};