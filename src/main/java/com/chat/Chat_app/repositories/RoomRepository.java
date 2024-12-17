package com.chat.Chat_app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chat.Chat_app.Entities.Room;


public interface RoomRepository extends MongoRepository<Room , String>{

    // Get room using room id
    Room findByRoomId(String roomId);
}
