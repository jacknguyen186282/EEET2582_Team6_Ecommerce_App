FROM openjdk:11
ADD target/EEET2582_Team6_Ecommerce_App-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
