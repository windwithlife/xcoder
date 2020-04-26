package com.simple.server.bz.jobs;

import com.simple.server.bz.entity.Indexfutures;
import com.simple.server.bz.service.IndexfuturesService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class InvestingSearcher {
    Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    XFuturesCrawler futuresCrawler;

    //@Scheduled(cron = "0 0/2 * * * *")
    public void executeIndexFuturesSearcher() {

        logger.info("--------------Begin for Futures Searcher");
        futuresCrawler.start();
        logger.info("--------------The End for Futures Searcher");



    }

}
