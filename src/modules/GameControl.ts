import Food from "./Food"
import ScorePanel from "./ScorePanel"
import Snake from "./Snake"

class GameControl {
    food: Food
    scorePanel: ScorePanel
    snake: Snake

    // 🐍是否存活
    isAlive: Boolean = true
    // 蛇前进的方向
    direction: String = ''

    constructor() {
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 1)
        this.snake = new Snake()

        this.init()
    }

    // 初始化函数
    init() {
        document.addEventListener('keydown', this.keyDownHandler.bind(this))

        this.run()
    }

    keyDownHandler(event: KeyboardEvent) {
        // 设置不允许🐍走回头路
        if(this.direction === 'ArrowLeft' && event.key === 'ArrowRight') return
        if(this.direction === 'ArrowRight' && event.key == 'ArrowLeft') return
        if(this.direction === 'ArrowUp' && event.key == 'ArrowDown') return
        if(this.direction === 'ArrowDown' && event.key == 'ArrowUp') return

        this.direction = event.key

        // this.run()
        // 放在这里会有键盘越点移速越快的问题
    }

    run() {
        try {
            switch (this.direction) {
                case 'ArrowUp':
                    this.snake.Y -= 10
                    break;
                case 'ArrowDown':
                    this.snake.Y += 10
                    break;
                case 'ArrowLeft':
                    this.snake.X -= 10
                    break;
                case 'ArrowRight':
                    this.snake.X += 10
                    break;
            }
        } catch (e: any) {
            alert(e.message)
            this.isAlive = false
        }

        // 如果蛇吃到了食物：食物刷新，分数增加，蛇长度加一节
        if (this.isEat()) {
            this.food.changeLocation()
            this.scorePanel.addScore()
            this.snake.addBody()
        }

        this.isAlive && setTimeout(this.run.bind(this), (300 - 25 * (this.scorePanel.level - 1)))
    }

    // 检测蛇是否吃到食物（蛇头的坐标 与 食物的坐标重合）
    isEat() {
        return this.snake.X === this.food.X && this.snake.Y === this.food.Y
    }
}

export default GameControl