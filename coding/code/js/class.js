class Hero{
	constructor(el){
		this.el = document.querySelector(el);
		this.movex = 0;
		this.speed = 11;
        this.direction = 'right';
	}
	keyMotion(){
		if(key.keyDown['left']){
			this.el.classList.add('run');
			this.el.classList.add('flip');
			this.movex = this.movex <= 0 ? 0 : this.movex - this.speed;
            this.direction = 'left';
		}else if(key.keyDown['right']){
			this.el.classList.add('run');
			this.el.classList.remove('flip');
			this.movex = this.movex + this.speed;
            this.direction = 'right';
		}

		if(key.keyDown['attack']){
            if(!bulletComProp.launch){
                this.el.classList.add('attack');
                bulletComProp.arr.push(new Bullet());
                bulletComProp.launch = true;
            }
		}

		if(!key.keyDown['left'] && !key.keyDown['right']){
			this.el.classList.remove('run');
		}

		if(!key.keyDown['attack']){
			this.el.classList.remove('attack');
            bulletComProp.launch = false;
		}

		this.el.parentNode.style.transform = `translateX(${this.movex}px)`;
	}
	position(){
		return{
			left: this.el.getBoundingClientRect().left,
			right: this.el.getBoundingClientRect().right,
			top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
			bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
		}
	}
	size(){
		return{
			width: this.el.offsetWidth,
			height: this.el.offsetHeight
		}
	}
}

class Bullet{
	constructor(){
		this.parentNode = document.querySelector('.game');
		this.el = document.createElement('div');
		this.el.className = 'hero_bullet';
		this.x = 0;
		this.y = 0;
        this.speed = 30;//수리검 속도
        this.distance = 0;//수리검 이동 거리
        this.bulletDirection = 'right';//수리검 방향
		this.init();
	}
	init(){
        this.bulletDirection = hero.direction === 'left' ? 'left' : 'right';
		this.x = this.bulletDirection === 'right' ? hero.movex + hero.size().width / 2 : hero.movex - hero.size().width / 2
		this.y = hero.position().bottom - hero.size().height / 2;
        this.distance = this.x;
		this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
		this.parentNode.appendChild(this.el);
	}
    moveBullet(){
        let setRotate = '';
        if(this.bulletDirection === 'left'){
            this.distance -= this.speed;
            setRotate = 'rotate(180deg)';
        }else{
            this.distance += this.speed;
        }
        this.el.style.transform = `translate(${this.distance}px,${this.y}px) ${setRotate}`;
        this.crashBullet();
    }
    position(){
		return{
			left: this.el.getBoundingClientRect().left,
			right: this.el.getBoundingClientRect().right,
			top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
			bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
		}
	}
    crashBullet(){
		//수리검과 몬스터 충돌시 
		if(this.position().left > monster.position().left && this.position().right < monster.position().right){
			for(let i=0; i < bulletComProp.arr.length; i++){
				if(bulletComProp.arr[i] === this){
					bulletComProp.arr.splice(i,1);
					this.el.remove();
				}
			}
		}
		//수리검 화면 벗어나는 경우
        if(this.position().left > gameProp.screenWidth || this.position.right < 0){
			for(let i=0; i < bulletComProp.arr.length; i++){
				if(bulletComProp.arr[i] === this){
					bulletComProp.arr.splice(i,1);
					this.el.remove();
				}
			}
            this.el.remove();
        }
    }
}

class Monster{
    constructor(){
        this.parentNode = document.querySelector('.game');
        this.el = document.createElement('div');
        this.el.className = 'monster_box';
        this.elChildren = document.createElement('div');
        this.elChildren.className = 'monster';
        this.init();
    }
	
    init(){
        this.el.appendChild(this.elChildren);
        this.parentNode.appendChild(this.el);
    }
	position(){
		return{
			left: this.el.getBoundingClientRect().left,
			right: this.el.getBoundingClientRect().right,
			top: gameProp.screenHeight - this.el.getBoundingClientRect().top,
			bottom: gameProp.screenHeight - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
		}
	}
}





















