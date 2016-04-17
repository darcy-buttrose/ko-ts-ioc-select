import gulp from 'gulp';
import typescript from 'gulp-typescript';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import webpack from 'webpack-stream';
import rjs from 'gulp-requirejs';
import 'babel-polyfill';

gulp.task('compile-cjs', [], () => {
    return gulp.src([
            './src/**/*.[tj]s*',
            './src/**/*.spec.ts*'
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

gulp.task('compile-amd', [], () => {
    return gulp.src([
            './src/**/*.[tj]s*',
            './src/**/*.spec.ts*',
            '!./src/libs/**/*',
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
            baseUrl: './',
            paths: {
                "knockout": "./node_modules/knockout/build/output/knockout-latest.debug",
                "immutable": "./node_modules/immutable/dist/immutable",
                "reflect-metadata": "./node_modules/reflect-metadata/reflect",
                "text": "./node_modules/text/text",
                "jquery": "./node_modules/jquery/dist/jquery",
                "inversify": "./node_modules/inversify/dist/inversify",
                "@reactivex/rxjs": "./node_modules/@reactivex/rxjs/dist/amd/rx.KitchenSink"
            },
            include: [
                './build/amd/main.js'
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