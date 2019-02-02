const process = require('process')
const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs')

const monorepoRoot = process.env.TYMLY_MONOREPO_PATH

if (!monorepoRoot) {
  throw new Error('No TYMLY_MONOREPO_PATH environment variable set!')
}

const localRoot = path.resolve(__dirname, '..', 'node_modules', '@wmfs')
console.log('')
console.log('Linking with monorepo')
console.log('---------------------')
console.log(`Deleting dir: ${localRoot}`)

rimraf(
  localRoot,
  function (err) {
    if (err) {
      console.error(err)
    } else {
      // Make empty @wmfs dir.
      fs.mkdirSync(localRoot)
      const sourceRoot = path.join(monorepoRoot, 'packages')
      console.log('Adding symlinks...')
      const sourceContents = fs.readdirSync(sourceRoot)
      sourceContents.forEach(
        basename => {
          if (basename[0] !== '.') {
            const localTarget = path.join(localRoot, basename)
            const monotrepoTarget = path.join(sourceRoot, basename)
            console.log(`  - ${localTarget} ==> ${monotrepoTarget}`)
            fs.symlinkSync(monotrepoTarget, localTarget, 'dir')
          }
        }
      )
    }
  }
)
