# Spring-boot with frontend starter

### Requirements
* Java 1.7+
* Apache maven 3.1+

### Usage
#### For developer's local mode (Not aggregated and uglified static resources)
```
$ mvn clean spring-boot:run
```

#### For develop mode (Aggregated and uglified static resources with sourcemaps)
```
$ mvn -Pdev clean package
$ java -jar ./target/spring-boot-with-frontend-stater-0.0.1-SNAPSHOT.war
```

#### For product mode (Aggregated and uglified static resources without sourcemaps)
```
$ mvn -Preal clean package
$ java -jar ./target/spring-boot-with-frontend-stater-0.0.1-SNAPSHOT.war
```
