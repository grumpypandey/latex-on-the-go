# latex-on-the-go

latex-on-the-go is a fully client-side LaTeX editor designed for quick editing and previewing of .tex files directly in the browser.
It focuses on portability, simplicity, and zero setup , making LaTeX usable anywhere without installing a TeX distribution or relying on a backend.

Everything runs entirely in the browser using plain HTML, CSS, and JavaScript.

# Motivation

The idea for this project came from the need to:

quickly edit LaTeX files on shared or temporary systems

preview equations without setting up a full LaTeX environment

experiment with editor-like features using only frontend technologies

The project started very small and was gradually expanded in phases to resemble a lightweight LaTeX IDE.

# Features

Live LaTeX preview in the browser

Multi-file project support

File switching with active file indicator

Autosave using browser localStorage

Load .tex files from the local system

Save individual .tex files

Error output panel for render failures

Light and Dark themes

Resizable editor and preview panes

Scroll synchronization between editor and preview

# Keyboard shortcuts

Ctrl + S — Save current file

Ctrl + O — Open file

No backend.
No frameworks.
No build tools.

# Tech Stack

HTML

CSS

Vanilla JavaScript

latex.js (for LaTeX parsing and rendering)

All dependencies are loaded via CDN.

# How It Works 

A project is stored as a simple JavaScript object

Files are stored as filename → content pairs

The active file is parsed and rendered using latex.js

Rendering is debounced to reduce unnecessary parsing

Parsing errors are caught and displayed in an error panel

Project state is persisted using localStorage

Pane resizing is handled manually using mouse events

No server-side processing is involved at any point.

 # Limitations

This does not fully compile LaTeX like pdflatex

Some LaTeX packages are unsupported by latex.js

Error messages can be vague

Large documents may impact performance

Preview output is not identical to a real PDF

This tool is intended for quick edits and previews, not full publication workflows.

# Development Notes

The project was developed incrementally in phases:

Basic editor and preview layout

File loading, theming, autosave

Multi-file support, error handling, keyboard shortcuts, UI improvements

Much of the code was written experimentally and refined over time.
Some parts are intentionally simple rather than heavily abstracted to keep the logic understandable.

# Running the Project

Download or clone the repository

Open index.html in any modern browser

No installation or setup required.
