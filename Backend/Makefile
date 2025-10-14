DIRECTORIO_BASE=/usr/local/share/turismo_backend
DIRECTORIO_VAR=/var/lib/turismo
USUARIO_DESPLIEGUE=turismo
GRUPO_DESPLIEGUE=turismo
GRUPO_WWW=www-data
OBJETIVOS=controller index.js middlewares models package.json public routes \
	  services
BASE_SYSTEMD=/etc/systemd/system
SERVICIOS_SYSTEMD=systemd/turismo_backend.service

.PHONY: help install deploy

help :
	@echo "\nmake deploy"
	@echo "  Despliegue puro, debe hacerse desde el usuario $(USUARIO_DESPLIEGUE)"
	@echo "\nmake install"
	@echo "  Instalación completa, debe hacerse desde un usuario"
	@echo "  con privilegios de administrador (sudo)\n"


install :
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_DESPLIEGUE) -m 755 $(DIRECTORIO_BASE)
	# Sincroniza todo excepto las imágenes personalizadas del carrusel
	sudo rsync -vr --delete --exclude=.env --exclude=public/carousel $(OBJETIVOS) $(DIRECTORIO_BASE)/
	# Actualiza defaults del carrusel sin borrar imágenes personalizadas existentes
	sudo rsync -vr public/carousel $(DIRECTORIO_BASE)/public/
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_WWW) -m 2750 \
		$(DIRECTORIO_VAR)
	sudo install -d -o $(USUARIO_DESPLIEGUE) -g $(GRUPO_WWW) -m 2750 \
		$(DIRECTORIO_VAR)/uploads
	sudo ln -nsf $(DIRECTORIO_VAR)/uploads $(DIRECTORIO_BASE)/uploads
	sudo chown -Rh $(USUARIO_DESPLIEGUE):$(GRUPO_DESPLIEGUE) \
		$(DIRECTORIO_BASE)
	sudo su $(USUARIO_DESPLIEGUE) -c \
		"cd $(DIRECTORIO_BASE) && npm install && npm audit fix || true"
	sudo install -m 644 $(SERVICIOS_SYSTEMD) $(BASE_SYSTEMD)
	sudo systemctl daemon-reload
	sudo systemctl enable turismo_backend
	sudo systemctl restart turismo_backend


deploy :
	rsync -vr --delete --exclude=.env --exclude=public/carousel $(OBJETIVOS) $(DIRECTORIO_BASE)/
	rsync -vr public/carousel $(DIRECTORIO_BASE)/public/
	ln -nsf $(DIRECTORIO_VAR)/uploads $(DIRECTORIO_BASE)/uploads
	cd $(DIRECTORIO_BASE) && npm install && npm audit fix || true
	sudo systemctl restart turismo_backend
