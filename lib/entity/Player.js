// @flow
import Entity from './Entity'

const MOVE_AMOUNT = 1

class Player extends Entity {

    static ONE: string
    static TWO: string

    constructor(width: number, height: number, who: string) {
        const playerWidth  = Math.floor(width / 20)
        const playerHeight = Math.floor(height / 4)

        const margin = Math.floor(width / 20)

        const x0 = who == Player.ONE
            ? margin + Math.floor(playerWidth/2)
            : width - margin - Math.floor(playerWidth/2)
        const y0 = Math.floor(width / 2)

        super(x0, y0)
        this.width = playerWidth
        this.height = playerHeight
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(255, 255, 255)'

        const x = this.x - Math.floor(this.width / 2)
        const y = this.y - Math.floor(this.height / 2)
        context.fillRect(x, y, this.width, this.height)
    }
}

Player.ONE = 'ONE'
Player.TWO = 'TWO'

export default Player