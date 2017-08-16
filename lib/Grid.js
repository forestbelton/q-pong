// @flow
import Ball from './entity/Ball'
import Direction from './Direction'
import Player from './entity/Player'

const MOVE_AMOUNT = 1

export default class Grid {

    width: number
    height: number
    ball: Ball
    ballVelocity: Object
    players: Object

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.ball = new Ball(width, height)

        const velocityX = Math.floor(Math.random() * 2) > 0 ? 1 : -1
        const velocityY = Math.floor(Math.random() * 2) > 0 ? 1 : -1
        this.ballVelocity = {
            x: velocityX,
            y: velocityY
        }

        this.players = {
            [Player.ONE]: new Player(width, height, Player.ONE),
            [Player.TWO]: new Player(width, height, Player.TWO)
        }
    }

    move(player: string, direction: Direction): void {
        if (direction === Direction.NONE) {
            return
        }

        const displacement = direction === Direction.UP ? -1 : 1
        this.players[player].y += displacement * MOVE_AMOUNT
    }

    update(): void {
        this.ball.x += this.ballVelocity.x
        this.ball.y += this.ballVelocity.y

        const players = Object.values(this.players)
        players.forEach(player => {
            const boundedLeft = this.ball.x - this.ball.radius > player.x - player.width
            const boundedRight = this.ball.x - this.ball.radius < player.x + player.width

            // cheap hack instead of determining collision properly
            if (boundedLeft && boundedRight) {
                this.ballVelocity.x = -this.ballVelocity.x
                this.ballVelocity.y = -this.ballVelocity.y
            }
        })
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(0,0,0)'
        context.fillRect(0, 0, this.width, this.height)

        this.ball.draw(context)

        const players = Object.values(this.players)
        players.forEach(player => player.draw(context))
    }
}