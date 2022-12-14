const router = require('express').Router();

const { Worker, Message } = require('../../db/models');

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

router.get('/message', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
