
FROM java-maven:base

ADD pom.xml /tmp/build/
RUN cd /tmp/build && mvn -q dependency:resolve

ADD src /tmp/build/src
RUN mkdir -p /runDIR/
      
RUN cd /tmp/build && mvn -q -DskipTests=true  package \
        && mv target/*.jar /runDIR/app.jar \
        && cd /

EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/runDIR/app.jar","--spring.profiles.active=docker"]

