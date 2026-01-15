const editor = document.getElementById("editor")
const preview = document.getElementById("preview")
const status = document.getElementById("status")
const fileList = document.getElementById("fileList")
const errorPanel = document.getElementById("errorPanel")

const divider = document.getElementById("divider")
const fileInput = document.getElementById("fileInput")

let dragging = false
let renderTimer = null

let project = JSON.parse(localStorage.getItem("projectData")) || {
    files:{
        "main.tex":`
\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}

\\section*{LatexLite Final}

Inline math $e^{i\\pi}+1=0$

\\[
\\int_0^1 x^2 dx = \\frac{1}{3}
\\]

\\end{document}
`.trim()
    },
    active:"main.tex"
}

function saveProject(){
    localStorage.setItem("projectData", JSON.stringify(project))
}

function refreshFileList(){
    fileList.innerHTML = ""

    Object.keys(project.files).forEach(name=>{
        let li = document.createElement("li")
        li.innerText = name + (name===project.active ? " *":"")
        if(name===project.active) li.classList.add("active")

        li.onclick = function(){
            project.active = name
            editor.value = project.files[name]
            refreshFileList()
            renderLatex()
        }

        fileList.appendChild(li)
    })
}

function setStatus(t){
    status.innerText = t
}

function renderLatex(){
    clearTimeout(renderTimer)
    setStatus("rendering...")

    renderTimer = setTimeout(()=>{
        try{
            let gen = new latexjs.HtmlGenerator({ hyphenate:false })
            latexjs.parse(editor.value , { generator:gen })
            preview.srcdoc = gen.domFragment().innerHTML

            project.files[project.active] = editor.value
            saveProject()

            errorPanel.style.display = "none"
            setStatus("ok " + new Date().toLocaleTimeString())

        }catch(e){
            errorPanel.style.display = "block"
            errorPanel.innerText = e.toString()
            setStatus("error")
        }
    },350)
}

editor.addEventListener("input",()=>{
    renderLatex()
    refreshFileList()
})

editor.addEventListener("scroll",()=>{
    try{
        let ratio = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
        let body = preview.contentDocument.body
        body.scrollTop = ratio * (body.scrollHeight - body.clientHeight)
    }catch{}
})

document.getElementById("saveBtn").onclick = ()=>{
    let blob = new Blob([editor.value])
    let a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = project.active
    a.click()
    setStatus("saved manually")
}

document.getElementById("loadBtn").onclick = ()=>{
    fileInput.click()
}

fileInput.onchange = e=>{
    let f = e.target.files[0]
    if(!f) return
    let r = new FileReader()
    r.onload = ()=>{
        project.files[f.name] = r.result
        project.active = f.name
        editor.value = r.result
        refreshFileList()
        renderLatex()
    }
    r.readAsText(f)
}

document.getElementById("newFileBtn").onclick = ()=>{
    let name = prompt("file name?")
    if(!name) return
    project.files[name] = ""
    project.active = name
    editor.value = ""
    refreshFileList()
    saveProject()
}

document.getElementById("themeBtn").onclick = ()=>{
    document.body.classList.toggle("dark")
    localStorage.setItem("theme", document.body.className)
}

let t = localStorage.getItem("theme")
if(t) document.body.className = t

divider.onmousedown = ()=> dragging = true
window.onmouseup = ()=> dragging = false
window.onmousemove = e=>{
    if(!dragging) return
    let x = e.clientX
    if(x < 200) x = 200
    document.querySelector(".workspace").style.gridTemplateColumns =
        "180px " + (x-180) + "px 6px 1fr"
}

document.addEventListener("keydown",e=>{
    if(e.ctrlKey && e.key==="s"){
        e.preventDefault()
        document.getElementById("saveBtn").click()
    }
    if(e.ctrlKey && e.key==="o"){
        e.preventDefault()
        document.getElementById("loadBtn").click()
    }
})

refreshFileList()
editor.value = project.files[project.active]
renderLatex()
