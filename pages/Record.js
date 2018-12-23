import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import Service from '../lib/service';
export default class Record extends Component {
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
        for(let i = logLength-1;i>=0;i--){
            let u = logs[i].user?logs[i].user.name:'-';
            let myFlag = Service.user._id===logs[i].user._id?true:false;
            let xTask = logs[i].xTask?logs[i].xTask:'';
            let task = logs[i].task?logs[i].task.title:'[삭제됨] ' +xTask;
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
                <View key={'logView'+i} style={styles.sectionWrap}>
                    <Text style={styles.sectionTitle}>{d.toLocaleString('ko-KR')}</Text>
                    <View style={myFlag?styles.sectionView2:styles.sectionView}>                    
                        <Text style={styles.sectionContent}>{string}</Text>
                    </View>
                </View>);
        }
        return logView;
    }
  render() {
    return (
        <View style={styles.container}>
            {/* 반복구간 */}
            {this.viewLog()}
            {/* <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>18-11-28 17:05</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>[홍길동] Task(최종테스트) 생성</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>18-11-28 14:45</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>[참여자B] Task(UI), Todo(로고작업) 완료</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>18-11-27 12:05</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>[참여자A] Task(DB설계),Todo(유저) 완료</Text>
                </View>
            </View> */}
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
          alignItems: 'flex-start',
          width: '100%',
          padding: 10,
          borderRadius: 5
      },
      sectionView2:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#22b',
        borderWidth:2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        padding: 10,
        borderRadius: 5
    },
      sectionContent:{
          color: '#4f4e4e',
          fontSize: 12
      },
})