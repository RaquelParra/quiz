<!DOCTYPE html>
<html>
  <head>
    <meta charser="utf-8"><title>Quiz<title>
    <link rel='stylesheet' href='/stylesheet/style.css' />
  </head>
  <body>
    <h2> Quiz: el juego de las preguntas</h2>

    <form methos="get" action="/quizes/answer">
      Pregunta: <%= pregunta %> <p>
      <input type ="text" name="respuesta" value="Responda aqui"/>
      <input type="submit" value="enviar">
    </form>
  </body>
</html>
