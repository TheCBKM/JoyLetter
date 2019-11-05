start = 0
version="1"
function check() {
    if (getStorage("user")) {
        axios.post(`${url}sankalp/getsankalp`, {
            group: getStorage("user").group
        })
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    setStorage("sankalp", res.data.event)

                }
            })
        setTimeout(() => {
            document.getElementById("close-sidebar").click()

        }, 500)
    }
    else
        window.location.href = "index.html"

}

function calculate() {
    document.getElementById('totalcount').value = document.getElementById('mala').value * 100
}

function sendJap() {
    if (document.getElementById('mala').value)
        // axios.post(`${url}user/canjap`, { user: getStorage('user')._id }).then(res => {
        //     console.log(res.data)
        // if (res.data.event) {
        axios.post(`${url}user/jap`, {
            user: getStorage('user')._id,
            sankalp: getStorage('sankalp')._id,
            count: document.getElementById('mala').value,
            happy: start,
            pages: document.getElementById('page').value,
        })
            .then(res1 => {
                console.log(res1.data)
                if (res1.data.success)
                    document.getElementById("main").innerHTML = `<h2>Successfully Recorded </h2>
                        <h3>Take nam & please Visit tomorrow </h3>`
            })
    //     }
    //     else {
    //         document.getElementById("main").innerHTML = `<h2>Opps !!</h2>
    //        <h3>You have Reached todays limit please enter tomrrow </h3>`
    //     }

    // })
    // }
}

function getGrLea() {
    axios.post(`${url}user/lead`, {
        sankalp: getStorage('sankalp')._id
    })
        .then(res => {

            if (res.data.success) {
                newarr = res.data.event
                newarr.sort(function (a, b) {
                    return b.cumulative - a.cumulative;
                });
                document.getElementById("grlist").innerHTML = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Name
                <span class="badge badge-primary badge-pill">Mala</span>            <span class="badge badge-secondary badge-pill">Pages</span>
                <span class="badge badge-success badge-pill">Happy</span>

            </li>
        `
                newarr.map(d => {
                    document.getElementById("grlist").innerHTML +=
                        ` <li class="list-group-item d-flex justify-content-between align-items-center">
                ${d.user.name}
                <span class="badge badge-primary badge-pill">${d.cumulative ? d.cumulative : 0}</span>
                <span class="badge badge-secondary badge-pill">${d.pages ? d.pages : 0}</span>
                <span class="badge badge-success badge-pill">${d.happy ? d.happy : 0}</span>
            </li>
                `})
                console.log(newarr)

            }
        })
}

function getGroLea() {

    axios.post(`${url}group/lead`, {})
        .then(res => {
            console.log(res)
            if (res.data.success) {
                newarr = res.data.list
                tor = res.data.tor
                data = []
                for (i = 0; i < newarr.length; i++) {

                    mydata = newarr[i]
                    console.log(mydata)
                    mydata.total = tor[i]
                    console.log(mydata)
                    data[i] = mydata
                }
                data.sort(function (a, b) {
                    return b.total - a.total;
                });
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
                    <span class="badge badge-primary badge-pill">${d.total ? d.total : 0}</span>
                 
                </li>
                    `})
                console.log(data)

            }
        })
}

function getProgress() {
    axios.post(`${url}user/progress`, {
        user: getStorage('user')._id,
        group: getStorage('user').group
    })
        .then(res => {
            console.log(res)
            if (res.data.success) {
                total = 0
                newarr = res.data.event
                document.getElementById("grlist").innerHTML = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Name
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
             
          </li>`
                console.log(newarr)

            }
        })
}
function myjap(d) {
    if (d == 1) {
        document.getElementById('jap').innerHTML = `${getStorage("myjap") ? getStorage("myjap")%108 : 0}<br>Mala=${getStorage("myjap") ? `${Math.trunc(getStorage("myjap") / 108)}` : 0
            } `
    }
    else {
        jap = getStorage("myjap") ? getStorage("myjap") + 1 : 1
        setStorage('myjap', jap)
        document.getElementById("main").style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16)
        document.getElementById('jap').innerHTML = `${jap % 108} <br>Mala=${Math.trunc(jap / 108)}`
        if (getStorage("myjap") % 4 == 0) {
            document.getElementById("displayjap").innerHTML = ""
        }

        document.getElementById("displayjap").innerHTML += "!! श्रीराम जय राम जय जय राम !!<br>"
    }
}

function setStar(s){
    start=s
}
function addMala() {
    setStorage('finalJap', getStorage('myjap'))
    setStorage('myjap', -1)
    window.location.href = "dashboard.html"

}

function logout() {
    localStorage.clear();
    window.location.href = "index.html"
}


function switchLang(){
    setStorage("lang",getStorage("lang")==0?1:0)
    window.location.reload()
}
check()
