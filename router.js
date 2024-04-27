const isObject = require('lodash/isObject')
const path = require('path');
const importDir = require('directory-import');

const schemas = importDir('./schemas', 'sync');

const routesDir = './routes'

importDir(routesDir, 'sync', (routeName, routePath, routeMethods) => {
    const isModule = path.extname(routePath) === '.js';

    if (!isModule) return console.warn(`File ${routePath} is not a route`)
    if (!isObject(routeMethods)) return console.warn(`Expected an object in the file ${routePath}.`)
});
