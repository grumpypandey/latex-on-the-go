latex-on-the-go

latex-on-the-go is a fully client-side LaTeX editor built for quick editing and previewing of .tex files directly in the browser.
The aim of the project is to make LaTeX usable anywhere, instantly, without installing a TeX distribution or relying on a backend server.

Everything runs purely in the browser using HTML, CSS, and JavaScript.

Why I built this

I often needed to make small LaTeX edits or quickly preview equations while away from my main setup. Installing LaTeX everywhere or depending on full online editors felt unnecessary for simple tasks.

This project started as a basic editor + preview page and slowly evolved into a small IDE-like tool as more features were added incrementally.

The main focus was:

zero installation

client-side only

fast iteration

learning how real editors manage files and state

Features

Live LaTeX preview in the browser

Multi-file project support

File switching with active file indicator

Autosave using browser local storage

Load .tex files from the local system

Save individual .tex files

Error output panel for render failures

Light and Dark theme support

Resizable editor and preview panes

Scroll sync between editor and preview

Keyboard shortcuts

Ctrl + S to save

Ctrl + O to open a file

No backend, no frameworks, no build tools.

Tech Stack

HTML

CSS

Vanilla JavaScript

latex.js for LaTeX parsing and rendering

All libraries are loaded using CDNs.

How it works (high level)

The editor treats a project as a simple JavaScript object

Files are stored as filename–content pairs

The active file is parsed and rendered using latex.js

Rendering is debounced to avoid unnecessary re-parsing

Errors during parsing are caught and displayed in a panel

The entire project state is stored in localStorage

Pane resizing is handled manually using mouse events

There is no server-side processing involved.

Limitations

This does not fully compile LaTeX like pdflatex

Some LaTeX packages are not supported by latex.js

Error messages can be generic

Performance may degrade for very large documents

Preview output is not identical to a real PDF

This tool is intended for quick edits, previews, and learning, not final publication workflows.

Development notes

The project was developed in phases:

Basic editor and preview layout

File loading, theming, autosave

Multi-file support, error handling, keyboard shortcuts, UI improvements

A lot of the logic was built experimentally and refined over time.
Some parts are intentionally straightforward rather than heavily abstracted.

Running the project

Simply open index.html in a modern browser.

No installation or setup required.

Possible future improvements

Line numbers

Better error highlighting

PDF export using WebAssembly-based TeX

Folder-based project structure

Mobile-friendly layout improvements