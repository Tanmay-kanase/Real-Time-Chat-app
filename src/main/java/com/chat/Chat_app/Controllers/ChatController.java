package com.chat.Chat_app.Controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.chat.Chat_app.Entities.Message;
import com.chat.Chat_app.Entities.Room;
import com.chat.Chat_app.payload.MessageRequest;
import com.chat.Chat_app.repositories.RoomRepository;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // For sending and receiving messages
    @MessageMapping("/sendMessage/{roomId}") // message coming from here
    @SendTo("/topic/room/{roomId}") // message publish here
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request) {

        Room room = roomRepository.findByRoomId(request.getRoomId());
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimestamp(LocalDateTime.now());

        if (room != null) {
            room.getMessages().add(message);
            roomRepository.save(room);
        } else {
            throw new RuntimeException("Room not found!!!!!!!");
        }

        return null;
    }
}
