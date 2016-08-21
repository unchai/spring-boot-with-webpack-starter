# Spring-boot with frontend starter

### Requirements
* Java 1.7+
* Apache maven 3.1+

### Usage
#### For developer's local mode (Not aggregated static resources)
```
$ mvn clean spring-boot:run
```

#### For develop mode (Aggregated static resources with sourcemaps)
```
$ mvn -Pdev clean package tomcat7:run-war-only
```

#### For product mode (Aggregated static resources only)
```
$ mvn -Preal clean package tomcat7:run-war-only
```
