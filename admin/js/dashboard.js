
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
            if (res.data.success) {
                document.getElementById("main").innerHTML = `<h2>User Added <h2>
                <h3>Sucessfully </h3>`
            }
            else {
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


function getMembers() {

    axios.post(`${url}admin/members`, { group: getStorage('admin').group })
        .then(res => {
            console.log(res)
            if (res.data.success) {
                data = res.data.event
                document.getElementById("grlist").innerHTML = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Name
                <span class="badge badge-primary badge-pill">Mala</span>
            </li>`
                data.map(d => {
                    document.getElementById("grlist").innerHTML +=
                        ` 
                    
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${d.name}
                   <button onclick="getProgress('${d._id}','${d.group}','${d.name}')">View Progress</button>
                 
                </li>
                    `})
                console.log(data)

            }
        })
}


function getProgress(user, group, name) {

    axios.post(`${url}user/progress`, {
        user, group
    })
        .then(res => {
            console.log(res)
            if (res.data.success) {
                total = 0
                newarr = res.data.event
                document.getElementById("grlist").innerHTML = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                ${name}
                <span class="badge badge-primary badge-pill">Mala</span>         
            </li>
        `
                newarr.map(d => {
                    total += d.cumulative ? d.cumulative : 0
                    document.getElementById("grlist").innerHTML +=
                        ` <li class="list-group-item d-flex justify-content-between align-items-center">
                ${d.sankalp.name}
                <span class="badge badge-primary badge-pill">${d.cumulative ? d.cumulative : 0}</span>
               
            </li>
                `

                })
                document.getElementById("grlist").innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
            TOTAL
              <span class="badge badge-primary badge-pill">${total}</span>
             
          </li>
          <button onclick="getMembers()">View Members</button>
          `
                console.log(newarr)

            }
        })
}


function logout() {
    localStorage.clear();
    window.location.href = "index.html"
}
check()

