import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,Button, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Service from '../lib/service';

const {width, height} = Dimensions.get('window');

export default class CompleteTask extends Component {
    state = {
        detailIdx:'',
        doneIdx:'',
    }
    componentWillMount(){
        Service.refreshDoneTask = (v)=>{this.setState(v)}
    }
  render() {
    return (
        
        <View style={styles.container}>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>완료한 Task : {this.props.doneTask.length}개</Text>

                {/* task 반복구간 시작*/}

                {this.props.doneTask.map((task,idx)=>{
                    return (
                        <View key={'doneTaskT'+idx} style={styles.sectionView}>
                    <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>Task 명</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>{task.title}</Text>
                        </View>
                    </View>
                
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>설명</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>{task.desc}</Text>
                        </View>
                </View>
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>완료일</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>{(new Date(task.doneDate)).toLocaleDateString('ko-KR')}</Text>
                        </View>
                </View>

                {/* 터치하면 todo list 보여주기 */}
                <TouchableOpacity 
                onPress={()=>{
                    if(this.state.doneIdx==='m'+idx){
                        Service.refreshDoneTask({doneIdx:'m'});
                    }else{
                        Service.refreshDoneTask({doneIdx:'m'+idx});
                    }
                }}
                style={styles.listBtn}>
                    {this.state.doneIdx!=='m'+idx?
                    <Text style={{color: '#4f4e4e'}}>TODO 리스트  <Ionicons name='ios-arrow-down' color='#777' size={18}/></Text>
                    :
                    <Text style={{color: '#4f4e4e'}}>TODO 리스트  <Ionicons name='ios-arrow-up' color='#777' size={18}/></Text>
                    }
                </TouchableOpacity>
                
                {/* todo View */}
                {this.state.doneIdx!=='m'+idx?
                <View></View>
                :
                <View style={styles.todoWrap}>

                    {/* todo 반복구간 시작*/}
                    {task.doList.map((todo,didx)=>{
                        return (
                        <View key={'doneTaskDo'+didx} style={styles.todoView}>
                            <Text style={styles.todoItem}>{todo.title}</Text>
                        </View>        
                        )
                    })}
                    {/* todo 반복구간 끝*/}

                </View>
                }
            </View>
                    )
                })
            }
                


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