import { Button, Typography } from "@mui/material";

export const renderChannels = (channels, socket, server, email) =>{
    // Emits when user joins video room //
    const emit = (idx) => {
        let roomID = server + channels[idx];
        console.log("VIDEO ROOM ID: ", roomID);
        socket.emit("joined video", ({ room: roomID, email: email }));
    };
    return channels.map((chan, idx) => (
        <div key={idx}>
            <Button variant="text" sx={{ color: "white"}} onClick={() => emit(idx)}>#{chan}</Button>
        </div>
    ))
};