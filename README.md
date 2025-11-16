# 📰 Portal News — Repositorio

Un **portal de noticias** es una plataforma web donde se publican artículos, reportajes y contenido informativo de manera organizada.  
Este proyecto incluye entornos separados de **desarrollo** y **producción** utilizando Docker para facilitar su despliegue.

---

## 🚀 Entornos disponibles

Este repositorio incluye dos configuraciones:

- **Desarrollo** — Pensado para trabajar localmente, editar y depurar.
- **Producción** — Optimizado para despliegues reales en servidores.

---

## 🛠️ Ejecutar entorno de desarrollo

> [!NOTE]  
> Asegúrate de estar en la **raíz del proyecto** antes de ejecutar este comando.

```bash
docker compose -f docker-compose.dev.yml up --build
```
## 📦 Ejecutar entorno de producción
```bash
docker compose -f docker-compose.prod.yml up --build
```
> [!WARNING]
> Usa este entorno solo para despliegues reales.
> No es recomendable utilizarlo para pruebas locales.

## 📱 Verlo en celular

Si deseas ver el sitio web del front-end en celulares, deberás de ejecutar el siguiente comando
```bash
hostname -I | awk '{print $1}'
```
Al ejecutar este comando, te permite ver la ip para poder conectarte desde cualquier dispositivo, siempre y cuando estés en la misma red.
