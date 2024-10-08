---
title: 'cprint'
description: 'A Python package for easily printing text with different colours and typography.'
pubDate: 'Oct 08 2024'
heroImage: 'cprint/cprint_console.jpg'
tags: []
active: True
---

This is a small Python package that lets you print text in different colours and typography by extending the functionality of the built-in `print()` function. The source code can be found [here](https://github.com/SimonPfeifer/cprint).

### Background
The motivation for this project was very simply that I wanted to have coloured terminal output in the way that IPython has, for example. This really helps when you have multiple types of information being displayed. Errors are allowed to be clearly shown and stand out amids more mundane output. As an example, implementing colout in a custom logging library benefits from additional segregation of text output in the terminal.

### Method
The way I found to display colourful terminal output was via [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code). These are actually really straight forward and include a prefix to set the colour and style (bold, italic, etc.), and a postfix to reset to default.

The way to control this within `cprint` is via a keyword argument which contains lower case letters to indicate the colour and upper case letters to indicate the style. The keyword argument is scanned and the necessary prefix characters combined.

To preserve the default built-in Python `print()` functionality, there are actually 3 separate print statements involved. The first prints the prefix to set the terminal output state. The second hands all additional arguments to `print()` to be evaluated as normal. And finally, the default characters are printed to return to normal operation mode.

### Installation
This was a great project to figure out how to publish a Python package on [PyPi](https://pypi.org/) and get to grips with the typical Python package directory structure. Therefore you can simply install this using:
```
pip install c-print
```

There are no prerequisites and it should even work on older (2.7+) version of Python.

### Usage

The `cprint()` function simply adds one keyword argument, `c`, to the python `print()` function. This extra keyword argument can change the output of `print()` to one colour and any number of given styles. Colours are given in lower case and styles in upper case. Any other keyword arguments are passed on to `print()`.

##### Options

| Character  |  Colour         |
| ---------- | --------------- |
| 'k'        | black           |
| 'r'        | red             |
| 'g'        | green           |
| 'y'        | yellow          |
| 'b'        | blue            |
| 'm'        | magenta         |
| 'c'        | cyan            |
| 'w'        | white           |

| Character  |  Style          |
| ---------- | --------------- |
| 'B'        | bold            |
| 'D'        | dark            |
| 'I'        | italic          |
| 'U'        | underline       |
| 'F'        | flash           |
| 'R'        | reverse-colour  |
| 'C'        | crossed-through |


##### Example
An example of the `cprint()` usage is given here and an example output can be seen at the top of the page.
```python
from cprint import cprint
cprint("Hello World!", c='rB')
cprint("Monty Python", c='bUI', end='!\n')
```