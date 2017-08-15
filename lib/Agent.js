// @flow
import Game from './Game'
import Player from './Player'
import Direction from './Direction'

class Agent {

    player: Player

    constructor(player: Player) {
        this.player = player
    }

    decideMove(game: Game): Direction {
        return Direction.UP
    }
}