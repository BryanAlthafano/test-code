function handleFindMissingNumber (event) {
  event.preventDefault()

  const inputArrayElement = document.getElementById('inputId').value
  const resultElement = document.getElementById('resultId')

  let responseMessage = ''
  let dataArray = []
  let resultData = []

  try {
    dataArray = JSON.parse(inputArrayElement)
  } catch (e) {
    responseMessage =
      'TIDAK VALID! \n Masukkan inputan dengan format seperti pada contoh yang ada'
  }

  if (dataArray.length) {
    dataArray = dataArray.sort((a, b) => a - b)

    const firstDigit = dataArray[0]
    const lastDigit = dataArray[dataArray.length - 1]

    for (let number = firstDigit; number <= lastDigit; number++) {
      resultData.push(number)
    }

    const missingNumberArray = resultData.filter(x => !dataArray.includes(x))
    const missingNumberStr = missingNumberArray.join(', ')

    resultElement.innerText = `Angka yang hilang adalah ${missingNumberStr}`
  } else {
    resultElement.innerText = responseMessage
  }
}
