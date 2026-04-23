[group('Test')]
test:
    NODE_ENV=test node ace test

[group('Test')]
test-watch:
    NODE_ENV=test node ace test --watch

[group('Test')]
test-coverage:
    NODE_ENV=test node ace test --coverage