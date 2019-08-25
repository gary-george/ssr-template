## SSR TEMPLATE

This is a boiler plate project which supports
both _Server Side Rendering_ and _Client Side Rendering_

---

### What are we using in this project?

- React 16
- Node 10
- Webpack 4
- Babel 7

---

### What is SSR ✈️?

Server Side Rendering is a technique where your React Javascript code is sent down to the browser as pre-rendered HTML. 
This is great for SEO as it means your mark up is not rendered in the browser. Also if for some crazy reason one of your users has javascript disabled they will still be able to view your website 🚀.

---

### What is CSR 🚗?

Client Side Rendering allows developers to make their websites entirely rendered in the browser with JavaScript. Instead of having a different HTML page per route. This is the way in which Front end frameworks such as React work by default.

---

### What is Hot Reloading 🔥?

The idea behind hot reloading is to keep the app running and to inject new versions of the files that you edited at runtime. This way, you don't lose any of your state which is especially useful if you are tweaking the UI.

---

### How to use this project

There are two scripts you can run to start the project:

- **dev** - this will start the project up using Hot reloading allowing for fast feedback in the Browser as you make changes to the UI.
- **start** - this will by default start the project up using SSR, if you wanted to use CSR then you can create a .env file and set the SERVER_RENDERED flag to be false.

Check out the blog post for a more detailed explanation of whats going on:

- [Blog Post](https://medium.com/@garygeorge84/server-side-rendering-418a63928571)
