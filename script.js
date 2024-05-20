const quoteContainer=document.getElementById('quote-cont');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
let apiQuotes=[];

//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuote(){
    loading();
    const quote =apiQuotes[0];
    const author=quote.author;
    authorText.textContent=author;
    quoteText.textContent=quote.content;
    if(quote.content.length>80){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    if(quote.content.length>170){
        quoteText.classList.add('longer-text');
    }else{
        quoteText.classList.remove('longer-text');
    }
    complete();
}


async function getQuotes(){
    loading();
    const apiUrl ='https://api.quotable.io/quotes/random';
    try{
        const resp =await fetch(apiUrl);
        console.log('using fetch api');
        apiQuotes = await resp.json();
        newQuote();
    }catch(e){
        apiQuotes=localQuotes;
        console.log('using local array');
        newQuote();
    }
}

function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);

window.onload=()=>{
    getQuotes();
}