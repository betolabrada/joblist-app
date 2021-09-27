# EJEMPLOS:
### [POST] Lista de vacantes via Reclutador Id
```console
$ curl -H "Content-Type: application/json" -X POST \
	> -d '{"habilidad_id": "1"}' \
	> http://localhost:3000/api/vacantes/list
```

### [POST] Lista de vacantes via Lugar Id
```console
$ curl -H "Content-Type: application/json" -X POST \
	> -d '{"lugar_id": "1"}' \
	> http://localhost:3000/api/vacantes/list
```

### [POST] Lista de vacantes via Habilidad Id
```console
$ curl -H "Content-Type: application/json" -X POST \
	> -d '{"habilidad_id": "1"}' \
	> http://localhost:3000/api/vacantes/list
```

### [POST] Detalle Vacante
```console
$ curl -H "Content-Type: application/json" -X POST \
	> -d '{"vacante_id": "1"}' \
	> http://localhost:3000/api/vacantes/list
```

### [GET] Solicitantes de Vacante
```console
$ curl http://localhost:3000/api/vacantes/1/solicitantes
```
### [POST] Solicitar una vacante
```console
$ curl -H "Content-Type: application/json" -X POST \
	-d '{"solicitante_id": "1"}' \
	http://localhost:3000/api/vacantes/1/solicitar
```

### [GET] Habilidades de Solicitante
```console
$ curl http://localhost:3000/api/solicitantes/1/habilidades
```

### [GET] Experiencias de Solicitante
```console
$ curl http://localhost:3000/api/solicitantes/1/experiencias
```
