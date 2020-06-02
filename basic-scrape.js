const fs = require("fs"); // require file system from node
const { getComponents, getName, getDesc, trim, getInputs } = require("./regex"); // require functions from regex.js

const sourceFileBasic = String(
   fs.readFileSync("./html-pages/basic-functions.html")
); // define sourceFile, reads the basic-functions.html and turns it into a string
const sourceFileIntermediate = String(
   fs.readFileSync("./html-pages/intermediate-functions.html")
);
const sourceFileFunctional = String(
   fs.readFileSync("./html-pages/functional-library.html")
);
const sourceFileAlgorithm = String(
   fs.readFileSync("./html-pages/algorithm-functions.html")
);

const componentsBasic = getComponents(sourceFileBasic); // gets components in between each start and end comment. see regex.js
const componentsIntermediate = getComponents(sourceFileIntermediate);
const componentsFunctional = getComponents(sourceFileFunctional);
const componentsAlgorithm = getComponents(sourceFileAlgorithm);

const componentObjsBasic = componentsBasic
   .reverse()
   .map((component, orderIndex) => {
      // map through components, takes a function that targets each individual key (component)
      return {
         name: getName(component)[0], // run getName function which returns an array of things, then grabbing the first thing from array
         desc: trim(getDesc(component)[0]), // trim out white space, see regex.js
         inputs: getInputs(component).length, // counts number of inputs
         type: "basic", // scraping only the basic.html file
         typeNum: 100, // designated for basic type
         isFavorite: false, // default is false
         order: 100 + orderIndex,
      };
   });
const componentObjsIntermediate = componentsIntermediate
   .reverse()
   .map((component, orderIndex) => {
      // map through components, takes a function that targets each individual key (component)
      return {
         name: getName(component)[0], // run getName function which returns an array of things, then grabbing the first thing from array
         desc: trim(getDesc(component)[0]), // trim out white space, see regex.js
         inputs: getInputs(component).length, // counts number of inputs
         type: "intermediate", // scraping only the basic.html file
         typeNum: 200, // designated for basic type
         isFavorite: false, // default is false
         order: 200 + orderIndex,
      };
   });
const componentObjsFunctional = componentsFunctional
   .reverse()
   .map((component, orderIndex) => {
      return {
         name: getName(component)[0], // getName takes the parameter of component and creates an array of data, the 0 index allows us to only return the name and nothing else
         desc: trim(getDesc(component)[0]),
         inputs: getInputs(component).length, // returns length or number of inputs for a function
         type: "functional", // all scraping basic.html
         typeNum: 300, // basic type
         isFavorite: false, // default
         order: 300 + orderIndex,
      };
   });
const componentObjsAlgorithm = componentsAlgorithm
   .reverse()
   .map((component, orderIndex) => {
      // map through components, takes a function that targets each individual key (component)
      return {
         name: getName(component)[0], // run getName function which returns an array of things, then grabbing the first thing from array
         desc: trim(getDesc(component)[0]), // trim out white space, see regex.js
         inputs: getInputs(component).length, // counts number of inputs
         type: "algorithm", // scraping only the basic.html file
         typeNum: 400, // designated for basic type
         isFavorite: false, // default is false
         order: 400 + orderIndex,
      };
   });

let orderedObjs = componentObjsBasic.concat(
   componentObjsIntermediate,
   componentObjsFunctional,
   componentObjsAlgorithm
);

const targetFile = "./dist/dist.json";
console.log(orderedObjs);

fs.writeFileSync(targetFile, JSON.stringify(orderedObjs));
