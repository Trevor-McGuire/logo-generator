const inquirer = require('inquirer')
const fs = require('fs')

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter up to 3 characters.',
      name: 'textI',
      validate: function(textI)
      {
        if(textI.length <= 3) {
          return true
        }
      }
    },
    {
      type: 'input',
      message: 'Enter a 6 digit hexadecimal code for the text color.',
      name: 'textColorI',
      validate: function(textColorI)
      {
        if(textColorI.charAt(0) != "#") {
          textColorI = "#" + textColorI
        }
        return (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(textColorI);
      }
    },
    {
      type: 'list',
      name: 'shapeI',
      message: 'Pick a shape for the logo.',
      choices: ["circle","triangle","square"]
    },
    {
      type: 'input',
      message: 'Enter a 6 digit hexadecimal code for the shape color.',
      name: 'shapeColorI',
      validate: function(shapeColorI)
      {
        if(shapeColorI.length === 6) {
          return (/^[0-9]+$/).test(shapeColorI);
        }
      }
    },
  ])
  .then( function(response) {
    const {textI,textColorI,shapeI,shapeColorI} = response
    let logoShape = ""
    switch(shapeI) {
      case "circle":
        logoShape = `<circle cx="50" cy="50" r="40" stroke-width="0" fill="yellow" />`
        break;
      case "square":
        logoShape = `<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />`
        break;
      case "triangle":
        logoShape = `<polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />`
    }
    const logo = `<svg width="100" height="100">${logoShape}</svg>`
    fs.writeFile('logo.svg', logo, (err) =>
      err ? console.error(err) : console.log('Generated logo.svg')
    )
  })
