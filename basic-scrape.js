const fs = require("fs"); // require file system from node
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex"); // require functions from regex.js

// define sourceFile, reads the basic-functions.html and turns it into a string
const sourceFileBasic = String(
   fs.readFileSync("./html-pages/basic-functions.html")
);
// reads intermediate-functions.html, turns into string
const sourceFileIntermediate = String(
   fs.readFileSync("./html-pages/intermediate-functions.html")
);
// reads functional-library.html, turns into string
const sourceFileFunctional = String(
   fs.readFileSync("./html-pages/functional-library.html")
);
// reads algorithm-functions.html, turns into string
const sourceFileAlgorithm = String(
   fs.readFileSync("./html-pages/algorithm-functions.html")
);

const componentsBasic = getComponents(sourceFileBasic); // gets components in between each start and end comment from html file. see regex.js for getComponents
const componentsIntermediate = getComponents(sourceFileIntermediate);
const componentsFunctional = getComponents(sourceFileFunctional);
const componentsAlgorithm = getComponents(sourceFileAlgorithm);

const componentObjsBasic = componentsBasic // array
   .reverse() // reverse the array of objects to put the first created at the front
   .map((component, orderIndex) => {
      // map through array of objects, takes an argument that targets each individual key (component), and tracks the index of each object
      // console.log(getName(component));
      return {
         name: getName(component)[0], // run getName function which returns an array of things, then grabbing the first thing from array
         desc: trim(getDesc(component)[0]), // trim out white space, see regex.js
         inputs: getInputs(component).length, // counts number of inputs
         type: "basic", // scraping only the basic.html file
         typeNum: 100, // designated for basic type
         isFavorite: false, // default is false
         order: 100 + orderIndex, // take current index of object and add it to order
      };
   });
const componentObjsIntermediate = componentsIntermediate
   .reverse()
   .map((component, orderIndex) => {
      return {
         name: getName(component)[0],
         desc: trim(getDesc(component)[0]),
         inputs: getInputs(component).length,
         type: "intermediate",
         typeNum: 200,
         isFavorite: false,
         order: 200 + orderIndex,
      };
   });
const componentObjsFunctional = componentsFunctional
   .reverse()
   .map((component, orderIndex) => {
      return {
         name: getName(component)[0],
         desc: trim(getDesc(component)[0]),
         inputs: getInputs(component).length,
         type: "functional",
         typeNum: 300,
         isFavorite: false,
         order: 300 + orderIndex,
      };
   });
const componentObjsAlgorithm = componentsAlgorithm
   .reverse()
   .map((component, orderIndex) => {
      return {
         name: getName(component)[0],
         desc: trim(getDesc(component)[0]),
         inputs: getInputs(component).length,
         type: "algorithm",
         typeNum: 400,
         isFavorite: false,
         order: 400 + orderIndex,
      };
   });

// created new variable which concatenates each object into a single array
let orderedObjs = componentObjsBasic.concat(
   componentObjsIntermediate,
   componentObjsFunctional,
   componentObjsAlgorithm
);

const targetFile = "./dist/dist.json";

// write orderedObjs to dist.json as a string
fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
