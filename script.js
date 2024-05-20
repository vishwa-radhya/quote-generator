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
    const quote =apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    const author=quote.author.replace(/, type.fit|type.fit/,'');
    if(author){
        authorText.textContent=author;
    }else{
        authorText.textContent='Unknown';
    }
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent=quote.text;
    complete();
}


async function getQuotes(){
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try{
        const resp =await fetch(apiUrl);
        console.log('using fetch api');
        
        apiQuotes = await resp.json();
        newQuote();
        // throw new Error('oops')
    }catch(e){
        // alert(e);
        apiQuotes=localQuotes;
        console.log('using local array');
        newQuote();
    }
}

function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

window.onload=()=>{
    getQuotes();
}