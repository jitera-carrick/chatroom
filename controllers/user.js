import makeValidation from "@withvoid/make-validation";
import UserModel from "../models/User.js";
import RoomModel from "../models/Room.js";

export default {
  onGetAllUsers: async (req, res) => {},
  onGetUserById: async (req, res) => {},
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          name: { type: types.string },
          roomId: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json(validation);

      const { name, roomId } = req.body;
      const room = await RoomModel.findOne({ roomId });
      if (!room) {
        await RoomModel.createRoom(roomId);
      } else {
        const conflictUser = await UserModel.findOne({ name, roomId });
        if (conflictUser)
          return res.status(500).json({
            success: false,
            error:
              "Conflicting username in this room! Please choose another name",
          });
      }
      const user = await UserModel.createUser(name, roomId);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onDeleteUserById: async (req, res) => {},
};
