# Holando Net

## Proyecto: ANG00001 - Home y Varios

### Descripción: Contiene las apps de  /home/ y otras heredadas de Habito1

---

## Versión: 1

```text
Fecha, Version, Programador, Tarea
----------------------------------------------------
26/07/2021, v1, rlupianez, #44632 - Bug fixings
```

---

## Utilidades

```text
Reconstruir proyectos:
npm install

Ejecutar localmente:
npm run proxy
o
ng serve --host=0.0.0.0 --proxy-config=proxy.conf.json

Generar distribución:
    - Verificar el archivo environment.ts y cambiar apiURL de /api a rws
    - Comentar la creación de cookie utilzada en desarrollo en el archivo app.component.ts
    - Luego ejecutar
        npm run ng build --prod --optimization=true
        o
        ng build --prod --optimization=true


Varios GitHub:
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin `https://github.com/usuario/lh_ng_home.git`
git push -u origin main
```
