const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProject = (req, res) => {
  const { name, description } = req.body;
  const contribution = req.body.contribution;

  prisma.projects
    .create({
      data: {
        name: name,
        description: description,
        contribution: {
          create: contribution.map((user) => ({
            user: {
              connect: {
                id: user,
              },
            },
          })),
        },
      },
      include: {
        contribution: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {});
};

exports.getAllProjects = (req, res) => {
  prisma.projects
    .findMany({
      include: {
        contribution: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};

exports.getAllProjectsById = (req, res) => {
  const { id } = req.params.id;
  prisma.projects
    .findMany({
      where: {
        contribution: {
          user: {
            id: id,
          },
        },
      },
      include: {
        contribution: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};

exports.updateProject = (req, res) => {
  const id = req.params.id;
  const { name, description, contribution } = req.body;

  prisma.projects
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        description: description,
        contribution: {
          deleteMany: {},
          create: contribution.map((user) => ({
            user: {
              connect: {
                id: user,
              },
            },
          })),
        },
      },
      include: {
        contribution: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {});
};

exports.deleteProject = (req, res) => {
  const { i } = req.params;
  prisma.projects
    .delete({
      where: {
        id: parseInt(i),
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};
