const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    return username && typeof username === "string" && username.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const user = users.find(u => u.username === username && u.password === password);
    return !!user;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    if (authenticatedUser(username, password)) {
        const accessToken = jwt.sign({ username }, "access", { expiresIn: '1h' });
        req.session.authorization = { accessToken };
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid login credentials" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user?.username;

    if (!username) return res.status(401).json({ message: "Unauthorized" });

    if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added/updated successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization?.username;
  
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: user not logged in." });
    }
  
    const book = books[isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    if (!book.reviews[username]) {
      return res.status(404).json({ message: "No review found for this user." });
    }
  
    delete book.reviews[username];
    return res.status(200).json({ message: "Review deleted successfully.", reviews: book.reviews });
});  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
