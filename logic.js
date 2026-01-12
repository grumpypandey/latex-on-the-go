const editor = document.getElementById("editor")
const preview = document.getElementById("preview")
const status = document.getElementById("status")

const loadBtn = document.getElementById("loadBtn")
const saveBtn = document.getElementById("saveBtn")
const themeBtn = document.getElementById("themeBtn")
const fileInput = document.getElementById("fileInput")

let renderTimeout = null


let starterText = `
\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{LatexLite}

Trying out inline math $a^2+b^2=c^2$

\\[
\\int_0^1 x^2 dx = \\frac{1}{3}
\\]

\\end{document}
`

editor.value = localStorage.getItem("latexText") || starterText



function renderLatex(){
    clearTimeout(renderTimeout)

    renderTimeout = setTimeout(() => {

        try{
            let gen = new latexjs.HtmlGenerator({ hyphenate:false })
            latexjs.parse(editor.value , { generator:gen })

            preview.srcdoc = gen.domFragment().innerHTML
            status.innerText = "rendered at " + new Date().toLocaleTimeString()

            localStorage.setItem("latexText", editor.value)

        }catch(e){
            status.innerText = "error while rendering"
        }

    },350)
}


editor.addEventListener("input", renderLatex)



saveBtn.onclick = function(){
    let blob = new Blob([editor.value])
    let a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "document.tex"
    a.click()
}



loadBtn.onclick = function(){
    fileInput.click()
}



fileInput.onchange = function(e){
    let f = e.target.files[0]
    if(!f) return

    let reader = new FileReader()
    reader.onload = function(){
        editor.value = reader.result
        renderLatex()
    }

    reader.readAsText(f)
}



themeBtn.onclick = function(){
    document.body.classList.toggle("dark")
    localStorage.setItem("themeMode", document.body.className)
}



let savedTheme = localStorage.getItem("themeMode")
if(savedTheme){
    document.body.className = savedTheme
}


renderLatex()
