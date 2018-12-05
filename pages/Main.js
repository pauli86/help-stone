import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';

import Service from '../lib/service';

const {width, height} = Dimensions.get('window');
export default class Main extends Component {
    constructor(props){
        super(props)
        
        this.state= {        
            ongoing:[],
            done:[],
            // progressPercent: '0%',
            // periodPercent: '0%'            
        }
        
    
    }
    componentDidMount(){
        
        this.setState({
            ongoing:Service.projectAll.ongoing,
            done:Service.projectAll.done,
            //ongoing:this.state.ongoing,
            //done:this.state.done,
        })
    }
    projectList(plist){
        if(plist.length===0) return (
        <View style={styles.projectContainer}>            
            <Text style={styles.noProjectText}>완료한 프로젝트가 없습니다.</Text>
        </View>
        )
        else return plist.map(p=>{
            let leftDay = Math.floor(((new Date(p.project.dueDate)) - (new Date()))/(1000*60*60*24));
            let totalDay = Math.floor(((new Date(p.project.dueDate)) - (new Date(p.project.startDate)))/(1000*60*60*24));
            let periodPercent = Math.floor((leftDay/totalDay)*100) + '%';
            let doneTaskCnt = p.meta.doneTaskCnt?p.meta.doneTaskCnt:0;
            let doneDoCnt = p.meta.doneDoCnt?p.meta.doneDoCnt:0;
            let totalTaskCnt = p.meta.totalTaskCnt?p.meta.totalTaskCnt:0;
            let totalDoCnt = p.meta.totalDoCnt?p.meta.totalDoCnt:0;
            
            let doneAllCnt = doneDoCnt + doneTaskCnt;
            let totalAllCnt = totalDoCnt + totalTaskCnt;
            let progressPercent = Math.floor((doneAllCnt/totalAllCnt)*100)?Math.floor((doneAllCnt/totalAllCnt)*100):0 +'%';
            return ( 
                <TouchableOpacity 
                onPress={()=>{Service.goto('projectTab')}}
                style={styles.projectContainer}>
                    <Text style={styles.projectTitle}>{p.project.title}</Text>
                    <Text style={styles.projectText}>PM : {p.project.manager.name}({p.project.manager.id})</Text>
                    <Text style={styles.projectText}>Member : {p.project.team.length}명</Text>
                    <View style={styles.rangeWrap}>
                        <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>진행도</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>{p.meta.doneTaskCnt}({p.meta.doneDoCnt})/{p.meta.totalTaskCnt}({p.meta.totalDoCnt}) [{progressPercent}]</Text>
                                <View style={[styles.rangeColor,{width:progressPercent,backgroundColor:'#ffb74d'}]}></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rangeWrap}>
                        <View style={styles.rangeTitleWrap}>
                            <View style={styles.rangeTitleView}>
                                <Text style={styles.rangeTitle}>기간</Text>
                            </View>
                            <View style={styles.rangeColorWrap}>
                                <Text style={styles.rangeText}>{leftDay} 일 / {totalDay} 일 ({periodPercent})</Text>
                                <View style={[styles.rangeColor,{width:periodPercent,backgroundColor:'#81d4fa'}]}></View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }
    render() {
        return (
        <View style={styles.container}>
         <StatusBar hidden={true}/>
            <ScrollView contentContainerStyle={{width: width}}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.jpg')} style={styles.logoImg}/>
                <Text style={styles.logoText}>COMPUTER ENGINEERING</Text>
            </View>
            <View style={styles.contentWrap}>
            <View style={styles.mainWrap}>
                <TouchableOpacity style={styles.newProjectContainer}
                     onPress={()=>{
                        Service.goto('createProject');
                     }}
                >
                    <Text style={{color: "#fff", fontWeight:'bold',fontSize: 18}}>새 프로젝트 생성</Text>
                </TouchableOpacity>


                {/* 진행중 프로젝트 section */}
                <View style={styles.projectSector}>
                    <Text style={styles.projectSectorText}>진행중인 프로젝트 : {this.state.ongoing.length}개</Text>
                </View>

                {/* !!! projectContainer는 
                프로젝트가 없으면 View, 
                프로젝트가 있으면 TouchableOpacity  */}
                {this.projectList(this.state.ongoing)}
               

                {/* 완료 프로젝트 section */}
                <View style={styles.projectSector}>
                    <Text style={styles.projectSectorText}>완료한 프로젝트 : {this.state.done.length}개</Text>
                </View>

                {/* 얘는 프로젝트가 없어서 View */}
                {/* <View style={styles.projectContainer}> */}
                    {/* 없는애는 Text의 class도 바뀜 */}
                    {/* <Text style={styles.noProjectText}>완료한 프로젝트가 없습니다.</Text>
                </View> */}
                {this.projectList(this.state.done)}
            </View>
        </View>
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
    logoContainer: {
      width: width,
      paddingVertical: 10,
      borderBottomColor: '#ededed',
      borderBottomWidth: 1,
      flex: 0.2
    },
    logoImg:{
      width: '100%',
      height: 40,
      resizeMode: 'contain'
    },
    logoText:{
      color: '#77787B',
      fontSize: 11,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 5
    },
  contentWrap:{
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
    },
    mainWrap:{
      width: '90%',
      paddingVertical: 20
    },
    newProjectContainer: {
        width: '100%',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#37889D',
        borderRadius: 50,
        marginBottom: 20,
    },
    projectSector:{
        marginTop: 20,
        marginBottom: 10
    },
    projectSectorText:{
        color: '#4f4e4e'
    },
    projectContainer:{
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    projectTitle: {
        color: '#77787b',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    projectText: {
        color: '#77787b',
        fontSize: 12,
        marginVertical: 3,
        alignSelf: 'flex-end'
    },
    noProjectText:{
        alignSelf: 'center',
        color: '#77787b',
        fontSize: 12,
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
    }
    
})
