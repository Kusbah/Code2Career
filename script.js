const searchInput = document.getElementById('searchInput');
const quoteList = document.getElementById('quoteList');
const errorMessage = document.getElementById('errorMessage');

let quotesData = [];

fetch('https://dummyjson.com/quotes')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch quotes.');
    }
    return response.json();
  })
  .then(data => {
    quotesData = data.quotes;
    displayQuotes(quotesData);
  })
  .catch(error => {
    errorMessage.textContent = 'Error fetching data: ' + error.message;
  });

function displayQuotes(quotes) {
  quoteList.innerHTML = '';

  if (quotes.length === 0) {
    quoteList.innerHTML = '<li>No quotes found.</li>';
    return;
  }

  quotes.forEach(quote => {
    const li = document.createElement('li');
    li.textContent = quote.quote;
    quoteList.appendChild(li);
  });
}

searchInput.addEventListener('input', () => {
  const filterText = searchInput.value.toLowerCase();
  const filteredQuotes = quotesData.filter(q =>
    q.quote.toLowerCase().includes(filterText)
  );
  displayQuotes(filteredQuotes);
});
