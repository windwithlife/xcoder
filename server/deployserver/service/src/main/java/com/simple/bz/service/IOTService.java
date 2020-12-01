package com.simple.bz.service;

import com.qiniu.common.Zone;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import com.simple.common.mqtt.MqttAdapter;
import com.simple.common.mqtt.MqttProxy;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@RequiredArgsConstructor
@Service
public class IOTService extends MqttAdapter {

    private final MqttProxy mqttProxy;

    @PostConstruct
    private void init() {
        mqttProxy.registerHandler("tele/",this);
    }

    @Override
    public void handleMessage(String topic, String payload) {


        String statusType = "tele";
        String gatewayDevice = "";
        String command = "";
        if((!topic.startsWith("tele/")) && (!topic.startsWith("stat"))){
            //System.out.println("Not IOT Message !");
            return;
        }else{
            //System.out.println("Process in IOT service! start!" );
            System.out.println("Process in IOT service! Topic ===>" + topic +"Payload===>" +  payload);
            String[] params = StringUtils.split(topic,"/");
            if(params.length <=2){
                System.out.println("message is invalid!");
            }
            statusType = params[0];
            gatewayDevice = params[1];
            command = params[2];
        }

        if(statusType == "tele"){

            if(command.toUpperCase().equals("STATE")){
                this.processGatewayState();
            }
            if(command.toUpperCase().equals("SENSOR")){

                String [] validPayload = StringUtils.substringsBetween(payload, "{","}");
                System.out.println("Payload ====>" + validPayload[0]);
                this.processSensorState();
            }
        }

        if(statusType == "stat"){
            System.out.println("Received Command Response");
        }

    }

    public void processSensorState(){

    }

    public void processGatewayState(){

    }

}
