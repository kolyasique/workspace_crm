/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Company, Worker } = require('../../db/models');

router.get('/', (req, res) => {
  res.json({ user: req.session.company || null });
});

router.post('/signup', async (req, res) => {
  try {
    const { password, email, name, inn, login, phone } = req.body;
    console.log(req.body, '+++++ ЭТО ПРИЛЕТЕЛО НА РЕГИСТРАЦИЮ')
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('======================');
    const createCompany = await Company.create({ name, email, password: hashedPassword, login, phone, inn:Number(inn) });
    console.log({ createCompany });
    const newCompany = createCompany.get();
    delete newCompany.password;
    delete newCompany.createdAt;
    delete newCompany.updatedAt;
    req.session.company = newCompany;
    return res.json(newCompany);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { password, email } = req.body;
    const findWorker = await Worker.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'password'], raw: true });
    if (!findWorker) {
      return res.status(401).json({ msg: 'Try again' });
    }
    const comparePassword = await bcrypt.compare(password, findWorker.password);
    if (comparePassword) {
      delete findWorker.password;
      req.session.hr = findWorker;
      return res.json(findWorker);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.get('/signout', (req, res) => {
console.log(req.session)
  req.session.destroy();
  res.clearCookie('userSession');
  res.sendStatus(200);
});

module.exports = router;
