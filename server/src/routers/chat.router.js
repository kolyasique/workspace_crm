const router = require('express').Router();

const { Worker } = require('../../db/models');

router.get('/', async (req, res) => {
  const userId = req.session.company.id;
  const companyId = req.session.company.company_id;
  try {
    const authUser = await Worker.findOne({ where: { id: userId } });
    const companyUsers = await Worker.findAll({ were: { company_id: companyId } });
    res.json({ authUser, companyUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
