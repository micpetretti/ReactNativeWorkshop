import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';

const fakeData = {
  still: 'fake data',
  need: ['state', 'and', 'more', 'changes'],
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.app}>
        <TouchableHighlight
          style={styles.forceButtonBorderStyle}
          onPress={() => console.log('I need to change the state')}
        >
          <Text style={styles.forceButtonText}>{'USE THE FORCE'}</Text>
        </TouchableHighlight>
        <DataScreen content={fakeData} />
      </View>
    )
  }
}

// ****************************************************************************
/*    Moved the styling down because it is not as important in the following
      steps as it was before.
*/

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'black',
    marginTop: Constants.statusBarHeight
  },
  dataTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
    marginLeft: 10,
  },
  dataSingleRowBox: {
    backgroundColor: 'black',
    borderColor: 'yellow',
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 3,
  },
  dataSingleRowText: {
    fontSize: 16,
    color: 'yellow'
  },
  dataElementBox: {
    backgroundColor: 'black'
  },
  forceButtonBorderStyle: {
    borderColor: 'yellow',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 3,
    height:35,
    backgroundColor: 'black',
  },
  forceButtonText: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },
  inputItemStyle: {
    height: 25,
    color: 'yellow',
  },
  inputBorders: {
    backgroundColor: 'black',
    borderColor: 'yellow',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 3,
  },
});


// ****************************************************************************
/*    Below is our component library from the last steps that we don't
      need to worry about anymore. We will just use the components as if
      they were imported modules.














*/
//*****************************************************************************

const DataTitle = props => (
  <Text style={styles.dataTitleText} >{props.title}</Text>
);

const DataSingleRow = props => (
  <View style={styles.dataSingleRowBox}>
    <Text style={styles.dataSingleRowText}> {props.content} </Text>
  </View>
);

const renderSingleOrMultipleRows = props => {
  if (!Array.isArray(props.content)) {
    return <DataSingleRow content={props.content}/>
  }
  return(
    <FlatList
      data={props.content.map(item => item)}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => <DataSingleRow content={item}/> }
    />
  )
};

const DataElement = props => (
  <View style={styles.dataElementBox}>
    <DataTitle title={props.title} />
    {renderSingleOrMultipleRows(props)}
  </View>
);

const renderDataScreenItem = ({item}) => (
  <DataElement title={item.title} content={item.content}/>
);

const DataScreen = props => (
  <FlatList
    data={Object.keys(props.content).map(key => ({title: key, content: props.content[key]}))}
    keyExtractor={(item) => item.title}
    renderItem={renderDataScreenItem}
  />
);