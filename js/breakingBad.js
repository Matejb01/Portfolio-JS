const getQuote = () => {
    const {
        author,
        quote
    } = getRandomIndexFromArray(quotes);
    getById("quoteText").innerText = quote;
    getById("breakingBadAuthor").innerText = author;
}

getQuote();