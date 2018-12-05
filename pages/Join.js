import React, { Component } from 'react'
import { Alert,StyleSheet,Image, StatusBar, Text, View, Dimensions, TextInput, Button, ScrollView } from 'react-native';

import Service from '../lib/service';

const {width, height} = Dimensions.get('window');

export default class Join extends Component {
  constructor(props){
    super(props);
    this.state={
      id:'',
      pw:'',
      pwChk:'',
      name:'',
      stuNo:'',
      email:'',
    }
  }
  join(){
    if(this.state.pw!=this.state.pwChk){
      return Alert.alert('비밀번호','비밀번호가 다릅니다.\n비밀번호를 확인해주세요.');      
    }
    
    Service.join(this.state);
  }
  render() {
    return (
        <View style={styles.container}>
            <StatusBar hidden={true}/>
        <View style={styles.logoContainer}>
       <Image source={require('../assets/logo.jpg')} style={styles.logoImg}/>
       <Text style={styles.logoText}>COMPUTER ENGINEERING</Text>
     </View>
    <View style={styles.contentWrap}>
    <ScrollView contentContainerStyle={{width:width, alignItems: 'center'}}>
            <View style={styles.joinWrap}>
              <View style={styles.inputWrap}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>ID</Text>
                  <TextInput 
                    style={styles.input} placeholder="아이디를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"
                    onChangeText={(val)=>{this.setState({id:val})}}
                    value={this.state.id}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>PW</Text>
                  <TextInput 
                    style={styles.input} secureTextEntry={true} placeholder="비밀번호를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"
                    onChangeText={(val)=>{this.setState({pw:val})}}
                    value={this.state.pw}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>PW 확인</Text>
                  <TextInput
                    style={styles.input} secureTextEntry={true} placeholder="비밀번호를 다시 입력하세요." spellCheck={false} underlineColorAndroid="#fff"
                    onChangeText={(val)=>{this.setState({pwChk:val})}}
                    value={this.state.pwChk}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>이름</Text>
                  <TextInput style={styles.input} placeholder="이름을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"
                    onChangeText={(val)=>{this.setState({name:val})}}
                    value={this.state.name}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>학번</Text>
                  <TextInput style={styles.input} keyboardType="number-pad" placeholder="학번을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"
                    onChangeText={(val)=>{this.setState({stuNo:val})}}
                    value={this.state.stuNo}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>이메일</Text>
                  <TextInput style={styles.input} keyboardType="email-address" placeholder="이메일을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"
                    onChangeText={(val)=>{this.setState({email:val})}}
                    value={this.state.email}
                  />
                </View>
              </View>
              <View style={styles.btnWrap}>
                <View style={styles.btnContainer}>
                  <Button 
                    onPress={()=>{this.join()}}
                    title="가입하기" color="#345080"
                  />
                </View>
                <View style={styles.btnContainer}>
                  <Button 
                    onPress={()=>{Service.goto('login')}}
                    title="취소" color="#77787b"
                  />
                </View>
              </View>
            </View>
        </ScrollView>
        </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    logoContainer: {
        width: width,
        paddingVertical: 10,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        flex: 0.2
      },
      logoImg:{
        width: '100%',
        height: 40,
        resizeMode: 'contain'
      },
      logoText:{
        color: '#77787B',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5
      },
    contentWrap:{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
      },
      joinWrap:{
        width: '80%'
      },
      inputTitle:{
        color: '#77787b'
      },
      input:{
        borderBottomColor:'#77787b',
        borderBottomWidth: 1
      },
      inputContainer:{
        marginVertical: 10
      },
      inputWrap:{
        marginBottom: 30
      },

      btnContainer:{
        marginBottom: 15
      },

})