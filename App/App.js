import React, { useCallback, useEffect, useReducer, useState } from "react"
import axios from "axios";
import quotesReducer from "./quotesReducer";
import './App.css'


const url = `https://type.fit/api/quotes`
var tweetUrl = "https://twitter.com/intent/tweet?text="

function App(){

    const color = `rgb(${Math.floor((Math.random() * 105) + Math.random() * 50)}, 
                    ${Math.floor((Math.random() * 105) + Math.random() * 50)},
                    ${Math.floor((Math.random() * 105) + Math.random() * 50)})`;

    const [quotes, dispatchQuotes] = useReducer( quotesReducer, { data: [], isLoading: false, isError: false } )
    const [quote, setQuote] = useState(null)

    const pickRandomQuote = ( quotes_ ) => {
        const randValue = Math.floor(Math.random() * quotes_.data.length)
        const randomQuote = quotes_.data[randValue]
        console.log(randomQuote)
        return randomQuote
    }

    const fetchQuotes =  async () => {        
        dispatchQuotes( {type: "QUOTES_FETCH_INIT"})
        
        try {
            const result = await axios.get( url )
            dispatchQuotes( {type: "QUOTES_FETCH_SUCCESS", payload: {data: result.data}} )
        } catch (error) {
            dispatchQuotes( { type: "QUOTES_FETCH_FAILURE"})
        }
    }

    useEffect( function(){
            fetchQuotes() 
        }, [])

    return (
        <div id="quote-box" style={ { backgroundColor: color}}>
            <div className="center">
                { quotes.hasLoaded && <TextComponent quote={ quote || pickRandomQuote( quotes ) } color = { color } changeQuote ={ ()=> setQuote(pickRandomQuote(quotes))} /> } 
            
            </div>
        </div>
    )
}

function TextComponent( props ){
    const urlExtension = `${props.quote.text} By ${props.quote.author}`
    return (
        <>
            <blockquote id="text" style={ {color: props.color}}> { props.quote.text } </blockquote> 
            <div className="author-container"> <span id="author" style={ {color: props.color}}> - { props.quote.author } </span> </div>

            <div className="items">                 
                <span style={ { backgroundColor: props.color }}>
                    <a href={`${tweetUrl}${urlExtension}`} style={ {color: "white"}} id="tweet-quote"><i className="fa-brands fa-twitter"></i> Tweet </a>
                </span>
                <span id="new-quote" 
                style={ { backgroundColor: props.color, color: "white" } } 
                onClick = { props.changeQuote } >
                    New Quote
                </span>
            </div>
        </>
    )
}

export default App