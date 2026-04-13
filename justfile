default:
    @just --list --unsorted

import './justfiles/js.justfile'
import './justfiles/test.justfile'
import './justfiles/docker.justfile'
import './justfiles/git.justfile'
import './justfiles/ssh.justfile'

[group('Release')]
publish:
    @echo "Production not configured yet..."
    @echo "TODO: Implement your publish"
