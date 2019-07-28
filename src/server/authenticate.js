import uuid from "uuid";
import md5 from "md5";
import { connectDb } from "./connectDb";

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDb();
  debugger;

  let tasks = await db
    .collection("tasks")
    .find({ owner: user.id })
    .toArray();

  let groups = await db
    .collection("groups")
    .find({ owner: user.id })
    .toArray();

  return {
    tasks,
    groups,
    session: {
      authenticated: "AUTHENTICATED",
      id: user.id
    }
  };
}

export const authenticationRoute = app => {
  debugger;
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDb();
    let collection = db.collection("users");

    let user = await collection.findOne({ name: username });
    debugger;

    if (!user) {
      return res.status(500).send("User not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return res.status(500).send("Password incorrect");
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userId: user.id
    });
    debugger;
    let state = await assembleUserState(user);

    res.send({ token, state });
  });
};
