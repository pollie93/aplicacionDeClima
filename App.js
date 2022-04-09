import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima'

const App = () => {

  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)');

  const { ciudad, pais } = busqueda;

  useEffect(() => {
      const consultarClima = async () => {
        if(consultar) {
          const appId = 'cca4101ea4deeaf1a8df8b41cd61b44a';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
          //Cuando consulto a la appi y si existe una ciudad que no existe
          try {
              const respuesta = await fetch(url); //cuando uso FETCH usar doble AWAIT. Ejemplo de respuesta SIN formatear:'{'ciudad':'Buenos aires', 'pais':'Argentina'}'
              const resultado = await respuesta.json(); // el .json() sobre la respuesta te la formatea para que sea legible Y NO OLVIDARSE EL AWAIT
              guardarResultado(resultado); // guardamos en el state la respuesta formateada, legible para el ojo de un dev
              guardarConsultar(false);
      
              // Modifica los colores de fondo basado en la temperatura
              const kelvin = 273.15;
              const { main } = resultado;
              const actual = main.temp - kelvin;

              if(actual< 10) {
                guardarBgcolor('rgb(105, 108, 149)');
              } else if(actual >= 10 && actual < 25) {
                guardarBgcolor('rgb(71, 149, 212)');
              } else {
                guardarBgcolor('rgb(178, 28, 61)');
              }

            } catch (Error) {
                mostrarAlerta();
            }
          }
      }
      consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o país',
      [{ text: 'OK'}]
    )
  }

  const ocultarTeclado = () => {
    Keyboard.dismiss(); // para cerrar el teclado
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima
              resultado={resultado}
            />
            <Formulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />

          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center' //centra todo el contenido
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;