# CodeNotes
Hello! This app is made for learning purposes by [me](https://github.com/WinglessFrame).
---
[![Netlify Status](https://api.netlify.com/api/v1/badges/47c4c3aa-55e6-4cb9-b654-559a15ef091e/deploy-status)](https://app.netlify.com/sites/codenotesapp/deploys)
---
- ### What is this about?
 As the name of the app says, this app is made for making notes.
- ### Why is it special then?
It can run JS `code`!
- ### Is it just an eval functhion that runs code π?
No π, it uses esbuild with WebAssembly to assemble your code and execute it in the` <iframe> `element! This means, that you can import **any library** you want!
- ### What!? No limits π΅?
No, unfortunately π, there are some things, that are impossible to do: one of them is working with local storage - this is the limitation of working with `<iframe>` in the way I did it for security purposes.
- ### Damn, this app will use a lot of internet traffic to download libraries...  π
No, it won't. This app caches all downloaded libraries inside the browser so download once - use forever (almost π)
- ### Is there some quality of life functions for me ππ?
Yes! I was prepared for this question π.
There is a `show()` function that immediately renders any piece of data (even React components) on the screen.
Also code from upper βοΈ code cells are available inside bottom β ones.
- ### Can i get any element in code document via `document.querySelector`?
Yes π! You can grab root element! It has `id `of `root`. Use `document.getElementById('root')` for example to get it.
- ### What about regular text π? 
There is 2 types of cells: Code and Text. You can make how much you want of them in your's note βΎοΈ. Code and Text cell both contains of 2 parts: preview and editing field. To edit text cell you have to press on it and then the editor would appear.

## Technology stack used
- React
- TypeScript
- Redux (redux-thunk, immet)
- Firebase
- esbuild-wasm (WebAssembly version of esbuild, used for building user code)
- bulmaCSS
