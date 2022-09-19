const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user: User } = prisma;

const bcryp = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

const RSA_PUB = fs.readFileSync("./rsa/public.pem", "utf-8");
const RSA_PRIVATE = fs.readFileSync("./rsa/private.key", "utf-8");

exports.createUser = async (req, res) => {
  const { firstname, lastname, phone, email, password } = req.body;

  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      error: "Please Enter informations",
    });
  }
  // mettre le salage en Env

  const cryptPassword = await bcryp.hash(password, 12);

  User.create({
    data: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: cryptPassword,
      phone: phone,
      roleId: 2,
    },
  })
    .then((user) => {
      return res.status(201).send({
        message: "User was created successfully",
      });
    })
    .catch((error) => {
      if (error.code === "P2002") {
        return res.status(409).send({
          message: "Email has already been registered",
        });
      } else {
        return res.status(500).send({
          message: error.message || `Some error occurend when create user`,
        });
      }
    });
};

exports.loginUser = (req, res) => {
  // SI remember me set true au checkbox pour generer un cookie
  {
    const { email, password, remember } = req.body;

    User.findUnique({
      where: {
        email: email,
      },
    })
      .then(async (user) => {
        if (user) {
          const userValid = await bcryp.compare(password, user.password);
          if (userValid) {
            const token = jsonwebtoken.sign({}, RSA_PRIVATE, {
              subject: user.id.toString(),
              algorithm: "RS256",
              expiresIn: 60 * 60 * 24 * 30 * 6,
            });

            if (remember === true) {
              res.cookie("token", token, { httpOnly: true });
            }
            return res.status(200).json({
              userId: user.id,
              access_token: token,
              user: user,
            });
          } else {
            return res.status(401).json("Mauvais email ou mot de passe");
          }
        } else {
          return res.status(401).json("Mauvais email ou mot de passe");
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || `Some error occurend when retrieving user`,
        });
      });
  }
};

exports.getCurrentUser = async (req, res) => {
  // const token = req.headers.cookie.split(0, 6)[1];
  const token = req.cookies.token;

  if (token) {
    const decodedToken = jsonwebtoken.verify(token, RSA_PUB);

    if (decodedToken) {
      await User.findUnique({
        where: {
          id: parseInt(decodedToken.sub),
        },
      })
        .then((user) => {
          if (user) {
            return res.json(user);
          } else {
            return res.json(null);
          }
        })
        .catch((error) => {
          return res.json(null);
        });
    }
  } else {
    return res.json(null);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.end();
};
