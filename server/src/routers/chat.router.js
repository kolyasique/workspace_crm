const router = require('express').Router();

const { Worker, Message, Sequelize } = require('../../db/models');

router.get('/user', async (req, res) => {
  const userId = req.session.company.id;
  const companyId = req.session.company.company_id;
  try {
    const authUser = await Worker.findOne({ where: { id: userId } });
    const companyUsers = await Worker.findAll({ where: { company_id: companyId } });
    res.json({ authUser, companyUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

router.post('/message', async (req, res) => {
  const { userFromId } = req.body;
  try {
    const revMessages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [{ user_from: userFromId, user_to: req.session.company.id },
          { user_from: req.session.company.id, user_to: userFromId }],
      },
    });
    const messages = revMessages.reverse();
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
