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
      name, email, password: hashedPassword, login, phone, inn: Number(inn),
    });
    // const getCompanyId = createCompany.get();
    // const createAdminCategory = await Work_category.create({ name: 'admin', company_id: getCompanyId.id });
    // const getCategoryId = createAdminCategory.get();
    // const createCompanyAdmin = await Worker.create({
    //   name: null,
    //   secondname: null,
    //   patronymic: null,
    //   category_id: getCategoryId.id,
    //   company_id: getCompanyId.id,
    //   email: null,
    //   phone: null,
    //   accepted: true,
    // });
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
    const { password, login } = req.body;
    const findWorker = await Worker.findOne({ where: { login } });
    // attributes: ['id', 'name', 'login', 'email', 'password']
    if (!findWorker) {
      return res.status(401).json({ msg: 'Try again' });
    }
    // const comparePassword = await bcrypt.compare(password, findWorker.password);
    const comparePassword = password === findWorker.password;
    if (comparePassword) {
      delete findWorker.password;
      req.session.user = findWorker;
      return res.json(findWorker);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
router.post('/createuser', async (req, res) => {
  try {
    const {
      login, password, name, second_name, patronymic, email, phone,
    } = req.body;
    const companyId = req.session.company.id;
    const createWorker = await Worker.create({
      login,
      password,
      name,
      second_name,
      patronymic,
      category_id: 1,
      company_id: companyId,
      email,
      phone,
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
