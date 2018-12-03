import React, { Component } from 'react'
import { StyleSheet,Image, Text, View, Dimensions,  ScrollView, StatusBar,TouchableOpacity } from 'react-native';

export default class Record extends Component {
  render() {
    return (
        <View style={styles.container}>
            {/* 반복구간 */}
            <View style={styles.sectionWrap}>
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