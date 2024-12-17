package com.chat.Chat_app.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.chat.Chat_app.Entities.Message;
import com.chat.Chat_app.Entities.Room;
import com.chat.Chat_app.repositories.RoomRepository;

@RestController
@RequestMapping("api/v1/rooms")
public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }
   // create Room
   @PostMapping
   public ResponseEntity<?> createRoom(@RequestBody String roomId){

    if(roomRepository.findByRoomId(roomId) != null){
        // room is already there 
        return ResponseEntity.badRequest().body("Room already exists!");
    }
    Room room = new Room();
    room.setRoomId(roomId);
    Room savedRoom = roomRepository.save(room);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
      
   }
   // get Room
   @GetMapping("/{roomId}")
   public ResponseEntity<?> joinRoom(@PathVariable String roomId){
    Room room = roomRepository.findByRoomId(roomId);
    if(room == null){
        return ResponseEntity.badRequest().body("Room not found !");
    }
    return ResponseEntity.ok(room);
   }
   // get messages from rooms

   @GetMapping("/{roomId}/messages")
   public ResponseEntity<List<Message>> getMessages(
    @PathVariable String roomId,
    @RequestParam(value = "page" , defaultValue = "0", required = false) int page,
    @RequestParam(value = "size" , defaultValue = "30" , required = false) int size
   ){
    Room room = roomRepository.findByRoomId(roomId);
    if(room==null){
        return ResponseEntity.badRequest().build();
    }
    // get messages :
    //pagination 

    
    List<Message> messages = room.getMessages();
    int start = Math.max(0,messages.size()-(page+1)*size);
    int end = Math.min(messages.size(), start * size);
    List<Message> paginatedMessages =  messages.subList(start, end);
    return ResponseEntity.ok(messages);

   }
}