const express = require("express");
const port = 5020
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { analyze } = require("./analyse");

dotenv.config()

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('dist'));

const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.get('/', function (req, res) {
    res.render("index.html")
})

app.post("/", async (req, res) => {
    const url = req.body.url;
    const Analyze = await analyze(url, MEAN_CLOUD_API_KEY)
    const {code, msg, sample} = Analyze
    if (code == 212) {
        return res.send({ msg: msg , code: code})
    }
    else if (code == 100) {
        return res.send({ msg: msg, code: code })
    }

    return res.send({sample: sample, code: code})

})


app.listen(port,
    () => console.log(`server is now listening on port ${port}`)
)
