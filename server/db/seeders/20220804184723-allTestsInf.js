'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
        {
          nickname: "John",
          email: "john@gmail.exmpl",
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),    
        },
        {
          nickname: "Pablo",
          email: "pablo@gmail.exmpl",
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),    
        },
        {
          nickname: "Alex",
          email: "alex@gmail.exmpl",
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),    
        },
    ];

    const posts = [
      {    title: 'Red', body: "Red is associated with blood", user_id: 1,   createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/1`,},
      {    title: 'Blue', body: "Blue is associated with the sky", user_id: 2, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/2`,},
      {    title: 'Green ', body: "Green is associated with grass", user_id: 3, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/3`,},
      {    title: 'Yellow', body: "Yellow is associated with the sun", user_id: 1, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/4`},
    ];

    const comments = [
      { body: 'Red is my favorite color!', user_id: 2, post_id:1, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/2`,},
      { body: 'And I associate red with tomatoes!', user_id: 3, post_id:1, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/3`},
      { body: 'I have never been in the sky!!', user_id: 3, post_id:2, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/3`},
      { body: 'It`s okay, the time will come and it will come true', user_id: 2, post_id:2, createdAt: new Date(), updatedAt: new Date(), author:`${process.env.API_URL}/user/2`},
    ];

    await queryInterface.bulkInsert('Users', users);
    await queryInterface.bulkInsert('Posts', posts);
    await queryInterface.bulkInsert('Comments', comments);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
  
  },
};
