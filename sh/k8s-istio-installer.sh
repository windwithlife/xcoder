#!/bin/bash

#curl -L https://istio.io/downloadIstio | sh -
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.6.7
cd istio-1.6.7/bin
echo export export PATH=$PATH:$HOME/install/istio-1.6.7/bin >> ~/.bash_profile
source ~/.bash_profile
istioctl install --set profile=demo --set values.gateways.istio-ingressgateway.type=ClusterIP
#istioctl manifest apply --set profile=demo --set values.gateways.istio-ingressgateway.type=ClusterIP

kubectl label namespace default istio-injection=enabled

#istioctl manifest generate --set profile=demo | kubectl delete -f -



