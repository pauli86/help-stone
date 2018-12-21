import React, { Component } from 'react';
import Service from '../lib/service';
import { StyleSheet,Image, Text, View,ActivityIndicator, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Summary extends Component {
    constructor(props){
        super(props);
        this.state={            
        }
    }
    componentDidMount(){
        console.log('[Summary] did mount');
        // setTimeout(()=>{
        //     // Service.project.project.title = 'changed after 3 sec';
        //     // console.log('service update');
        //     // Service.project.title='변경된 프로젝트명';
        //     // Service.project.desc='변경된 프로젝트 desc';
        //     // Service.updateProject({project:Service.project});
            
        // },3000);
        
    }    
    componentWillMount(){
        // console.log('[Summary] will mount');
        // console.log('props project = ',this.props.project);
    }
    componentWillUnmount(){
        console.log('[Summary] will un-mount');
    }
    viewLog(){
        /**
         * log view 
         * project crud -> [ user ] sector - title - action
         * task crud -> [ user ] sector - title - action
         * todo crud -> [ user ] [ task ] - sector - title - action
         *  */

        let logView=[];   
        let logs = this.props.project.logList;     
        let logLength = logs.length;
        
        for(let i = logLength-1, j = 4;(i>=0)&&(j>=0);i--,j--){
            let u = logs[i].user?logs[i].user.name:'-';
            let task = logs[i].task?logs[i].task.title:'-';
            let s = logs[i].sector;
            let t = logs[i].title;
            let a = logs[i].action;

            let string = '';
            if(s==='do'){
                string = '[ '+u+' ] task ( '+task+' ), '+s+'( '+ t +' ) ' +a; 
            }else{
                string = '[ '+u+' ] '+s+' ( '+ t +' ) ' +a;
            }
            let d = new Date(logs[i].date);

            logView.push(
                <View key={'recentLogView'+j} style={styles.recordView}>
                        <Text style={styles.otherTitle}>{d.toLocaleString('ko-KR')}</Text>
                        <Text style={styles.otherContent}>{string}</Text>
                </View>);
        }
        return logView;
    }
    viewTeam(){
        let teamView = this.props.team.map((m,idx)=>{
            return ( <Text key={'teamView'+idx} style={styles.otherContent}>{idx+1}. {m.name} (task {m.meta.ot}/{m.meta.ot+m.meta.dt})</Text> );
        })
        return teamView;
    }
  render() {
    console.log('[Summary] render');
    let leftTime ='', totalTime='', leftDay='', totalDay='', periodPercent='', delayFlag='', doneTaskCnt='', doneDoCnt='', totalTaskCnt='', totalDoCnt='',doneAllCnt='',totalAllCnt='',taskPercent='',todoPercent='';
    if(!this.props.project){
        console.log('[Summary] render -------- no project in props ');
    }else{
    leftTime = ((new Date(this.props.project.dueDate)) - (new Date()))/(1000*60*60*24);            
    totalTime = ((new Date(this.props.project.dueDate)) - (new Date(this.props.project.startDate)))/(1000*60*60*24);
    leftTime = totalTime - leftTime;        
    leftDay = Math.floor(leftTime);
    // console.log('left Time : ',leftTime, ' , left Day : ',leftDay);
    leftDay = Math.abs(leftDay)>=1?leftDay+' 일':Math.floor(leftTime*24) + ' 시간';
    totalDay = Math.floor(totalTime);
    // console.log('total Time : ',totalTime, ' , total Day : ',totalDay);
    totalDay = Math.abs(totalDay)>=1?totalDay+' 일':Math.floor(totalTime*24) + ' 시간';
        
    periodPercent = Math.floor((leftTime/totalTime)*100) + '%';
    delayFlag = (leftTime/totalTime)>1?true:false;
    doneTaskCnt = this.props.meta.doneTaskCnt?this.props.meta.doneTaskCnt:0;
    doneDoCnt = this.props.meta.doneDoCnt?this.props.meta.doneDoCnt:0;
    totalTaskCnt = this.props.meta.totalTaskCnt?this.props.meta.totalTaskCnt:0;
    totalDoCnt = this.props.meta.totalDoCnt?this.props.meta.totalDoCnt:0;        
    doneAllCnt = doneDoCnt + doneTaskCnt;
    totalAllCnt = totalDoCnt + totalTaskCnt;
    taskPercent = Math.floor((doneTaskCnt/totalTaskCnt)*100)?(Math.floor((doneTaskCnt/totalTaskCnt)*100)+'%'):(0 +'%');
    todoPercent = Math.floor((doneDoCnt/totalDoCnt)*100)?(Math.floor((doneDoCnt/totalDoCnt)*100)+'%'):(0 +'%');
    }
    return (
        !(this.props.project)?
        <View>
        <Text style={styles.whiteText}>Loading... </Text>
        <ActivityIndicator/>
        </View>
        :
        <ScrollView contentContainerStyle={{width: width}}>
        <View style={styles.container}>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>제목</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>{this.props.project.title}</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>설명</Text>
                <View style={styles.sectionView}>
                    {/* <Text style={styles.sectionContent}>팀원 간 프로젝트 진행상황 및 각 팀원의 태스크 등을 공유할 수 있게 도움을 주는 간단한 프로젝트 보조 도구</Text> */}
                    <Text style={styles.sectionContent}>{this.props.project.desc}</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>시작일</Text>
                <View style={styles.sectionView}>
                    {/* <Text style={styles.sectionContent}>2018-11-28</Text> */}
                    <Text style={styles.sectionContent}>{(new Date(this.props.project.startDate)).toLocaleDateString('ko-KR')}</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>마감일</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>{(new Date(this.props.project.dueDate)).toLocaleDateString('ko-KR')}</Text>
                </View>
            </View>
            {this.props.project.state==='ongoing'?<View></View>:
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>완료일</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>{(new Date(this.props.project.dueDate)).toLocaleDateString('ko-KR')}</Text>
                </View>
            </View>
            }
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>진행도</Text>
                <View style={styles.sectionView}>
                <View style={styles.rangeWrap}>
                        <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>Date</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}> {leftDay} / {totalDay} ({periodPercent})</Text>
                                <View style={[styles.rangeColor,{width:delayFlag?'100%':periodPercent,backgroundColor:delayFlag?'#fa8181':'#ffb74d'}]}></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rangeWrap}>
                    <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>Task</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>{doneTaskCnt} / {totalTaskCnt} ({taskPercent})</Text>
                                <View style={[styles.rangeColor,{width:taskPercent,backgroundColor:'#81d4fa'}]}></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rangeWrap}>
                    <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>Todo</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>{doneDoCnt} / {totalDoCnt} ({todoPercent})</Text>
                                <View style={[styles.rangeColor,{width:todoPercent,backgroundColor:'#81c784'}]}></View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>멤버</Text>
                <View style={[styles.sectionView,styles.otherView]}>
                    <Text style={styles.otherTitle}>PM</Text>
                        <Text style={styles.otherContent}>{this.props.manager.name} (task {this.props.manager.meta.dt}/{this.props.manager.meta.dt+this.props.manager.meta.ot})</Text>
                    <Text style={styles.otherTitle}>Members</Text>
                        {/* 반복 부분 */}
                        {this.viewTeam()}
                        {/* <Text style={styles.otherContent}>1. 참여자 A (task 2/5)</Text>
                        <Text style={styles.otherContent}>2. 참여자 B (task 6/14)</Text> */}
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>최근기록</Text>
                <View style={[styles.sectionView,styles.otherView]}>
                {/* 반복 부분 */}
                {/* <View style={styles.recordView}>
                        <Text style={styles.otherTitle}>18-11-28 17:05</Text>
                        <Text style={styles.otherContent}>[홍길동] Task(최종테스트) 생성</Text>
                </View>
                <View style={styles.recordView}>
                        <Text style={styles.otherTitle}>18-11-28 14:45</Text>
                        <Text style={styles.otherContent}>[참여자B] Task(UI), Todo(로고작업) 완료</Text>
                </View> */}
                {this.viewLog()}
                </View>
            </View>
            <View style={styles.sectionWrap}>
                    <TouchableOpacity style={styles.endBtn}>
                        <Text style={styles.endText}>프로젝트 마감하기</Text>
                    </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
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
          alignItems: 'center',
          width: '100%',
          padding: 10,
          borderRadius: 5
      },
      sectionContent:{
          color: '#4f4e4e',
          fontSize: 12
      },
      rangeTitle:{
        color: '#77787b',
        fontSize: 12,
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
    otherView:{
        justifyContent:'flex-start',
        alignItems: 'flex-start'
    },
    otherTitle:{
        color: '#4f4e4e',
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 12
    },
    otherContent:{
        color: '#77787b',
        fontSize: 12,
        marginBottom: 2
    },
    recordView:{
        width: '100%',
        paddingBottom: 5,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        marginVertical: 7
    },
    endBtn:{
        backgroundColor: '#999',
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 10
    },
    endText:{
        color: '#fff',
        fontSize: 16
    },
})