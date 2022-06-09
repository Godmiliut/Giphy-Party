//Global Constants
const aKey = "nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H"
const rating = "pg-13"
const limit = 9
const language = "en"

let mButton = document.querySelector("#moreBtn")
let gForm = document.querySelector("form")
let gArea = document.querySelector(".gifArea")
let sWordElement = document.getElementById("#sWord")
let page = 0;
let offset = 0;

//Get results upon a submit event
mButton.addEventListener("click", showMore)
gForm.addEventListener("submit", handleFormSubmit)

async function getResults(evt){
    evt.preventDefault();
    let apiURL = "https://api.giphy.com/v1/gifs/search?" + "api_key=" + aKey + "&q=" + evt.target.sWord.value.toLowerCase() + "&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&lang=" + language;
    let response = await fetch(apiURL);
    let responseData = await response.json();
    generateHTML(responseData);
}

function generateHTML(gifData){
    for(let i = 0; i < limit ; i++){
        let gUrl = gifData.data[i].images.downsized_medium.url;
        gArea.innerHTML += '<img src="'+gUrl+'"></img>'
    }
    mButton.classList.remove("hidden");
}

function handleFormSubmit(evt){
    gArea.innerHTML= "";
    getResults(evt);
    
}

function showMore(evt){
    offset += (limit)-1;
    page++;
    getResults(evt);
}

