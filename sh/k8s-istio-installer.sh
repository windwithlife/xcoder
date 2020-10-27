#!/bin/bash

#curl -L https://istio.io/downloadIstio | sh -
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.6.8 TARGET_ARCH=x86_64 sh -

echo export PATH=$PATH:$PWD/istio-1.6.8/bin >> ~/.bash_profile
source ~/.bash_profile
istioctl install --set profile=demo --set values.gateways.istio-ingressgateway.type=ClusterIP
#istioctl manifest apply --set profile=demo --set values.gateways.istio-ingressgateway.type=ClusterIP

kubectl label namespace default istio-injection=enabled

#istioctl manifest generate --set profile=demo | kubectl delete -f -

#在网关前面加入 Envoy代理，提供网关开发扩展，支持公网80，443等端口开放
kubectl create configmap front-envoy -n istio-system --from-file=front-envoy.yaml=../k8s/istio-ingressgateway-proxy.yaml

kubectl label nodes node1 edgenode=true

kubectl apply -f ../k8s/envoy.yaml -n istio-system

#kubectl create secret tls tls-xxx.xxx.com -n default --cert=xxx.xxx.xxx.pem --key=xxx.xxx.xxx.key --dry-run -o yaml > tls.yaml
# Kubernetes <1.16
# kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.3/cert-manager-legacy.yaml
# Kubernetes 1.16+
# kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.3/cert-manager.yaml
