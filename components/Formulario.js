import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// el ANIMATED se usa con useState, x ende se debe importar useState-trae las animaciones
// aca solo es necesario colocar un valor. Hacemos ref al valor de la animacion
    // el valor 1 es nuestra escala, el valor inicial. Es decir con escala del 100%
    // hacia donde finaliza la animacion 
    //START: le da un efecto mas realista a la app, y se le pasa lo q quiero animar, permite arrancar la animacion

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
    const {pais, ciudad} = busqueda;
    const [ animacionboton ] = useState(new Animated.Value(1));
    
    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }

        // Consultar la API
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //encabezado
            'Agregar una ciudad y país para la búsqueda', //msj que muestro al usuario
            [{ text: 'Entendido' }]  //arreglo de botones
        )
    }

    const animacionEntrada = () => {
        Animated.spring( animacionboton, {
            toValue: .75 
        }).start(); 
    }

    const animacionSalida = () => {
        Animated.spring( animacionboton, {
            toValue: 1,
            friction: 4, //controlo el rebote de mi boton, cto mas bajo, mayor rebote
            tension: 30//cto menor numero, mas suave el mov
        }).start();
    }
    
    const estiloAnimacion = {
        transform: [{ scale: animacionboton }] 
    }

    // en 1er lugar, la animacion esta en 1, cdo el usuario da clic pasa a .9, afecta la escala
    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad })} //PERMITE LEER LO Q EL USUARIO ESCRIBE
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker 
                        selectedValue={pais}
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                        onValueChange={ pais => guardarBusqueda({ ...busqueda, pais}) }
                    >
                        <Picker.Item label="-- Seleccione un país --" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="Mexico" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
                </View>

                <TouchableWithoutFeedback //estps 2mtodos si exiten, pero no en el touchhiglai(?)
                    onPressIn={ () => animacionEntrada() }
                    onPressOut={ () => animacionSalida() }
                    onPress={ () => consultarClima() }
                >
                    <Animated.View style={[ styles.btnBuscar, estiloAnimacion ]}>
                        <Text style={styles.textoBuscar} >Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

// cuando se anima un elemento, hay que especificar que elemento es Animated.View 

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Formulario;