package com.chat.Chat_app.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageUploader {
    String uploadImage(MultipartFile image);

    List<String> allFiles();

    String preSignedUrl(String fileName);


}
