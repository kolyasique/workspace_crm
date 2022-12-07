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

    console.log(req.body);
    const findWorker = await Worker.findOne({ where: { login } });
    // attributes: ['id', 'name', 'login', 'email', 'password']
    console.log(findWorker);

    if (!findWorker) {
      return res.status(401).json({ msg: 'Try again' });
    }
    const comparePassword = await bcrypt.compare(password, findWorker.password);
    if (comparePassword && findWorker.category_id !== 1) {
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
    console.log(req.body);

    const findCompany = await Company.findOne({ where: { inn } });
    // attributes: ['id', 'name', 'login', 'email', 'password']
    console.log({ findCompany }, 'Это файнд компани');
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

router.post('/createuser', async (req, res) => {
  try {
    const {
      login, password, name, second_name, patronymic, email, phone, select
    } = req.body;
    const companyId = req.session.company.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createWorker = await Worker.create({
      login, password:hashedPassword, name, second_name, patronymic, category_id:Number(select), company_id: companyId, email, phone,

    });
    res.status(200);
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
