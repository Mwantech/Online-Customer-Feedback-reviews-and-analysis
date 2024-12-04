class Review {
    constructor(data) {
      this.productId = data.productId;
      this.userId = data.userId;
      this.rating = data.rating;
      this.comment = data.comment;
      this.sentiment = data.sentiment || null;
      this.createdAt = new Date();
    }
  
    validate() {
      if (!this.productId || !this.userId) {
        throw new Error('Product ID and User ID are required');
      }
      if (this.rating < 1 || this.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
    }
  }
  
  module.exports = Review;