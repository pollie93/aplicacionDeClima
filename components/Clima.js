import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Clima = ({resultado}) => {
    const { name, main } = resultado;

    if(!name) return null; // esto genera que no se ejecute el componenete hasta que tengamos una respuesta
    
    // grados KELVIN a centígrados, y se toma la Temp actual - Grados Kelvin
    const kelvin = 273.15;
    console.log(resultado)
    return (
        <View style={styles.clima}>
            <Text style={[ styles.texto, styles.actual ]}> { parseInt( main.temp - kelvin) } 
                <Text style={styles.temperatura}>
                    &#x2103; 
                </Text>
                <Image
                    style={{width: 66, height: 58}}
                    source={{uri:`http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
                />
            </Text>

            <View style={styles.temperaturas}>
                <Text style={styles.texto}>Min {' '}
                    <Text style={styles.temperatura}>
                        { parseInt(main.temp_min - kelvin ) } &#x2103; 
                    </Text>
                </Text>

                <Text style={styles.texto}>Max {' '}
                    <Text style={styles.temperatura}>
                        { parseInt(main.temp_max - kelvin ) } &#x2103; 
                    </Text>
                </Text>
            </View>
        </View>
    );
}

//uri, hay que especificar una pag web, un dominio dnd encuentra y descarga la imagen,despues colcoar template string
// parseInt coloca el numero entero
// &#x2103; agraga el símbolo de °C

const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    texto: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold' //negritas
    },
    temperatura: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    temperaturas: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default Clima;