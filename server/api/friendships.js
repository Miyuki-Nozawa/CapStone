const router = require('express').Router()
const { models: { Friendship, User }} = require('../db')

module.exports = router;

router.get('/:id', async (req, res, next) => {
    try {
      console.log('friendship')
      const friends = await Friendship.findAll({
        where: { user: id },
        include: [{
            model: User,
            as: 'info'
        }]
    });
    // const friends = await Friendship.findAll()
    res.send(friends)
    }
    catch (e) {
      console.log(e)
    }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Friendship.create(req.body);
    console.log(data)
  }
  catch (e) {
      console.log(e)
  }
})



// router.get('/confirmed', async (req, res, next) => {
//     try {
//         console.log('enter try')
//         const friends = await Friendship.findAll({
//             where: {
//                 status: "confirmed"
//             }
//         });
//         res.send(friends)
//         console.log('exit try')
//     }
//     catch (e) {
//         console.log(e)
//     }
// })

