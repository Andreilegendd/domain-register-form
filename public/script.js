function domainPrice(name) {
    const domnames = { ".ee": 25, ".com": 45, ".live": 30, ".tech": 60 }

    for (let key in domnames) {
        if (key == name) {
            return domnames[key];
        }
    }
}

function getData() {

    var url = "http://localhost:3000/";
    fetch(url, {
        method: 'POST',
        body: localStorage.getItem('domain-form'),
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log(localStorage.getItem('domain-form'))

}