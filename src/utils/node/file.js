const fs = require('fs')
const path = require('path')
/**
 * normalizePath  任意系统格式路径转换为当前系统路径
 * @param {String|Array} path 
 * @returns 
 */
const normalizePath = (filePath) => {
  const splits = ['/', '\\']
  const resPathArr = Array.isArray(filePath) ? [...filePath] : []
  if (typeof filePath === 'string') {
    for (const sp of splits) {
      if (filePath.includes(sp)) {
        resPathArr = filePath.split(sp)
        break
      }
    }
  }
  return path.posix.join(resPathArr)
}

const getExtname = (filePath) => {
  return path.extname(filePath)
}

const parseString = (input) => {
  if (typeof input === 'string') { return input }
  if (Array.isArray(input)) {
    return (JSON.stringify({ __container__: input }))
      .replace(/\{(.*)\}/u, '$1')
      .replace(/"__container__":/u, '')
  }
  if (typeof input === 'object') { return JSON.stringify(input) }
}

const parseJSON = (input) => {
  if (typeof input === 'string') { return JSON.parse(input) }
  if (input instanceof Array) { return input }
  if (input instanceof Uint8Array) { return JSON.parse(input.toString()) }
  if (typeof input === 'object') { return input }
}

const createFile = ({ outputPath, content }) => {
  fse.outputFileSync(`${outputPath}`, parseString(content))
}

const readFile = (filePath) => {
  const content = fs.readFileSync(normalizePath(filePath), { encoding: 'utf8' })
  const ext = getExtname(filePath)
  if (ext === '.json') {
    return parseJSON(content)
  } else {
    return content
  }
}

const createFilesMap = ({ dir, ext, filesMap }) => {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      createFilesMap({ dir: path.join(dir, file.name), ext, filesMap })
    } else {
      if (getExtname(file.name) === ext) {
        filesMap.push(path.join(dir, file.name))
      }
    }
  }
}

const findSource = ({ dir, ext }) => {
  const filesMap = []
  createFilesMap({ dir, ext, filesMap })
  console.log(11111, filesMap)
}

