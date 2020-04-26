package com.simple.server.bz.jobs;

import com.simple.server.bz.entity.Indexfutures;
import com.simple.server.bz.service.IndexfuturesService;
import com.simple.server.bz.service.CrawlerRemoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.downloader.HttpClientDownloader;
import us.codecraft.webmagic.pipeline.ConsolePipeline;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.proxy.Proxy;
import us.codecraft.webmagic.proxy.SimpleProxyProvider;

@Component
public class XFuturesCrawler implements PageProcessor {
    Logger logger = LoggerFactory.getLogger(this.getClass());


    private Site site = Site.me().setCharset("utf-8").setTimeOut(40000).setRetryTimes(3).setSleepTime(100).setUserAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");

    public  final String url_index     = "https://cn.investing.com/indices/indices-futures";
    public  final String url_commodity = "https://cn.investing.com/commodities/real-time-futures";
    public static final String URL_INDEX     = "https://cn\\.investing\\.com/indices/\\s+";
    public static final String URL_COMMODITY = "https://cn\\.investing\\.com/commodities/\\s+";

    @Autowired
    CrawlerRemoteService service;
    @Override
    public void process(Page page) {

        if (page.getUrl().regex(XFuturesCrawler.URL_INDEX).match()) {
            parserIndex(page);
        }else{
            parserCommodity(page);
        }



    }
    private void parserIndex(Page page){
        page.getHtml().css("table#cross_rate_1").css("tr").nodes().forEach( element -> {
            if (element.css("th").all().size() >0){
                ;
            }else{
                String name     = element.css(".elp").xpath("//td/a/text()").get();

                String vmonth   = element.css("td").nodes().get(2).xpath("//td/text()").get();
                String vlast    = element.css("td").nodes().get(3).xpath("//td/text()").get();
                String vlow     = element.css("td").nodes().get(4).xpath("//td/text()").get();
                String vhigh    = element.css("td").nodes().get(5).xpath("//td/text()").get();
                String vchange  = element.css("td").nodes().get(6).xpath("//td/text()").get();
                String vchangep = element.css("td").nodes().get(7).xpath("//td/text()").get();
                String vtime    = element.css("td").nodes().get(8).xpath("//td/text()").get();

                System.out.println(name  + vmonth + vlast + vlow + vhigh + vchange + vchangep + vtime);
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
                service.saveRealtimeFutures(item);
            }
        });
    }
    private void parserCommodity(Page page){

        page.getHtml().css("table#cross_rate_1").css("tr").nodes().forEach( element -> {
            if (element.css("th").all().size() >0){
                ;
            }else{
                String name     = element.css(".elp").xpath("//td/a/text()").get();

                String vmonth   = element.css("td").nodes().get(2).xpath("//td/text()").get();
                String vlast    = element.css("td").nodes().get(3).xpath("//td/text()").get();
                String vlow     = element.css("td").nodes().get(4).xpath("//td/text()").get();
                String vhigh    = element.css("td").nodes().get(5).xpath("//td/text()").get();
                String vchange  = element.css("td").nodes().get(6).xpath("//td/text()").get();
                String vchangep = element.css("td").nodes().get(7).xpath("//td/text()").get();
                String vtime    = element.css("td").nodes().get(8).xpath("//td/text()").get();

                System.out.println(name  + vmonth + vlast + vlow + vhigh + vchange + vchangep + vtime);
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
                item.setFutureType("commodity");
                service.saveRealtimeFutures(item);
            }
        });
    }
    @Override
    public Site getSite() {
        return site;
    }

    public  void start() {
        HttpClientDownloader httpClientDownloader = new HttpClientDownloader();
        httpClientDownloader.setProxyProvider(SimpleProxyProvider.from(
                new Proxy("112.14.158.86",33987),
                new Proxy("222.92.85.37",51511),
                new Proxy("121.232.194.152",9000)

        ));

        Spider.create(this).setDownloader(httpClientDownloader).addPipeline(new ConsolePipeline()).addUrl(this.url_index).addUrl(this.url_commodity).thread(3).run();
        //Spider.create(new XWebMagic()).addPipeline(new ConsolePipeline()).addUrl("https://cn.investing.com/commodities/real-time-futures").thread(5).run();


    }
}









