const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
// GULP 4.0.0
// const webp = require('gulp-webp');

function css(done){
    
   
    src('src/scss/**/*.scss') // Identificar el archivo SASS
        .pipe(plumber()) // Ejecutamos plumber primero
        .pipe(sass()) // Compilarlo
        .pipe(dest('build/css')); // Almacenarlo en el disco duro

    done(); // Callback que avisa a gulp cuando ha terminado la funcion
}

async function versionWebp(done) {
    const webp = await import('gulp-webp');

    // Opciones (parametros) que toma la funcion webp como objeto
    const opciones = {
        quality: 100 // calidad de imagen (0/100)
    };

    src('src/img/**/*.{png,jpg}') // Identificamos los archivos
        .pipe( webp.default(opciones) ) // Ejecutamos la funcion webp
        .pipe( dest('build/img') ) // Asignamos espacio en disco

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel( versionWebp,dev);

