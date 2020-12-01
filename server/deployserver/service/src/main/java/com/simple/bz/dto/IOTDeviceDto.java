package com.simple.bz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class IOTDeviceDto {

    private Long id;
    private Long     gatewayDeviceId; //绑定网关设备ID
    private String   code;         //识别码
    private String   modelId;      //型号
    private String   manufacturer; //制造厂商
    private String   shortAddress; //短地址
    private String   address;      //长地址

    private String   batteryVoltage; //电压；

    private String   endpoint;       //终端组
    private String   supportAbility; //支持能力

    private boolean  active;
    private Date     upTime;
    private Date     createTime;


}
