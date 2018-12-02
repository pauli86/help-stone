import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar,Image, Text, View, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native';

import Service from '../lib/service';

const {width, height} = Dimensions.get('window');

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      id:'',
      pw:''
    }  
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
            <View style={styles.loginWrap}>
              <Text style={styles.headerTitle}>HELP STONE</Text>
              <View style={styles.inputWrap}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>ID</Text>
                  <TextInput 
                    onChangeText={(val)=>{this.setState({id:val})}}
                    value={this.state.id}
                    style={styles.input} placeholder="아이디를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>PW</Text>
                  <TextInput 
                  onChangeText={(val)=>{this.setState({pw:val})}}
                  value={this.state.pw}
                  style={styles.input} secureTextEntry={true} placeholder="비밀번호를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                </View>
              </View>
              <View style={styles.btnWrap}>
                <View style={styles.btnContainer}>
                  <Button title="로그인" color="#37889D"
                    onPress={()=>{
                      Service.login(this.state.id,this.state.pw);
                    }}
                  />
                </View>
                <View style={styles.btnContainer}>
                  <Button title="회원가입" color="#345080"
                    onPress={()=>{
                      Service.goto('join');
                    }}
                  />
                </View>
                <View style={styles.btnContainer2}>
                  <TouchableOpacity
                    onPress={() => Alert.alert(
                      '아이디 찾기',
                      '아이디를 찾으시겠습니까?',
                      [
                        {text: '취소', onPress: () => console.log('Cancel Pressed!')},
                        {text: '확인', onPress: () => console.log('OK Pressed!')},
                      ],
                      { cancelable: false }
                    )}
                  ><Text style={styles.btnText}>아이디 찾기</Text></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert(
                      '비밀번호 재설정',
                      '비밀번호를 재설정 하시겠습니까?',
                      [
                        {text: '취소', onPress: () => console.log('Cancel Pressed!')},
                        {text: '확인', onPress: () => console.log('OK Pressed!')},
                      ],
                      { cancelable: false }
                    )}
                  ><Text style={styles.btnText}>비밀번호 재설정</Text></TouchableOpacity>
                </View>
              </View>
            </View>
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
      loginWrap:{
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
        marginVertical: 15
      },
      inputWrap:{
        marginBottom: 30
      },
      btnContainer2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      btnContainer:{
        marginBottom: 15
      },
      btnText: {
        color: '#77787b'
      },
      headerTitle:{
        textAlign: 'center', 
        fontWeight:'bold', 
        color:'#77787b', 
        fontSize:35,
        marginBottom: 40
      }
})