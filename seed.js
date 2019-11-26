const db = require("./server/db");
const { User, Reviews } = require("./server/db/models");
const user = [];
const reviews = [];
const seed = async () => {
  await db.sync({ force: true });
  // await Promise.all(
  //   users.map(user => {
  //     return User.create(user);
  //   })
  // );
  // await Promise.all(
  //   reviews.map(review => {
  //     return Reviews.create(review);
  //   })
  // );
  console.log("Seeding success!");
  db.close();
};
seed().catch(err => {
  console.error(err);
  db.close();
});
