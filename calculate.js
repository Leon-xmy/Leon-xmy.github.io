const calculateHelp = s => {
  let result = 0
  const plusArray = s.split('+')
  plusArray.forEach(ele => {
    if (Number(ele) || ele === '0') {
      result += Number(ele)
    } else {
      const subtractArray = ele.split('-')
      subtractArray.forEach((item, index) => {
        if (index === 0) {
          result += Number(item)
        } else {
          result -= Number(item)
        }
      })
    }
  })
  return result
}
const dealWithBracket = s => {
  let left = -1
  let right = s.length
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') left = i
    if (s[i] === ')') {
      right = i
      break
    }
  }
  if (left === -1) {
    return calculateHelp(s)
  }
  let res = calculateHelp(s.slice(left + 1, right))
  let leftPart = ''
  let rightPart = ''
  if (left !== 0) {
    const r = s.slice(left - 1, left)
    leftPart += s.slice(0, left - 1) + (res > 0 ? r : r === '+' ? '-' : '+')
    res = Math.abs(res)
  }
  if (left !== s.length - 1) {
    rightPart = s.slice(right + 1)
  }
  s = leftPart + res + rightPart

  return dealWithBracket(s)
}
const calculate = s => {
  s = s.split(' ').join('')
  return dealWithBracket(s)
}

const s = '(5-(1+(5)))'
// const s = '2-(5-6)'
console.log(calculate(s), '=====')
