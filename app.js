//Global Constants
const aKey = "nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H"
const rating = "pg-13"
const limit = 9
const language = "en"

let mButton = document.querySelector("#moreBtn")
let gForm = document.querySelector("form")
let gArea = document.querySelector(".gifArea")
let page = 0;
let offset = 0;

async function getResults(word){
    let apiURL = "https://api.giphy.com/v1/gifs/search?" + "api_key=" + aKey + "&q=" + word + "&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&lang=" + language;
    let response = await fetch(apiURL);
    let responseData = await response.json();
    return responseData;
}

function generateHTML(gData){
    for(let i = 0; i < limit ; i++){
        let gUrl = gData.data[i].images.downsized_medium.url;
        gArea.innerHTML += '<img src="'+gUrl+'"></img>'
    }
}

async function handleFormSubmit(evt){
    evt.preventDefault();
    gArea.innerHTML= "";
    sWord = evt.target.sWord.value.toLowerCase();
    const gifData = await getResults(sWord);
    generateHTML(gifData);
    evt.target.sWord.value = '';
    mButton.classList.remove("hidden");
}

gForm.addEventListener("submit", handleFormSubmit);

async function showMore(evt){
    offset += limit;
    page++;
    const gifData = await getResults(sWord);
    generateHTML(gifData);
}

mButton.addEventListener("click", showMore);