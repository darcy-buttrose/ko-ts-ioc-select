import gulp from 'gulp';
import typescript from 'gulp-typescript';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import webpack from 'webpack-stream';
import rjs from 'gulp-requirejs';
import 'babel-polyfill';

gulp.task('moveinversify',[],function() {
    return gulp.src(['./node_modules/inversify/es/**/*.js'])
        .pipe(gulp.dest('./src/libs/inversify'));
});

gulp.task('moverxjs',[],function() {
    return gulp.src(['./node_modules/@reactivex/rxjs/dist/es6/**/*.js'])
        .pipe(gulp.dest('./src/libs/rxjs'));
});

gulp.task('moveknockout',[],function() {
    return gulp.src(['./node_modules/knockout/build/output/**/*.js'])
        .pipe(gulp.dest('./src/libs/knockout'))
        .pipe(gulp.dest('./build/cjs/libs/knockout'))
        .pipe(gulp.dest('./build/amd/libs/knockout'));
});

gulp.task('movereflect',[],function() {
    return gulp.src(['./node_modules/reflect-metadata/reflect.js'])
        .pipe(gulp.dest('./src/libs/reflect-metadata'))
        .pipe(gulp.dest('./build/cjs/libs/reflect-metadata'))
        .pipe(gulp.dest('./build/amd/libs/reflect-metadata'));
});

gulp.task('moveimmutable',[],function() {
    return gulp.src(['./node_modules/immutable/dist/**/*.js'])
        .pipe(gulp.dest('./src/libs/immutable'))
        .pipe(gulp.dest('./build/amd/libs/immutable'))
        .pipe(gulp.dest('./build/cjs/libs/immutable'));
});

gulp.task('movetext',[],function() {
    return gulp.src(['./node_modules/text/**/*.js'])
        .pipe(gulp.dest('./src/libs/text'))
        .pipe(gulp.dest('./build/amd/libs/text'))
        .pipe(gulp.dest('./build/cjs/libs/text'));
});

gulp.task('movejquery',[],function() {
    return gulp.src(['./node_modules/jquery/dist/**/*.js'])
        .pipe(gulp.dest('./src/libs/jquery'))
        .pipe(gulp.dest('./build/amd/libs/jquery'))
        .pipe(gulp.dest('./build/cjs/libs/jquery'));
});

gulp.task('movelibs',['moveinversify','moverxjs','moveknockout','moveimmutable','movereflect','movetext','movejquery'])

gulp.task('compile-cjs', ['movelibs'], () => {
    return gulp.src([
            './src/**/*.[tj]s*',
            './src/**/*.spec.ts*',
            '!./src/libs/immutable/**/*',
            '!./src/libs/knockout/**/*',
            '!./src/libs/reflect-metadata/**/*',
            '!./src/libs/text/**/*',
            '!./src/libs/jquery/**/*'
        ])
        .pipe(typescript(typescript.createProject('./tsconfig.json')))
        .pipe(babel({
            plugins: [
                'transform-es2015-modules-commonjs'
            ],
            presets: [
                'es2016'
            ]
        }))
        .pipe(gulp.dest('./build/cjs'));
});

gulp.task('compile-amd', ['movelibs'], () => {
    return gulp.src([
            './src/**/*.[tj]s*',
            './src/**/*.spec.ts*',
            '!./src/libs/immutable/**/*',
            '!./src/libs/knockout/**/*',
            '!./src/libs/reflect-metadata/**/*',
            '!./src/libs/text/**/*',
            '!./src/libs/jquery/**/*'
        ])
        .pipe(typescript(typescript.createProject('./tsconfig.json')))
        .pipe(babel({
            plugins: [
                'transform-es2015-modules-amd'
            ],
            presets: [
                'es2016'
            ]
        }))
        .pipe(gulp.dest('./build/amd'));
});

gulp.task('compile',['compile-amd','compile-cjs']);

gulp.task('movestatic', () => {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build/cjs'))
        .pipe(gulp.dest('./build/amd'));
});

gulp.task('test',['compile'], () => {
    return gulp.src('./build/**/*.spec.js')
        .pipe(mocha({
            reporter: 'spec'
        }));
});

gulp.task('package-wpack', ['compile-cjs','movestatic'],function() {
    return gulp.src('./build/cjs/main.js')
        .pipe(webpack({
            devtool: 'sourse-map',
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('./dist/wpack'));
});

gulp.task('package-rjs', ['compile-amd','movestatic'], () => {
    return rjs({
            baseUrl: './build/amd/',
            paths: {
                "knockout": "./libs/knockout/knockout-latest.debug",
                "immutable": "./libs/immutable/immutable",
                "reflect-metadata": "./libs/reflect-metadata/reflect",
                "text": "./libs/text/text",
                "jquery": "./libs/jquery/jquery"
            },
            include: [
                'main.js'
            ],
            out: 'bundle.js'
        })
        .pipe(gulp.dest('./dist/rjs'));
});

gulp.task('package',['package-wpack','package-rjs']);

gulp.task('watch',['package'],function(){
    gulp.watch(['./src/**/*.ts'],['package']);
})

gulp.task('default',['package']);