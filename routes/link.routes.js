const { Router } = require("express");
const Link = require("../models/Link");
const config = require('config')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const router = Router();

router.post("/generate",auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body // витягуэмо ссилку

    const code = shortid.generate() //Генеруэмо код

    const existing = await Link.findOne({from})  //Перевыряэмо, чи вже оброблювалась дана ссилка

    if (existing) {
      return res.json({link:existing})
    }
    //генеруэмо нову ссилку
    const to = baseUrl + '/t/' + code

    const link = new Link({
      from, to, code, owner: req.user.userId
    })

    await link.save()
    res.status(201).json({link})

  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так" });
  }
});


//Потрыбно створити додатковий mідлвейр для того, щоб перевіряв, чи авторизований користувач і чи валідний у нього JwtToken
router.get("/", auth, async (req, res) => {
  try {
      const links = await Link.find({owner: req.user.userId})//Шукаємо всі ссилки даного користувача
      res.json(links)
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

router.get("/:id",auth, async (req, res) => {
  try {
      const link = await Link.findById(req.params.id)
      res.json(link)
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так" });
  }
});

module.exports = router;
