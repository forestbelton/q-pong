// @flow
import Ball from './types/Ball'
import Direction from './types/Direction'
import Player from './types/Player'
import Position from './types/Position'

const MOVE_AMOUNT = 1

export default class Grid {

    width: number
    height: number
    ball: Ball
    players: Array<Position>

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.ball = new Ball(width, height)

        const margin = Math.floor(width / 20)
        const paddleWidth = this.paddleWidth(this.width)
        const paddleHeight = this.paddleHeight(this.height)
        const y0 = Math.floor((width - paddleHeight) / 2)

        this.players = [
            new Position(margin, y0),
            new Position(height - margin - paddleWidth, y0)
        ]
    }

    paddleWidth(width: number): number {
        return Math.floor(width / 20)
    }

    paddleHeight(height: number): number {
        return Math.floor(height / 4)
    }

    move(player: Player, direction: Direction): void {
        const playerIndex = player === Player.ONE ? 0 : 1
        const displacement = direction == Direction.UP ? -1 : 1

        this.players[playerIndex].y += displacement * MOVE_AMOUNT
    }

    draw(context: CanvasRenderingContext2D): void {
        const paddleWidth = this.paddleWidth(this.width)
        const paddleHeight = this.paddleHeight(this.height)

        context.fillStyle = 'rgb(0,0,0)'
        context.fillRect(0, 0, this.width, this.height)

        this.ball.draw(context)

        context.fillStyle = 'rgb(255, 255, 255)'
        context.fillRect(this.players[0].x, this.players[0].y, paddleWidth, paddleHeight)
        context.fillRect(this.players[1].x, this.players[1].y, paddleWidth, paddleHeight)
    }
}