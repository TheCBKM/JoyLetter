
function check() {
    if (getStorage("admin")) {
        setTimeout(() => {
            document.getElementById("close-sidebar").click()

        }, 500)
    }
    else
        window.location.href = "index.html"

}

function calculate() {
    document.getElementById('totalcount').value = document.getElementById('mala').value * 108
}

function addUser() {
    if (document.getElementById('name').value && document.getElementById('phone').value)
        axios.post(`${url}user/save`, {
            phone: document.getElementById('phone').value,
            name: document.getElementById('name').value,
            group: getStorage('admin').group
        }).then(res => {
            console.log(res.data)
            if(res.data.success){
                document.getElementById("main").innerHTML = `<h2>User Added <h2>
                <h3>Sucessfully </h3>`
            }
            else{
                document.getElementById("main").innerHTML = `<h2>Opps!! <h2>
                <h3>Nuber Already Registered </h3>`
            }
          


        })
}

function getGrLea() {
    axios.post(`${url}user/lead`, {
        sankalp: getStorage('sankalp')._id
    })
        .then(res => {
            if (res.data.success) {
                document.getElementById("grlist").innerHTML = ""
                res.data.event.map(d => {
                    document.getElementById("grlist").innerHTML +=
                        ` <li class="list-group-item d-flex justify-content-between align-items-center">
                ${d.user.name}
                <span class="badge badge-primary badge-pill">${d.cumulative}</span>
            </li>
                `})
            }
        })
}

function myjap(d) {
    if (d == 1) {
        document.getElementById('jap').innerHTML = getStorage("myjap") ? getStorage("myjap") + 1 : 0
    }
    else {
        jap = getStorage("myjap") ? getStorage("myjap") + 1 : 1
        setStorage('myjap', jap)
        document.getElementById("main").style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16)
        document.getElementById('jap').innerHTML = jap

    }


}


function resetJap() {
    setStorage('myjap', 0)
    document.getElementById('jap').innerHTML = -1
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html"
}
check()

