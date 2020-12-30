helm install sentry stable/sentry -n sentry 
--set ingress.enabled=true,ingress.hostname=sentry.iamle.com,service.type=ClusterIP \

--wait

作者：流水理鱼
链接：https://www.imooc.com/article/303501
来源：慕课网
本文原创发布于慕课网 ，转载请注明出处，谢谢合作
helm install sentry stable/sentry -n sentry 

--set persistence.enabled=true,user.email=i@iamle.com,user.password=i@iamle.com \
--set ingress.enabled=true,ingress.hostname=sentry.iamle.com,service.type=ClusterIP \
--set email.host=smtp.yourhost.com,email.port=25 \
--set email.user=user,email.password=password,email.use_tls=false \
--wait

helm repo add incubator http://mirror.azure.cn/kubernetes/charts-incubator

作者：流水理鱼
链接：https://www.imooc.com/article/303501
来源：慕课网
本文原创发布于慕课网 ，转载请注明出处，谢谢合作