const key = {
    keyDown : {} ,
    keyValue : {
        37: 'left', //좌로 달리기 x
        39: 'right', //우로 달리기
        88: 'attack' //공격
    }
}

//수리검 객체 배열
const bulletComProp = {
    launch: false,
    arr: []
}

//백그라운드 관리 글로벌 객체
const gameBackground = {
    gameBox: document.querySelector('.game')
}

//자주 쓰는 값 별도 지정
const gameProp = {
    screenWidth : window.innerWidth,
    screenHeight : window.innerHeight
}

//키 이벤트 발생
const windowEvent = () => {
    window.addEventListener('keydown', e => {
        key.keyDown[key.keyValue[e.keyCode]] = true;
    });
    window.addEventListener('keyup',  e => {
        key.keyDown[key.keyValue[e.keyCode]] = false;
    });

    //위치 이벤트 (수리검 등 위치)
    window.addEventListener('resize',e => {
        gameProp.screenWidth = window.innerWidth;
        gameProp.screenHeight = window.innerHeight;
    });
}

//이미지 미리 로드 함수
const loadImg = () => {
    const preLoadImgSrc = ['../../lib/images/ninja_attack.png','../../lib/images/ninja_run.png','../../lib/images/ninja_idle.png'];
    preLoadImgSrc.forEach( arr => {
        const img = new Image();
        img.src = arr;
    });
}

//자연스러운 움직임
const renderGame = () => {
    hero.keyMotion();
    setGameBackground();
    bulletComProp.arr.forEach((arr,i) => {
        arr.moveBullet();
    });
    window.requestAnimationFrame(renderGame);
}

//백그라운드 패럴럭스
const setGameBackground = () => {
    let parallaxValue = Math.min(0, (hero.movex - gameProp.screenWidth/3) * -1)
    gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
}

//새 히어로 객체 생성
let hero;
//새 몬스터 객체 생성
let monster;
const init = () => {
    hero = new Hero('.hero'); 
    monster = new Monster(500, 9000);
    loadImg();
    renderGame();
    windowEvent();
}

window.onload = () => {
    init();
}

