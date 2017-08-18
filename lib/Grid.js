// @flow
import Action from './agent/Action'
import Ball from './entity/Ball'
import Player from './entity/Player'

const MOVE_AMOUNT = 1
const MAX_BOUNCE_ANGLE = Math.PI * 5 / 12

export default class Grid {

    width: number
    height: number
    ball: Ball
    ballVelocity: Object
    players: { [string]: Player }

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

        const collisionAbove = ball.y - ball.radius <= 0
        const collisionBelow = ball.y + ball.radius >= this.height

        if (collisionAbove || collisionBelow) {
            this.ballVelocity.y = -this.ballVelocity.y

            // Prevent the ball from leaving the screen
            if (collisionAbove) {
                this.ball.y = this.ball.radius
            } else {
                this.ball.y = this.height - this.ball.radius
            }
        }

        const players = Object.values(this.players)
        players.forEach(player => {
            if (this.collides(ball, player)) {
                if (Math.sign(this.ballVelocity.x) === Math.sign(player.x - ball.x)) {
                    const intersectY = player.y - ball.y
                    const normalized = intersectY / (player.height / 2)
                    const angle = normalized * MAX_BOUNCE_ANGLE

                    this.ballVelocity.x = Math.cos(angle) * -Math.sign(this.ballVelocity.x)
                    this.ballVelocity.y = -Math.sin(angle)
                }
            }
        })
    }

    collides(ball: Ball, player: Player) {
        const rectX = player.x - Math.floor(player.width / 2)
        const rectY = player.y - Math.floor(player.height / 2)
        const deltaX = ball.x - Math.max(rectX, Math.min(ball.x, rectX + player.width))
        const deltaY = ball.y - Math.max(rectY, Math.min(ball.y, rectY + player.height))

        return deltaX * deltaX + deltaY * deltaY < ball.radius * ball.radius
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(0,0,0)'
        context.fillRect(0, 0, this.width, this.height)

        // draw center divider
        context.strokeStyle = 'rgb(255,255,255)'
        context.beginPath()
        context.setLineDash([5, 15])
        context.lineWidth = Math.floor(this.width / 50)
        const midpoint = Math.floor(this.width / 2)
        context.moveTo(midpoint, 0)
        context.lineTo(midpoint, this.height)
        context.stroke()

        this.ball.draw(context)

        const players = Object.values(this.players)
        players.forEach(player => player.draw(context))
    }

    winningPlayer(): ?string {
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