package com.simple.server.bz.jobs;

import com.simple.core.components.crawler.SoupCrawler;
import com.simple.server.bz.entity.Indexfutures;
import com.simple.server.bz.controller.*;
import com.simple.server.bz.service.*;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class IndexfuturesCrawler extends SoupCrawler{
    //private static IndexfuturesCrawler ourInstance = new IndexfuturesCrawler();

    //public static IndexfuturesCrawler getInstance() {
       // return ourInstance;
    //}
    Logger logger = LoggerFactory.getLogger(this.getClass());
    protected String myUrl="https://cn.investing.com/indices/indices-futures";

    @Autowired
    IndexfuturesService indexfuturesService;

    private IndexfuturesCrawler() {
        this.setUrl(this.myUrl);
    }

    @Override
    protected void parser(Document doc) {
        List<Element> contents = doc.getElementById("cross_rate_1").getElementsByTag("tr");
        contents.forEach(element -> {
            if (element.getElementsByTag("th").size() >0){
                return;
            }else{
                String name     = element.getElementsByClass("elp").first().text();
                String vmonth   = element.getElementsByTag("td").get(2).text();
                String vlast    = element.getElementsByTag("td").get(3).text();
                String vlow     = element.getElementsByTag("td").get(4).text();
                String vhigh    = element.getElementsByTag("td").get(5).text();
                String vchange  = element.getElementsByTag("td").get(6).text();
                String vchangep = element.getElementsByTag("td").get(7).text();
                String vtime    = element.getElementsByTag("td").get(8).text();

                System.out.println(name + vmonth + vlast + vlow + vhigh + vchange + vchangep + vtime);
                //System.out.println(name )
                logger.info("crawler get data:" +name + vmonth + vlast + vlow + vhigh + vchange + vchangep + vtime);


                Indexfutures item = new Indexfutures();
                item.setName(name);
                item.setVmonth(vmonth);
                item.setVlast(vlast);
                item.setVlow(vlow);
                item.setVhigh(vhigh);
                item.setVchange(vchange);
                item.setVchangep(vchangep);
                item.setVtime(vtime);
                item.setTday("strong Buy");
                item.setTweek("strong Buy");
                item.setFutureType("index");
                Indexfutures one = indexfuturesService.findOneByName(item.getName());
                if (one != null){
                    item.setId(one.getId());
                    indexfuturesService.save(item);
                    //System.out.println("udpate index futures:" + item.getName());
                    logger.info("udpate index futures:" + item.getName());


                }else{
                    indexfuturesService.save(item);
                    //System.out.println("add new index futures:" + item.getName());
                    logger.info("add new index futures:" + item.getName());
                }

            }
        });

    }

}
