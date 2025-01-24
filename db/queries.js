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

async function addFolder(userId, folderName) {
  try {
    await prisma.folder.create({
      data: {
        userId: userId,
        name: folderName,
      },
    });
  } catch (error) {
    console.error("error adding folder");
    throw error;
  }
}

async function getAllFolders(userId) {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: userId,
      },
    });
    console.log("this contains all of the folders", folders);
    return folders;
  } catch (error) {
    console.log("couldnt get all of the folders");
    throw error;
  }
}

async function deleteFolder(folderId) {
  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
  } catch (error) {
    console.error("could not delete folder");
    throw error;
  }
}

async function addFile(filename, size, folderId) {
  try {
    await prisma.file.create({
      data: {
        folderId: folderId,
        filename: filename,
        size: size,
      },
    });
  } catch (error) {
    console.error("adding file is not working");
    throw error;
  }
}

async function getFolderFiles(folderName) {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        name: folderName,
      },
    });
    const folderId = folder.id;
    const files = await prisma.file.findMany({
      where: {
        folderId: folderId,
      },
    });
    return files;
  } catch (error) {
    console.error("cannot get folder files");
    throw error;
  }
}

module.exports = {
  addUserData,
  getUser,
  getId,
  addFolder,
  getAllFolders,
  deleteFolder,
  addFile,
  getFolderFiles,
};
