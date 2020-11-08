package com.simple.bz.controller;


import com.github.structlog4j.ILogger;
import com.github.structlog4j.SLoggerFactory;
import com.simple.bz.dto.ExampleDto;
import com.simple.bz.dto.ExampleVO;
import com.simple.bz.dto.ReleaseRequest;
import com.simple.bz.service.DeployService;
import com.simple.bz.service.MqttService;
import com.simple.common.api.BaseResponse;
import com.simple.common.api.GenericRequest;
import com.simple.common.api.GenericResponse;
import com.simple.common.auth.AuthConstant;
import com.simple.common.mqtt.MqttGateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/mqtt")
@Validated
public class MessageController {


    static final ILogger logger = SLoggerFactory.getLogger(MessageController.class);


//
//    @Autowired
//    private MqttGateway mqttGateway;

    @Autowired
    private MqttService mqttService;
    @Autowired
    private DeployService deployService;

//    @RequestMapping("/send")
//    @ResponseBody
//    public void send(@RequestParam Map params) {
//        // 发送消息到指定topic
//        try {
//            String topic = params.get("topic").toString();
//            String message = params.get("message").toString();
//            System.out.println("Received Topic is " +  topic);
//            System.out.println("Received Message is " +  message);
//            mqttGateway.sendToMqtt(topic, message);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//
//        }
//    }



    @PostMapping(path = "/test")
    GenericResponse test5(@RequestParam(value = "request") String request){
        System.out.println("received  params is" +  request);
        return GenericResponse.build().addKey$Value("result",request);
    }

    @PostMapping(path = "/test6")
    GenericResponse test6(@RequestBody GenericRequest req){
       GenericResponse result = new GenericResponse();
       result.setDataObject(ExampleVO.builder().email(req.getString("email")).name(req.getString("name")).build());
       return result;
    }


    @PostMapping(path = "/deploy")
    GenericResponse deployment (@RequestBody GenericRequest req){
        System.out.println(req.toString());
        ReleaseRequest releaseDto = req.getObject(ReleaseRequest.class);
        deployService.deployApplication(releaseDto);
        GenericResponse result = new GenericResponse(releaseDto);
        return result;
    }

    @PostMapping(path = "/addnew")
    BaseResponse createExample(@RequestBody GenericRequest req){
        ExampleDto paramObj  = req.getObject(ExampleDto.class);
        ExampleVO vo = this.mqttService.save(paramObj);
        GenericResponse result = new GenericResponse(vo);
        return result;
    }


    @PostMapping(path = "/update")
    BaseResponse update(@RequestBody GenericRequest req){

        ExampleDto dto  = req.getObject(ExampleDto.class);
        ExampleVO vo = this.mqttService.update(dto);
        GenericResponse result = new GenericResponse();
        result.setDataObject(vo);
        return result;
    }

    @PostMapping(path = "/deleteById")
    BaseResponse delete(@RequestParam String id){
        String resultId = this.mqttService.deleteById(id);
        GenericResponse result = new GenericResponse();
        result.addKey$Value("deleteId", resultId);
        return result;
    }


}
