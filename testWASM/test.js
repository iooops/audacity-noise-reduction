
const fetch = require("node-fetch");

// async function fetchAndInstantiate() {
//     const response = await fetch("http://localhost:3000/a.out.wasm");
//     console.log(response)
//     const buffer = await response.arrayBuffer();
//     console.log(buffer)
//     const obj = await WebAssembly.instantiate(buffer);
//     console.log(obj);
// // console.log(obj.instance.exports.add(1, 2));  // "3"
// }

// fetchAndInstantiate();

// Loads a WebAssembly dynamic library, returns a promise.
// imports is an optional imports object
function loadWebAssembly(filename, imports) {
  // Fetch the file and compile it
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(mod => {
      // Create the imports for the module, including the
      // standard dynamic library imports
      var imports = {
            env: {
            'memoryBase': 0,
            'tableBase': 0,
            'memory': new WebAssembly.Memory({initial: 256}),
            'table': new WebAssembly.Table({initial: 256, element: 'anyfunc'}),
            // abort: alert,
            }
       }
      // Create the instance.
      return new WebAssembly.Instance(mod, imports);
    });
}

// Main part of this example, loads the module and uses it.
loadWebAssembly('http://localhost:3000/a.out.wasm')
  .then(instance => {
    var ex = instance.exports; // the exports of that instance
    console.log(ex)
    // var doubler = exports._doubler; // the "doubler" function (note "_" prefix)
    // // now we are ready, set up the button so the user can run the code
    // var button = document.getElementById('run');
    // button.value = 'Call a method in the WebAssembly module';
    // button.addEventListener('click', function() {
    //   var input = 21;
    //   alert(input + ' doubled is ' + doubler(input));
    // }, false);
  }
);




