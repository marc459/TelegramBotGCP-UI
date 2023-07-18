sudo docker rm -f $(sudo docker ps -qa) && sudo docker rmi -f $(sudo docker images -qa) \
; npm run build && sudo docker build -t my-app . && sudo docker run -p 80:80 -it my-app
