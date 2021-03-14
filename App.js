import React, { useState, useEffect  } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Keyboard,
  FlatList
} from 'react-native';
import PrevisoesItem from './components/PrevisoesItem';

import keys from './keys';

export default function App() {
  const [cidade, setCidade] = useState("");
  const [previsoes, setPrevisoes] = useState([]);

  useEffect(() => {
    console.log(previsoes);
  }, [previsoes]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obterPrevisoes = () => {
    setPrevisoes([]);
    const target = `${weatherForeCast}${cidade}&appid=${apiKey}`;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      var prev = dados["city"];
      const targetOneCall = `${weatherOneCall}lat=${prev.coord.lat}&lon=${prev.coord.lon}&appid=${apiKey}`;
      fetch(targetOneCall)
      .then((dados) => dados.json())
      .then((dados) => {
        setPrevisoes([dados["current"]]);
        setCidade('');
        Keyboard.dismiss();
      }
    )});
  }

  const weatherForeCast = `https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=`
  const weatherOneCall = `https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,daily,minutely,alerts&units=metric&`
  const apiKey = keys.weatherMapApiKey;

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          placeholder="Digite uma cidade..."
          style={styles.nomeCidade}
          value={cidade}
          onChangeText={capturarCidade} 
        />
        <Button
          title="OK"
          onPress={obterPrevisoes}
        />
      </View>
      <FlatList
        data={previsoes}
        renderItem={
          previsao => (
            <PrevisoesItem previsao={previsao.item} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white"
  },
  entrada: {
    marginBottom: 12
  },
  nomeCidade: {
    padding: 12,
    borderBottomColor: "#BB96F3",
    borderBottomWidth: 2,
    textAlign: "center",
    marginBottom: 8
  }
});
