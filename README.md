# chatroom
Generals:
- This app lets user join a chat room after specifying username and roomId.
- Users can chat with others if they join the room with same roomId. To do that, open two tabs and join with different users.
- It's deployed to heroku https://viet-chatroom.herokuapp.com/#/. This is a free server so you might get Not Found at first. You will have to wait for some minutes and it will be fine.

Technologies & Languages:
- Nodejs Express for server and Reactjs/Parcel for frontend.
- MongoDB Atlas for DB.
- Server structure is divided into routes, controllers and models according to MVC model.
- Client is using React hooks and React router. Pages are inside component folder.
- Material UI is used for stylting, CSS in JS used.

Known issues and improvements to be done:
- Exit room functionality not implemented.
- Delete users when disconnected is not implemented.
- No unit tests, e2e tests and Typescript due to time constraint.
