import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Summary extends Component {
    state= {
        taskPercent: '41%',
        todoPercent: '37%',
        periodPercent: '50%'
    }
  render() {
    return (
        <ScrollView contentContainerStyle={{width: width}}>
        <View style={styles.container}>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>제목</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>헬프스톤</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>설명</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>팀원 간 프로젝트 진행상황 및 각 팀원의 태스크 등을 공유할 수 있게 도움을 주는 간단한 프로젝트 보조 도구</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>시작일</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>2018-11-28</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>마감일</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>2018-11-30</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>완료일</Text>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionContent}>진행중</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>진행도</Text>
                <View style={styles.sectionView}>
                <View style={styles.rangeWrap}>
                        <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>Date</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>1/2 ({this.state.periodPercent})</Text>
                                <View style={[styles.rangeColor,{width:this.state.periodPercent,backgroundColor:'#ffb74d'}]}></View>
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
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>멤버</Text>
                <View style={[styles.sectionView,styles.otherView]}>
                    <Text style={styles.otherTitle}>PM</Text>
                        <Text style={styles.otherContent}>홍길동 (task 4/10)</Text>
                    <Text style={styles.otherTitle}>Members</Text>
                        {/* 반복 부분 */}
                        <Text style={styles.otherContent}>1. 참여자 A (task 2/5)</Text>
                        <Text style={styles.otherContent}>2. 참여자 B (task 6/14)</Text>
                </View>
            </View>
            <View style={styles.sectionWrap}>
                <Text style={styles.sectionTitle}>최근기록</Text>
                <View style={[styles.sectionView,styles.otherView]}>
                {/* 반복 부분 */}
                <View style={styles.recordView}>
                        <Text style={styles.otherTitle}>18-11-28 17:05</Text>
                        <Text style={styles.otherContent}>[홍길동] Task(최종테스트) 생성</Text>
                </View>
                <View style={styles.recordView}>
                        <Text style={styles.otherTitle}>18-11-28 14:45</Text>
                        <Text style={styles.otherContent}>[참여자B] Task(UI), Todo(로고작업) 완료</Text>
                </View>
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