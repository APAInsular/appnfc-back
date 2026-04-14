default:
    @just --list --unsorted

import './justfiles/ssh.justfile'
import './justfiles/js.justfile'
import './justfiles/test.justfile'
import './justfiles/git.justfile'
import './justfiles/docker.justfile'

[group('Dev')]
dev:
    node ace serve --watch

[group('Dev')]
build:
    node ace build --production

[group('Dev')]
routes:
    node ace list:routes

[group('Database')]
migrate:
    node ace migration:run

[group('Database')]
migrate-fresh:
    node ace migration:fresh

[group('Database')]
migrate-fresh-seed:
    node ace migration:fresh --seed

[group('Database')]
migrate-rollback:
    node ace migration:rollback

[group('Database')]
migrate-status:
    node ace migration:status

[group('Database')]
seed:
    node ace db:seed

