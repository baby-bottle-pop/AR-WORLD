const db = require('../db')
const User = require('./User')
const Reviews = require('./Reviews')

User.hasMany(Reviews)
Reviews.belongsTo(User)

module.exports= {
    db,
    User,
    Reviews
}