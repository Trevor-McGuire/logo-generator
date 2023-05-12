const inquirer = require('inquirer')
const fs = require('fs')

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter up to 3 characters.',
      name: 'textI',
      validate: function(input)
      {
        if(input.length <= 3) {
          return true
        }
      }
    },
    {
      type: 'input',
      message: 'Enter a 6 digit hexadecimal code for the text color.',
      name: 'textColorI',
      validate: function(input)
      {
        if(input.charAt(0) != "#") {
          input = "#" + input
        }
        return (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(input);
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
      validate: function(input)
      {
        if(input.charAt(0) != "#") {
          input = "#" + input
        }
        return (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(input);
      }
    },
  ])
  .then( function(response) {
    let logoShape = ""
    if(response.textColorI.charAt(0) != "#") {
      response.textColorI = "#" + response.textColorI
    }
    if(response.shapeColorI.charAt(0) != "#") {
      response.shapeColorI = "#" + response.shapeColorI
    }
    switch(response.shapeI) {
      case "circle":
        logoShape = `<circle cx="150" cy="100" r="100" stroke-width="0" fill="${response.shapeColorI}" />`
        break;
      case "square":
        logoShape = `<rect width="200" x="50" height="200" style="fill:${response.shapeColorI};stroke-width:0;" />`
        break;
      case "triangle":
        logoShape = `<polygon points="150,0 50,200 250,200" style="fill:${response.shapeColorI};stroke-width:0" />`
    }
    const text = `<text x="50%" y="150" font-size="90px" dominant-baseline="middle" text-anchor="middle">${response.textI}</text>`
    const logo = `<svg width="300" height="200">${logoShape}${text}</svg>`
    fs.writeFile('logo.svg', logo, (err) =>
      err ? console.error(err) : console.log('Generated logo.svg')
    )
  })
