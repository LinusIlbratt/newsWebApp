document.addEventListener('DOMContentLoaded', function () {
  const techCrunchContainer = document.getElementById('techCrunchNewsContainer');
  const appleContainer = document.getElementById('appleNewsContainer');

  fetch('/api/news')
    .then(response => response.json())
    .then(data => {
      // Filter out invalid articles
      const validTechCrunchArticles = data.techCrunchArticles.filter(article => {
        return article.urlToImage && article.title && article.description;
      });

      const validAppleArticles = data.appleArticles.filter(article => {
        return article.urlToImage && article.title && article.description;
      });

      // Display valid TechCrunch articles
      let techCrunchHTML = '';
      validTechCrunchArticles.forEach(article => {
        techCrunchHTML += `
          <article>
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </article>
        `;
      });
      techCrunchContainer.innerHTML = techCrunchHTML;

      // Display valid Apple articles
      let appleHTML = '';
      validAppleArticles.forEach(article => {
        appleHTML += `
          <article>
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </article>
        `;
      });
      appleContainer.innerHTML = appleHTML;
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      techCrunchContainer.innerHTML = '<p>Error loading TechCrunch news.</p>';
      appleContainer.innerHTML = '<p>Error loading Apple news.</p>';
    });
});
