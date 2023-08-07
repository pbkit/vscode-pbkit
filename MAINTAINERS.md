# how to publish

1. Update version in `package.json` and `git tag <new-version>`
1. `yarn`
1. `yarn build`
1. Copy Azure DevOps [PAT](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)
1. `yarn vsce login pbkit` & Paste PAT
1. `yarn vsce package --yarn`
1. `yarn vsce publish --yarn`
