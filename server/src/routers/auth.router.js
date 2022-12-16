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
    if (!password || !email || !name || !inn || !login || !phone) {
      res.send({ msg: 'не все поля заполнены' });
    } else {
      const createCompany = await Company.create({
        login, password: hashedPassword, name, email, phone, inn,
      });
      const newCompany = createCompany.get();
      delete newCompany.password;
      delete newCompany.createdAt;
      delete newCompany.updatedAt;
      req.session.company = newCompany;
      return res.json(newCompany);
    }
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
      return res.json({ msg: 'Wrong login' });
    }
    if (!password || !login) {
      res.send({ msg: 'не все поля заполнены' });
    } else {
      const comparePassword = await bcrypt.compare(password, findWorker.password);
      if (comparePassword) {
        delete findWorker.password;
        delete findWorker.createdAt;
        delete findWorker.updatedAt;
        req.session.company = findWorker;
        return res.json(findWorker);
      }
      if (!comparePassword && findWorker) {
        return res.json({ msg: 'Wrong pass' });
      }
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});
router.post('/signinadmin', async (req, res) => {
  try {
    const { password, inn } = req.body;
    console.log('🚀🚀🚀🚀 =>>>>> file: auth.router.js:68 =>>>>> router.post =>>>>> req.body', req.body)

    const findCompany = await Company.findOne({ where: { inn } });
    if (!findCompany) {
      return res.json({ msg: 'Wrong login' });
    }
    if (!password || !inn) {
      res.send({ msg: 'не все поля заполнены' });
    } else {
      const comparePassword = await bcrypt.compare(password, findCompany.password);
      if (comparePassword) {
        delete findCompany.password;
        delete findCompany.createdAt;
        delete findCompany.updatedAt;
        req.session.company = findCompany;
        return res.json(findCompany);
      }
      if (!comparePassword && findCompany) {
        return res.json({ msg: 'Wrong pass' });
      }
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
