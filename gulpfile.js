let project_folder = require('path').basename(__dirname),
  source_folder = 'app';

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
    php: project_folder + '/',
    json: project_folder + '/json/',
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/main.js',
    img: source_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
    fonts: source_folder + '/fonts/*.ttf',
    php: source_folder + '/*.php',
    json: source_folder + '/json/*.json',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.(png|jpg|gif|ico|svg|webp)',
    json: source_folder + '/json/*.json',
  },
  clean: './' + project_folder + '/',
};

const { src, dest, watch, parallel, series } = require('gulp'),
  gulpSass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  terser = require('gulp-terser-js'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  fileInclude = require('gulp-file-include'),
  rename = require('gulp-rename'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter'),
  htmlmin = require('gulp-htmlmin'),
  del = require('del');
// webp = require('gulp-webp'),
// webphtml = require('gulp-webp-html'),
// webpcss = require('gulp-webpcss'),

const styles = () => {
  return src(path.src.css)
    .pipe(gulpSass({ outputStyle: 'expanded' }))
    .pipe(group_media())
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
        flex: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream());
};

const html = () => {
  return src(path.src.html).pipe(fileInclude()).pipe(dest(path.build.html)).pipe(browserSync.stream());
};

const json = () => {
  return src(path.src.json).pipe(dest(path.build.json)).pipe(browserSync.stream());
};

const images = () => {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75 }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.img))
};

const fonts = () => {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
};

const otf2ttf = () => {
  return src([source_folder + '/fonts/*.otf'])
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(dest(source_folder + '/fonts/'));
};

const cleanDist = () => {
  return del(path.clean);
};

const js = () => {
  return src([path.src.js])
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(
      terser({
        mangle: {
          toplevel: true,
        },
      })
    )
    .on('error', function (error) {
      if (error.plugin !== 'gulp-terser-js') {
        console.log(error.message);
      }
      this.emit('end');
    })
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream());
};

const php = () => {
  return src(path.src.php).pipe(dest(path.build.php));
};

const browser = () => {
  browserSync.init({
    server: {
      baseDir: './' + project_folder + '/',
    },
    notify: false,
    browser: 'chrome',
  });
};

const watching = () => {
  watch([path.watch.html], html);
  watch([path.watch.css], styles);
  watch([path.watch.js], js);
  watch([path.watch.img], images);
  watch([path.watch.json], json);
};

let build = series(cleanDist, parallel(html, styles, images, js, fonts, php, json));
let live = parallel(build, watching, browser);


exports.json = json;
exports.fonts = fonts;
exports.html = html;
exports.php = php;
exports.styles = styles;
exports.watching = watching;
exports.browser = browser;
exports.js = js;
exports.images = images;
exports.build = build;
exports.live = live;
exports.default = live;
