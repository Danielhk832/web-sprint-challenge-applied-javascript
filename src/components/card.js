import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const { headline, authorPhoto, authorName } = article;

  const articleCard = document.createElement("div");
  const articleHeadline = document.createElement("div");
  const articleAuthor = document.createElement("div");
  const imgContainer = document.createElement("div");
  const authorPhotoLink = document.createElement("img");
  const authorNameSpan = document.createElement("span");

  //classes
  articleCard.classList.add("card");
  articleHeadline.classList.add("headline");
  articleAuthor.classList.add("author");
  imgContainer.classList.add("img-container");

  //values
  articleHeadline.textContent = `${headline}`;
  authorPhotoLink.setAttribute(`src`, `${authorPhoto}`);
  authorNameSpan.textContent = `By ${authorName}`;

  //nesting
  articleCard.appendChild(articleHeadline);
  articleCard.appendChild(articleAuthor);
  articleAuthor.appendChild(imgContainer);
  imgContainer.appendChild(authorPhotoLink);
  articleAuthor.appendChild(authorNameSpan);

  articleCard.addEventListener("click", () => {
    console.log(articleHeadline);
  });

  return articleCard;
};

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get("http://localhost:5000/api/articles").then((resp) => {
    const cardsContainer = document.querySelector(selector);

    const articles = resp.data.articles;
    const { javascript, bootstrap, technology, jquery, node } = articles;

    javascript.forEach((article) => {
      const cardInput = Card(article);
      cardsContainer.appendChild(cardInput);
    });
    bootstrap.forEach((article) => {
      const cardInput = Card(article);
      cardsContainer.appendChild(cardInput);
    });
    technology.forEach((article) => {
      const cardInput = Card(article);
      cardsContainer.appendChild(cardInput);
    });
    jquery.forEach((article) => {
      const cardInput = Card(article);
      cardsContainer.appendChild(cardInput);
    });
    node.forEach((article) => {
      const cardInput = Card(article);
      cardsContainer.appendChild(cardInput);
    });

    /* code below is the DRY solution i attempted but it didnt work */
    // const articleKeys = Object.keys(articles);
    // console.log(articles[articleKeys[1]]);
    // for (let i = 0; i < articleKeys.length; i++) {
    //   const cardInput = Card(articles[articleKeys[i]]);
    //   console.log(cardInput);
    //   cardsContainer.appendChild(cardInput);
    // }
  });
};

export { Card, cardAppender };
