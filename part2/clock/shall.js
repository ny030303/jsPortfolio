function format(b) {
    let temp = "0" + b;
    return temp.substr(temp.length - 2, 2);
}

function myClock() {
    let h = document.querySelector("#h");
    let m = document.querySelector("#m");
    let s = document.querySelector("#s");
    let btn = document.querySelector("#btnStart");
    let box1 = document.querySelector(".box");
    let cb = document.querySelector(".CB");

    function task() {
        let d = new Date();
        h.innerHTML = format(d.getHours());
        m.innerHTML = format(d.getMinutes());
        s.innerHTML = format(d.getSeconds());
    }

    function clockControl(e) {
        if (runningTimer) {
            clearInterval(timerCode);
            e.target.innerHTML = "ON";
            box1.style.color = "#555";
            cb.style.background = "#444";
        }
        else {
            timerCode = setInterval(task, 1000);
            e.target.innerHTML = "OFF";
            box1.style.color = "white";
            cb.style.background = "white";
        }
        runningTimer = !runningTimer;
    }

    btn.addEventListener("click", clockControl);

    task();
    let runningTimer = true;
    let timerCode = setInterval(task, 1000);
}

function myTimer() {

    let btn2 = document.querySelector("#btnStart2");
    let h2 = document.querySelector("#h2");
    let m2 = document.querySelector("#m2");
    let s2 = document.querySelector("#s2");

    let a = false;

    btn2.addEventListener("click", function (o) {
        if (a) return;

        let inputList = document.querySelectorAll(".box2 input");

        for (let i = 0; i < inputList.length; i++) {
            inputList[i].disabled = true;
        }
        let numh2 = parseInt(h2.value);
        let numm2 = parseInt(m2.value);
        let nums2 = parseInt(s2.value);

        let remaindSec = numh2 * 3600 + numm2 * 60 + nums2;
        if (remaindSec > 0) {
            btn2.disabled = true;
            let timerId = setInterval(function () {
                remaindSec--;
                if (remaindSec <= 0) {
                    clearInterval(timerId);
                    alert("타이머가 종료 되었습니다.");
                    btn2.disabled = false;

                    for (let i = 0; i < inputList.length; i++) {
                        inputList[i].disabled = false;
                    }
                }
                drawTime(remaindSec);
            }, 1000);
        }
        else {
            alert("타이머 시간을 입력해 주시기 바랍니다.");

            for (let i = 0; i < inputList.length; i++) {
                inputList[i].disabled = false;
            }
        }

    });

    function drawTime(v) {
        h2.value = format(Math.floor(v / 3600));
        m2.value = format(Math.floor((v % 3600) / 60));
        s2.value = format(v % 60);
    }

    function checkTimeNumber(e) {
        console.log(e);
        let num = parseInt(e.target.value);
        if (isNaN(num)) {
            alert('숫자만 입력해주시기 바랍니다.');
            e.target.value = format("00");
            h2.value =  format("00");
            m2.value = format("00");
            s2.value =  format("00");
        }
        e.target.value = ((num < 10) ? "0" : "") + num;
    }

    h2.onchange = checkTimeNumber;
    m2.onchange = checkTimeNumber;
    s2.onchange = checkTimeNumber;
}


let alarms = [];
let alarmList;

function myAlarm() {
    let btn3 = document.querySelector("#btnStart3");
    let h3 = document.querySelector("#h3");
    let m3 = document.querySelector("#m3");
    let s3 = document.querySelector("#s3");

    setInterval(function () {
        if (alarms.length > 0) {
            let nowTime = new Date();
            let nowSecond = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();
            for (let i = 0; i < alarms.length; i++) {
                if (alarms[i].enable && alarms[i].time == nowSecond) {
                    alert("알람 시간이 도달했습니다.");
                }
            }
        }
    }, 1000);

    btn3.addEventListener("click", function (w) {

        let liTag = document.createElement('li');

        let numh3 = format(parseInt(h3.value));
        let numm3 = format(parseInt(m3.value));
        let nums3 = format(parseInt(s3.value));

        let alarmList = document.querySelector("#alarmList");
        let inputList = document.querySelectorAll(".box3 input");

        let alarmSec = parseInt(h3.value) * 3600 + parseInt(m3.value) * 60 + parseInt(s3.value);
        if (alarmSec >= 0) {
            liTag.innerHTML = numh3 + ":" + numm3 + ":" + nums3 + `<label class="switch">
  					<input type="checkbox" checked>
  					<span class="slider round"></span>
						</label>` + `<button type="button" class="btn btn-danger">delete</button>`;
            // alarmList.appendChild(liTag);

            let item = {h: h3.value, m: m3.value, s: s3.value, time: alarmSec, enable: true};
            alarms.push(item);

            liTag.querySelector("input").addEventListener("click", function (e) {
                if (e.target.checked) {
                    item.enable = true;
                    liTag.style.color = "white";
                    liTag.style.transition = "0.3s";

                } else {
                    item.enable = false;
                    liTag.style.color = "#555";
                    liTag.style.transition = "0.3s";
                }
            });
            liTag.querySelector(".btn-danger").addEventListener("click", function (n) {
                if (confirm(numh3 + ":" + numm3 + ":" + nums3 +" 알람을 삭제 하시겠습니까?")) {
                    alarmList.removeChild(liTag);
                    alarms.splice(alarms.indexOf(item), 1);
                }
            });

            alarmList.appendChild(liTag);

        }
        else {
            alert("알람 시간을 입력해주세요");

            for (let i = 0; i < inputList.length; i++) {
                inputList[i].disabled = false;
            }
        }
    });
}

window.onload = function () {
    let bbb11 = document.querySelector("#bbb11");
    let bbb22 = document.querySelector("#bbb22");
    let bbb33 = document.querySelector("#bbb33");
    let box1 = document.querySelector(".box");
    let box2 = document.querySelector(".box2");
    let box3 = document.querySelector(".box3");

    alarmList = document.querySelector("#alarmList");

    bbb11.addEventListener("click", function (e) {
        box1.style.zindex = 2;
        box2.style.zindex = 0;
        box3.style.zindex = 0;
        box1.style.visibility = "visible";
        box2.style.visibility = "hidden";
        box3.style.visibility = "hidden";
        box1.style.opacity = 1;
        box2.style.opacity = 0;
        box3.style.opacity = 0;
    });

    bbb22.addEventListener("click", function (e) {
        box1.style.zindex = 0;
        box2.style.zindex = 2;
        box3.style.zindex = 0;
        box1.style.visibility = "hidden";
        box2.style.visibility = "visible";
        box3.style.visibility = "hidden";
        box1.style.opacity = 0;
        box2.style.opacity = 1;
        box3.style.opacity = 0;
    });

    bbb33.addEventListener("click", function (e) {
        box1.style.zindex = 0;
        box2.style.zindex = 0;
        box3.style.zindex = 2;
        box1.style.visibility = "hidden";
        box2.style.visibility = "hidden";
        box3.style.visibility = "visible";
        box1.style.opacity = 0;
        box2.style.opacity = 0;
        box3.style.opacity = 1;
    });
    myClock();
    myTimer();
    myAlarm();

}