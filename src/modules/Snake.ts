class Snake {

    // 蛇头
    head: HTMLElement
    // 蛇的容器
    element: HTMLElement
    // 蛇的身体（包括蛇头）
    bodies: HTMLCollection

    constructor() {
        this.head = document.querySelector('#snake > div')!
        this.element = document.getElementById('snake')!
        this.bodies = this.element.getElementsByTagName('div')
    }

    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    set X(newValue) {
        this.setPosition(newValue, 'left')
    }

    set Y(newValue) {
        this.setPosition(newValue, 'top')
    }

    // set X 与 set Y 的封装
    setPosition(newValue: number, direction: any) {
        if(newValue < 0 || newValue > 290) {
            throw new Error('蛇撞墙了！')
        }

        this.moveBody()
        this.head.style[direction] = newValue + 'px'
        this.checkHit()
    }

    // 增加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }
    
    // 蛇身体的移动
    moveBody() {
        for(let i = this.bodies.length -1; i > 0; i--) {
            // 获取前一节身体的坐标
            let X = (this.bodies[i -1] as HTMLElement).offsetLeft
            let Y = (this.bodies[i -1] as HTMLElement).offsetTop;

            // 将前一节身体坐标赋值给后一节身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }

    // 检测🐍头是否撞到了身体
    checkHit() {
        for(let i = 1; i < this.bodies.length; i++) {
            if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                throw new Error('🐍撞到了自己！')
            }
        }
    }
}

export default Snake