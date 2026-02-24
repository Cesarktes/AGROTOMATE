package agt.inv.excepcion;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja errores de negocio (ej: correo duplicado, rol nulo, etc.)
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> manejarErroresNegocio(RuntimeException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    /**
     * Maneja recursos no encontrados
     */
    @ExceptionHandler(RecursoNoEncontradoExcepcion.class)
    public ResponseEntity<String> manejarRecursoNoEncontrado(
            RecursoNoEncontradoExcepcion ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
}