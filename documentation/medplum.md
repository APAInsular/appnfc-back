# Medplum

## Medplum docker compose
https://www.medplum.com/docs/self-hosting/running-full-medplum-stack-in-docker

**TODO**: move .env vars to .env file instead of hardcode it on docker-compose.yml (to improve security)

## Generate a medplum project

### Sesion
![alt text](image.png)
![alt text](image-1.png)

### New project
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)

#### Set .env var (our backend .env)
```shell
MEDPLUM_PROJECT_ID=31497d60-3ea6-4381-840a-06ce4964f7b2
```
### New client
![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-7.png)

#### Set .env vars (our backend .env)
```shell
MEDPLUM_URL=http://localhost:8103
MEDPLUM_CLIENT_ID=b16b698a-fb82-462f-9b33-9374d08a5ed1
MEDPLUM_CLIENT_SECRET=52ae8525c7f3bec5d9fd0fdb6f83ade661ea8e4920d7fc05b1237cad100f0b71
```
