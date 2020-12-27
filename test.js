
const fetch = require("node-fetch");

async function fetchAndInstantiate() {
    const response = await fetch("http://localhost:3000/a.out.wasm");
    const buffer = await response.arrayBuffer();
    const obj = await WebAssembly.instantiate(buffer);
    console.log(obj);
// console.log(obj.instance.exports.add(1, 2));  // "3"
}

fetchAndInstantiate();