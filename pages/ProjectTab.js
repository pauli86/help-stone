import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet,Image, Text, View, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Summary from './Summary';
import IngTask from './IngTask';
import CompleteTask from './CompleteTask';
import Member from './Member';
import Record from './Record';

import Service from '../lib/service';

const {width, height} = Dimensions.get('window');

export default class ProjectTab extends Component {
    constructor(props){
        super(props);
        this.state={
            current:'summary',
            project:Service.project,
            meta:Service.meta,
            manager:Service.manager,
            team:Service.team,
            doneTask:Service.doneTask,
            ongoingTask:Service.ongoingTask,
            pFlag:false
        }
    }
    componentWillMount(){
        // console.log('[ project tab ] will mount');
        Service.updateProject = (v)=>{
            this.setState(v);
        }
        Service.timeChkFlag=true;
        Service.timeChk();        
    }
    componentWillUnmount(){
        // console.log('[ project tab ] will unmount');
        Service.timeChkFlag=false;
        Service.timeChkOff();
    }
    
    navigate(val){
        this.setState({
            current:val
        })
    }

    getScreen(){
        // console.log('[ project tab ] get Screen');
        
        switch(this.state.current){
            case 'summary':
            return <Summary project={this.state.project} meta={this.state.meta} manager={this.state.manager} team={this.state.team}/>
            case 'ingTask':
            return <IngTask project={this.state.project} meta={this.state.meta} manager={this.state.manager} team={this.state.team} ongoingTask={this.state.ongoingTask}/>
            case 'completeTask':
            return <CompleteTask project={this.state.project} meta={this.state.meta} manager={this.state.manager} team={this.state.team} doneTask={this.state.doneTask}/>
            case 'member':
            return <Member project={this.state.project} meta={this.state.meta} manager={this.state.manager} team={this.state.team}/>
            case 'record':
            return <Record project={this.state.project} meta={this.state.meta} manager={this.state.manager} team={this.state.team}/>
        }
    }
    getStyle(val){
        if(this.state.current===val){
            // console.log('선택된 스타일',val);
            return [styles.tabBtn,styles.activeTab];
        }else{
            // console.log('선택안된 스타일',val);
            return styles.tabBtn;
            
        }
    }
    componentDidMount(){
        // console.log('[APP][componentDidMount]');    
        Service.changeFuncPTab = (v)=>{this.navigate(v)};    
        // console.log('set time out');
        Service.changeFuncPTab('summary');
        this.setState({
            pFlag:true,
            project:Service.project,
            meta:Service.meta,
            manager:Service.manager,
            doneTask:Service.doneTask,
            ongoingTask:Service.ongoingTask,
            team:Service.team
        })
      }
  render() {
    return (
        
        <View style={styles.container}>
         <StatusBar hidden={true}/>
            <View style={styles.tabWrap}>
                <View style={styles.headerView}>
                    <Text style={styles.projectTitle}>{this.state.pFlag?this.state.project.title:''}</Text>
                    <TouchableOpacity 
                    onPress={()=>{Service.goto('main')}}
                    style={styles.backBtnView}>
                        <Ionicons name='ios-close' color='#4f4e4e' size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabView}>
                    {/* 활성화 된 탭에는 styles.activeTab 붙여줘야해요 */}
                    <TouchableOpacity 
                    onPress={()=>{
                        Service.changeFuncPTab('summary');
                    }}
                    style={this.getStyle('summary')}>
                        <Text style={styles.tabText}>전체 현황</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>{
                        Service.changeFuncPTab('ingTask');
                    }}
                    style={this.getStyle('ingTask')}>
                        <Text style={styles.tabText}>진행중인</Text>
                        <Text style={styles.tabText}>태스크</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>{
                        Service.changeFuncPTab('completeTask');
                    }}
                    style={this.getStyle('completeTask')}>
                        <Text style={styles.tabText}>완료한</Text>
                        <Text style={styles.tabText}>태스크</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>{
                        Service.changeFuncPTab('member');
                    }}
                    style={this.getStyle('member')}>
                        <Text style={styles.tabText}>멤버</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>{
                        Service.changeFuncPTab('record');
                    }}
                    style={this.getStyle('record')}>
                        <Text style={styles.tabText}>기록</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView contentContainerStyle={{width: width}}>
                {this.getScreen()}
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
      headerView:{
          flexDirection:'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#ededed'
      },
      backBtnView:{
          padding: 7,
          marginRight: 15
      },
      projectTitle:{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#4f4e4e',
          marginLeft: 15
      },
      tabView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        backgroundColor: '#f8f8f8',
        height: 50
      },
      tabBtn:{
        padding:7,
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: '#ddd',
        borderBottomWidth: 3,
        borderBottomColor: '#ddd',
      },
      tabText:{
          textAlign:'center',
          fontSize: 12,
          color: '#4f4e4e',
          fontWeight:'500'
      },
      activeTab:{
          borderBottomColor: '#4f4e4e',
          borderBottomWidth: 3,
      }
})