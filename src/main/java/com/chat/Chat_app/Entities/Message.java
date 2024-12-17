package com.chat.Chat_app.Entities;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter


public class Message {
    private String sender;
    private String content;
    private LocalDateTime timestamp;
    public Message(String sender , String content){
        this.sender = sender;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    public Message(){}

}
