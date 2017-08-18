// @flow
import Action from './agent/Action'
import Ball from './entity/Ball'
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
            ONE: new Player(width, height, Player.ONE),
            TWO: new Player(width, height, Player.TWO)
        }
    }

    move(player: string, action: Action): void {
        if (action === Action.DO_NOTHING) {
            return
        }

        const displacement = action === Action.MOVE_UP ? -1 : 1
        this.players[player].y += displacement * MOVE_AMOUNT
    }

    update(): void {
        if (this.winningPlayer() !== null) {
            return
        }

        const ball = this.ball
        ball.x += this.ballVelocity.x
        ball.y += this.ballVelocity.y

        const players = Object.values(this.players)
        players.forEach(player => {
            const boundedLeft = ball.x - ball.radius > player.x - Math.floor(player.width / 2)
            const boundedRight = ball.x - ball.radius < player.x + Math.floor(player.width / 2)

            const boundedAbove = ball.y - ball.radius > player.y - player.height
            const boundedBelow = ball.y - ball.radius < player.y + player.height

            const checks = [
                boundedLeft,
                boundedRight,
                boundedAbove,
                boundedBelow
            ]

            // cheap hack instead of determining collision properly
            if (checks.every(check => check)) {
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

    winningPlayer(): string {
        const ball = this.ball
        const player1 = this.players[Player.ONE]
        const player2 = this.players[Player.TWO]

        const player1Win = ball.x + ball.radius > player2.x + Math.floor(player2.width / 2)
        const player2Win = ball.x - ball.radius < player1.x - Math.floor(player1.width / 2)

        if (player1Win) {
            return Player.ONE
        } else if (player2Win) {
            return Player.TWO
        } else {
            return null
        }
    }
}