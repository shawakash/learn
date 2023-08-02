const base_url = "http://localhost:3000";

const body = {
    title: "Do write the fetch code",
    description: "write the fetch code in js to the todo server written by you :)",
    completed: "false"
}

const obj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
}

fetch(base_url, obj)
.then(response => response.json())
.then(data => console.log(data))
.catch(err => console.error(err));