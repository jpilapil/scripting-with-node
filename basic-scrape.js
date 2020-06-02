const fs = require("fs"); // require file system from node
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex"); // require functions from regex.js

const sourceFile = String(fs.readFileSync("./html-pages/basic-functions.html")); // define sourceFile, reads the basic-functions.html and turns it into a string

const components = getComponents(sourceFile); // gets components in between each start and end comment. see regex.js

const componentObjs = components.map((component) => {
   // map through components, takes a function that targets each individual key (component)
   return {
      name: getName(component)[0], // run getName function which returns an array of things, then grabbing the first thing from array
      desc: trim(getDesc(component)[0]), // trim out white space, see regex.js
      inputs: getInputs(component).length, // counts number of inputs
      type: "basic", // scraping only the basic.html file
      typeNum: 100, // designated for basic type
      isFavorite: false, // default is false
   };
});

const reveresedObjs = componentObjs.reverse(); // reverse the object

// reorder the object
const orderedObjs = [];
for (let i = 0; i < componentObjs.length; i++) {
   const obj = componentObjs[i];
   obj.order = obj.typeNum + i; // for every index youre on, take the typeNum and add whatever index youre on
   orderedObjs.push(obj); // push obj into the empty orderedObjs
}

console.log(reveresedObjs);

const targetFile = "./json/basic.json";

fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
