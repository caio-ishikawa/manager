# Manager (Work in Progress || Placeholder Name) #

Manager is a Discord-inspired collaboration desktop app, which allows users to create servers (similar to Discord), add users to it, conduct conversations, upload documents, and to privately chat with any user in your friends list.

## Technologies ##
- MERN (MongoDB, Express, ReactJS, NodeJS).
- Web Sockets for real-time chatting (Socket.io).
- Multer for file uploads.
- AWS for storing images/files.

## KNOWN BUGS ##
- ~~Messages get rendered more than once sometimes (They are NOT getting sent multiple times to the DB, so it must be a rendering bug)~~ (FIXED)
- Online user feature does not update automatically (needs to switch server/cause re-render to trigger).

### TODO: ###
- Add voice/video chat (WebRTC).
- Get profile pictures to show up on chat.
- Add profile picture support for user-created servers (UI + API endpoint built).

