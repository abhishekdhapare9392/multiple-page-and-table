let aboutBtn = document.getElementById('clickAbout')
let backBtn = document.getElementById('clickBack')

let about = document.getElementById('about')
let home = document.getElementById('home')

let users = [
  {
    id: '1',
    name: 'Payal Pal',
    email: 'payal@gmail.com',
    phone: 919362528366,
  },
  {
    id: '2',
    name: 'Abhishek Shirke',
    email: 'abhishek@gmail.com',
    phone: 919963529872,
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@gmail.com',
    phone: 919898653214,
  },
]

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users))
}

document.addEventListener('DOMContentLoaded', function () {
  let userss = JSON.parse(localStorage.getItem('users'))
  userss.forEach((user) => {
    render(user.id, user.name, user.email, user.phone)
  })
})

aboutBtn.addEventListener('click', function () {
  about.classList.add('show')
  about.classList.remove('hide')
  home.classList.add('hide')
  home.classList.remove('show')
})

backBtn.addEventListener('click', function () {
  about.classList.add('hide')
  about.classList.remove('show')
  home.classList.add('show')
  home.classList.remove('hide')
})

let submitBtn = document.getElementById('submit-data')
let fullname = document.getElementById('name')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let tBody = document.getElementsByTagName('tbody')[0]
submitBtn.addEventListener('click', function (e) {
  e.preventDefault()

  let nameValue = fullname.value
  let emailValue = email.value
  let phoneValue = phone.value

  if (nameValue && emailValue && phoneValue) {
    let user = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    }
    user.id = userss.length + 1
    render(user.id, nameValue, emailValue, phoneValue)
    let userss = JSON.parse(localStorage.getItem('users'))
    // console.log(user)
    userss.push(user)
    localStorage.setItem('users', JSON.stringify(userss))
    fullname.value = ''
    email.value = ''
    phone.value = ''
    showAlert('alert alert-success', 'Data submitted successfully!')
  } else {
    showAlert('alert alert-danger', 'Please fill in all fields')
  }
})

function showAlert(className, message) {
  let alert = document.createElement('div')
  alert.className = className
  alert.innerHTML = message
  document.getElementById('alerts').appendChild(alert)
  setTimeout(() => {
    let alerts = document.querySelectorAll('.alert')
    alerts.forEach((alert) => {
      alert.remove()
    })
  }, 3000)
}

function render(id, nameValue, emailValue, phoneValue) {
  let tr = document.createElement('tr')
  tr.innerHTML = `<td>${nameValue}</td>
      <td>${emailValue}</td>
      <td>${phoneValue}</td>
      <td><i data-id="${id}" class="fas fa-trash" id="deleteUser"></i></td>`
  tBody.appendChild(tr)
}

document.addEventListener('click', function (e) {
  if (e.target.id == 'deleteUser') {
    let users = JSON.parse(localStorage.getItem('users'))
    dataId = e.target.getAttribute('data-id')
    users.forEach((user, index) => {
      if (user.id == dataId) {
        console.log(dataId)
        users.splice(index, 1)
      }
    })
    localStorage.setItem('users', JSON.stringify(users))
    let userss = JSON.parse(localStorage.getItem('users'))
    location.reload()
  }
})
