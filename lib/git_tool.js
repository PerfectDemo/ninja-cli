
const axios = require('axios');
const ORG_NAME = 'PerfectDemoTemplate';
const API_GITHUB_PREFIX = 'https://api.github.com';
const GET_ORG_REPOS = `/orgs/${ORG_NAME}/repos`;
const { promisify } = require('util');
const download = promisify(require('download-git-repo'));

const assert = require('assert');
const fs = require('fs');

module.exports = {
    async getOrgRepos() {
        const url = API_GITHUB_PREFIX + GET_ORG_REPOS;
        const repos = await axios(url);
        return repos.data;       
    },

    async downloadGit(url, path) {             
        await download(url, path);      
    }
}