document.addEventListener('DOMContentLoaded', function () {
    const techCrunchContainer = document.getElementById('techCrunchNewsContainer');
  
    fetch('/api/news')
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;
        let html = '';
        
        articles.forEach(article => {
          html += `
            <article>
              <img src="${article.urlToImage}" alt="${article.title}">
              <h2>${article.title}</h2>
              <p>${article.description}</p>
              <a href="${article.url}" target="_blank">Read more</a>
            </article>
          `;
        });
  
        techCrunchContainer.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        techCrunchContainer.innerHTML = '<p>Error loading news.</p>';
      });
  });
   