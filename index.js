// @flow
import Grid from './lib/Grid'
import FollowingAgent from './lib/agent/FollowingAgent'
import Player from './lib/entity/Player'

const canvas: HTMLCanvasElement = document.getElementById('game')
const context = canvas.getContext('2d')

const game = new Grid(canvas.width, canvas.height)
const agents = [
    new FollowingAgent(Player.ONE),
    new FollowingAgent(Player.TWO)
]

function draw() {
    game.update()

    agents.forEach(agent => {
        const direction = agent.decideMove(game)
        game.move(agent.player, direction)
    })

    game.draw(context)
    window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)