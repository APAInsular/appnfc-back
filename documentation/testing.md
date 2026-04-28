# Testing

```sh
just up
just test
just down
```

```sh
just nuke
just up
# config medplum
NODE_ENV=test node ace migration:run
# NODE_ENV=test node ace migration:fresh
just test
```
