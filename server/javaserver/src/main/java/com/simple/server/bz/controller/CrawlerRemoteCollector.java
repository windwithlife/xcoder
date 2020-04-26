package com.simple.server.bz.controller;


import com.simple.server.bz.entity.Indexfutures;

import com.simple.server.bz.service.IndexfuturesService;
import com.simple.server.bz.service.CrawlerRemoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/crawlerCollector")
public class CrawlerRemoteCollector {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private CrawlerRemoteService crawlerRemoteService;

    @ResponseBody
    @RequestMapping(value = "/saveRealtimeFutures", method = RequestMethod.POST)
    private void saveRealtimeFutures(@RequestBody Indexfutures item) {
        crawlerRemoteService.saveRealtimeFutures(item);
    }


}
