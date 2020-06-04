const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const _ = require('lodash');
const { execFileSync } = require('child_process');
const promisedHandlebars = require('promised-handlebars');
const Handlebars = promisedHandlebars(require('handlebars'));

function renderAPIFile(type) {
  const template = fs.readFileSync(
    path.resolve(__dirname, `${type}API.template.hbs`),
    'utf-8',
  );
  return Handlebars.compile(template);
}

async function writeAPIFile(params) {
  const { name, file, type, filePath } = params;

  const fileName = `/${name}.${type}.ts`;

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  fs.writeFile(filePath + fileName, file, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      process.exit(0);
    } else {
      // eslint-disable-next-line no-console
      console.log(chalk.yellow(`💫  API Module created for ${path}`));
    }
  });
}

async function createAPIFolder(name) {
  const filePath = path.resolve(__dirname, '..', 'src/modules', `mr-${name}`);
  console.log(filePath);

  const controller = await renderAPIFile('controller')({
    name,
    className: name[0].toUpperCase() + name.slice(1, name.length),
  });

  const module = await renderAPIFile('module')({
    name,
    className: name[0].toUpperCase() + name.slice(1, name.length),
  });

  await writeAPIFile({
    filePath,
    type: 'controller',
    file: controller,
    name,
  });

  await writeAPIFile({
    filePath,
    type: 'module',
    file: module,
    name,
  });
}

(async () => {
  const io = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '🦄  Enter API Name [dash-case]',
      validate: (value) => {
        if (!_.isEmpty(value) && !_.isNil(value)) {
          return true;
        }
        // eslint-disable-next-line no-console
        console.log('🔥  Must provide valid component name');
        return false;
      },
    },
  ]);

  try {
    setTimeout(() => {
      createAPIFolder(`${io.name}s`);
    }, 1000);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Oops', e);
  }
})();
