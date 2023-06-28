
Swamishreeji

Webpack bundling in SAL

I am going to talk about webpack build system in SAL. The build system is creates using webpack
so we need to understand a bit about webpack first. so what is webpack, webpack is a bild tool,
that bundles your javascipt and static assets such as images, font etc. The problem on frontend 
was that there was no provision for modularity, with modularity we can have code reusability, 
code composition, Working in modules isolates sections of methods so work can be built (and then repaired) separately ,
so that several developers can work on isolated modules independently and writing extensive amount of code and variable is less prone to eror with modularity as it dosent pollute global namespace, there was common.js modules using we could achive modularity, but on browser there was no support for common.js. With webpack we can have the advantage of modularity using 
ECMAScript modules or common.js modules. Webpack leverages IIFE inernally to facilitate modularity. Lets see some advantages of processing static assets using webpack.