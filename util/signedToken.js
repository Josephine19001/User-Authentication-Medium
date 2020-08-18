import * as jwt from "jsonwebtoken";

import key from "../keys";

const getSignedToken = function (id) {
  return jwt.sign({ _id: id }, key.JWT_SECRET, { expiresIn: "1hr" });
};

export default getSignedToken;
