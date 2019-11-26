const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('Reviews', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
    },
    ratings: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Reviews.prototype.roundedReviews = function(rating) {
    return Math.floor(rating * 10) / 10
}

module.exports = Reviews