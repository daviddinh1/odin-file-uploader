const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUserData(username, password) {
  try {
    await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

async function getUser(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    console.error("couldnt find user");
    throw error;
  }
}

async function getId(user_id) {
  try {
    const id = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    return id;
  } catch (error) {
    console.error("id does not exist");
    throw error;
  }
}

module.exports = { addUserData, getUser, getId };
