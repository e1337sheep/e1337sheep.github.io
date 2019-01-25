import { Cell, Game, Prominence } from "wasm-prominence"
import { memory } from "wasm-prominence/wasm_prominence_bg"

console.log("========BEGIN========")
const CELL_SIZE = 40 //px
const COLOR1 = "#FF0000" // Red
const COLOR2 = "#00FF00" // Green
const COLOR3 = "#0000FF" // Blue
const COLOR4 = "#FFFF00" // Yellow
const COLOR5 = "#FF00FF" // Magenta

// helper functions
// Game -> String -> CanvasContext
let init_canvas = (g, type, con, id) => {
  if (!document.getElementById(id)){
    let b = document.createElement('canvas')
    b.setAttribute('id', id)
    con.appendChild(b)
  }
  let canvas = document.getElementById(id)
  canvas.height = CELL_SIZE * g.height()
  canvas.width = CELL_SIZE * g.width()
  return canvas.getContext(type)
}
// Extra function call for helper/lazyness/clear code
const getIndex = (row, col, width) => row * width + col

// Game -> CanvasContext2D -> IO()
const drawCells2d = (g, ctx) => {
  const cellsPtr = g.cells()
  const cells = new Uint8Array(
    memory.buffer,
    cellsPtr,
    g.width() * g.height(),
  )
  ctx.beginPath()

  drawCellsColor(g, ctx, cells, COLOR1, Cell.Color1)
  drawCellsColor(g, ctx, cells, COLOR2, Cell.Color2)
  drawCellsColor(g, ctx, cells, COLOR3, Cell.Color3)
  drawCellsColor(g, ctx, cells, COLOR4, Cell.Color4)
  drawCellsColor(g, ctx, cells, COLOR5, Cell.Color5)

  ctx.stroke();
}

// Game -> CanvasContext2D -> [Cell] -> Color -> Cell -> IO()
const drawCellsColor = (g, ctx, cells, color, type) => {
  ctx.fillStyle = color
  for (let row = 0; row <= g.height(); row++){
    for (let col = 0; col <= g.width(); col++){
      const idx = getIndex(row, col, g.width())
      if (cells[idx] !== type) continue
      
      ctx.fillRect(
        col * CELL_SIZE,
        row * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      )
    }
  }
}

// ID of container:String -> IO
let startGame = (el) => {
  //mut g
  let g = Game.new()
  let ctx = init_canvas(g, '2d', el, "prom-board")
  const scoreDisp = document.getElementById("score")
  const livesDisp = document.getElementById("lives")
  livesDisp.textContent = g.lives().toString()
  scoreDisp.textContent = g.score().toString()
  drawCells2d(g, ctx)
  // Need a named handler so it can be removed, but also need to pass game
  // state to handler, so this inbetween function puts this together
  let pcHandler = e => { promClickHandler(e, g) }
  ctx.canvas.addEventListener("click", pcHandler)
  let promClickHandler = (e, g) => {
    // get cells from WASM memory
    const cellsPtr = g.cells()
    const cells = new Uint8Array(memory.buffer, cellsPtr, g.width() * g.height())
    // If Game not in playing state, start a new one
    if (!g.playing()){
      console.log("=== Game has ended, starting new game ===")
      // Clean up click handler
      ctx.canvas.removeEventListener("click", pcHandler)
      startGame(document.getElementById('game'))
      // Lazy way to get rid of old messages (psudo-Static Game Over)
      //make this more exact: only want classes that are children of e.target?
      let messages = document.getElementsByClassName("message")
      for (let i = 0 ; i < messages.length;i++){
        messages[i].classList.add("fade-remove")
      }
    } else {
      // calculate click postion from canvas accounting for scaling
      // use Rust for this? can then build in hasChanged stuff
      const boundRect = e.target.getBoundingClientRect()
      const scaleX = e.target.width / boundRect.width
      const scaleY = e.target.height / boundRect.height
      
      const canvasLeft = (e.clientX - boundRect.left) * scaleX
      const canvasTop = (e.clientY - boundRect.top) * scaleY
      // calculate cell clicked from click position
      const row = Math.min(Math.floor(canvasTop / CELL_SIZE), g.height())
      const col = Math.min(Math.floor(canvasLeft / CELL_SIZE), g.width())      
      const guess = cells[getIndex(row, col, g.width())]
      // console.log("===CLICK!===")
      // console.log("at row", row, ", col", col)
      // console.log("and Clicked Color is", guess)
      // Rust functions that return an Option will return None as undefined
      const message = document.createElement('div')
      message.setAttribute("class", "message")
      switch (g.play(guess)) {
        case true:
          console.log("CORRECT!!")
          scoreDisp.textContent = g.score().toString()
          message.textContent = "Correct!!"
          message.classList.add("fade-remove")
          break
        case false:
          console.log("WRONG!!")
          livesDisp.textContent = g.lives().toString()
          message.textContent = "Wrong!!"
          message.classList.add("fade-remove")
          break
        default:
          // Ergo, Handle None
          console.log("===GAME OVER!!===")
          livesDisp.textContent = ""
          message.innerHTML = "Game Over<br>Click To Play"
      }
      document.getElementById("game").appendChild(message)
      message.addEventListener("animationend", e => {
        e.target.parentNode.removeChild(message)
      })
    }
    drawCells2d(g, e.target.getContext('2d'))
  }

}

//let prom = Prominence.new()
startGame(document.getElementById('game'))



