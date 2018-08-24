# TS BASE STACK

- `npm run swagger` runs tsao swagger
- `npm run routes` runs tsao routes
- `npm run build` runs the complete build including swagger/routes

### Tricks, Workarounds, Pitfalls,...
- Sometimes `tsoa` fails to discover newly added Controllers. Import your controller on top of your entryFile (i.e. `server.ts`) 
and run the swagger command again. 