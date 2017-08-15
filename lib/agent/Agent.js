// @flow
import Grid from './Grid'
import Player from './Player'
import Direction from './Direction'

class Agent {

    player: Player

    constructor(player: Player) {
        this.player = player
    }

    decideMove(game: Grid): Direction {
        throw new Error('not implemented')
    }
}
