#!/usr/bin/env node

const chalk = require('chalk')
const spawn = require('cross-spawn')
const { copySync, existsSync, moveSync, readdirSync } = require('fs-extra')
const { resolve } = require('path')

const pkg = require('../package.json')

const command = process.argv[2]

if (['--version', '-v'].includes(command)) {
  console.log(`duplicant v${pkg.version}`)
  process.exit()
}

if (['--help', '-h'].includes(command)) {
  console.log(`
    Usage
      $ duplicant <directory>
  `)
  process.exit()
}

const dependencies = [
  'express',
  'helmet',
  'morgan',
  'react',
  'react-dom',
  'react-router-dom',
  'serialize-javascript',
  'styled-components'
]

const devDependencies = [
  'babel-eslint',
  'babel-loader',
  'babel-plugin-styled-components',
  'babel-plugin-syntax-dynamic-import',
  'babel-plugin-transform-class-properties',
  'babel-plugin-transform-object-rest-spread',
  'babel-preset-env',
  'babel-preset-react',
  'dotenv',
  'enzyme',
  'enzyme-adapter-react-16',
  'eslint',
  'eslint-config-standard',
  'eslint-config-standard-jsx',
  'eslint-plugin-import',
  'eslint-plugin-jest',
  'eslint-plugin-node',
  'eslint-plugin-promise',
  'eslint-plugin-react',
  'eslint-plugin-security',
  'eslint-plugin-standard',
  'jest',
  'npm-run-all',
  'react-hot-loader',
  'start-server-webpack-plugin',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
  'webpack-node-externals'
]

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

      spawn.sync('npm', ['init'], { cwd: directory, stdio: 'inherit' })
      spawn.sync('npm', ['install', ...dependencies], { cwd: directory, stdio: 'inherit' })
      spawn.sync('npm', ['install', ...devDependencies], { cwd: directory, stdio: 'inherit' })

      copySync(resolve(directory, '.env.example'), resolve(directory, '.env'))
      moveSync(resolve(directory, 'gitignore'), resolve(directory, '.gitignore'))

      console.log(chalk.green('Time to get shit done!!'))

      process.exit()
    }
  } else {
    console.log(chalk.green('Creating directory and copying template files...'))

    copySync(templateDirectory, directory)

    spawn.sync('npm', ['init'], { cwd: directory, stdio: 'inherit' })
    spawn.sync('npm', ['install', ...dependencies], { cwd: directory, stdio: 'inherit' })
    spawn.sync('npm', ['install', '--save-dev', ...devDependencies], { cwd: directory, stdio: 'inherit' })

    copySync(resolve(directory, '.env.example'), resolve(directory, '.env'))
    moveSync(resolve(directory, 'gitignore'), resolve(directory, '.gitignore'))

    console.log(chalk.green('Time to get shit done!!'))

    process.exit()
  }
} catch (err) {
  console.error(chalk.red('Please supply a directory to get started!'))
  process.exit(1)
}
