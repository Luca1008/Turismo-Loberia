SUBDIRECTORIOS=Backend TurismoLoberia

USUARIO_DESPLIEGUE=turismo

OBJETIVOS_DEPLOY=$(SUBDIRECTORIOS:%=%_d)

OBJETIVOS_INSTALL=$(SUBDIRECTORIOS:%=%_i)

.PHONY: help install deploy $(OBJETIVOS_DEPLOY) $(OBJETIVOS_INSTALL)

help :
	@echo "\nmake deploy"
	@echo "  Despliegue puro, debe hacerse desde el usuario $(USUARIO_DESPLIEGUE)"
	@echo "\nmake install"
	@echo "  Instalación completa, debe hacerse desde un usuario"
	@echo "  con privilegios de administrador (sudo)\n"

install : $(OBJETIVOS_INSTALL)

deploy : $(OBJETIVOS_DEPLOY)

$(OBJETIVOS_DEPLOY) : %_d :
	$(MAKE) -C $* deploy

$(OBJETIVOS_INSTALL) : %_i :
	$(MAKE) -C $* install
