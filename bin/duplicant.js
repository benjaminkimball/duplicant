#!/usr/bin/env node

const chalk = require('chalk')
const spawn = require('cross-spawn')
const { copySync, existsSync, readdirSync } = require('fs-extra')
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
      $ dup <directory>
  `)
  process.exit()
}

const dependencies = [
  'koa',
  'koa-helmet',
  'koa-router',
  'react',
  'react-dom',
  'react-router-dom',
  'styled-components'
]

const devDependencies = [
  'ava',
  'babel-eslint',
  'babel-loader',
  'babel-plugin-styled-components',
  'babel-plugin-syntax-dynamic-import',
  'babel-plugin-transform-class-properties',
  'babel-plugin-transform-object-rest-spread',
  'babel-polyfill',
  'babel-preset-env',
  'babel-preset-react',
  'babel-register',
  'dotenv',
  'eslint',
  'eslint-config-standard',
  'eslint-config-standard-jsx',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-promise',
  'eslint-plugin-react',
  'eslint-plugin-standard',
  'npm-run-all',
  'react-hot-loader',
  'start-server-webpack-plugin',
  'stylelint',
  'stylelint-config-standard',
  'stylelint-config-styled-components',
  'stylelint-processor-styled-components',
  'webpack',
  'webpack-dev-server',
  'webpack-manifest-plugin',
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

      copySync(resolve(templateDirectory, '.env.example'), resolve(directory, '.env'))

      console.log(chalk.green('Time to get shit done!!'))

      process.exit()
    }
  } else {
    console.log(chalk.green('Creating directory and copying template files...'))

    copySync(templateDirectory, directory)

    spawn.sync('npm', ['init'], { cwd: directory, stdio: 'inherit' })
    spawn.sync('npm', ['install', ...dependencies], { cwd: directory, stdio: 'inherit' })
    spawn.sync('npm', ['install', '--save-dev', ...devDependencies], { cwd: directory, stdio: 'inherit' })

    copySync(resolve(templateDirectory, '.env.example'), resolve(directory, '.env'))

    console.log(chalk.green('Time to get shit done!!'))

    process.exit()
  }
} catch (err) {
  console.error(chalk.red('Please supply a directory to get started!'))
  process.exit(1)
}
