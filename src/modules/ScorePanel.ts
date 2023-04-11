class ScorePanel {
    score = 0
    level = 1
    maxLevel: number // 最高难度等级
    upScore: number // 升级所需的分数
    scoreElement: HTMLElement
    levelElement: HTMLElement

    constructor(maxLevel: number = 10, upScore: number = 5) {
        this.scoreElement = document.getElementById('score')!
        this.levelElement = document.getElementById('level')!

        this.scoreElement.innerHTML = String(this.score)
        this.levelElement.innerHTML = this.level + ''

        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 加分
    addScore() {
        this.scoreElement.innerHTML = ++this.score + ''
        if(this.score % this.upScore === 0) this.levelUp()
    }

    // 升级
    levelUp() {
        if(this.level < this.maxLevel) this.levelElement.innerHTML = String(++this.level)
    }

}

export default ScorePanel