function handleFindFormulaNumber (event) {
  event.preventDefault()

  const inputArrayElement = document.getElementById('inputArrayId').value
  const inputTargetElement = document.getElementById('inputTargetId').value
  const resultElement = document.getElementById('resultId')

  let responseMessage = ''
  let dataArray = []
  let dataTarget = 0
  const operatorLists = ['+', '-', '*']

  try {
    dataArray = JSON.parse(inputArrayElement)
    dataTarget = Number(inputTargetElement)
  } catch (e) {
    responseMessage =
      'TIDAK VALID! \n Masukkan inputan dengan format seperti pada contoh yang ada'
  }

  if (dataArray.length) {
    const permutations = permute(dataArray)

    for (let permutation of permutations) {
      const result = backtrack(
        0,
        permutation,
        dataTarget,
        '',
        operatorLists,
        true
      )
      if (result) {
        const resultStr = result.replace(/^\((.*)\)$/, '$1')
        return (resultElement.innerText = `Formula angka adalah ${resultStr}`)
      }
    }
    return (resultElement.innerText = `Tidak ada solusi`)
  } else {
    resultElement.innerText = responseMessage
  }
}

function evaluateExpression (expression) {
  return new Function('return ' + expression)()
}

function backtrack (index, dataArray, target, expression, operators, isOuter) {
  let newExpression = ''

  if (index === dataArray.length) {
    if (evaluateExpression(expression) === target) {
      return expression
    }
    return null
  }

  for (let operator of operators) {
    if (index === 0) {
      newExpression = `${dataArray[index]}`
    } else {
      if (isOuter) {
        newExpression = `${expression} ${operator} ${dataArray[index]}`
      } else {
        newExpression = `(${expression} ${operator} ${dataArray[index]})`
      }
    }

    const result = backtrack(
      index + 1,
      dataArray,
      target,
      newExpression,
      operators,
      false
    )
    if (result) {
      return result
    }
  }

  return null
}

function permute (dataArray) {
  if (dataArray.length === 0) return [[]]
  const result = []
  for (let i = 0; i < dataArray.length; i++) {
    const rest = permute([...dataArray.slice(0, i), ...dataArray.slice(i + 1)])
    for (let subPerm of rest) {
      result.push([dataArray[i], ...subPerm])
    }
  }
  return result
}
