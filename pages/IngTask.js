import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,TextInput, Button, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export default class IngTask extends Component {

  render() {
    return (
        <View style={styles.container}>
                {/* 터치 시 New Task 생성 View 보여주기 */}
                <TouchableOpacity style={styles.newProjectContainer}>
                    <Text style={{color: "#fff", fontWeight:'bold',fontSize: 16}}>새 Task 생성</Text>
                </TouchableOpacity>
                {/* New Task 생성 View 시작 */}
                <View style={[styles.sectionView,{marginBottom: 20}]}>
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                        <Text style={styles.taskTitleText}>Task 이름</Text>
                        </View>
                        <View style={styles.taskContent}>
                        <TextInput style={[styles.input,{width: '100%'}]} placeholder="Task이름을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                        </View>
                    </View>
                
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>설명</Text>
                        </View>
                        <View style={styles.taskContent}>
                        <TextInput style={[styles.input,{width: '100%'}]} placeholder="Task설명을 입력하세요." multiline={true} spellCheck={false} underlineColorAndroid="#fff"/>
                        </View>
                </View>
                <Button title="Task 추가하기" color="#4f4e4e"/>
                </View>
            {/* New Task 생성 View 끝 */}

            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>진행중인 Task : 1개</Text>

                {/* task 반복구간 시작*/}
                <View style={styles.sectionView}>
                    <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>Task 이름</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>UI</Text>
                        </View>
                    </View>
                
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>설명</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>모바일 앱 UI 작업</Text>
                        </View>
                </View>
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>진행도</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>7/10</Text>
                        </View>
                </View>
                <Button title="Task 완료하기" color="#81d4fa"/>

                {/* 터치하면 todo list 보여주기 */}
                <TouchableOpacity style={styles.listBtn}>
                    <Text style={{color: '#4f4e4e'}}>TODO 리스트  <Ionicons name='ios-arrow-down' color='#777' size={18}/></Text>
                </TouchableOpacity>
                {/* todo View */}
                <View style={styles.todoWrap}>
                
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="추가할 ToDo를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                        <Button title="추가" color="#4f4e4e"/>
                    </View>
                    
                    {/* todo 반복구간 시작*/}
                    <View style={styles.todoView}>
                    {/* 추가 된 Todo 시작 */}
                        <TouchableOpacity style={styles.todoBtn}>
                        {/* 완료 체크 전 아이콘 */}
                        <Ionicons name='ios-square-outline' color='#4f4e4e' size={20}/>
                        {/* 완료 체크 후 아이콘 */}
                        {/* <Ionicons name='ios-checkbox' color='#81c784' size={20}/> */}
                        </TouchableOpacity>
                        <View style={styles.todoTextView}>
                            <Text style={styles.todoText}>와이어 프레임</Text>
                        </View>
                            {/* ToDo 수정 버튼 */}
                            <TouchableOpacity style={styles.todoBtn}>
                                <Ionicons name='ios-create' color='#4f4e4e' size={20}/>                            
                            </TouchableOpacity>
                            {/* ToDo 삭제 버튼 */}
                            <TouchableOpacity style={styles.todoBtn}>
                                <Ionicons name='ios-close-circle' color='#f44336' size={20}/>
                            </TouchableOpacity>
                    {/* 추가 된 Todo 끝 */}
                    
                    {/* 수정 중 Todo 시작 */}
                        {/* <TextInput style={[styles.input,{marginLeft: 10}]} spellCheck={false} underlineColorAndroid="#fff"/>
                        // ToDo 수정완료 버튼
                        <TouchableOpacity style={styles.editBtn}>
                            <Ionicons name='ios-checkmark-circle' color='#81c784' size={20}/>
                        </TouchableOpacity> */}
                    {/* 수정 중 Todo 끝 */}

                    </View>
                    {/* todo 반복구간 끝*/}
                </View>
                </View>
                {/* task 반복구간 끝*/}

            </View>
        </View>
        
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
      },
      sectionWrap:{
          marginVertical: 10,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%'
      },
      sectionTitle:{
          color: '#4f4e4e',
          marginBottom: 5,
          fontWeight: '500'
      },
      sectionView:{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#ccc',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '100%',
          padding: 10,
          borderRadius: 5
      },
      sectionContent:{
          color: '#4f4e4e',
      },
      newProjectContainer: {
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81c784',
        borderRadius: 50,
        marginVertical: 20,
    },
    taskView:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginVertical: 7
    },
    taskTitle:{
        width: '30%',
        justifyContent:'center',
        alignItems:'center'
    },
    taskContent:{
        backgroundColor: '#f8f8f8',
        padding: 10,
        width:'70%',
        justifyContent:'center',
        alignItems:'center'
    },
    listBtn:{
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        justifyContent:'center',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
        paddingTop: 7,
    },
    todoWrap:{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    todoView:{
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        marginVertical: 5,
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection: 'row'
    },
    todoText:{
        color: '#4f4e4e',
        fontSize: 12,
        textAlign: 'center'
    },
    inputContainer:{
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 5,
        justifyContent:'space-between',
        alignItems: 'center',
        width: '100%'
    },
    input:{
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
        width: '80%'
      },
      todoTextView:{
          width: '64%'
      },
      todoBtn:{
          width: '12%',
          justifyContent:'center',
          alignItems: 'center'
      },
      editBtn:{
          width: '15%',
          justifyContent:'center',
          alignItems: 'center'
      }
})