// @flow
import Agent from './Agent'
import Direction from '../Direction'
import Grid from '../Grid'

export default class FollowingAgent extends Agent {

    decideMove(game: Grid): Direction {
        const player = game.players[this.player]

        return game.ball.y < (player.y - player.width / 2)
            ? Direction.UP
            : Direction.DOWN
    }
}