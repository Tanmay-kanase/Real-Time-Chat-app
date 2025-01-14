package com.chat.Chat_app.Controllers;

import com.chat.Chat_app.services.ImageUploader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/s3")
public class S3Controller {

    private ImageUploader uploader;

    public S3Controller(ImageUploader uploader){
        this.uploader = uploader;
    }

    @PostMapping
   public ResponseEntity<?> uploadImage(MultipartFile file){
       return ResponseEntity.ok(uploader.uploadImage(file));
   }

   @GetMapping()
   public List<String> getAllFiles(){

        return uploader.allFiles();
   }
}
