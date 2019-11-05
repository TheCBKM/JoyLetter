function login() {
 
    phone = document.getElementById('phone').value

    // if (phone.length == 10 && Number(phone)) {
    axios.post(`${url}user/login`, { phone }).then(res => {
        console.log(res)
        setStorage("user", res.data.user)
        setStorage("sankalp", res.data.sankalp)
        window.location.href = "dashboard.html"
    })
    // }
    // else {
    //     alert("invalid number")
    // }
}
function check() {
    if (getStorage("user") && getStorage("sankalp")) {
        window.location.href = "dashboard.html"

    }
}
check()