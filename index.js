// @flow
import Grid from './lib/Grid'

const canvas: HTMLCanvasElement = document.getElementById('game')
const context = canvas.getContext('2d')

const game = new Grid(canvas.width, canvas.height)
game.draw(context)