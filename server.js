const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const REVIEWS_FILE = path.join(__dirname, 'reviews.json');

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Sentiment Analysis Function
function analyzeSentiment(review) {
    const sentimentDictionary = {
        positive: [
            'great', 'excellent', 'amazing', 'awesome', 'fantastic', 
            'wonderful', 'outstanding', 'superior', 'love', 'best'
        ],
        negative: [
            'terrible', 'horrible', 'awful', 'poor', 'bad', 
            'disappointing', 'worst', 'useless', 'hate', 'frustrated'
        ]
    };

    const lowercaseReview = review.toLowerCase();
    
    const positiveCount = sentimentDictionary.positive
        .filter(word => lowercaseReview.includes(word)).length;
    const negativeCount = sentimentDictionary.negative
        .filter(word => lowercaseReview.includes(word)).length;

    if (positiveCount > negativeCount * 2) return 'Very Positive';
    if (positiveCount > negativeCount) return 'Positive';
    if (negativeCount > positiveCount * 2) return 'Very Negative';
    if (negativeCount > positiveCount) return 'Negative';
    return 'Neutral';
}

// Read Reviews
async function readReviews() {
    try {
        const data = await fs.readFile(REVIEWS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write Reviews
async function writeReviews(reviews) {
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Submit a Review
app.post('/api/reviews', async (req, res) => {
    try {
        const reviews = await readReviews();
        const { productId, rating, review } = req.body;

        // Validate input
        if (!productId || !rating || !review) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newReview = {
            reviewId: uuidv4(),
            productId,
            rating: parseFloat(rating),
            review,
            sentiment: analyzeSentiment(review),
            timestamp: new Date().toISOString()
        };

        reviews.push(newReview);
        await writeReviews(reviews);

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

// Web Interface: Submit a Review
app.post('/submit-review', async (req, res) => {
    try {
        const reviews = await readReviews();
        const { productId, rating, review } = req.body;

        // Validate input
        if (!productId || !rating || !review) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newReview = {
            reviewId: uuidv4(),
            productId,
            rating: parseFloat(rating),
            review,
            sentiment: analyzeSentiment(review),
            timestamp: new Date().toISOString()
        };

        reviews.push(newReview);
        await writeReviews(reviews);

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

// API: Get Reviews with Filtering and Pagination
app.get('/api/reviews', async (req, res) => {
    try {
        let reviews = await readReviews();
        const { 
            productId, 
            minRating, 
            maxRating, 
            sentiment,
            page = 1,
            limit = 10
        } = req.query;

        // Filter reviews
        let filteredReviews = reviews.filter(review => {
            const matchProductId = !productId || review.productId === productId;
            const matchMinRating = !minRating || review.rating >= parseFloat(minRating);
            const matchMaxRating = !maxRating || review.rating <= parseFloat(maxRating);
            const matchSentiment = !sentiment || review.sentiment === sentiment;

            return matchProductId && matchMinRating && matchMaxRating && matchSentiment;
        });

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

        res.json({
            reviews: paginatedReviews,
            total: filteredReviews.length,
            page: parseInt(page),
            totalPages: Math.ceil(filteredReviews.length / limit)
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reviews' });
    }
});

// Web Interface: Get Reviews for Filtering
app.get('/reviews/analyze', async (req, res) => {
    try {
        let reviews = await readReviews();
        const { 
            productId, 
            minRating, 
            maxRating, 
            sentiment 
        } = req.query;

        // Filter reviews
        const filteredReviews = reviews.filter(review => {
            const matchProductId = !productId || review.productId === productId;
            const matchMinRating = !minRating || review.rating >= parseFloat(minRating);
            const matchMaxRating = !maxRating || review.rating <= parseFloat(maxRating);
            const matchSentiment = !sentiment || review.sentiment === sentiment;

            return matchProductId && matchMinRating && matchMaxRating && matchSentiment;
        });

        // Calculate analytics
        const analytics = {
            totalReviews: filteredReviews.length,
            averageRating: filteredReviews.length 
                ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(2)
                : 0,
            sentimentBreakdown: {
                veryPositive: filteredReviews.filter(r => r.sentiment === 'Very Positive').length,
                positive: filteredReviews.filter(r => r.sentiment === 'Positive').length,
                neutral: filteredReviews.filter(r => r.sentiment === 'Neutral').length,
                negative: filteredReviews.filter(r => r.sentiment === 'Negative').length,
                veryNegative: filteredReviews.filter(r => r.sentiment === 'Very Negative').length
            }
        };

        res.json({ reviews: filteredReviews, analytics });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reviews' });
    }
});

// API: Get Review Analytics
app.get('/api/reviews/analytics', async (req, res) => {
    try {
        let reviews = await readReviews();
        const { 
            productId, 
            minRating, 
            maxRating, 
            sentiment 
        } = req.query;

        // Filter reviews
        const filteredReviews = reviews.filter(review => {
            const matchProductId = !productId || review.productId === productId;
            const matchMinRating = !minRating || review.rating >= parseFloat(minRating);
            const matchMaxRating = !maxRating || review.rating <= parseFloat(maxRating);
            const matchSentiment = !sentiment || review.sentiment === sentiment;

            return matchProductId && matchMinRating && matchMaxRating && matchSentiment;
        });

        // Calculate analytics
        const analytics = {
            totalReviews: filteredReviews.length,
            averageRating: filteredReviews.length 
                ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(2)
                : 0,
            sentimentBreakdown: {
                veryPositive: filteredReviews.filter(r => r.sentiment === 'Very Positive').length,
                positive: filteredReviews.filter(r => r.sentiment === 'Positive').length,
                neutral: filteredReviews.filter(r => r.sentiment === 'Neutral').length,
                negative: filteredReviews.filter(r => r.sentiment === 'Negative').length,
                veryNegative: filteredReviews.filter(r => r.sentiment === 'Very Negative').length
            },
            ratingDistribution: {
                1: filteredReviews.filter(r => r.rating === 1).length,
                1.5: filteredReviews.filter(r => r.rating === 1.5).length,
                2: filteredReviews.filter(r => r.rating === 2).length,
                2.5: filteredReviews.filter(r => r.rating === 2.5).length,
                3: filteredReviews.filter(r => r.rating === 3).length,
                3.5: filteredReviews.filter(r => r.rating === 3.5).length,
                4: filteredReviews.filter(r => r.rating === 4).length,
                4.5: filteredReviews.filter(r => r.rating === 4.5).length,
                5: filteredReviews.filter(r => r.rating === 5).length
            }
        };

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
});

// Additional CRUD operations for API
app.put('/api/reviews/:reviewId', async (req, res) => {
    try {
        const reviews = await readReviews();
        const { reviewId } = req.params;
        const { productId, rating, review } = req.body;

        const reviewIndex = reviews.findIndex(r => r.reviewId === reviewId);
        if (reviewIndex === -1) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update review
        reviews[reviewIndex] = {
            ...reviews[reviewIndex],
            ...(productId && { productId }),
            ...(rating && { rating: parseFloat(rating) }),
            ...(review && { 
                review, 
                sentiment: analyzeSentiment(review) 
            })
        };

        await writeReviews(reviews);
        res.json(reviews[reviewIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
});

app.delete('/api/reviews/:reviewId', async (req, res) => {
    try {
        let reviews = await readReviews();
        const { reviewId } = req.params;

        const initialLength = reviews.length;
        reviews = reviews.filter(r => r.reviewId !== reviewId);

        if (reviews.length === initialLength) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await writeReviews(reviews);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Web Interface: http://localhost:${PORT}`);
    console.log(`API Endpoints:`);
    console.log(`- POST /api/reviews`);
    console.log(`- GET /api/reviews`);
    console.log(`- GET /api/reviews/analytics`);
    console.log(`- PUT /api/reviews/:reviewId`);
    console.log(`- DELETE /api/reviews/:reviewId`);
});