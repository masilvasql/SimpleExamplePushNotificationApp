import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, AppState } from 'react-native';
import axios from 'axios'
import { Permissions, Notifications } from 'expo';


export default class App extends React.Component {

constructor(){
  super()
  this.state = {
    dados:[]
  }
}

  componentes = ({item})=>(
    <View>
      <View style={{borderWidth:2, borderColor:'red'}}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      </View>
      
    </View>
  )

  componentDidMount() {
    this.buscaRegistroInicial()
    this.buscaDados()
  }

  buscaRegistroInicial(){
    axios.get('http://10.1.1.154:5000/auth/usuariosCadastrados').then(resp => {
      this.setState({dados:resp.data})
  })
  }

  buscaDados(){
    setInterval(() => {
      console.log('veio aqui')
      axios.get('http://10.1.1.154:5000/auth/usuariosCadastrados').then(resp => {
        this.setState({dados:resp.data})
    })
    }, 5000);
  }


  
  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.dados}
          renderItem ={this.componentes}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
});
