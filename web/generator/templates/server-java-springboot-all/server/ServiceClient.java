package xyz.staffjoy.account.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import xyz.staffjoy.account.AccountConstant;
import xyz.staffjoy.account.dto.*;
import xyz.staffjoy.common.api.BaseResponse;
import xyz.staffjoy.common.auth.AuthConstant;
import xyz.staffjoy.common.validation.Group1;
import xyz.staffjoy.common.validation.PhoneNumber;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import <%=data.packageName%>.dto.*;

@FeignClient(name ="<%=data.nameClassName%>", path = <%=data.clientPath%>, url = "${staffjoy.account-service-endpoint}")
// TODO Client side validation can be enabled as needed
// @Validated
public interface <%=data.nameClassName%>Client {
    <%
    var operations = data.interfaces;
    operations.forEach(function(operation){
   %>
   @ResponseBody
   @RequestMapping(value = "<%=operation.declaredPath%>", method = RequestMethod.<%-operation.requestMethodType%>)
   public <%-operation.outputType%> <%=operation.name%>(@RequestBody <%-operation.inputType%> request);
   <%
     })
    %>
   
}
