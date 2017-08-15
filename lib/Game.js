// @flow
import Direction from './Direction'
import Player from './Player'
import Position from './Position'

const MOVE_AMOUNT = 1

export default class Game {

    width: number
    height: number
    players: Array<Position>

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        const margin = Math.floor(width / 20)
        const paddleHeight = Math.floor(this.width / 10)
        const y0 = Math.floor((width - paddleHeight) / 2)

        this.players = [
            new Position(margin, y0),
            new Position(height - margin, y0)
        ]
    }

    move(player: Player, direction: Direction): void {
        const playerIndex = player === Player.ONE ? 0 : 1
        const displacement = direction == Direction.UP ? -1 : 1

        this.players[playerIndex].y += displacement * MOVE_AMOUNT
    }

    draw(context: CanvasRenderingContext2D): void {
        const paddleHeight = Math.floor(this.width / 10)
        const paddleWidth = 5

        context.fillStyle = 'rgb(0,0,0)'
        context.fillRect(0, 0, this.width, this.height)

        context.fillStyle = 'rgb(255, 255, 255)'
        context.fillRect(this.players[0].x, this.players[0].y, paddleWidth, paddleHeight)
        context.fillRect(this.players[1].x, this.players[1].y, paddleWidth, paddleHeight)
    }
}