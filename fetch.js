const logBody = (jsonBody) => {
    console.log(jsonBody);
}

const callback = (response) => {
    // To receive text/plain data from the server 
    // first change the res header content type and 
    // then in response in case of response.json call 
    // response.text() which also retruns a promise
    // response.text().then(logBody)
    response.json().then(logBody);
}

const body = {
    counter: 10
}

const requestObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },      
    body: JSON.stringify(body)
}

fetch("http://localhost:3000/getSum", requestObj).then(callback);