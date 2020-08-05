package comp9900.backend.Host;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import io.netty.handler.codec.base64.Base64Decoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Base64;

@Component
public class StorageService {
    private AmazonS3 amazonClient;

    @Value("${app.awsServices.bucketName}")
    private String bucketName;

    @Autowired
    public StorageService(AmazonS3 amazonS3) {
        this.amazonClient = amazonS3;
    }
    private File base64ToFile(String base64String, String filename) {
        byte[] imageBytes = Base64.getDecoder().decode(base64String);
        File image = new File(filename);
        try {
            OutputStream outputStream = new FileOutputStream(image);
            outputStream.write(imageBytes);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return image;
    }

    public void uploadFile(String base64String, String filename) {
        File file = base64ToFile(base64String, filename);
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, filename, file)
                .withCannedAcl(CannedAccessControlList.PublicRead);
        amazonClient.putObject(putObjectRequest);
        file.delete();
    }
}
