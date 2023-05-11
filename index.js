const inquirer = require('inquirer')
const fs = require('fs')

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter up to 3 characters.',
      name: 'text',
      validate: function(char)
      {
        if(char.length <= 3) {
          return true
        }
      }
    },
    {
      type: 'input',
      message: 'Enter a 6 digit hexadecimal code for the text color.',
      name: 'textColor',
      validate: function(charColor)
      {
        if(charColor.length === 6) {
          return (/^[0-9]+$/).test(charColor);
        }
      }
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Pick a shape for the logo.',
      choices: ["circle","triangle","square"]
    },
    {
      type: 'input',
      message: 'Enter a 6 digit hexadecimal code for the shape color.',
      name: 'shapeColor',
      validate: function(shpColor)
      {
        if(shpColor.length === 6) {
          return (/^[0-9]+$/).test(shpColor);
        }
      }
    },
  ])