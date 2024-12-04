Reviews API and Sentiment Analysis
This repository provides a simple API and web interface for managing product reviews. It includes sentiment analysis to classify reviews as Very Positive, Positive, Neutral, Negative, or Very Negative based on their content. The project is built with Node.js and Express and uses a JSON file to store review data.

Features
Submit Reviews: Allows users to submit reviews via API or web interface.
Sentiment Analysis: Automatically classifies reviews based on their sentiment using predefined keywords.
Filter and Paginate: Supports filtering reviews by product ID, rating range, sentiment, and paginating results.
Analytics: Provides analytics for reviews, including sentiment breakdown, average rating, and rating distribution.
CRUD Operations: Perform Create, Read, Update, and Delete operations on reviews.
Static Web Interface: Includes a basic web interface for submitting and viewing reviews.
Technologies Used
Node.js: JavaScript runtime for building server-side applications.
Express.js: Web framework for handling API routes and static files.
UUID: For generating unique IDs for reviews.
File System (fs): To handle JSON file-based data storage.
Setup Instructions
Clone the Repository:


git clone https://github.com/Mwantech/Online-Customer-Feedback-reviews-and-analysis.git
cd repository-name
Install Dependencies:

npm install
Start the Server:

npm start
By default, the server runs on http://localhost:3000.

Access the Application:

Web Interface: http://localhost:3000
API Endpoints: See below for details.
API Endpoints
Submit a Review
POST /api/reviews
Request Body:
{
  "productId": "product-id",
  "rating": 4.5,
  "review": "Amazing product!"
}
Response: Returns the submitted review with sentiment analysis.
Get Reviews
GET /api/reviews
Query Parameters:
productId (optional): Filter by product ID.
minRating (optional): Minimum rating.
maxRating (optional): Maximum rating.
sentiment (optional): Filter by sentiment.
page (optional, default=1): Pagination page.
limit (optional, default=10): Number of reviews per page.
Response: Returns filtered and paginated reviews.
Get Review Analytics
GET /api/reviews/analytics
Query Parameters: Same as /api/reviews.
Response: Returns analytics including sentiment breakdown and rating distribution.
Update a Review
PUT /api/reviews/:reviewId
Request Body:

{
  "productId": "updated-product-id",
  "rating": 5,
  "review": "Best product ever!"
}
Response: Returns the updated review.
Delete a Review
DELETE /api/reviews/:reviewId
Response: Returns 204 status if successful.
Sentiment Analysis
Sentiment is determined using the following keywords:

Positive: great, excellent, amazing, awesome, fantastic, etc.
Negative: terrible, horrible, awful, poor, bad, etc.
The sentiment of a review is classified as:

Very Positive
Positive
Neutral
Negative
Very Negative
Directory Structure

├── public/                # Static files (HTML, CSS, JS)
│   └── index.html         # Main web interface
├── reviews.json           # JSON file for storing reviews
├── server.js                 # Main server file
├── package.json           # Node.js dependencies and scripts
└── README.md              # Project documentation
Contributing
Fork the repository.
Create a new branch:

git checkout -b feature-name
Commit your changes:

git commit -m "Add a new feature"
Push to the branch:

git push origin feature-name
Submit a pull request.
License
This project is licensed under the MIT License. See LICENSE for more details.

Author
Developed by Joshua Mwangi.

For questions or suggestions, feel free to open an issue or contact me directly.
