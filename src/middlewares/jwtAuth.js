import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const { jwtToken, userTokens } = req.cookies;
  jwt.verify(jwtToken, "xyz", (err, decoded) => {
    if (err) return res.status(400).send("Invalid Credentials!");
    else {
      const userPayload = decoded;
      req.userId = userPayload.userID;
      const tokens = JSON.parse(userTokens);

      // console.log(tokens);
      if (!tokens.includes(jwtToken))
        return res.status(400).send("Invalid Credentials!");

      next();
    }
  });
};

export default jwtAuth;
