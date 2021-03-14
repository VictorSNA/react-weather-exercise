import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import Cartao from './Cartoes';

const PrevisoesItem = (props) => {
  const dateConverted = (unixTime) => {
    return (
      `${new Date(unixTime * 1000)
        .toLocaleTimeString()}`
    )}
  return (
    <Cartao estilos={styles.cartao}>
      <View style={styles.tela}>
        <Image
          style={styles.imagem}
          source={{ uri: `https://openweathermap.org/img/wn/${props.previsao.weather[0].icon}.png` }}
        />
        <View>
          <View style={styles.linhaDefault}>
            <Text>
              Nascer do sol: { dateConverted(props.previsao.sunrise) }
            </Text>
          </View>
          <View style={styles.linhaDefault}>
            <Text>
              Pôr do sol: { dateConverted(props.previsao.sunset) }
            </Text>
          </View>
          <View style={styles.segundaLinha}>
            <Text>
              Sensação térmica: {`${props.previsao.feels_like}`} °C
            </Text>
          </View>
        </View>
      </View>
    </Cartao>
  )
}

export default PrevisoesItem

const styles = StyleSheet.create({
  cartao: {
    marginBottom: 8
  },
  tela: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  linhaDefault: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  segundaLinha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#DDD'
  },
  imagem: {
    width: 50,
    height: 50
  },
  valor: {
    marginHorizontal: 2
  }
})
