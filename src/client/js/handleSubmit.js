import axios from "axios";

const { isValidUrl } = require("./checkURL");

const input = document.getElementById("URI");
const btn = document.getElementById("submit");

document.addEventListener('DOMContentLoaded', function () {
    input.addEventListener("change", (e)=>{
        e.preventDefault()
        hide_error()
        show_results(false)
    });
btn.addEventListener('click', e => handleSubmit(e))
});
async function handleSubmit(e) {
    e.preventDefault();
    const url = input.value;
    if (!isValidUrl(url)) {
        show_error();
        document.getElementById("error").innerHTML = "Please, enter a valid URL";
        input.value = "";
        return;
    }
    console.log(url);
    loading(true);
    
    try {
        const { data } = await axios.post(
            'http://localhost:5020/',
            { url },  
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(data);  
        display_results(data);
    } catch (error) {
        console.error("Error:", error);
        show_error();
        document.getElementById("error").innerHTML = "An error occurred while processing your request.";
        loading(false);
    }
}
const display_results = data => {

    loading(false)
    if (data.msg) {
        show_error()
        show_results(false)
        document.getElementById("error").innerHTML = `${data.msg}`;

        return;
    }
    hide_error()
    show_results(true);
    const { sample }=data;
    document.getElementById("agreement").innerHTML = `Agreement: ${sample.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${sample.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${sample.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${sample.irony}`;
    document.getElementById("score_tag").innerHTML = `Score Tag: ${sample.score_tag}`;
}
const loading = (bool) => {
    const loader = document.getElementById('loader');
    
    if (bool) {
        loader.style.display = 'block';
        return;
    }
    loader.style.display = 'none';

}
const show_results = (bool) => {
    if (bool) {
        document.querySelectorAll("ul li").forEach(element => {
            element.style.display = "block"
        })
        return;
    }
    document.querySelectorAll("ul li").forEach(element => {
        element.style.display = "none"
    })
    return;
}
const show_error = () => document.getElementById("error").style.display = "block";
const hide_error = () => document.getElementById("error").style.display = "none";

export { handleSubmit }
