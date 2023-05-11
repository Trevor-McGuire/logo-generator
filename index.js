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
  ])