sudo docker rm -f $(sudo docker ps -qa) && sudo docker rmi -f $(sudo docker images -qa) \
; sudo docker build -t my-app . && sudo docker run -p 3000:3000 -it my-app
