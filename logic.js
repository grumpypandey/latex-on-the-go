const editor = document.getElementById("editor")
const iframe = document.getElementById("preview")
const status = document.getElementById("status")

const defaultDoc = `
\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{LatexLite}

\\[
\\int_0^1 x^2 dx = \\frac{1}{3}
\\]

\\end{document}
`.trim()

editor.value = localStorage.getItem("latex") || defaultDoc

let timeout

function render() {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    const generator = new latexjs.HtmlGenerator({ hyphenate: false })
    const doc = latexjs.parse(editor.value, { generator })
    iframe.srcdoc = generator.domFragment().innerHTML
    localStorage.setItem("latex", editor.value)
    status.textContent = "Rendered " + new Date().toLocaleTimeString()
  }, 400)
}

editor.addEventListener("input", render)

document.getElementById("save").onclick = () => {
  const blob = new Blob([editor.value])
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "document.tex"
  a.click()
}

document.getElementById("pdf").onclick = () => {
  html2pdf().from(iframe.contentDocument.body).save("document.pdf")
}

document.getElementById("new").onclick = () => {
  editor.value = defaultDoc
  render()
}

document.getElementById("theme").onclick = () => {
  document.body.classList.toggle("dark")
}

render()
