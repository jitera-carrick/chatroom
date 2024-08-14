import makeValidation from "@withvoid/make-validation";
import UserModel from "../models/User.js";
import RoomModel from "../models/Room.js";
import ReceptorModel from "../models/Receptor.js";

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
        const conflictUser = await UserModel.findOne({
          username: name,
          roomId,
        });
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
  fetchSomatosensorySystemInfo: async (req, res) => {
    try {
      // TODO: Implement authentication and authorization checks

      const receptors = await ReceptorModel.find().populate('sensations');
      const somatosensorySystemInfo = receptors.map(receptor => ({
        type: receptor.type,
        function: receptor.function,
        sensations: receptor.sensations.map(sensation => ({
          description: sensation.description
        }))
      }));

      return res.status(200).json({ somatosensorySystemInfo });
    } catch (error) {
      // TODO: Optimize error handling based on specific error types
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
  onDeleteUserById: async (req, res) => {},
};