# Online Customer Feedback Reviews and Analysis

## Overview

This repository provides a simple API and web interface for managing product reviews. It includes sentiment analysis to classify reviews as Very Positive, Positive, Neutral, Negative, or Very Negative based on their content. The project is built with Node.js and Express and uses a JSON file to store review data.

## Features

- **Submit Reviews**: Allows users to submit reviews via API or web interface
- **Sentiment Analysis**: Automatically classifies reviews based on their sentiment using predefined keywords
- **Filter and Paginate**: Supports filtering reviews by product ID, rating range, sentiment, and paginating results
- **Analytics**: Provides analytics for reviews, including sentiment breakdown, average rating, and rating distribution
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on reviews
- **Static Web Interface**: Includes a basic web interface for submitting and viewing reviews

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications
- **Express.js**: Web framework for handling API routes and static files
- **UUID**: For generating unique IDs for reviews
- **File System (fs)**: To handle JSON file-based data storage

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Mwantech/Online-Customer-Feedback-reviews-and-analysis.git
cd Online-Customer-Feedback-reviews-and-analysis
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
npm start
```

By default, the server runs on `http://localhost:3000`.

## Access the Application

- **Web Interface**: `http://localhost:3000`
- **API Endpoints**: See details below

## API Endpoints

### Submit a Review

- **Endpoint**: `POST /api/reviews`
- **Request Body**:
  ```json
  {
    "productId": "product-id",
    "rating": 4.5,
    "review": "Amazing product!"
  }
  ```
- **Response**: Returns the submitted review with sentiment analysis

### Get Reviews

- **Endpoint**: `GET /api/reviews`
- **Query Parameters**:
  - `productId` (optional): Filter by product ID
  - `minRating` (optional): Minimum rating
  - `maxRating` (optional): Maximum rating
  - `sentiment` (optional): Filter by sentiment
  - `page` (optional, default=1): Pagination page
  - `limit` (optional, default=10): Number of reviews per page
- **Response**: Returns filtered and paginated reviews

### Get Review Analytics

- **Endpoint**: `GET /api/reviews/analytics`
- **Query Parameters**: Same as `/api/reviews`
- **Response**: Returns analytics including sentiment breakdown and rating distribution

### Update a Review

- **Endpoint**: `PUT /api/reviews/:reviewId`
- **Request Body**:
  ```json
  {
    "productId": "updated-product-id",
    "rating": 5,
    "review": "Best product ever!"
  }
  ```
- **Response**: Returns the updated review

### Delete a Review

- **Endpoint**: `DELETE /api/reviews/:reviewId`
- **Response**: Returns 204 status if successful

## Sentiment Analysis

Sentiment is determined using the following keywords:

### Positive Keywords
- great, excellent, amazing, awesome, fantastic, etc.

### Negative Keywords
- terrible, horrible, awful, poor, bad, etc.

### Sentiment Classification
- Very Positive
- Positive
- Neutral
- Negative
- Very Negative

## Directory Structure

```
.
├── public/                # Static files (HTML, CSS, JS)
│   └── index.html         # Main web interface
├── reviews.json           # JSON file for storing reviews
├── server.js              # Main server file
├── package.json           # Node.js dependencies and scripts
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

## Author

Developed by Joshua Mwangi

For questions or suggestions, feel free to open an issue or contact me directly.