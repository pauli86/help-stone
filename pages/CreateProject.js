import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions, Button, ScrollView, StatusBar,TouchableOpacity,TextInput } from 'react-native';

const {width, height} = Dimensions.get('window');

export default class CreateProject extends Component {
  render() {
    return (
        <View style={styles.container}>
         <StatusBar hidden={true}/>
            <ScrollView contentContainerStyle={{width: width}}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.jpg')} style={styles.logoImg}/>
                <Text style={styles.logoText}>COMPUTER ENGINEERING</Text>
            </View>
            <View style={styles.contentWrap}>
                <View style={styles.createWrap}>
                    <View style={styles.inputWrap}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>프로젝트 제목</Text>
                        <TextInput style={styles.input} placeholder="제목을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>프로젝트 설명</Text>
                        <TextInput style={styles.input} placeholder="설명을 입력하세요." numberOfLines={5} multiline={true} spellCheck={false} underlineColorAndroid="#fff"/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>프로젝트 예상 기간</Text>
                        <View style={styles.periodView}>
                            <View style={styles.dayView}>
                                <Text style={styles.dayText}>시작 날짜</Text>
                                <TextInput style={[styles.input,styles.dayInput]} keyboardType="number-pad" maxLength={8} placeholder="YYYYMMDD" spellCheck={false} underlineColorAndroid="#fff"/>
                            </View>
                            <View style={styles.dayView}>
                                <Text style={styles.dayText}>마감 날짜</Text>
                                <TextInput style={[styles.input,styles.dayInput]} keyboardType="number-pad" maxLength={8} placeholder="YYYYMMDD" spellCheck={false} underlineColorAndroid="#fff"/>
                            </View>
                        </View>
                        
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>프로젝트 참여 멤버</Text>
                        <View style={styles.memberView}>
                            <TextInput style={[styles.input, styles.memberInput]} placeholder="추가할 멤버 ID를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                            <Button title=" 추가 " />
                        </View>
                        <View style={styles.memberList}>
                                <View style={styles.memberItem}>
                                    <Text style={styles.memberName}>1. testID(testName)</Text>
                                    <Button title="삭제" color="#777"/>
                                </View>
                                <View style={styles.memberItem}>
                                    <Text style={styles.memberName}>2. testID(testName)</Text>
                                    <Button title="삭제" color="#777"/>
                                </View>
                            </View>
                        
                    </View>
                    </View>
                    <View style={styles.btnWrap}>
                        <View style={styles.btnContainer}>
                        <Button title="프로젝트 생성" color="#345080"/>
                        </View>
                        <View style={styles.btnContainer}>
                        <Button title="취소" color="#77787b"/>
                        </View>
              </View>
                </View>
            </View>
            </ScrollView>
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
      flex: 2,
    },
    createWrap:{
        width:'80%',
        paddingVertical: 20
    },
    inputTitle:{
        color: '#77787b',
        marginBottom: 3
      },
      input:{
        borderBottomColor:'#77787b',
        borderBottomWidth: 1
      },
      inputContainer:{
        marginVertical: 20
      },
      inputWrap:{
        marginBottom: 40
      },

      btnContainer:{
        marginBottom: 15
      },
      memberView:{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems: 'center',
          width: '100%'
      },
      memberInput:{
          width:'80%'
      },
      memberList:{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 10,
      },
      memberItem:{
          marginVertical: 5,
          width:'100%',
          flexDirection:'row',
          justifyContent: 'space-between',
          alignItems:'center',
          padding:7,
          borderColor: '#77787b',
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: '#f8f8f8'
      },
      memberName:{
          width: '80%',
          color: '#77787b',
          fontSize: 12
      },
      periodView:{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          width: '100%'
      },
      dayView:{
          width: '45%'
      },
      dayText:{
          color: '#77787b',
          fontSize: 10,
          marginBottom: 3
      }
})