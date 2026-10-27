# LO★MIO — sitio del videoclip

Sitio estático (HTML, CSS y JS, sin dependencias ni build) con la estética del videoclip «LO MIO» de Gloosito:
- título condensado con estrella y créditos al costado, como la placa del video;
- reel de fondo y ticker;
- números de la edición (233 cortes, 0,17 s de mediana);
- momentos en loop: stutter, collage, cocina y club;
- pared de stills en collage, créditos, grano y flashes que entran al ritmo (150 BPM).

> **No oficial.** El video, los stills y la música son de Gloosito y su equipo. Es un sitio de referencia sobre la edición del videoclip. `robots` está en `noindex`.

## Estructura

```
index.html
styles.css
main.js
assets/img/    stills sacados del video (still-01 a still-14)
assets/video/  loops sin audio: hero, stutter, collage, cocina, club, titulo
```

El video completo se ve por el embed de YouTube (youtube-nocookie), no se aloja acá.

## Verlo local

```bash
python -m http.server 8080
```

Y abrir http://localhost:8080

## Subirlo

- **VPS con nginx:** copiar la carpeta a `/var/www/lo-mio` y apuntar un `server` a esa ruta. Para que quede privado, sumar `auth_basic` con usuario y contraseña.
- **GitHub Pages:** en el repo, Settings > Pages > Deploy from a branch > `main` / root. Queda en `https://augustofayt-hub.github.io/gloosito/`.
