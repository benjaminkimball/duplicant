#!/usr/bin/env node

const chalk = require('chalk')
const { copySync, existsSync, readdirSync } = require('fs-extra')
const { resolve } = require('path')

const pkg = require('../package.json')

const command = process.argv[2]

if (new Set(['--version', '-v']).has(command)) {
  console.log(`duplicant v${pkg.version}`)
  process.exit()
}

if (new Set(['--help', '-h']).has(command)) {
  console.log(`
    Usage
      $ dup <directory>
  `)
  process.exit()
}

try {
  const directory = resolve(process.argv[2])
  const templateDirectory = resolve(__dirname, '../template')

  console.log('Checking directory...')
  if (existsSync(directory)) {
    console.log('Checking for existing files...')

    if (readdirSync(directory).length) {
      console.error(chalk.red('Find a new or empty directory, scrub!'))
      process.exit(1)
    } else {
      console.log(chalk.green('Copying template files...'))

      copySync(templateDirectory, directory)

      console.log(chalk.green('Time to get shit done!!'))

      process.exit()
    }
  } else {
    console.log(chalk.green('Creating directory and copying template files...'))

    copySync(templateDirectory, directory)

    console.log(chalk.green('Time to get shit done!!'))

    process.exit()
  }
} catch (err) {
  console.log(err)
  console.error(chalk.red('Please supply a directory to get started!'))
  process.exit(1)
}
