module.exports = {
    branches: ['master', {"name": "beta", "prerelease": true}],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/npm",
        "@semantic-release/github",
        ["@semantic-release/exec", {
            "prepareCmd": "./updateSW.sh ${nextRelease.version}",
        }],
        ["@semantic-release/git", {
            "assets": ["package.json", "sw.js"],
            "message": "Chore: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }]
    ],
    "preset": "eslint"
}
