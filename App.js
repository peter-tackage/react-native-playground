import React,  { Component } from 'react';
import { TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableHighlight, Text, TextInput, View, Switch, Modal } from 'react-native';
import { MaterialIndicator } from "react-native-indicators";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions, StackActions, createBottomTabNavigator, createStackNavigator,SafeAreaView } from 'react-navigation';

import Button  from "./components/Button"
const ConditionalWrap = ({
  condition,
  wrap,
  children
}) => (condition ? wrap(children) : children);

class HomeScreen extends Component {
  constructor(props) {
    super(props)

  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { navigation} = this.props;

    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"orange" }}>

        <TouchableOpacity onPress={() => navigation.navigate('SubScreen')}>
          <Text>Home. Click for going to subscreen!</Text>
        </TouchableOpacity>
        <TextInput placeholder="type here first"/>
        <View style={{ elevation: 24, backgroundColor: "red" }} height={40} width={40} />
        {/* <Button
            title="Login"
            onClick={() => console.log("pressed")}
            loading={true}
         /> */}
        <MaterialIndicator color={"black"} size={30}/>
        <Switch onTintColor={"green"}
                value={true}
                onValueChange={() => {console.log("toggled")}} />



         <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>

          <View marginTop={22}>
              <Text>Hello World!</Text>
              <View backgroundColor="red" height={20} width={10} />
              <TextInput width={100} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
              <KeyboardAwareScrollView>
              <View backgroundColor="green" height={200} width={10} />
              <View backgroundColor="red" height={200} width={10} />
              <View backgroundColor="blue" height={200} width={10} />
              <TextInput width={100} height={20} />
              <View backgroundColor="orange" height={200} width={10} />
              <TextInput width={100} height={20} />
              </KeyboardAwareScrollView>
            </View>
        </Modal>

        <TextInput placeholder="type"/>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
       
    );
  }
}

class SubHomeScreen extends Component {
  state = {
    showDone: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        navigation.getParam('showDone') && <TouchableOpacity onPress={() => navigation.pop()}>
          <Text>Done</Text>
        </TouchableOpacity>
      ),
    };
  };

 componentDidMount() {
   this.props.navigation.setParams({ showDone: this.state.showDone });
 }

render() {
  return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"green" }}>
      <Text>Some Screen under the Home screen</Text>
      <TouchableOpacity onPress={() =>{ this.setState(prev => ({showDone: !prev.showDone})); this.props.navigation.setParams({showDone: !this.state.showDone})}}>
        <Text >Click to change</Text>
      </TouchableOpacity>
      <Text>Value is: {this.state.showDone.toString()}</Text>
  </View>
  )};

}

const InboxScreen = ({navigation}) =>
(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={() => navigation.navigate('MessagingSending')}>
      <Text>This is your inbox It could be empty</Text>
      <Text>Press to go to next screen!</Text>
    </TouchableOpacity>
  </View>
);    

const MessagingSendingScreen = ({ navigation}) => {

      const resetOnMessagingSending = () => {  

        navigation.dispatch(StackActions.popToTop())

        const resetActions = StackActions.reset({
          index: 2,
          actions:[
            NavigationActions.navigate({routeName:'Home'}),
            NavigationActions.navigate({routeName:'SubScreen'}),
            NavigationActions.navigate({routeName:'MessagingSendingComplete'})],
          key: "Home"
        });
      
        navigation.dispatch(resetActions);
    }

     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={resetOnMessagingSending} >
        <Text>Click here to send message!</Text>
        </TouchableOpacity>
      </View>
    );
  }

 const SettingsScreen = ({color}) =>
 { 
  const showAsRow = false 
  const rowStyle = showAsRow ? { flexDirection: "row", justifyContent: "space-between"}  : {justifyContent: "space-evenly"}
  return  (
      <SafeAreaView style={{ flex: 1, backgroundColor:"blue"}} onFocus={() => console.log("SAV focused")}>
        <TouchableOpacity>
          <Text>Settings should be safe but up top!</Text>
        </TouchableOpacity>
        {/* <TextInput backgroundColor="white" onFocus={() =>console.log("Text Input focused")} onBlur={() => console.log("Text input blurred/lost")} /> */}
        <View style={{justifyContent: "space-evenly", backgroundColor:"white"}} height={400}> 
          <ConditionalWrap
            condition={showAsRow}
            wrap={(child => <View style={rowStyle}>{child}</View>)}>
              <View height={30} width={100} backgroundColor="red"></View>
              <View height={30} backgroundColor="purple">
                <Text>Text</Text>
              </View>
          </ConditionalWrap>
          <View  height={30} backgroundColor="green"></View>
          <View height={50} backgroundColor="orange"></View>
        </View>
</SafeAreaView>
    );
  }

const MessagingSendingCompleteScreen = ({navigation}) => {

  const resetToHome = () => {  
    navigation.pop()
  }

  return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={resetToHome}>
          <Text>MessagingSending Complete Screen! Click to Home</Text>
        </TouchableOpacity>
      </View>
    );
}

class TestHomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Text
          onPress={navigation.getParam('increaseCount')}
        >Press</Text>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (<Text>{this.state.count}</Text>)
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  SubScreen: SubHomeScreen,

  MessagingSendingComplete : {
    screen: MessagingSendingCompleteScreen,
    // Doesn't stop back but makes it less visual prominent.
    //navigationOptions:{ tabBarVisible: false, header: null},
  }}
)

const InboxStack = createStackNavigator({
  Inbox: InboxScreen,
  MessagingSending : MessagingSendingScreen,
})

InboxStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = !(navigation.state.index > 0);
  return {
      tabBarVisible
  };
};

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Inbox : InboxStack,
  Settings: {
    screen: SettingsScreen,
  }
})

const Root =   TabNavigator


const EntryScreen = () => {
  return (
  <View style={{flex: 1, backgroundColor: "purple"}}>
    <Text>Entry Screen</Text>
  </View>)
}

// export default App = () => {
//   return (
//       <SafeAreaView style={{flex: 1}}>
//         <EntryScreen/>
//       </SafeAreaView>
// )}

export default App = () => {
  return (<Root/>)}