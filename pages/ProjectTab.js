import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Summary from './Summary';
import IngTask from './IngTask';
import CompleteTask from './CompleteTask';
import Member from './Member';
import Record from './Record';

const {width, height} = Dimensions.get('window');

export default class ProjectTab extends Component {
  render() {
    return (
        <View style={styles.container}>
         <StatusBar hidden={true}/>
            <View style={styles.tabWrap}>
                <View style={styles.headerView}>
                    <Text style={styles.projectTitle}>프로젝트 A</Text>
                    <TouchableOpacity style={styles.backBtnView}>
                        <Ionicons name='ios-close' color='#4f4e4e' size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabView}>
                    {/* 활성화 된 탭에는 styles.activeTab 붙여줘야해요 */}
                    <TouchableOpacity style={[styles.tabBtn,styles.activeTab]}>
                        <Text style={styles.tabText}>전체 현황</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn}>
                        <Text style={styles.tabText}>진행중인 태스크</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn}>
                        <Text style={styles.tabText}>완료한 태스크</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn}>
                        <Text style={styles.tabText}>멤버</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn}>
                        <Text style={styles.tabText}>기록</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView contentContainerStyle={{width: width}}>
                <Summary/>
                <IngTask/>
                {/* <CompleteTask/> */}
                {/* <Member/> */}
                {/* <Record/> */}
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