module.exports = {
   getComponents(file) {
      return file.match(
         /(?<=\<\!--\sstart\scolumn\s--\>).+?(?=<!--\send\scolumn\s-->)/gs
      );
   },
   getName(component) {
      return component.match(/(?<=<b>).+(?=<\/b>)/); // get everything between <b> tags
   },
   getDesc(component) {
      return component.match(/(?<=<\/b>\s-\s).+(?=<\/p>)/s); // get everything in the <p> tags, after the <b> tags
   },
   getInputs(component) {
      return component.match(/<input.+?\/\>/gs); // return an array of all inputs
   },
   trim(str) {
      return str
         .replace(/(\\r)|(\\n)/g, " ") // replace carriage returns and new lines with a space
         .replace(/\s{2,}/g, " ") // replace 2 or more spaces with 1 space
         .replace(/^\s|\s$/g, ""); // remove spaces from beginning and end
   },
};
