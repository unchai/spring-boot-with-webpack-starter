# Spring-boot with Webpack starter

### Requirements

* Java 11+
* Node.js

### Usage
#### For developer's local mode

```sh
$ npm install
$ ./gradlew -Pprofile=local clean bootRun &
$ npm start
```

#### For development mode

```sh
$ ./gradlew -Pprofile=dev clean bootJar
$ java -jar ./target/spring-boot-with-frontend-stater-1.0.0.war
```

#### For production mode

```sh
$ ./gradlew -Pprofile=real clean bootJar
$ java -jar ./target/spring-boot-with-frontend-stater-1.0.0.war
```

#### Show bundle analyze map

```sh
$ npm run analyze
```
