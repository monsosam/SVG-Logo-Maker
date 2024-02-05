import fs from 'fs';
import { Triangle, Square, Circle } from './lib/shapes.js';

function writeToFile(fileName, answers) {

    let svgStr = "";

    svgStr = '<svg version="1.5" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgStr += "<g>";

    let shapeChoice;
    if (answers.shape === "Triangle") {
      shapeChoice = new Triangle();
    } else if (answers.shape === "Square") {
      shapeChoice = new Square();
    } else if (answers.shape === "Circle") {
      shapeChoice = new Circle();
    } 

    shapeChoice.setColor(answers.shapeBackgroundColor);
    svgStr += shapeChoice.render();

    svgStr += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgStr += "</g>";
    svgStr += "</svg>";
  
    fs.writeFile(fileName, svgStr, (err) => {
      err ? console.log(err) : console.log("Generated logo.svg");
    });
}

async function promptUser() {
  const inquirerModule = await import('inquirer');
  const inquirer = inquirerModule.default;

  inquirer.prompt([
    {
      type: "input",
      message: "What text would you like your logo to display? (Enter up to three characters)",
      name: "text",
      
    },

    {
      type: "input",
      message:
        "Choose text color (Enter color keyword OR a hexadecimal number)",
      name: "textColor",
    },

    {
      type: "list",
      message: "What shape would you like the logo to render?",
      choices: ["Triangle", "Square", "Circle"],
      name: "shape",
    },

    {
      type: "input",
      message:
        "Choose shapes color (Enter color keyword OR a hexadecimal number)",
      name: "shapeBackgroundColor",
    },
  ]).then((answers) => {

    if (answers.text.length > 3) {
      console.log("Must enter a value of no more than 3 characters");
      promptUser();
    } else {

      writeToFile("logo.svg", answers);
    }
});

}

promptUser();