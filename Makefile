export USERID=$(id -u)
export GROUPID=$(id -g)

compose.dev.up:
	@sudo docker-compose -f docker-compose.dev.yml up -d --build

compose.prod.up:
	@sudo docker-compose -f docker-compose.prod.yml up -d --build

compose.dev.stop:
	@sudo docker-compose -f docker-compose.dev.yml stop

compose.prod.stop:
	@sudo docker-compose -f docker-compose.prod.yml stop

#mongoup:
#	@sudo docker run --rm -it -v /data/db:/mongodata -p 27017:27017 --name mongodb -d mongo

#cphp:
#	@sudo docker exec -it spnodeappc bash

