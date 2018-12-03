import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,TextInput, Button, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export default class Member extends Component {
    state= {
        taskPercent: '41%',
        todoPercent: '37%',
    }
  render() {
    return (
    <View style={styles.container}>
        {/* member 반복 구간 시작*/}
        <View style={styles.sectionWrap}>
            <View style={styles.memberWrap}>
                <View style={styles.memberInfoWrap}>
                    <View style={styles.memberInfoView}>
                        <View style={styles.memberName}>
                            <Text style={styles.memberNameText}>홍길동</Text>
                        </View>
                        <View style={styles.memberEmail}>
                            <Text style={styles.memberEmailText}>아이디: abross987</Text>
                        </View>
                    </View>
                    <View style={styles.memberInfoView}>
                        <View style={styles.memberName}>
                            <Text style={styles.memberEmailText}>PM</Text>
                        </View>
                        <View style={styles.memberEmail}>
                            <Text style={styles.memberEmailText}>이메일: abross987@gmail.com</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.rangeWrap}>
                    <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>Task</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>14/32 ({this.state.taskPercent})</Text>
                                <View style={[styles.rangeColor,{width:this.state.taskPercent,backgroundColor:'#81d4fa'}]}></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rangeWrap}>
                    <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>Todo</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>45/122 ({this.state.todoPercent})</Text>
                                <View style={[styles.rangeColor,{width:this.state.todoPercent,backgroundColor:'#81c784'}]}></View>
                            </View>
                        </View>
                    </View>
                    {/* 터치 시 아래  taskWrap 보임 */}
                    <TouchableOpacity style={styles.detailBtn}>
                        <Text style={styles.detailText}>상세보기</Text>
                    </TouchableOpacity>
            </View>
            {/* task 구간 */}
            <View style={styles.taskWrap}>
            <Text style={styles.sectionTitle}>진행중인 Task : 1개</Text>
                {/* 진행중 task 반복구간 시작*/}
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
                {/* 터치하면 todo list 보여주기 */}
                <TouchableOpacity style={styles.listBtn}>
                    <Text style={{color: '#4f4e4e',fontSize: 12}}>TODO 리스트  <Ionicons name='ios-arrow-down' color='#777' size={18}/></Text>
                </TouchableOpacity>
                {/* todo View */}
                <View style={styles.todoWrap}>
                    
                    {/* todo 반복구간 시작*/}
                    <View style={styles.todoView}>
                    {/*  TodoView시작 */}
                        <View style={styles.todoBtn}>
                            {/* 완료된 ToDo 아이콘*/}
                            {/* <Ionicons name='ios-checkbox' color='#81c784' size={20}/> */}
                            {/* 진행중인 ToDo 아이콘 */}
                            <Ionicons name='ios-sync' color='#4f4e4e' size={20}/>
                        </View>
                        <View style={styles.todoTextView}>
                            <Text style={styles.todoText}>와이어 프레임</Text>
                        </View>
                    {/* TodoView 끝 */}
                    </View>
                    {/* todo 반복구간 끝*/}
                </View>
                </View>
                {/* 진행중 task 반복구간 끝*/}
                
                <Text style={[styles.sectionTitle,{marginTop:15}]}>완료한 Task : 1개</Text>
                {/* 완료 task 반복구간 시작*/}
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
                            <Text style={styles.taskTitleText}>완료일</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>18-11-27 13:08</Text>
                        </View>
                </View>

                {/* 터치하면 todo list 보여주기 */}
                <TouchableOpacity style={styles.listBtn}>
                    <Text style={{color: '#4f4e4e',fontSize: 12}}>TODO 리스트  <Ionicons name='ios-arrow-down' color='#777' size={18}/></Text>
                </TouchableOpacity>
                
                {/* todo View */}
                <View style={styles.todoWrap}>

                    {/* todo 반복구간 시작*/}
                    <View style={[styles.todoView,{justifyContent:'center'}]}>
                        <Text style={styles.todoText}>와이어 프레임</Text>
                    </View>
                    <View style={[styles.todoView,{justifyContent:'center'}]}>
                        <Text style={styles.todoText}>와이어 프레임</Text>
                    </View>
                    <View style={[styles.todoView,{justifyContent:'center'}]}>
                        <Text style={styles.todoText}>와이어 프레임</Text>
                    </View>
                    {/* todo 반복구간 끝*/}

                </View>

                </View>
                {/* 완료 task 반복구간 끝*/}
                
            </View>
            {/* task 구간 끝 */}
            </View>
            {/* 멤버 반복 구간 끝*/}
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
      taskWrap:{
        padding: 15,
        width: '100%'
      },
      memberWrap:{
          padding: 15,
          width: '100%'
      },
      memberInfoWrap:{
        width: '100%',

        marginBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
      },
      memberInfoView:{
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:3
      },
      memberName:{
        width: '30%',
        justifyContent:'center',
        alignItems:'flex-start'
      },
      memberEmail:{
        width: '70%',
        justifyContent:'center',
        alignItems:'flex-end'
      },
      memberNameText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4f4e4e'
      },
      memberEmailText:{
        color: '#77787b',
        fontSize: 12
      }, 
      detailBtn:{
          backgroundColor: '#999',
          width: '100%',
          borderRadius: 5,
          marginTop: 10,
          justifyContent:'center',
          alignItems:'center',
          paddingVertical: 10
      },
      detailText:{
          color: '#fff',
          fontSize: 16
      },
      sectionWrap:{
        marginVertical: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
    sectionTitle:{
        color: '#4f4e4e',
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 13
    },
    taskTitleText:{
        fontSize: 12,
        color: '#4f4e4e',
    },
    sectionView:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        padding: 6,
        borderRadius: 5
    },
    sectionContent:{
        color: '#4f4e4e',
        fontSize: 12
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
      marginVertical: 3
  },
  taskTitle:{
      width: '30%',
      justifyContent:'center',
      alignItems:'center'
  },
  taskContent:{
      backgroundColor: '#f8f8f8',
      padding: 6,
      width:'70%',
      justifyContent:'center',
      alignItems:'center'
  },
  listBtn:{
      width: '100%',
      marginTop: 13,
      marginBottom: 6,
      justifyContent:'center',
      alignItems: 'center',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#ccc',
      paddingTop: 3,
  },
  todoWrap:{
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
  },
  todoView:{
      backgroundColor: '#f8f8f8',
      paddingVertical: 7,
      marginVertical: 3,
      width:'100%',
      justifyContent:'flex-end',
      alignItems:'center',
      flexDirection: 'row'
  },
  todoText:{
      color: '#4f4e4e',
      textAlign: 'center',
      fontSize: 12
  },
    todoTextView:{
        width: '80%'
    },
    todoBtn:{
        width: '20%',
        justifyContent:'center',
        alignItems: 'center'
    },
    editBtn:{
        width: '15%',
        justifyContent:'center',
        alignItems: 'center'
    },
    rangeTitle:{
        color: '#4f4e4e',
        fontSize:13
    },
    rangeWrap:{
        width: '100%',
        marginVertical: 5
    },
    rangeTitleWrap:{
        width:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    rangeTitleView:{
        width: '20%',
        alignItems:'center'
    },
    rangeColorWrap:{
        width: '80%',
        backgroundColor: '#f8f8f8',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ededed',
        height: 20
    },
    rangeText:{
        fontSize:10,
        color:'#777'
    },
    rangeColor: {
        position: 'absolute',
        left: 0,
        top: 0, 
        height: '100%',
        zIndex: -10
    },
})