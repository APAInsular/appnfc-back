default:
    @just --list --unsorted

import './justfiles/ssh.justfile'
import './justfiles/js.justfile'
import './justfiles/test.justfile'
import './justfiles/git.justfile'
import './justfiles/docker.justfile'

[group('Release')]
publish:
    @echo "Production not configured yet..."
    @echo "TODO: Implement your publish"
