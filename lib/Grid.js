// @flow
import Ball from './types/Ball'
import Direction from './types/Direction'
import Player from './types/Player'

const MOVE_AMOUNT = 1

export default class Grid {

    width: number
    height: number
    ball: Ball
    players: Array<Player>

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.ball = new Ball(width, height)
        this.players = [
            new Player(width, height, Player.ONE),
            new Player(width, height, Player.TWO)
        ]
    }

    move(player: Player, direction: Direction): void {
        const playerIndex = player === Player.ONE ? 0 : 1
        const displacement = direction === Direction.UP ? -1 : 1

        this.players[playerIndex].y += displacement * MOVE_AMOUNT
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(0,0,0)'
        context.fillRect(0, 0, this.width, this.height)

        this.ball.draw(context)
        this.players.forEach(player => player.draw(context))
    }
}