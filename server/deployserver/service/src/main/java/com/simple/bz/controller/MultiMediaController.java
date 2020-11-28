package com.simple.bz.controller;

import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.Configuration;

import com.qiniu.util.Auth;

import com.simple.common.api.GenericResponse;
import com.simple.common.controller.BaseController;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/media")
public class MultiMediaController extends BaseController {

    //private UploadManager uploadManager;
    //private Auth auth ;
    //private Auth auth;
    private String upToken;
    @Value("${qiniu.accessKey}")
    private String accessKey;

    @Value("${qiniu.secretKey}")
    private String secretKey;

    @Value("${qiniu.bucket}")
    private String bucket;
    //private String bucket = "ehealthcare";
    private final String GROUP = "public";

//    @PostConstruct
//    private void init() {
//
//        uploadManager = new UploadManager();
//        auth = Auth.create(accessKey, secretKey);
//        upToken = auth.uploadToken(bucket);
//    }

    /**
     * 上传文件
     * @param group 文件分组
     * @param file 文件数据
     * @return
     */
    @PostMapping("/uploadImage/{group}")
    public GenericResponse upload(@PathVariable("group") String group, @RequestParam("file") MultipartFile file) {
        Configuration cf = new Configuration(Zone.zone0());
        UploadManager uploadManager = new UploadManager(cf);
        Auth auth = Auth.create(this.accessKey, this.secretKey);
        String upToken = auth.uploadToken(this.bucket);

        if(StringUtils.isEmpty(group)) {
            group = GROUP;
        }
        System.out.println("current group ==> " + group + "accessKey" + this.accessKey + "secreteKey=>" + this.secretKey);
        if(file == null || file.getSize() <= 0) {
            return GenericResponse.error("file not found");
        }

        try {

            String key = fileName(group , file.getOriginalFilename());
            System.out.println("current filename ==>" +  key +"upToken==>" + upToken);
            Response response = uploadManager.put(file.getBytes(), key, upToken);
            if(response.isOK()) {
                System.out.println("current status ==> OK");
                return GenericResponse.ok(key);
            }else {
                System.out.println("current status ==> failure");
                System.out.println(response.toString());
                return GenericResponse.error("上传文件失败，请重试或联系管理员！");
            }

        }catch(IOException e) {
            e.printStackTrace();
            return GenericResponse.error("上传文件异常，请联系管理员！");
        }

    }

    private String fileName(String group , String originalFilename) {

        String fileSuffix = originalFilename.substring(originalFilename.lastIndexOf("."), originalFilename.length());
        String newFileName = UUID.randomUUID().toString().replaceAll("-", "") + fileSuffix;
        return group +"/"+ newFileName;
    }




}
