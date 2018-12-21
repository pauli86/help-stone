import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,TextInput, Button, ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Service from '../lib/service';

const {width, height} = Dimensions.get('window');




export default class Member extends Component {
    state= {
        taskPercent: '41%',
        todoPercent: '37%',
        detailIdx:'',
        ongoingIdx:'',
        doneIdx:'',
        setFlag:false
    }
    detailFlag='';
    members=[];
    componentWillMount(){
        Service.refreshMembers = (v)=>{this.setState(v)}
    }
    makeMemberView(position,id,name,email,meta){
        
        // Object.assign(this.members,{detail:0,ongoing:[],done:[]});
        
        
        return 1;
    }
    showMembers(){
        let memberView = [];               
            
            console.log('[ TEAM ] : ',this.props.team);
     
        return memberView;
    }
    componentDidMount(){        
        console.log(this.props.manager);
    }
    render() {
        console.log('[ MEMBERS ] detail flag = ',this.state.detailIdx);
        console.log('[ MEMBERS ] ongoing flag = ',this.state.ongoingIdx);
        console.log('[ MEMBERS ] done flag = ',this.state.doneIdx);
        
            let name = this.props.manager.name;
            let id = this.props.manager.id;
            let email = this.props.manager.email?this.props.manager.email:'-';
            console.log('this.props.manager.meta',this.props.manager.meta);
            let meta = this.props.manager.meta;
            let position = 'PM';
            let dt = meta.dt;
            let ot = meta.ot;
            let pt = (dt+ot)===0?0+'%':(Math.floor(dt*100/(ot+dt))+'%');
            let dd = meta.dd;
            let yd = meta.yd;
            let pd = (dd+yd)===0?0+'%':(Math.floor(dd*100/(yd+dd))+'%');
            
            // this.members.push({detail:0,ongoing:[],done:[]});
            // let idx = this.members.length -1;
        return (
            <View style={styles.container}>
                {/* member 반복 구간 시작*/}
                
                <View key={'pmView'} style={styles.sectionWrap}>
                    <View style={styles.memberWrap}>
                        <View style={styles.memberInfoWrap}>
                            <View style={styles.memberInfoView}>
                                <View style={styles.memberName}>
                                    <Text style={styles.memberNameText}>{name}</Text>
                                </View>
                                <View style={styles.memberEmail}>
                                    <Text style={styles.memberEmailText}>아이디: {id}</Text>
                                </View>
                            </View>
                            <View style={styles.memberInfoView}>
                                <View style={styles.memberName}>
                                    <Text style={styles.memberEmailText}>{position}</Text>
                                </View>
                                <View style={styles.memberEmail}>
                                    <Text style={styles.memberEmailText}>이메일: {email}</Text>
                                </View>
                            </View>
                        </View>
                
                        <View style={styles.rangeWrap}>
                            <View style={styles.rangeTitleWrap}>
                                <View style={styles.rangeTitleView}>
                                    <Text style={styles.rangeTitle}>Task</Text>
                                </View>
                                <View style={styles.rangeColorWrap}>
                                    <Text style={styles.rangeText}>{dt} / {dt+ot} ( {pt} )</Text>
                                    <View style={[styles.rangeColor,{width:pt,backgroundColor:'#81d4fa'}]}></View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rangeWrap}>
                            <View style={styles.rangeTitleWrap}>
                                <View style={styles.rangeTitleView}>
                                    <Text style={styles.rangeTitle}>Todo</Text>
                                </View>
                                <View style={styles.rangeColorWrap}>
                                    <Text style={styles.rangeText}>{dd} / {dd+yd} ( {pd} )</Text>
                                    <View style={[styles.rangeColor,{width:pd,backgroundColor:'#81c784'}]}></View>
                                </View>
                            </View>
                        </View>
                        {/* 터치 시 아래  taskWrap 보임 */}
                        <TouchableOpacity 
                        onPress={()=>{
                        // this.members[idx].detail=(!this.members[idx].detail);     
                            if(this.state.detailIdx==='pm'){
                                Service.refreshMembers({detailIdx:'m',ongoingIdx:'m',doneIdx:'m'});
                            }else{
                                Service.refreshMembers({detailIdx:'pm',ongoingIdx:'m',doneIdx:'m'});
                            }
                        }}
                        style={styles.detailBtn}>
                            <Text style={styles.detailText}>상세보기</Text>
                        </TouchableOpacity>
                    </View>
            
                    {this.state.detailIdx==='pm'?
                    <View style={styles.taskWrap}>
                        <Text style={styles.sectionTitle}>진행중인 Task : {this.props.manager.ongoingTask.length} 개</Text>
                        {/* 진행중 task 반복구간 시작*/}
                        {this.props.manager.ongoingTask.map((task,idx)=>{
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
                                <View key={'pmOnTask'+idx} style={styles.sectionView}>
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
                                            <Text style={styles.taskTitleText}>진행도</Text>
                                        </View>
                                        <View style={styles.taskContent}>
                                            <Text style={styles.sectionContent}>{dd} / {yd+dd}</Text>
                                        </View>
                                    </View>
                                    {/* 터치하면 todo list 보여주기 */}
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        if(this.state.ongoingIdx==='m'+idx){
                                            Service.refreshMembers({ongoingIdx:'m'});
                                        }else{
                                            Service.refreshMembers({ongoingIdx:'m'+idx});
                                        }
                                    }}
                                    style={styles.listBtn}>
                                        <Text style={{color: '#4f4e4e',fontSize: 12}}>TODO 리스트  
                                            {this.state.ongoingIdx==='m'+idx?
                                            <Ionicons name='ios-arrow-up' color='#777' size={18}/>
                                            :<Ionicons name='ios-arrow-down' color='#777' size={18}/>
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                    {/* todo View */}
                                    {this.state.ongoingIdx!=='m'+idx?
                                        <View></View>
                                        :                    
                                        <View style={styles.todoWrap}>                    
                                        {/* todo 반복구간 시작*/}
                                            {task.doList.map((todo,didx)=>{
                                                return (
                                                    <View key={'pmOnTaskDo'+didx} style={styles.todoView}>
                                                    {/*  TodoView시작 */}
                                                        <View style={styles.todoBtn}>
                                                        {/* 완료된 ToDo 아이콘*/}
                                                        {todo.state==='done'?
                                                            <Ionicons name='ios-checkbox' color='#81c784' size={20}/>
                                                            :<Ionicons name='ios-sync' color='#4f4e4e' size={20}/>
                                                        }
                                                        {/* <Ionicons name='ios-checkbox' color='#81c784' size={20}/> */}
                                                        {/* 진행중인 ToDo 아이콘 */}                            
                                                        </View>
                                                        <View style={styles.todoTextView}>
                                                            <Text style={styles.todoText}>{todo.title}</Text>
                                                        </View>
                                                        {/* TodoView 끝 */}
                                                    </View>
                                                )
                                            })}
                                            {/* todo 반복구간 끝*/}
                                        </View>
                                    }
                            
                            </View>
                            )})
                        }
                    


                        {/* 진행중 task 반복구간 끝*/}                
                        <Text style={[styles.sectionTitle,{marginTop:15}]}>완료한 Task : {this.props.manager.doneTask.length} 개</Text>
                        {/* 완료 task 반복구간 시작*/}
                        {this.props.manager.doneTask.map((task,idx)=>{                        
                            return (
                                <View key={'pmDoneTask'+idx} style={styles.sectionView}>
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
                                            Service.refreshMembers({doneIdx:'m'});
                                        }else{
                                            Service.refreshMembers({doneIdx:'m'+idx});
                                        }
                                    }}
                                    style={styles.listBtn}>
                                        <Text style={{color: '#4f4e4e',fontSize: 12}}>TODO 리스트  
                                        {this.state.doneIdx==='m'+idx?
                                                    <Ionicons name='ios-arrow-up' color='#777' size={18}/>
                                                :<Ionicons name='ios-arrow-down' color='#777' size={18}/>
                                                }
                                        </Text>
                                    </TouchableOpacity>                
                                    {/* todo View */}
                                    {this.state.doneIdx!=='m'+idx?
                                    <View></View>
                                    :
                                    <View style={styles.todoWrap}>        
                                    {/* todo 반복구간 시작*/}
                                    {task.doList.map((todo,didx)=>{
                                        return (
                                            <View key={'pmDoneTaskDo'+didx} style={[styles.todoView,{justifyContent:'center'}]}>
                                                <Text style={styles.todoText}>{todo.title}</Text>
                                            </View>                   
                                        )
                                    })}
                                    
                                    {/* todo 반복구간 끝*/}

                                    </View>
                                    }
                             
                                </View>
                            )}
                        )}                
                        {/* 완료 task 반복구간 끝*/}                
                    </View>
                    :
                    <View>
                        {/* member 정보가 없는경우 */}
                    </View>
                    }
                </View>            
                {/* 멤버 반복 구간 끝*/}
                {this.props.team.map((member,idx)=>{
                    return (
                        <View key={'memberView'+idx} style={styles.sectionWrap}>
                            <View style={styles.memberWrap}>
                                <View style={styles.memberInfoWrap}>
                                    <View style={styles.memberInfoView}>
                                        <View style={styles.memberName}>
                                            <Text style={styles.memberNameText}>{member.name}</Text>
                                        </View>
                                        <View style={styles.memberEmail}>
                                            <Text style={styles.memberEmailText}>아이디: {member.id}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.memberInfoView}>
                                        <View style={styles.memberName}>
                                            <Text style={styles.memberEmailText}>{'Member'}</Text>
                                        </View>
                                        <View style={styles.memberEmail}>
                                            <Text style={styles.memberEmailText}>이메일: {member.email}</Text>
                                        </View>
                                    </View>
                                </View>                
                                <View style={styles.rangeWrap}>
                                    <View style={styles.rangeTitleWrap}>
                                        <View style={styles.rangeTitleView}>
                                            <Text style={styles.rangeTitle}>Task</Text>
                                        </View>
                                        <View style={styles.rangeColorWrap}>
                                            <Text style={styles.rangeText}>{member.meta.dt} / {member.meta.dt+member.meta.ot} ( {(member.meta.dt+member.meta.ot)===0?0+'%':(Math.floor(member.meta.dt*100)/ (member.meta.dt+member.meta.ot))+'%'} )</Text>
                                            <View style={[styles.rangeColor,{width:(member.meta.dt+member.meta.ot)===0?0+'%':(Math.floor(member.meta.dt*100)/ (member.meta.dt+member.meta.ot))+'%',backgroundColor:'#81d4fa'}]}></View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.rangeWrap}>
                                    <View style={styles.rangeTitleWrap}>
                                        <View style={styles.rangeTitleView}>
                                            <Text style={styles.rangeTitle}>Todo</Text>
                                        </View>
                                        <View style={styles.rangeColorWrap}>
                                            <Text style={styles.rangeText}>{member.meta.dd} / {member.meta.dd+member.meta.yd} ( {(member.meta.dd+member.meta.yd)===0?0+'%':(Math.floor(member.meta.dd*100)/ (member.meta.dd+member.meta.yd))+'%'} )</Text>
                                            <View style={[styles.rangeColor,{width:(member.meta.dd+member.meta.yd)===0?0+'%':(Math.floor(member.meta.dd*100)/ (member.meta.dd+member.meta.yd))+'%',backgroundColor:'#81c784'}]}></View>
                                        </View>
                                    </View>
                                </View>
                                {/* 터치 시 아래  taskWrap 보임 */}
                                <TouchableOpacity 
                                onPress={()=>{
                                // this.members[idx].detail=(!this.members[idx].detail);     
                                    if(this.state.detailIdx==='m'+idx){
                                        Service.refreshMembers({detailIdx:'m',ongoingIdx:'m',doneIdx:'m'});
                                    }else{
                                        Service.refreshMembers({detailIdx:'m'+idx,ongoingIdx:'m',doneIdx:'m'});
                                    }
                                }}
                                style={styles.detailBtn}>
                                    <Text style={styles.detailText}>상세보기</Text>
                                </TouchableOpacity>
                            </View>
            
                            {this.state.detailIdx==='m'+idx?
                                <View style={styles.taskWrap}>
                                    <Text style={styles.sectionTitle}>진행중인 Task : {member.ongoingTask.length}개</Text>
                                    {/* 진행중 task 반복구간 시작*/}
                                    {member.ongoingTask.map((task,idx)=>{
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
                                        <View key={'mOnTask'+idx} style={styles.sectionView}>
                                        <View style={styles.taskView}>
                                            <View style={styles.taskTitle}>
                                                <Text style={styles.taskTitleText}>Task 이름</Text>
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
                                                <Text style={styles.taskTitleText}>진행도</Text>
                                            </View>
                                            <View style={styles.taskContent}>
                                                <Text style={styles.sectionContent}>{dd} / {yd+dd}</Text>
                                            </View>
                                        </View>
                                        {/* 터치하면 todo list 보여주기 */}
                                        <TouchableOpacity
                                        onPress={()=>{
                                            if(this.state.ongoingIdx==='m'+idx){
                                                Service.refreshMembers({ongoingIdx:'m'});
                                            }else{
                                                Service.refreshMembers({ongoingIdx:'m'+idx});
                                            }
                                        }}
                                        style={styles.listBtn}>
                                            <Text style={{color: '#4f4e4e',fontSize: 12}}>TODO 리스트  
                                                <Ionicons name={this.state.ongoingIdx==='m'+idx?'ios-arrow-up':'ios-arrow-down'} color='#777' size={18}/>
                                            </Text>
                                        </TouchableOpacity>
                                        {/* todo View */}
                                        {this.state.ongoingIdx!=='m'+idx?
                                            <View></View>
                                            :
                                            <View style={styles.todoWrap}>                    
                                                {/* todo 반복구간 시작*/}
                                                {task.doList.map((todo,didx)=>{
                                                    console.log(todo);
                                                    return (
                                                    <View key={'mOnTaskDo'+didx} style={styles.todoView}>
                                                    {/*  TodoView시작 */}
                                                        <View style={styles.todoBtn}>
                                                        {/* 완료된 ToDo 아이콘*/}
                                                        {todo.state==='done'?
                                                            <Ionicons name='ios-checkbox' color='#81c784' size={20}/>
                                                            :
                                                            <Ionicons name='ios-sync' color='#4f4e4e' size={20}/>
                                                        }
                                                        </View>
                                                        <View style={styles.todoTextView}>
                                                            <Text style={styles.todoText}>{todo.title}</Text>
                                                        </View>
                                                        {/* TodoView 끝 */}
                                                    </View>
                                                    )
                                                })}
                                                
                                                {/* todo 반복구간 끝*/}
                                            </View>
                                        }
                                       
                                    </View>
                                    )                                        
                                    })}
                                    {/* 진행중 task 반복구간 끝*/}                
                                    <Text style={[styles.sectionTitle,{marginTop:15}]}>완료한 Task : {member.doneTask.length}개</Text>
                                    {/* 완료 task 반복구간 시작*/}
                                    {member.doneTask.map((task,idx)=>{
                                        return (
                                        <View key={'mDoneTask'+idx} style={styles.sectionView}>
                                            <View style={styles.taskView}>
                                                <View style={styles.taskTitle}>
                                                    <Text style={styles.taskTitleText}>Task 이름</Text>
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
                                                Service.refreshMembers({doneIdx:'m'});
                                            }else{
                                                Service.refreshMembers({doneIdx:'m'+idx});
                                            }
                                        }}
                                        style={styles.listBtn}>
                                            <Text style={{color: '#4f4e4e',fontSize: 12}}>TODO 리스트  
                                                {this.state.doneIdx==='m'+idx?
                                                    <Ionicons name='ios-arrow-up' color='#777' size={18}/>
                                                :<Ionicons name='ios-arrow-down' color='#777' size={18}/>
                                                }
                                            </Text>
                                        </TouchableOpacity>
                
                                        {/* todo View */}
                                        {this.state.doneIdx==='m'+idx?
                                            <View></View>                    
                                            :
                                            <View style={styles.todoWrap}>        
                                            {/* todo 반복구간 시작*/}
                                            {task.doList.map((todo,didx)=>{
                                                return (
                                                    <View key={'mDoneTaskDo'+didx} style={[styles.todoView,{justifyContent:'center'}]}>
                                                        <Text style={styles.todoText}>{todo.title}</Text>
                                                    </View>                    
                                                )
                                            })}
                                                
                                            {/* todo 반복구간 끝*/}
                                            </View>
                                        }
                
        
                </View>
                                        )
                                    })}
                                    
                {/* 완료 task 반복구간 끝*/}
                
            </View>
            :
            <View>
                {/* member 정보가 없는 경우 */}
            </View>
                } 
            </View>
                    ) 
                    
                })// 멤버 map 끝
                }
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