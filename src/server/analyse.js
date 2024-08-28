const axios = require("axios");
const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";


const analyze = async (url, key) => {
    console.log("Analyzing URL with key:", url, key); 
    try {
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        const { code } = response.data.status;

        if (code == 100) {
            return handleError(code, "Please enter a valid URL");
        } else if (code == 212) {
            return handleError(code, response.data.status.msg);
        }

        return successResponse(response.data, code);
    } catch (error) {
        return handleError(500, "Internal Server Error");
    }
};

const handleError = (code, msg) => {
    return {
        code: code,
        msg: msg
    };
};

const successResponse = (data, code) => {
    const { score_tag, agreement, subjectivity, confidence, irony } = data;
    const sample = {
        score_tag: score_tag,
        agreement: agreement,
        subjectivity: subjectivity,
        confidence: confidence,
        irony: irony
    };
    return { sample, code };
};

module.exports = {
    analyze
};
