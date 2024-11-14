function handleRegister (event) {
  event.preventDefault()

  const fullname = document.getElementById('fullnameId')
  const email = document.getElementById('emailId')
  const password = document.getElementById('passwordId')
  const confirmPassword = document.getElementById('confirmPasswordId')
  const successEle = document.getElementById('successId')
  const isMatchPassword = checkingConfirmPassword(
    password.value,
    confirmPassword.value
  )

  if (isMatchPassword) {
    handleLoading(true)
    const payload = {
      fullname: fullname.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }

    setTimeout(() => {
      successEle.classList.add('show')
      handleLoading(false)
      handleClearForm()
    }, 3000)
  }
}

function checkingConfirmPassword (password, confirmPassword) {
  if (password !== confirmPassword) {
    alert('Password dan konfirmasi password harus sama.')
  } else {
    return true
  }
}

function handleLoading (status) {
  const elements = [
    'fullnameId',
    'emailId',
    'passwordId',
    'confirmPasswordId',
    'buttonSubmitId',
    'buttonTextId',
    'buttonLoadingId'
  ]

  elements.forEach(id => {
    const element = document.getElementById(id)
    if (status) {
      if (id === 'buttonLoadingId') {
        element.classList.add('show')
      } else {
        element.classList.add('disable')
      }
    } else {
      if (id === 'buttonLoadingId') {
        element.classList.remove('show')
      } else {
        element.classList.remove('disable')
      }
    }
  })
}

function handleClearForm () {
  const elements = ['fullnameId', 'emailId', 'passwordId', 'confirmPasswordId']

  elements.forEach(id => {
    const element = document.getElementById(id)
    element.value = ''
  })
}
