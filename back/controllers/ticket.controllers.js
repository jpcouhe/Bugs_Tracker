const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllTickets = (req, res) => {
  prisma.ticket
    .findMany({
      select: {
        createdAt: true,
        description: true,
        estimateTime: true,
        id: true,
        status: true,
        type: true,
        user: true,
        priority: true,
        project: true,
        title: true,
        ticketsContribution: {
          select: {
            user: true,
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

exports.getAllTicketsById = (req, res) => {
  const projectId = +req.params.project;
  prisma.ticket
    .findMany({
      where: {
        projectId: projectId,
      },
      include: {
        ticketsContribution: {
          select: {
            user: true,
          },
        },
        priority: true,
        status: true,
        type: true,
        user: true,
      },
      // select: {
      //   createdAt: true,
      //   description: true,
      //   estimateTime: true,
      //   id: true,
      //   status: true,
      //   type: true,
      //   user: true,
      //   priority: true,
      //   project: true,
      //   title: true,
      //   ticketsContribution: {
      //     select: {
      //       user: {
      //         select: {
      //           id: true,
      //         },
      //       },
      //     },
      //   },
      // },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};

exports.getOneTicket = (req, res) => {};
exports.updateTicket = (req, res) => {
  const {
    title,
    description,
    estimateTime,
    statusId,
    priorityId,
    typeId,
    ticketId,
    contributor,
  } = req.body;
  prisma.ticket
    .update({
      where: {
        id: ticketId,
      },
      data: {
        title: title,
        description: description,
        estimateTime: estimateTime,
        priorityId: +priorityId,
        typeId: +typeId,
        statusId: +statusId,

        ticketsContribution: {
          deleteMany: {},
          create: {
            user: {
              connect: {
                id: parseInt(contributor),
              },
            },
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
        priority: {
          select: {
            name: true,
            id: true,
          },
        },
        status: {
          select: {
            name: true,
            id: true,
          },
        },
        type: {
          select: {
            name: true,
            id: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        ticketsContribution: {
          select: {
            user: true,
          },
        },
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          `Some error occurend when retrieving user with id =${id}`,
      });
    });
};
exports.createTicket = (req, res) => {
  const {
    title,
    description,
    estimateTime,
    userId,
    projectId,
    statusId,
    typeId,
    priorityId,
    contributor,
  } = req.body;

  prisma.ticket
    .create({
      data: {
        title: title,
        description: description,
        estimateTime: estimateTime,
        userId: parseInt(userId),
        projectId: projectId,
        statusId: parseInt(statusId),
        typeId: parseInt(typeId),
        priorityId: parseInt(priorityId),
        ticketsContribution: {
          create: {
            user: {
              connect: {
                id: parseInt(contributor),
              },
            },
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
        priority: {
          select: {
            name: true,
            id: true,
          },
        },
        status: {
          select: {
            name: true,
            id: true,
          },
        },
        type: {
          select: {
            name: true,
            id: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        ticketsContribution: {
          select: {
            user: true,
          },
        },
      },
    })
    .then((data) => {
      res.status(200).json(data);
    });
};

exports.deleteTicket = (req, res) => {
  const { id } = req.params;

  prisma.ticket
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};

exports.postComment = (req, res) => {
  const { id } = req.params;
  const { content, user } = req.body;

  prisma.comment
    .create({
      data: {
        content: content,
        ticketId: parseInt(id),
        userId: user,
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};

exports.getComment = (req, res) => {
  const { id } = req.params;
  prisma.comment
    .findMany({
      where: {
        ticketId: parseInt(id),
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  prisma.comment
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500);
    });
};
