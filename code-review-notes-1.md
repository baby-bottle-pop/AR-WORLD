# Notes on Code Review 1

## Buttons

Think about overlaying your button on the AR scene, in which it's a button that the user can interact with when in the current context.

## Database

You're either going to use one or not. It will be harder later on to add it. So, it's best to probably include it and if you don't use it, it's fine. However, it seems like you want to store some data so remember what we spoke about during code review specifically related to

### Database: (Some) Things to think about

- Thru tables
- Arrays (or other complex data types)
- How thru tables work
- Why might arrays be inefficient?
- `belongsToMany` vs. `hasMany`

## GraphQL

I want you to really understand that it's NOT a substitution for a database or your ORM.

### GraphQL: (Some) Things to think about

- What does GraphQL replace?
- What does it offer us?
- How is it different from the thing that it replaces?

## Code Cleanliness and Practices

- Don't just blindly copy and paste code
- See notes in your `GPSTEST.js`
    - Stick to specific coding conventions
    - Generalize your functions so that they all do one thing very well. "Specialization through generalization."

- [How To GraphQL](https://www.howtographql.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Prisma](https://www.prisma.io/)

## Project Management

- Explicit wording
- Semantic project board
- **Getting on the same page**
- Wiki

Examples:
- [Grace Shopper Example Wiki](https://github.com/rushilshakya/GraceShopper/wiki)
- [Capstone Example Project Board](https://github.com/fullstack-yogis/postAR/projects/1)