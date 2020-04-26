package com.simple.server.bz.service;


import com.simple.server.bz.entity.Indexfutures;
import com.simple.server.bz.service.IndexfuturesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Service
public class CrawlerRemoteService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IndexfuturesService indexfuturesService;

    public Indexfutures saveRealtimeFutures(Indexfutures item) {
        Indexfutures one = indexfuturesService.findOneByName(item.getName());
        if (null != one){
            item.setId(one.getId());
            indexfuturesService.save(item);
            logger.info("udpate index futures:" + item.getName());
            return item;

        }else{
            indexfuturesService.save(item);
            logger.info("add new index futures:" + item.getName());
            return item;
        }
    }



}
