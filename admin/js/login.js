function login() {

    phone = document.getElementById('phone').value
    pass = document.getElementById('password').value
    if (phone.length == 10 && Number(phone)) {
        axios.post(`${url}admin/login`, { phone, pass }).then(res => {
            console.log(res)
            setStorage("admin", res.data.user)
            window.location.href = "dashboard.html"
        })
    }
    else {
        alert("invalid number")
    }
}
function check() {
    if (getStorage("admin")) {
        window.location.href = "dashboard.html"

    }
}
check()