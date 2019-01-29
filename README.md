# Automatización de pruebas de EMAIL con MAILTRAP

En la mayoría de las aplicaciones que utilizamos a día de hoy, el uso del email contínua siendo una parte importante de muchas de las funcionalidades principales que éstos sistemas nos ofrecen. Ya sea para darnos de alta como usuarios, recuperar la contraseña, recibir informes, facturas, reservas de vuelos, alojamientos, etc. 
En defnitiva, el envío de correos electrónicos es algo que aún está muy ligado a la funcionalidad core de muchos sistemas.

El mail, es algo que ya lleva mucho tiempo entre nosotros, lo consideremos un método de envío de información fiable y en prácticamente todos los lenguajes existen librerías que facilitan enormemente la tarea de composición y envío. Es por esto que en muchas ocasiones pasamos por alto las pruebas donde el envío de correos está implicado.
No obstante existen determinados escenarios donde es aconsejable realizar unas pruebas mínimas, por ejemplo cuando queremos comprobar:

* Formato y diseño adecuados del cuerpo del correo
* Uso y sustitución correcta de campos de plantillas
* Ficheros adjuntados correctamente
* Envío correcto de links de activación de usuarios o reseteo de contraseñas
* Destinatarios y remitente generados correctos

Los fallos en cualquiera de los elementos anteriormente enumerados pueden suponer errores de seguridad graves o un deterioro de la imagen de marca importante ante los clientes.

# Automatización de pruebas envío Email
## Mocking
A la hora de realizar pruebas unitarias de la funcionalidad en la que interviene el envío de emials lo más habitual es la utilización de algún framework de mocking que simule dichas interacciones (mockito, Moq, sinon, etc.). Gracias a esto podremos comprobar que nuestro cumple las especificaciones funcionales y se comporta corretamente ante determinadas situaciones de error sin la necesidad de realizar envíos de correos reales.

## Pruebas de Integración o e2e
Aunque partamos de una buena base de pruebas unitarias cuando abordemos la automatización de pruebas de integración, la gestión de los correos es un tema que no siempre es fácilmente automatizable ya que plantea varios puntos a tener en cuenta

* Qué cuentas van a recepcionar los emails
* Qué tipo de cuenta recepciona los emails (IMAP, POP3, etc)
* Tengo acceso/credenciales para las cuentas que van a recepcionar los emails
* Cómo filtro los correos que me interesa controlar
* Control de flujo del envío o sincronía de la prueba

Esto son sólo unos ejemplos de las dificultades que plantea la automatización de pruebas cuando el email forma parte de la misma. Como podría ser el caso de: alta de usuario, olvido de contraseña, envío de alertas, etc..

Para este tipo de situaciones Mailtrap puede resultar de gran utilidad

# MAILTRAP

## ¿Qué es?


## MailTrap API 
Documentation: https://mailtrap.docs.apiary.io/

## Ejemplo

Running the server:
* During development, we use both npm run watch-ts (recompiles application on source changes) and npm run watch-node (restarts application on recompilation)
  * One terminal: **npm run watch-ts**
  * Another terminal: **npm run watch-node**
* npm run build-ts only compiles the application
* npm run serve (npm run start) only starts the application