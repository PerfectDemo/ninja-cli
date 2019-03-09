const program = require('commander');
const { downloadTemplate } = require('../lib/template');
program.version('0.0.1')
    .option('template', 'install from template')
    .action(downloadTemplate);

program.parse(process.argv);