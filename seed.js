const db = require("./server/db");
const { User, Reviews } = require("./server/db/models");
const users = [
  {
    firstName: "Phurba",
    lastName: "Sherpa",
    email: "phurba@email.com",
    password: "123"
  },
  {
    firstName: "Yooni",
    lastName: "Park",
    email: "yooni@email.com",
    password: "abc"
  },
  {
    firstName: "Martin",
    lastName: "Ng",
    email: "martin@email.com",
    password: "123"
  },
  {
    firstName: "Alex",
    lastName: "Penaloza",
    email: "alex@email.com",
    password: "123"
  }
];
const reviews = [];
const seed = async () => {
  await db.sync({ force: true });
  await Promise.all(
    users.map(user => {
      return User.create(user);
    })
  );
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
