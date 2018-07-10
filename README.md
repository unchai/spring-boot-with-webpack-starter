# Spring-boot with Webpack starter

### Requirements

* Java 1.7+
* Apache maven 3.1+
* Node.js

### Usage
#### For developer's local mode

```sh
$ npm install
$ ./mvnw clean spring-boot:run -Drun.jvmArguments="-Dspring.profiles.active=local" &
$ npm run watch
```

#### For production mode

```sh
$ ./mvnw clean package
$ java -jar ./target/spring-boot-with-frontend-stater-0.0.1-SNAPSHOT.war
```
