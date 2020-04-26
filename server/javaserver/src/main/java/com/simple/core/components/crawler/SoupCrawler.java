package com.simple.core.components.crawler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;


import java.io.IOException;
import java.util.List;
import java.util.Map;

public abstract class SoupCrawler {
    //Logger logger = LoggerFactory.getLogger(this.getClass());
    Logger logger = LoggerFactory.getLogger(this.getClass());

    protected String url="https://cn.investing.com/commodities/real-time-futures";
    public void setUrl(String url){
        this.url = url;
    }
    public void start(){
        try {

            Document doc = Jsoup.connect(this.url)
                    .data("query", "Java")
                    .header("User-Agent", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9.2.2) Gecko/20100316 Firefox/3.6.2")
                    .cookie("auth", "token")
                    .timeout(10000)
                    .get();
            if (doc !=null){
                this.parser(doc);
            }
        }catch (IOException e){
            e.printStackTrace();
            logger.info("failed to get joup url data");
        }
    }
    public static Document getDocument(String url){
        try {

            Document doc = Jsoup.connect(url)
                    .data("query", "Java")
                    .userAgent("Mozilla")
                    .cookie("auth", "token")
                    .timeout(10000)
                    .get();
            if (doc !=null){
                return doc;
            }else{
                //logger.info("failed to get joup url data");
                return null;
            }
        }catch (IOException e){
            e.printStackTrace();
            //logger.info("failed to get joup url data");
            return null;
        }
    }
    protected abstract  void parser(Document doc);
    //protected abstract void doResult(Map<String,String> result);

}
