package com.chat.Chat_app.services;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.apigateway.AmazonApiGateway;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.chat.Chat_app.exception.ImageUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class S3ImageUploader implements ImageUploader{
    @Autowired
    private AmazonS3 client;
     @Value("${app.s3.bucket}")
    private String bucketName;

    @Override
    public String uploadImage(@RequestParam MultipartFile image) {
        if(image == null){
            System.out.println("NUll image name");
        }
        String actualFileName = image.getOriginalFilename();
        String fileName = UUID.randomUUID().toString() + actualFileName.substring(actualFileName.lastIndexOf("."));
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(image.getSize());
        try {
            PutObjectResult putObjectResult = client.putObject(new PutObjectRequest(bucketName , fileName , image.getInputStream() , metadata ));
            return this.preSignedUrl(fileName);
        } catch (IOException e) {
            throw new ImageUploadException("error in uploading image" + e.getMessage());
        }
    }

    @Override
    public List<String> allFiles() {

        ListObjectsV2Request ListObjectRequest = new ListObjectsV2Request().withBucketName(bucketName);

        ListObjectsV2Result listObjectsV2Result =  client.listObjectsV2(ListObjectRequest);

        List<S3ObjectSummary> objectSummaries = listObjectsV2Result.getObjectSummaries();

        List<String> listOfFiles = objectSummaries.stream().map(item -> this.preSignedUrl(item.getKey())).collect(Collectors.toList());

        return listOfFiles;
    }

    @Override
    public String preSignedUrl(String fileName) {

        Date expirationDate = new Date();

        long time = expirationDate.getTime();
        int hour = 2;
        time = time + hour * 60 * 60 *1000;
        expirationDate.setTime(time);

        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName , fileName)
                .withMethod(HttpMethod.GET)
                        .withExpiration(expirationDate);
       URL url =  client.generatePresignedUrl(generatePresignedUrlRequest);

        return url.toString();
    }
}
