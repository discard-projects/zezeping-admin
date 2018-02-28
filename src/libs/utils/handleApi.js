export default function (path, obj) {
  const PATH_REGEXP = new RegExp(['(\\\\.)', '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g')
  let handlePath = path.replace(PATH_REGEXP, function (key) {
    let match = key.match(/\w+/)
    if (match) {
      return `/${obj[match[0]]}`
    }
    return key
  })
  return handlePath
}
