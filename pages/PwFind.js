import React, { Component } from 'react'
import { Alert,StyleSheet, StatusBar,Image,Text, View, Dimensions, TextInput, Button, ScrollView } from 'react-native';

import Service from '../lib/service';

const {width, height} = Dimensions.get('window');
export default class PwFind extends Component {
  state={
    id:'',
    name:'',
    stuNo:'',
    pw:'',
    pwChk:''
  }
  componentDidMount(){
    this.setState({
      id:'',
      name:'',
      stuNo:'',
      pw:'',
      pwChk:'',
    });
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
        <View style={styles.loginWrap}>
          <Text style={styles.headerTitle}>비밀번호 재설정</Text>
          <View style={styles.inputWrap}>
          <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>ID</Text>
                  <TextInput 
                  onChangeText={(val)=>{this.setState({id:val})}}
                  value={this.state.id}
                  style={styles.input} placeholder="아이디를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>이름</Text>
              <TextInput
              onChangeText={(val)=>{this.setState({name:val})}}
              value={this.state.name}
              style={styles.input} placeholder="이름을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>학번</Text>
              <TextInput 
              onChangeText={(val)=>{this.setState({stuNo:val})}}
              value={this.state.stuNo}
              style={styles.input} keyboardType="number-pad" placeholder="학번을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
            </View>
            <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>PW</Text>
                  <TextInput
                  onChangeText={(val)=>{this.setState({pw:val})}}
                  value={this.state.pw}
                  style={styles.input} secureTextEntry={true} placeholder="비밀번호를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>PW 확인</Text>
                  <TextInput 
                  onChangeText={(val)=>{this.setState({pwChk:val})}}
                  value={this.state.pwChk}
                  style={styles.input} secureTextEntry={true} placeholder="비밀번호를 다시 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                </View>
          </View>
          <View style={styles.btnWrap}>
            <View style={styles.btnContainer}>
              <Button onPress={()=>{
                if(this.state.id===''){
                  return Alert.alert('비밀번호 재설정','아이디를 입력하세요.');
                }else if(this.state.name===''){
                  return Alert.alert('비밀번호 재설정','이름을 입력하세요.');
                }else if(this.state.stuNo===''){
                  return Alert.alert('비밀번호 재설정','학번을 입력하세요.');
                }else if(this.state.pw===''){
                  return Alert.alert('비밀번호 재설정','비밀번호를 입력하세요.');
                }else if(this.state.pw!==this.state.pwChk){
                  return Alert.alert('비밀번호 재설정','비밀번호확인이 비밀번호와 다릅니다.\n확인 후 시도해주세요.');
                }else{                  
                  Service._resetPW(
                    this.state.id,
                    this.state.name,
                    this.state.stuNo,
                    this.state.pw
                    );
                }
              }}
              title="재설정" color="#345080"/>
            </View>
            <View style={styles.btnContainer}>
              <Button onPress={()=>{
                Service.goto('login');
              }}
              title="취소" color="#77787b"/>
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
        fontSize:30,
        marginVertical: 20
      }
})