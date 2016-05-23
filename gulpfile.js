/**
 * Created by johnmachahuay.
 */
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify/custom');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

    var INPUT  = {
      'javascript': 'src/js/app/index.js',
      'stylesheets': 'src/css/*.css',
      'vendorcss': [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css'
      ],
      'vendorjs': [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'node_modules/react/dist/react.min.js',
          'node_modules/react-dom/dist/react-dom.min.js',
          'node_modules/react-router/umd/ReactRouter.min.js'
      ],
      'images': 'src/images/*.{gif,jpg,png}',
      'fonts': [
        'node_modules/font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}'
      ]
    },

    OUTPUT = {
        names: {
            'appjs': 'bundle.min.js',
            'vendorjs': 'plugins.min.js',
            'appcss': 'app.min.css',
            'vendorcss': 'plugins.min.css'
        },
        routes: {
            'stylesheets': 'public/stylesheets',
            'javascript': 'public/javascript',
            'images': 'public/images',
            'fonts': 'public/fonts'
        }
    },
    AUTOPREFIXER_BROWSERS = [
        'last 3 versions',
        'ie >= 8',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10',
        '> 5%',
        'firefox < 20',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
    ];

gulp.task('default', ['watch']);

gulp.task('build-js-lib', function() {
  return gulp.src(INPUT.vendorjs)
    .pipe(plugins.concat(OUTPUT.names.vendorjs))
    .pipe(gulp.dest(OUTPUT.routes.javascript));
});

// CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function() {
    return gulp.src(INPUT.stylesheets)
        .pipe(plugins.sourcemaps.init())  // Process the original sources
            .pipe(plugins.concat(OUTPUT.names.appcss))
            .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
            .pipe(plugins.minifyCss({compatibility: 'ie8'}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(OUTPUT.routes.stylesheets));
});

gulp.task('build-css-lib', function() {
    return gulp.src(INPUT.vendorcss)
        .pipe(plugins.concat(OUTPUT.names.vendorcss))
        .pipe(gulp.dest(OUTPUT.routes.stylesheets));
});

gulp.task('react', function () {
  return browserify(INPUT.javascript)
         .transform(babelify)
         .bundle()
         .pipe(source(OUTPUT.names.appjs))
         .pipe(buffer())
         .pipe(plugins.uglify())
         .pipe(gulp.dest(OUTPUT.routes.javascript));
});

gulp.task('build-js', function () {
    return gulp.src(INPUT.javascript)
    .pipe(plugins.uglify())
    .pipe(plugins.concat(OUTPUT.names.appjs))
    .pipe(gulp.dest(OUTPUT.routes.javascript));
});

gulp.task('build-img', function() {
    return gulp.src(INPUT.images)
        .pipe(gulp.dest(OUTPUT.routes.images));
});

gulp.task('build-font', function() {
    return gulp.src(INPUT.fonts)
        .pipe(gulp.dest(OUTPUT.routes.fonts));
});

gulp.task('watch', ['react', 'build-js-lib','build-css', 'build-css-lib', 'build-img', 'build-font'], function () {
    gulp.watch(INPUT.vendorjs, ['react']);
    gulp.watch(INPUT.vendorjs, ['build-js-lib']);
    gulp.watch(INPUT.stylesheets, ['build-css']);
    gulp.watch(INPUT.vendorcss, ['build-css-lib']);
    gulp.watch(INPUT.img, ['build-img']);
    gulp.watch(INPUT.font, ['build-font']);
});