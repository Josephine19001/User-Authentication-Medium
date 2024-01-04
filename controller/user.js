import UserServices from "../services/user.js";

export const signUp = async (req, res, next) => {
  try {
    const newUser = req.body;
    const savedUser = await UserServices.createUser(newUser);

    if (!newUser) {
      res.status(400).json({
        success: false,
        message: "Body cannot be empty",
      });
    }

    res.status(204).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    if (error.message === "User already exist") {
      res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    console.log(error);
    next(new Error(error.message));
  }
};

export const signIn = async (req, res, next) => {
  try {
    const payload = req.body;
    const token = await UserServices.signInUser(payload);
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(new Error(error.message));
  }
};
