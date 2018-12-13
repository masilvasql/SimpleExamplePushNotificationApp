import React from 'react';
import { StyleSheet, Text, View, FlatList,  } from 'react-native';
import axios from 'axios'
import { Permissions, Notifications } from 'expo';


export default class App extends React.Component {

constructor(){
  super()
  this.state = {
    dados:[],
    tk:''
  }
}

registerForPushNotifications = async ()=>{

    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalSatus = status

    if(status === 'granted'){
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalSatus = status
    }

    if(finalSatus !== 'granted'){return}

    let token = await Notifications.getExpoPushTokenAsync()
    this.setState({tk:token})
    

}



  componentes = ({item})=>(
    <View>
      <Text>Token: {this.state.tk}</Text>
      <View style={{borderWidth:2, borderColor:'red'}}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      </View>
      
    </View>
  )

  //ExponentPushToken[ai-4qoGVdGHsB-hJ2EX47j]

  componentDidMount() {
    this.registerForPushNotifications()
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
