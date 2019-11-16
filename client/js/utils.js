// const url='https://joyletterapp.herokuapp.com/'
const url='https://joyletterappp.herokuapp.com/'

// const url='http://localhost:5000/'


const getStorage = (item) => (JSON.parse(localStorage.getItem(item)))

const setStorage = (item, data) => (localStorage.setItem(item, JSON.stringify(data)))

const removeStorage = (item) => (localStorage.removeItem(item))
