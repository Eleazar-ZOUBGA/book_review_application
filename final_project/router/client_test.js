const axios = require('axios');

async function getBooks() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log("Liste des livres :", response.data);
  } catch (error) {
    console.error("Erreur getBooks:", error.message);
  }
}

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(`Détails du livre ISBN ${isbn}:`, response.data);
  } catch (error) {
    console.error("Erreur getBookByISBN:", error.message);
  }
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
    console.log(`Livres de l'auteur ${author}:`, response.data);
  } catch (error) {
    console.error("Erreur getBooksByAuthor:", error.message);
  }
}

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
    console.log(`Livres avec le titre ${title}:`, response.data);
  } catch (error) {
    console.error("Erreur getBooksByTitle:", error.message);
  }
}

async function main() {
  await getBooks();
  await getBookByISBN(1);
  await getBooksByAuthor("Chinua Achebe");
  await getBooksByTitle("Things Fall Apart");
}

main();
