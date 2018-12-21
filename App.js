import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, SafeAreaView, ActivityIndicator, StyleSheet, Text, View } from 'react-native';


import Service from './lib/service';

import Login from './pages/Login';
import Join from './pages/Join';
import IdFind from './pages/IdFind';
import PwFind from './pages/PwFind';
import Main from './pages/Main';
import CreateProject from './pages/CreateProject';

import ProjectTab from './pages/ProjectTab';

class Loading extends Component {
  render() {
    return (
      <SafeAreaView style={styles.Loading}>        
        <Image
          style={styles.icon}
          source={require('./assets/icon.jpg')}
        />
        <View>
          <Text style={styles.whiteText}>Loading... </Text>
          <ActivityIndicator/>
        </View>
      </SafeAreaView>
    )
  }
}

// class Main extends Component {
//   render() {
//     return (
//       <View style={styles.Main}>
//         <Text style={styles.whiteText}></Text>
//       </View>
//     )
//   }
// }

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      current:'loading'
    }
    this.loadData.bind(this);
    this.navigate.bind(this);
    
  }
  navigate(val){
    console.log('[APP][navigate] val =',val);
    this.setState({
      current:val
    });
  }
  getScreen(){
    switch(this.state.current){
      case 'loading':
        return <Loading/>
      case 'main':
        return <Main/>
      case 'login':
        return <Login/>
      case 'join':
        return <Join/>
      case 'projectTab':
        return <ProjectTab/>
      case 'createProject':
        return <CreateProject/>
      case 'idFind':
        return <IdFind/>
      case 'pwFind':
        return <PwFind/>
    }
    return;
  }
  loadData(val){    
      console.log('[APP][loadData]');    
      // Service.goto('login');
      // this.setState({
      //   isLoaded:true
      // })
      // console.log(this.state.isLoaded);    
      //Service.changeFunc('login');
      this.navigate(val);
  }  
  componentDidMount(){
    console.log('[APP][componentDidMount]');    
    Service.changeFunc = (v)=>{this.navigate(v)};    
    if(!this.state.isLoaded){
      setTimeout(function(){
        console.log('set time out');
        Service.changeFunc('login');
        // test 하는동안 여기서 바로 페이지 이동
       //Service.goto('createProject');
      },300);  
    }
  }
  render() {
    console.log('[App][render]');
    return (
      <SafeAreaView
       style={styles.container}
       >
       <KeyboardAvoidingView style={{ flex: 1}}  behavior="padding">
        {/* {Service.goto('login')} */}
        {this.getScreen()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
  },
  whiteText:{
    color:"gray",
    fontSize:15,
    fontWeight:"600"
  },
  icon:{
    width:300,
    height:300
  },
  Main:{
    flex:1,
    borderWidth:2,
    borderColor:"blue",
    backgroundColor: '#131313',
    justifyContent:"center",
    alignItems:"center",
  },
  Loading:{
    flex:1,
    // borderWidth:2,
    // borderColor:"red",
    backgroundColor: '#fff',
    justifyContent:"center",
    alignItems:"center",
  }
});
