const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3009;

const varNum = 50;
const check = true;

// const middleware = (req, res, next) => {
//     console.log("From middleware");
//     if(check) {
//         next();
//     } else {
//         res.send("Sending from middleware");
//     }
// }

app.use(bodyParser.json());   // to parse the body while reciving from the client and this is done is middleware for to ensure that it is readable for all



app.get("/", (req, res) => {
    res.status(200).sendFile(`${__dirname}/landingPage.html`, (err) => {
        if(err) {
            console.log(err);
        }
    })
});

const sum1ToN = (count) => {
    let sum = 0;
    let product = 1;
    for(let i=1; i<=count; i++) {
        sum += i;
        product *= i;
    }
    const body = {sum, product}
    return body;
}


app.post('/getSum', (req, res) => {
    console.log(req.headers)
    const {counter} = req.body;
    const response = sum1ToN(counter);
    // res.send(`Um from One to ${n}: ${sum}`);
    // const sum = sum1ToN(100);
    // const print = "the sum from 1 to 100 is " + sum;
    // res.send(`<h2>${print}</h2>`);
    // res.setHeader("Content-type", "text/plain");
    res.status(200).send(response);
});

const fibonaic = (n) => {
    let first = 0;
    let second = 1;
    let answer = [];
    answer.push(first);
    answer.push(second);
    for(let i=0; i<=n-3; i++) {
        let temp = first + second;
        first = second;
        second = temp;
        answer.push(second);
    }
    let returnString = "";
    for(let i of answer) {
        returnString += `<p>${i}</p>`;
    }
    return returnString;
}


app.get('/fib', (req, res) => {
    const {count} = req.query;
    const fibre = fibonaic(count);
    res.send(`${fibre}`);
});

app.get("/html", (req, res) => {
    res.sendFile(`${__dirname}/index.html`, (err) => {
        if(err) {
            console.log(err);
        }
    })
})

const greetList = {
    "english": "hello",
    "spanish": "hola",
    "french": "bonjour",
    "german": "hallo",
    "italian": "ciao",
    "portuguese": "olá",
    "dutch": "hallo",
    "russian": "привет (Privet)",
    "japanese": "こんにちは (Konnichiwa)",
    "chinese": "你好 (Nǐ hǎo)",
    "korean": "안녕하세요 (Annyeonghaseyo)",
    "hindi": "नमस्ते (Namaste)",
    "arabic": "مرحبًا (Marhaba)",
    "swedish": "hej",
    "greek": "γειά σας (Yia sas)",
    "turkish": "merhaba",
    "hebrew": "שָׁלוֹם (Shalom)",
    "vietnamese": "xin chào",
    "thai": "สวัสดี (Sawasdee)",
    "polish": "cześć",
    "indonesian": "halo",
    "swahili": "jambo",
    "russian": "здравствуйте (Zdravstvuyte)",
    "finnish": "hei",
    "hungarian": "helló",
    "danish": "hej",
    "norwegian": "hei",
    "czech": "ahoj",
    "greek": "γειά σας (Yia sas)",
    "bengali": "হ্যালো (Hyālō)",
    "persian": "سلام (Salaam)",
    "filipino": "kamusta",
    "romanian": "bună ziua",
    "serbian": "здраво (Zdravo)",
    "croatian": "zdravo",
    "ukrainian": "привіт (Pryvit)",
    "bulgarian": "здравейте (Zdraveyte)",
    "slovak": "ahoj",
    "slovenian": "zdravo",
    "lithuanian": "labas",
    "latvian": "sveiki",
    "estonian": "tere",
    "georgian": "გამარჯობა (Gamardjoba)",
    "armenian": "բարև (Barev)",
    "mongolian": "сайн байна уу (Sain baina uu)",
    "nepali": "नमस्कार (Namaskāra)",
    "sinhala": "හෙලෝ (Helo)",
    "bengali": "হ্যালো (Hyālō)",
    "gujarati": "હેલો (Hēlō)",
    "kannada": "ಹಲೋ (Halo)",
    "malayalam": "ഹലോ (Halō)",
    "marathi": "हॅलो (Hālō)",
    "tamil": "ஹலோ (Halō)",
    "telugu": "హలో (Hälō)",
    "urdu": "ہیلو (Hello)"
  }
  

const getGreet = (lang) => {
    lang = (lang.toLowerCase()).trim();
    for(let i in greetList) {
        if (i == lang) {
            return greetList[lang];
        }
    }
    return false;
}

app.get('/getLang/:lang', (req, res) => {
    const {lang} = req.params;
    const ans = getGreet(lang);
    if(ans) {
        return res.status(200).send(`<h1>${ans}</h1>`)
    }
    return res.status(404).send(`<h1>I don't know the language currently :)</h1>`);
});


const getAllLang = (req, res) => {
    res.status(200).json(greetList);
}

const createLang = (req, res) => {
    // const {lang, greet} = req.query;
    // const {lang, greet} = req.headers;
    // console.log(req.headers);
    const {lang, greet} = req.body;
    console.log(req.body)
    if(getGreet(lang)) {
        return res.status(409).send("Language already exists :)");
    }
    greetList[lang.toLowerCase()] = greet;
    return res.status(200).send("Created Greet");
}

const updateList = (lang, updateGreet) => {
    lang = (lang.toLowerCase()).trim();
    for(let i in greetList) {
        if(lang == i) {
            greetList[i] = updateGreet;
            return true;
        }
    }
    return false;
}

const updateLang = (req, res) => {
    const {lang, updateGreet} = req.query;
    const response = updateList(lang, updateGreet);
    if(response) {
        res.status(200).send("Updating the greeting :)");
    } else {
        res.status(404).send("I don't know the language currently :)");
    }
}

const deleteLang = (req, res) => {
    const {lang} = req.body;
    if(getGreet(lang)) {
        delete greetList[lang];
        return res.status(200).send("Deleted the lang :)");
    }
    return res.status(404).send('Lang not found');
}

app.get("/getAllLang", getAllLang);
app.post("/createLang", createLang);
app.put('/updateLang', updateLang);
app.delete('/deleteLang', deleteLang);

app.listen(port, () => {
    console.log(`Server is running at the port: ${port}`);
});