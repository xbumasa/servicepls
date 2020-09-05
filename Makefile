USERID  = $(shell id -u)
GROUPID = $(shell id -g)

compose.dev.up:
	@sudo docker-compose -f docker-compose.dev.yml up -d --build

compose.prod.up:
	@sudo USERID=$(USERID) GROUPID=$(GROUPID) docker-compose -f docker-compose.prod.yml up -d --build

compose.dev.stop:
	@sudo docker-compose -f docker-compose.dev.yml stop

compose.prod.stop:
	@sudo USERID=$(USERID) GROUPID=$(GROUPID) docker-compose -f docker-compose.prod.yml stop

cd.api:
	@sudo docker exec -it api bash

cd.app:
	@sudo docker exec -it app bash

cd.nginx:
	@sudo docker exec -it proxy bash

cd.mongo:
	@sudo docker exec -it db bash
