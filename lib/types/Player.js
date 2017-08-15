// @flow
import Position from './Position'
import Direction from './Direction'

const MOVE_AMOUNT = 1

class Player extends Position {

    static ONE: string
    static TWO: string

    constructor(width: number, height: number, who: string) {
        const playerWidth  = Math.floor(width / 20)
        const playerHeight = Math.floor(height / 4)

        const margin = Math.floor(width / 20)

        const x0 = who === Player.ONE
            ? margin
            : width - margin - playerWidth
        const y0 = Math.floor((width - playerHeight) / 2)

        super(x0, y0)
        this.width = playerWidth
        this.height = playerHeight
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(255, 255, 255)'
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}

Player.ONE = 'ONE'
Player.TWO = 'TWO'

export default Player