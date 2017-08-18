
// @flow

import Grid from './lib/Grid'
import FollowingAgent from './lib/agent/agents/FollowingAgent'
import QLearningAgent from './lib/agent/agents/q/QLearningAgent'
import Player from './lib/entity/Player'

const MOVES_PER_FRAME = 10

let ticks = 0
let sumTicks = 0

let games = 0
let wins = 0

const summary = document.getElementById('summaryWins')
const canvas: HTMLCanvasElement = document.getElementById('game')

if (summary === null || canvas === null) {
    throw new Error('Could not find necessary DOM elements')
}

const context = canvas.getContext('2d')

let game = new Grid(canvas.width, canvas.height)
const agents = [
    new FollowingAgent(Player.ONE),
    new QLearningAgent(Player.TWO, canvas.width, canvas.height)
]

function draw() {
    for (let i = 0; i < MOVES_PER_FRAME; ++i) {
        ++ticks

        agents.forEach(agent => {
            const direction = agent.act(game)
            game.move(agent.player, direction)
        })

        game.update()

        const winningPlayer = game.winningPlayer()
        if (winningPlayer !== null) {
            sumTicks += ticks
            ticks = 0

            ++games
            if (winningPlayer === Player.TWO) {
                ++wins
            }

            const percentageWon = (wins / games * 100).toFixed(2)
            const averageTicks = Math.floor(sumTicks / games)
            summary.textContent = `${wins}/${games} (${percentageWon}) - average game is ${averageTicks} ticks`

            game = new Grid(canvas.width, canvas.height)
        }
    }

    game.draw(context)
    window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)