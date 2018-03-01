export default function (path, obj) {
  const PATH_REGEXP = new RegExp(['(\\\\.)', '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g')
  console.log(path, 33)
  let handlePath = path.replace(PATH_REGEXP, function (key) {
    let match = key.match(/\w+/)
    if (match) {
      return `/${obj[match[0]]}`
    }
    return key
  })
  return handlePath
}
