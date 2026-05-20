# Project File Structure

```
├── ace.js                                                   # AdonisJS Stuff do not touch!
├── adonisrc.ts                                              # AdonisJS Stuff do not touch!
├── app
│   ├── controllers
│   │   ├── access_token_controller.ts 		             # Session token management
│   │   ├── bracelets_controller.ts			     # Bracelet management
│   │   ├── medplum_controller.ts			     # Medplum proxy
│   │   ├── new_account_controller.ts		             # Session token creation
│   │   ├── profile_controller.ts			     # Account management
│   │   └── medical_conditions_controller.ts		     # Patients conditions
│   ├── dtos
│   │   └── medplum
│   │       └── create_patient_dto.ts
│   ├── enums
│   │   └── user_role.ts                                     # TODO: Use this instead of raw strings.
│   ├── exceptions
│   │   └── handler.ts
│   ├── helpers
│   │   └── index.ts
│   ├── middleware
│   │   ├── auth_middleware.ts
│   │   ├── container_bindings_middleware.ts
│   │   ├── force_json_response_middleware.ts
│   │   ├── mtls_auth.ts
│   │   └── silent_auth_middleware.ts
│   ├── models
│   │   ├── bracelet.ts
│   │   ├── med_plum_user.ts
│   │   └── user.ts
│   ├── services
│   │   ├── medplum_proxy_service.ts                          # Medplum related functions. TODO: refactor this.
│   │   └── medplum.ts					      # Medplum Client
│   ├── transformers
│   │   └── user_transformer.ts
│   └── validators
│       ├── brecelet.ts
│       ├── generic.ts
│       └── user.ts
├── database
│   ├── migrations
│   │   ├── 1761885935168_create_users_table.ts
│   │   ├── 1768620764696_create_access_tokens_table.ts
│   │   ├── 1774521869380_create_bracelets_table.ts	  
│   │   ├── 1774522127710_create_med_plum_users_table.ts      # User to MedplumUser map (Used with MedplumProxyService)
│   │   ├── 1778837357309_create_condition_catalogs_table.ts  # Available condtions that user can select
│   │   └── 1778837357310_create_user_conditions_table.ts     # Conditions that user selected
│   ├── schema_rules.ts
│   └── schema.ts
├── infra
│   └── docker
│       ├── backend.Dockerfile
│       ├── docker-compose.override.yml
│       └── docker-compose.yml
├── justfile                                                  # Main justfile (Commnd utils, use with 'just' command)
├── justfiles                                                 # Justfile modules, do not touch!
│   ├── docker.justfile
│   ├── git.justfile
│   ├── js.justfile
│   ├── ssh.justfile
│   ├── test.justfile
│   └── tools.justfile
├── package.json
├── start
│   ├── env.ts
│   ├── kernel.ts
│   ├── routes.ts                                             # All backend routes here!
│   └── validator.ts
└── tests                                                     # Tests, don't forget set the .env.test variables!
    ├── bootstrap.ts
    ├── functional
    │   ├── bracelets
    │   ├── bracelets.spec.ts
    │   └── signup.spec.ts
    ├── helpers
    │   └── auth.ts
    └── unit
```

# Technology used in the project

- https://adonisjs.com/
- https://github.com/casey/just
- https://www.npmjs.com/package/@types/fhir
- https://www.npmjs.com/package/@medplum/core

# Workflow

Since I am currently the sole developer on the backend, the workflow is designed to be lean and efficient, focusing on rapid iteration without sacrificing code quality.

1. **Requirement Gathering**: Sync with the team to align on priorities.
2. **State Analysis**: Audit the current project status and technical debt.
3. **Technical Design**: Mentally (or via brief documentation) architect the required solution.
4. **Implementation**: Execute the feature, fix, or refactor within the AdonisJS ecosystem.
5. **Quality Assurance**: Validate changes using the `just test` command to ensure stability.
6. **Version Control**: Commit changes using a standardized convention via just [type] [message] (see [justfile](../justfile)).
7. **Deployment**: Push to the remote repository for integration.

# Infrastructure

## AdonisJS

[AdonisJS](https://adonisjs.com/) is my framework of choice for this backend. With over a decade of active maintenance and a 'Batteries-Included' approach, it offers a robust, TypeScript-first environment. This makes it a perfect fit for the complexity of FHIR databases and integrating the Medplum SDK."

## Docker Compose and Containers

- **Medplum**: We've a medplum server working as our FHIR database, optionally I opted to deploy the frontend (temporally) to manage easier some tasks during the development; This maybe should be removed at production for security purposes.
- **Backend**: Our backend is deployed next to Medplum connected with an internal net.
- **PostgressSQL**: A powerful, open-source relational database chosen for its speed, safety, and strict data integrity. Its support for complex queries and JSONB makes it the perfect foundation for handling the structured nature of FHIR resources.

  - Medplum uses it's own instance
  - Our backend uses it's own instance too, cus we manage different data.

# VPS and Github Actions

As you can see in our [deploy.yml](../.github/workflows/deploy.yml) we are deploying **develop** (update this text if we are in production), at the moment the worker connect to the VPS user, pulls the changes, and restarts **only our backend container** that means if you change something related to medplum, you should rebuild it (see useful commands on [justfile](../justfile) at **Docker** cathegory)

**TODO**: On production we must do a code quality assurance step on our deploy.

# Nginx stuff

At (20/04/26) this config it's for development using my daw final project vps url, isn't configured to work with https and must be updated on production.

At (20/05/26) nginx changed when project moved to new VPS but this is a good example anyways.

```sh
# Check config and reload nginx
nginx -t && systemctl reload nginx
```

```conf
server {
    listen 443 ssl;
    server_name medplum.limpora.xyz;

    ssl_certificate /etc/letsencrypt/live/medplum.limpora.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/medplum.limpora.xyz/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location /api/ {
        proxy_pass http://127.0.0.1:8103/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /storage/ {
        proxy_pass http://127.0.0.1:8103/storage/;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Medplum - HTTP redirect
server {
    listen 80;
    server_name medplum.limpora.xyz;
    return 301 https://$host$request_uri;
}

# NFC backend - HTTPS
server {
    listen 443 ssl;
    server_name www.limpora.xyz;

    ssl_certificate /etc/letsencrypt/live/www.limpora.xyz-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.limpora.xyz-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location /apinfc/ {
        proxy_pass http://127.0.0.1:3333/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# NFC backend - HTTP redirect
server {
    listen 80;
    server_name www.limpora.xyz;
    return 301 https://$host$request_uri;
}
```
