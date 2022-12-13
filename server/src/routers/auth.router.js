/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Company, Worker, Work_category } = require('../../db/models');

router.get('/', (req, res) => {
  res.json({ user: req.session.company || null });
});

router.post('/signup', async (req, res) => {
  try {
    const {
      password, email, name, inn, login, phone,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createCompany = await Company.create({
      login, password: hashedPassword, name, email, phone, inn,
    });

    console.log(createCompany, 'Это криейт компани');

    const newCompany = createCompany.get();
    delete newCompany.password;
    delete newCompany.createdAt;
    delete newCompany.updatedAt;
    req.session.company = newCompany;
    console.log(newCompany, 'ЭТО В ДЖСОН УХОДИТ');
    return res.json(newCompany);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.post('/signinworker', async (req, res) => {
  try {
    const { password, login } = req.body;

    const findWorker = await Worker.findOne({ where: { login } });
    // attributes: ['id', 'name', 'login', 'email', 'password']

    if (!findWorker) {
      return res.status(401).json({ msg: 'Try again' });
    }
    const comparePassword = await bcrypt.compare(password, findWorker.password);
    if (comparePassword) {
      delete findWorker.password;
      delete findWorker.createdAt;
      delete findWorker.updatedAt;
      req.session.company = findWorker;
      return res.json(findWorker);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
router.post('/signinadmin', async (req, res) => {
  try {
    const { password, inn } = req.body;

    const findCompany = await Company.findOne({ where: { inn } });
    // attributes: ['id', 'name', 'login', 'email', 'password']
    if (!findCompany) {
      return res.status(401).json({ msg: 'Try again' });
    }
    const comparePassword = await bcrypt.compare(password, findCompany.password);
    if (comparePassword) {
      delete findCompany.password;
      delete findCompany.createdAt;
      delete findCompany.updatedAt;
      req.session.company = findCompany;
      return res.json(findCompany);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.clearCookie('userSession');
  res.sendStatus(200);
});

module.exports = router;
