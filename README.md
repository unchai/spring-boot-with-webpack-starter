# Spring-boot with Webpack starter

### Requirements

* Java 11+
* Apache maven 3.1+
* Node.js

### Usage
#### For developer's local mode

```sh
$ npm install
$ ./mvnw clean spring-boot:run -spring.profiles.active=local &
$ npm start
```

#### For development mode

```sh
$ ./mvnw -Pdev clean package
$ java -jar ./target/spring-boot-with-frontend-stater-0.0.1-SNAPSHOT.war
```

#### For production mode

```sh
$ ./mvnw -Preal clean package
$ java -jar ./target/spring-boot-with-frontend-stater-0.0.1-SNAPSHOT.war
```

#### Show bundle analyze map

```sh
$ npm run analyze
```
