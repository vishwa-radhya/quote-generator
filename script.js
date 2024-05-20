const quoteContainer=document.getElementById('quote-cont');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
let apiQuotes=[];
let localQuoteArr=[];
let callQuoteFirstTime=true;

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newLocalQuote(){
    console.log('from local quote');
    loading();
    const quote =localQuoteArr[Math.floor(Math.random()*localQuoteArr.length)];
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

const getQuote=()=>{
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    const indexOfQuote = apiQuotes.findIndex((qe)=>qe._id===quote._id);
    authorText.textContent=quote.author;
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
    apiQuotes.splice(indexOfQuote,1);
    if(apiQuotes.length<1){
        getQuotes();
    }
    complete();
}

async function getQuotes(){
    const apiUrl ='https://api.quotable.io/quotes/random';
    try{
        for(let i=0;i<10;i++){
         const resp =await fetch(apiUrl);
        const res = await resp.json();
        apiQuotes.push(...res);
    }
    skipper();
    callQuoteFirstTime=false;
    }catch(e){
        alert('something went wrong dont worry click ok to view the limited quotes which are stored in the application');
        localQuoteArr=localQuotes;
        console.log('using local array');
        newLocalQuote();
    }
}

function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',()=>{
    if(localQuoteArr.length>0){
        newLocalQuote();
    }else{
        getQuote();
    }
})

twitterBtn.addEventListener('click',tweetQuote);

const skipper=()=>{
    if(callQuoteFirstTime){
        getQuote();
    }
}

window.onload=()=>{
    loading();
    getQuotes();
}

