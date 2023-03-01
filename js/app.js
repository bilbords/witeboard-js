const canvas = document.querySelector(".main__canvas")
const ctx = canvas.getContext("2d")
const footer = document.querySelector(".footer")

const widthInput = document.querySelector(".line-width")
const colorInput = document.querySelector(".choose-color")

const clearButton = document.querySelector(".fa-window-close")
const saveButton = document.querySelector(".fa-floppy-o")

const brushButton = document.querySelector(".fa-paint-brush")
const eraserButton = document.querySelector(".fa-eraser")

canvas.height = window.innerHeight - footer.clientHeight
canvas.width = window.innerWidth

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.filter = "antialiased";
ctx.imageSmoothingEnabled = true;

let LMBClamped

document.addEventListener("mousedown", (e) => {
  if (e.which === 1) {
    LMBClamped = true
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
})

document.addEventListener("mouseup", () => {
  LMBClamped = false
})

function drawFunction() {
  canvas.style.cssText = "cursor: url('./assets/cursors/Pencil.cur'), auto;"
  canvas.addEventListener("mousemove", (e) => {
    if (LMBClamped === true && brushButton.classList.contains("active-button")) {
      ctx.strokeStyle = colorInput.value
      ctx.lineWidth = widthInput.value
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  })
}

drawFunction()

brushButton.addEventListener("click", () => {
  eraserButton.classList.remove("active-button")
  brushButton.classList.add("active-button")
  drawFunction()
})

function eraserFunction() {
  canvas.style.cssText = "cursor: url('./assets/cursors/Eraser.cur'), auto;"
  canvas.addEventListener("mousemove", (e) => {
    if (LMBClamped === true && eraserButton.classList.contains("active-button")) {
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = widthInput.value
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  })
}

eraserButton.addEventListener("click", () => {
  brushButton.classList.remove("active-button")
  eraserButton.classList.add("active-button")
  eraserFunction()
})

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

saveButton.addEventListener("click", () => {
  let data = canvas.toDataURL("imag/png")
  let a = document.createElement("a")
  a.href = data
  a.download = "sketch.png"
  a.click()
})