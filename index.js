const inquirer = require('inquirer');
const fs = require('fs');
import { Triangle, Square, Circle } from "./lib/shapes.js";

const allowedColors = [
  "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond",
  "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue",
  "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki",
  "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue",
  "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick",
  "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow",
  "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon",
  "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon",
  "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen",
  "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue",
  "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
  "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod",
  "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue",
  "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen",
  "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue",
  "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
];

async function writeToFile(fileName, answers) {
  let svgStr = "";

  svgStr =
    '<svg version="1.5" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
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

  try {
    await fs.writeFile(fileName, svgStr);
    console.log("Generated logo.svg");
  } catch (err) {
    console.error(err);
  }
}

async function promptUser() {

  inquirer.prompt([
      {
        type: "input",
        message:
          "What text would you like your logo to display? (Enter up to three characters)",
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
        validate: function (input) {
          const color = input.toLowerCase(); //Convert user input to lowercase
          const isValidHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input);
          if (isValidHexColor || allowedColors.map(c => c.toLowerCase()).includes(color)) {
            return true; // Input is a valid color
          } else {
            return "Please enter a valid color (color name or hexadecimal value).";
          }
        }
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}

promptUser();
