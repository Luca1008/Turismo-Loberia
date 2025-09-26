ORIGEN_DESPLIEGUE=./dist/
DESTINO_DESPLIEGUE=/var/www/turismoloberia.tur.ar
USUARIO_DESPLIEGUE=turismo
GRUPO_DESPLIEGUE=turismo

.PHONY: help build install deploy

help :
	@echo "\nmake build"
	@echo "  Construcción del empaquetado para desplegar"
	@echo "\nmake deploy"
	@echo "  Despliegue puro, debe hacerse desde el usuario $(USUARIO_DESPLIEGUE)"
	@echo "\nmake install"
	@echo "  Instalación completa, debe hacerse desde un usuario"
	@echo "  con privilegios de administrador (sudo)\n"

build :
	npm install
	npm audit fix
	rm -fr dist
	npm run build

install : build
	sudo install -d -m 2755 -o $(USUARIO_DESPLIEGUE) -g www-data \
		$(DESTINO_DESPLIEGUE)
	sudo rsync -vr --delete $(ORIGEN_DESPLIEGUE) $(DESTINO_DESPLIEGUE)
	sudo chown -R $(USUARIO_DESPLIEGUE) $(DESTINO_DESPLIEGUE)

deploy : build
	rsync -vr --delete $(ORIGEN_DESPLIEGUE) $(DESTINO_DESPLIEGUE)
