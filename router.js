const has = require('lodash/has')
const forEach = require('lodash/forEach')
const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const isFunction = require('lodash/isFunction')
const path = require('path');
const {directoryImport} = require('directory-import');
const {server} = require('./server')

const schemas = directoryImport('./schemas', 'sync');
console.log(schemas)

const routesDir = './routes'

directoryImport(routesDir, 'sync', (routeName, routePath, routeMethods) => {
    const isModule = path.extname(routePath) === '.js';

    if (!isModule) return console.warn(`File ${routePath} is not a route`)
    if (!isObject(routeMethods)) return console.warn(`Expected an object in the file ${routePath}.`)

    const cleanUpedPath = (routeName === 'index'
        ?  routePath.slice(0, routePath.length - 'index.js'.length)
        :  routePath.slice(0, routePath.length - '.js'.length))

    forEach(routeMethods, (methodArgs, methodName) => {
        const schema = has(schemas, `${routeName}.${methodName}`)
            ? schemas[routeName][methodName]
            : {};

        if (isFunction(methodArgs)) server[methodName](cleanUpedPath, {schema}, methodArgs)

        else if (isArray(methodArgs)){
            const [options] = methodArgs;

            if (!options.schema) options.schema = schema;

            server[methodName](cleanUpedPath, ...methodArgs)
        }
        else return console.error(`Route ${routePath} has invalid arguments`)
    })
});
