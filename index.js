const _ = require('lodash');
const autoprefixer = require('metalsmith-autoprefixer');
const cleanCSS = require('metalsmith-clean-css');
const concat = require('metalsmith-concat');
const copy = require('metalsmith-static');
const htmlMinifier = require('metalsmith-html-minifier');
const layouts = require('metalsmith-layouts');
const Metalsmith = require('metalsmith');
const sass = require('metalsmith-sass');
const serve = require('metalsmith-serve');
const uglify = require('metalsmith-uglify');
const watch = require('metalsmith-watch');

const argv = require('minimist')(process.argv.slice(2));

const task = Metalsmith(__dirname)
  .metadata({
    site: require('./config'),
    appLinks: require('./apps'),
    apps: _.map(require('./apps'), app => _.assign(app, {
      image: app.title.toLowerCase().replace(' ', '-')
    })),
    team: _.map(require('./team'), member => _.assign(member, {
      image: member.name.toLowerCase().replace(' ', '-')
    }))
  })
  .source('./_source')
  .destination('./_build')
  .clean(false)
  .use(layouts({
    engine: 'swig',
    directory: '_layouts'
  }))
  .use(sass())
  .use(autoprefixer())
  .use(cleanCSS())
  .use(concat({
    files: 'css/*.css',
    output: 'css/bundle.css'
  }))
  .use(copy({
    src: 'node_modules/font-awesome/fonts',
    dest: 'css/fonts'
  }))
  .use(uglify({
    removeOriginal: true
  }))
  .use(concat({
    files: [
      'jquery/dist/jquery.min.js',
      'jquery-smooth-scroll/jquery.smooth-scroll.min.js',
      'jquery-waypoints/waypoints.min.js',
      'js/*.js'
    ],
    searchPaths: ['node_modules'],
    output: 'js/bundle.js'
  }));

if (argv.serve || argv.s) {
  task
    .use(watch({
      paths: {
        '_source/**/*.md': true,
        '_source/**/*.{js,css,sass}': '**/*',
        '_layouts/**/*': '**/*'
      }
    }))
    .use(serve())
    .build(err => {
      if (err) { throw err; }
    });
} else {
  task
    .use(htmlMinifier())
    .build(err => {
      if (err) { throw err; }
    });
}
