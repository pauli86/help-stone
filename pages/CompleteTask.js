import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,Button, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export default class CompleteTask extends Component {
  render() {
    return (
        
        <View style={styles.container}>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>완료한 Task : 1개</Text>

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
                            <Text style={styles.taskTitleText}>완료일</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>18-11-27 13:08</Text>
                        </View>
                </View>

                {/* 터치하면 todo list 보여주기 */}
                <TouchableOpacity style={styles.listBtn}>
                    <Text style={{color: '#4f4e4e'}}>TODO 리스트  <Ionicons name='ios-arrow-down' color='#777' size={18}/></Text>
                </TouchableOpacity>
                
                {/* todo View */}
                <View style={styles.todoWrap}>

                    {/* todo 반복구간 시작*/}
                    <View style={styles.todoView}>
                        <Text style={styles.todoItem}>와이어 프레임</Text>
                    </View>
                    <View style={styles.todoView}>
                        <Text style={styles.todoItem}>와이어 프레임</Text>
                    </View>
                    <View style={styles.todoView}>
                        <Text style={styles.todoItem}>와이어 프레임</Text>
                    </View>
                    <View style={styles.todoView}>
                        <Text style={styles.todoItem}>와이어 프레임</Text>
                    </View>
                    <View style={styles.todoView}>
                        <Text style={styles.todoItem}>와이어 프레임</Text>
                    </View>
                    <View style={styles.todoView}>
                        <Text style={styles.todoItem}>와이어 프레임</Text>
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
        justifyContent:'center',
        alignItems:'center'
    },
    todoItem:{
        color: '#4f4e4e',
        textAlign: 'center'
    }
})