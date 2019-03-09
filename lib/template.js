const inquirer = require('inquirer');
const debug = require('debug')('cli');
const { getOrgRepos, downloadGit } = require('./git_tool');
const path = require('path');
const fs = require('fs');
const { readJSONSync, writeJSONSync } = require('utility');

const replacePkg = (path, name) => {
    const pkg = readJSONSync(path);
    pkg.name = name;
    writeJSONSync(path, pkg);
}

exports.downloadTemplate = async () => {
    try {
        const repos = await getOrgRepos();
        const reposMap = repos.reduce((pre, cur) => { pre[cur.name] = cur.full_name; return pre }, {});
        debug(reposMap);
        const answers = await inquirer.prompt({
            type:'list',
            name: 'name',
            message: 'Please choose template you want to download',
            choices: Object.keys(reposMap)
        });

        const { project_name } = await inquirer.prompt({
            type: 'input',
            name: 'project_name',
            message: 'input your project name: '
        });

        const { project_path } = await inquirer.prompt({
            type: 'input',
            name: 'project_path',
            message: 'input your project path (default . in current commoand path): '
        })
        debug(answers);
        console.log(project_path);
        const downloadPath = path.join(process.cwd(), project_path);
        await downloadGit(reposMap[answers.name], downloadPath);

        const pkgPath = path.join(downloadPath, 'package.json');

        if (fs.existsSync(pkgPath)) {
            replacePkg(pkgPath, project_name);
        }

    } catch (error) {
        throw error;
    }
  
}