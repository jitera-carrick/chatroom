import makeValidation from "@withvoid/make-validation";
import UserModel from "../models/User.js";

export default {
  onGetAllUsers: async (req, res) => {},
  onGetUserById: async (req, res) => {},
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          name: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json(validation);

      const { name } = req.body;
      const user = await UserModel.createUser(name);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {},
};
