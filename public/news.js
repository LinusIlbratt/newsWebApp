document.addEventListener('DOMContentLoaded', function () {
  const techCrunchContainer = document.getElementById('techCrunchNewsContainer');
  const bbcContainer = document.getElementById('bbcNewsContainer');
  const businessContainer = document.getElementById('businessNewsContainer');

  fetch('/api/news')
    .then(response => response.json())
    .then(data => {
      // Filter out invalid articles for TechCrunch
      const validTechCrunchArticles = (data.techCrunchArticles || []).filter(article => {
        return article.urlToImage && article.title && article.description;
      });

      // Filter out invalid articles for BBC
      const validBbcArticles = (data.bbcArticles || []).filter(article => {
        return article.urlToImage && article.title && article.description;
      });

      // Filter out invalid articles for WSJ
      const validBusinessArticles = (data.businessArticles || []).filter(article => {
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

      // Display valid BBC articles
      let bbcHTML = '';
      validBbcArticles.forEach(article => {
        bbcHTML += `
          <article>
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </article>
        `;
      });
      bbcContainer.innerHTML = bbcHTML;

      // Display valid Business articles (formerly WSJ)
      let businessHTML = '';
      validBusinessArticles.forEach(article => {
        businessHTML += `
          <article>
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </article>
        `;
      });
      businessContainer.innerHTML = businessHTML; // This should be businessHTML, not wsjHTML

    })
    .catch(error => {
      console.error('Error fetching news:', error);
      techCrunchContainer.innerHTML = '<p>Error loading TechCrunch news.</p>';
      bbcContainer.innerHTML = '<p>Error loading BBC news.</p>';
      businessContainer.innerHTML = '<p>Error loading Business news.</p>';
    });
});
