const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user: User } = prisma;

exports.getAllUsers = (req, res) => {
  User.findMany()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurend when retrieving users",
      });
    });
};

exports.getOneUser = (req, res) => {
  const { id } = req.params;

  User.findUnique({
    where: {
      id: parseInt(id),
    },
  })
    .then((user) => {
      user
        ? res.status(200).send(user)
        : res.status(404).send({
            message: `Cannot find user with id=${id}`,
          });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurend when retrieving user with id =${id}`,
      });
    });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, phone, roleId } = req.body;

  User.update({
    where: {
      id: parseInt(id),
    },
    data: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      roleId: +roleId,
    },
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurend when retrieving user with id =${id}`,
      });
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.delete({
    where: {
      id: parseInt(id),
    },
  })
    .then(() => {
      res.status(200).send({
        message: "User was deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurend when deleting user with id =${id}`,
      });
    });
};
