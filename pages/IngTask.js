import React, { Fragment, Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,TextInput, Button, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Service from '../lib/service';

const {width, height} = Dimensions.get('window');

export default class IngTask extends Component {
    state = {
        mode:'none', // or create
        title:'',
        desc:'',
        doTitle:'',
        todoMode:'none',        
        editTodoIdx:'',
        ongoingIdx:'',
        editTaskIdx:'',
        editTaskTitle:'',
        editTaskDesc:'',
    }
    componentWillMount(){
        Service.refreshOngoingTask = (v)=>{this.setState(v)}
    }
  render() {
    return (
        <View style={styles.container}>
                {/* 터치 시 New Task 생성 View 보여주기 */}
                <TouchableOpacity
                onPress={()=>{
                    if(this.state.mode==='none'){
                        Service.refreshOngoingTask({mode:'create'});
                    }else{
                        Service.refreshOngoingTask({mode:'none',title:'',desc:''});
                    }
                }}
                style={styles.newProjectContainer}>
                {this.state.mode==='create'?
                <Text style={{color: "#fff", fontWeight:'bold',fontSize: 16}}>취소</Text>
                :
                <Text style={{color: "#fff", fontWeight:'bold',fontSize: 16}}>새 Task 생성</Text>
                }
                    
                </TouchableOpacity>
                {/* New Task 생성 View 시작 */}
                {this.state.mode==='create'?
                <View style={[styles.sectionView,{marginBottom: 20}]}>
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                        <Text style={styles.taskTitleText}>Task 명</Text>
                        </View>
                        <View style={styles.taskContent}>
                        <TextInput 
                        onChangeText={(val)=>{this.setState({title:val})}}
                        value={this.state.title}
                        style={[styles.input,{width: '100%'}]} placeholder="Task이름을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
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
                <Button 
                onPress={()=>{
                    console.log('tast add button pressed');
                }}
                title="Task 추가하기" color="#4f4e4e"/>
                </View>
                :
                <View></View>
                }
                
            {/* New Task 생성 View 끝 */}

            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>진행중인 Task : {this.props.ongoingTask.length} 개</Text>

                {/* task 반복구간 시작*/}
                {this.props.ongoingTask.map((task,idx)=>{
                    let dd=0;
                    let yd=0;
                    task.doList.forEach(todo => {
                        if(todo.state==='yet'){
                            yd++;
                        }else{
                            dd++;
                        }
                    });
                    return (
                    <View key={'ongoingTask'+idx} style={styles.sectionView}>
                    <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>Task 명</Text>
                        </View>
                        <View style={styles.taskContent}>
                            {this.state.editTaskIdx==='t'+idx?
                            <TextInput 
                            onChangeText={(val)=>{this.setState({editTaskTitle:val})}}
                            value={this.state.editTaskTitle}
                            style={[styles.input,{width: '100%'}]} placeholder="Task명 을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                            :
                            <Text style={styles.sectionContent}>{task.title}</Text>
                            }
                        </View>
                    </View>
                
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>설명</Text>
                        </View>
                        
                        <View style={styles.taskContent}>
                        {this.state.editTaskIdx==='t'+idx?
                        <TextInput 
                        onChangeText={(val)=>{this.setState({editTaskDesc:val})}}
                        value={this.state.editTaskDesc}
                        style={[styles.input,{width: '100%'}]} placeholder="Task 설명을 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                        :
                        <Text style={styles.sectionContent}>{task.desc}</Text>
                        }
                            
                            
                        </View>
                </View>
                <View style={styles.taskView}>
                        <View style={styles.taskTitle}>
                            <Text style={styles.taskTitleText}>진행도</Text>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.sectionContent}>{dd} / {yd+dd}</Text>
                        </View>
                </View>
                {this.state.editTaskIdx==='t'+idx?
                <View style={styles.taskView2}>                
                <Button
                onPress={()=>{
                    console.log('task complete button pressed.');
                    console.log(task);
                }}
                title="수정 완료" color="green"/>
                <Button 
                onPress={()=>{
                    Service.refreshOngoingTask({editTaskIdx:'t',editTaskTitle:'',editTaskDesc:''})
                    console.log('task update button pressed.');
                }}
                title="수정 취소" color="orange"/>
                
                </View>
                :
                <View style={styles.taskView}>                
                <Button
                onPress={()=>{
                    console.log('task complete button pressed.');
                    console.log(task);
                }}
                title="Task 완료" color="green"/>
                <Button 
                onPress={()=>{
                    Service.refreshOngoingTask({editTaskIdx:'t'+idx,editTaskTitle:task.title,editTaskDesc:task.desc})
                    console.log('task update button pressed.');
                }}
                title="Task 수정" color="orange"/>
                <Button
                onPress={()=>{
                    console.log('task delete button pressed.');
                }}
                title="Task 삭제" color="red"/>
                </View>
                }
                

                {/* 터치하면 todo list 보여주기 */}
                <TouchableOpacity 
                onPress={()=>{
                    
                    if(this.state.ongoingIdx==='o'+idx){
                        Service.refreshOngoingTask({ongoingIdx:'o',editTodoIdx:'d',doTitle:''});
                    }else{
                        Service.refreshOngoingTask({ongoingIdx:'o'+idx,editTodoIdx:'d',doTitle:''});
                    }
                }}
                style={styles.listBtn}>
                    <Text style={{color: '#4f4e4e'}}>TODO 리스트  <Ionicons name='ios-arrow-down' color='#777' size={18}/></Text>
                </TouchableOpacity>
                {/* todo View */}
                {this.state.ongoingIdx!=='o'+idx?
                <View></View>
                :
                <View style={styles.todoWrap}>                
                    <View style={styles.inputContainer}>
                        <TextInput
                        onChangeText={(val)=>{this.setState({doTitle:val})}}
                        value={this.state.doTitle}
                        style={styles.input} placeholder="추가할 ToDo를 입력하세요." spellCheck={false} underlineColorAndroid="#fff"/>
                        <Button
                        onPress={()=>{console.log('add todo button pressed')}}
                        title="추가" color="#4f4e4e"/>
                    </View>
                
                {/* todo 반복구간 시작*/}

                {task.doList.map((todo,didx)=>{
                    return (
                        <View key={'ongoingTaskDo'+didx} style={styles.todoView}>
                        {/* 추가 된 Todo 시작 */}


                            

                            {this.state.editTodoIdx==='d'+didx?
                            <Fragment>
                               
                                <TextInput 
                                onPress={(val)=>{
                                console.log('changed do title');
                                this.setState({doTitle:val});
                                }}
                                value={this.state.doTitle}
                                style={[styles.input2,{marginLeft: 10}]} spellCheck={false} underlineColorAndroid="#fff"/>
                            
                                <TouchableOpacity style={styles.todoBtn}>
                                    <Ionicons name='ios-checkmark-circle' color='#81c784' size={20}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>{
                                    Service.refreshOngoingTask({editTodoIdx:'d',doTitle:''})
                                }}
                                style={styles.todoBtn}>
                                    <Ionicons name='ios-undo' color='gray' size={20}/>
                                </TouchableOpacity>
                                </Fragment>
                            :
                            <Fragment>
                                 <TouchableOpacity
                            onPress={()=>{
                                console.log('todo complete button pressed');
                                Service.refreshOngoingTask({editTodoIdx:'d'+didx,doTitle:todo.title})                       
                            }}
                            style={styles.todoBtn}>
                            {todo.state==='done'?                            
                            <Ionicons name='ios-checkbox' color='#81c784' size={20}/>
                            :
                            <Ionicons name='ios-square-outline' color='#4f4e4e' size={20}/>
                            }
                            </TouchableOpacity>
                                <View style={styles.todoTextView}>
                                    <Text style={styles.todoText}>{todo.title}</Text>
                                </View>                            
                                <TouchableOpacity
                                onPress={()=>{
                                if(this.state.editTodoIdx==='d'+didx){
                                    Service.refreshOngoingTask({editTodoIdx:'d',dotitle:''})
                                }else{
                                    Service.refreshOngoingTask({editTodoIdx:'d'+didx,dotitle:''})
                                }                                
                                }}
                                style={styles.todoBtn}>
                                <Ionicons name='ios-create' color='#4f4e4e' size={20}/>                            
                                </TouchableOpacity>                            
                                <TouchableOpacity style={styles.todoBtn}>
                                    <Ionicons name='ios-close-circle' color='#f44336' size={20}/>
                                </TouchableOpacity>
                                </Fragment>
                            }
                        
                            
                            {/* 추가 된 Todo 끝 */}
                        
                            {/* 수정 중 Todo 시작 */}
                            {/*  */}
                            {/* 수정 중 Todo 끝 */}
                        </View>
                    )
                })}
                


                        {/* todo 반복구간 끝*/}
                    </View>
                }
                
                </View>
                    )
                })}
                
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
    taskView2:{
        flexDirection:'row',
        justifyContent: 'space-between',
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
      input2:{
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
        width: '70%'
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