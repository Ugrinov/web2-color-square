const field = document.getElementById("field");
const level = document.getElementById("level");
const timer = document.getElementById("timer");
// Параметры игры
const max_time = 20;
const max_size = 492;
const color_change_kof = 200;

let gridX = 2;
let timer_ID;
let cur_time = localStorage.getItem('gameHighScore') || max_time;

start();
// Старт
function start() {

    gridX = +localStorage.getItem('level') || 2;
    cur_time = +localStorage.getItem('time') || max_time * 1000;

    clearInterval(timer_ID);
    timer_ID = setInterval(function() {
        timer.innerHTML = Math.round(cur_time / 1000);
        localStorage.setItem('time', cur_time);
        if (cur_time <= 0) {
            lose_by_timeout();
        }
        cur_time -= 100;
    }, 100);

    build_field();
}

// Постройка сетки
function build_field() {


    level.innerHTML = gridX - 1;
    field.innerHTML = "";
    // Параметры сетки
    const squaresCount = gridX*gridX;
    const size = max_size / gridX;
    const margin = Math.max(Math.floor(size / 30), 1);
    const realSize = size - margin;
    let increment = color_change_kof / level.innerHTML;
    localStorage.setItem('level', gridX);
    let r = randInt(increment + 1, 255);
    let g = randInt(increment + 1, 255);
    let b = randInt(increment + 1, 255);
    let color = "rgb(" + r + ", " + g + ", " + b + ")";

    for (let index = 0; index < squaresCount; index++) {
        const elem = document.createElement("div");
        elem.className = "square";
        elem.id = index;
        elem.style.width = realSize + "px";
        elem.style.height = realSize + "px";
        elem.style.margin = margin + "px " + "0 0 " + margin + "px";
        elem.style.backgroundColor = color;


        field.appendChild(elem);
        elem.onclick = () => lose();
    }

    r = r - increment;
    g = g - increment;
    b = b - increment;
    color = "rgb(" + r + ", " + g + ", " + b + ")";
    const specialSquare = document.getElementById(randInt(0, squaresCount - 1));
    specialSquare.style.backgroundColor = color;
    specialSquare.onclick = () => {
        build_field();
        if (gridX - 1 <= 10)
        {
            cur_time += 1000;
        }
        else {
            cur_time += 2000;
        }
    }
    gridX++;
}
// Неправильный квадрат
function lose() {
    alert("Неправильный квадрат :(\nРезультат: " + level.innerHTML + " уровень за " + max_time + " секунд");
    localStorage.removeItem('level');
    localStorage.removeItem('time');
    localStorage.setItem('level', 2);
    localStorage.setItem('time', max_time * 1000);
    start();
}
// Время вышло
function lose_by_timeout()
{
    alert("Время вышло :(\nРезультат: " + level.innerHTML + " уровень за " + max_time + " секунд");
    localStorage.removeItem('level');
    localStorage.removeItem('time');
    localStorage.setItem('level', 2);
    localStorage.setItem('time', max_time * 1000);
    start();
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
