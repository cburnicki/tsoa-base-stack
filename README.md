# TS BASE STACK

- `npm run swagger` runs tsao swagger
- `npm run routes` runs tsao routes
- `npm run build` runs the complete build including swagger/routes

## Intentions

The purpose of this project is to provide a lightweight bootstrap application as a 
base for a simple but professional production backend.



### tsoa, swagger
One issue that kept coming up during development is to provide clear endpoint definitions
for the frontend team. This can be beautifully accomplished by the use of `swaggerUI`,
which provides a nice and useful OpenAPI standard interface to lookup existing endpoints
and payloads. Since generating code from a written `swagger.json` definition turned out 
to be a really bad idea, a decision was made to go with `tsoa` and generate `swagger` definitions
and express routes from controllers.

## Typescript and MongoDB
This project strictly uses typescript since experience showed that a lack of typing 
**will** lead to more errors, some of them serious security issues.

This example comes with mongoDB since that
1. Showed to be a good database especially for a project quickstart
2. It's much easier to split up an existing (growing) system into multiple services
if the system uses non-relational document datastores without joins.

### ORMs
In previous versions of this stack I played around with ORM solution like `typeORM`
the famous `mongoose`. However, ultimately the decision was made not to use any kind
of ORM for the following reasons:

#### 1. Overhead
Every ORM typically comes with more or less overhead. Be it in runtime (reflections) or,
more importantly, in development. For example, `mongoose` is (or was at the time) a 
JavaScript project. To use `mongoose` in a typed way turns ugly and verbose really fast.
Of course there is `typegoose`, but that one turned out to be a bit buggy and also
a bit complicated in usage for a larger scale system (at the time...).

On the other hand, `typeORM` may be a nice solution for relational databases but produced
some weird and buggy results even in simple usecases with mongodb.

Ultimately, imho, there isn't really an advantage of using something like `mongoose` in
a typescript application. Since mongoDB is a document data store, there isn't actually
a lot to map: You throw in json and json comes back out. The native mongoDB driver can
be used with promises and together with typescript's generic typing, it works perfectly 
fine for most situations.

Here, most situations pretty much means: As long as you use interfaces instead of objects
for your model definitions. This, however is fine since in our usual REST API, we don't 
really create objects (they come in, we store them and spit them back out). If something
like object creations is needed, in a real world application, that would be done in factories
and they can also just return interface-objects. Last but not least, being able
to write testable code also prevents us from implementing member methods for models.

A simple `BaseRepository` class is used for all our standard methods (insert, find,...).
This class should contain all writing methods since it 1) takes care of setting and updating
`createdAt`, `updatedAt` and `version` of each model and (in one of our usecases) will be used
to hook in pushs to another system (like a message queue or ElasticSearch).

### Tricks, Workarounds, Pitfalls,...
- Sometimes `tsoa` fails to discover newly added Controllers. Import your controller on top of your entryFile (i.e. `server.ts`) 
and run the swagger command again. 