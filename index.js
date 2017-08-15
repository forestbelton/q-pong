// @flow
import Grid from './lib/Grid'

const canvas: HTMLCanvasElement = document.getElementById('game')
const context = canvas.getContext('2d')

const game = new Grid(canvas.width, canvas.height)

function draw() {
    game.draw(context)
    window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)