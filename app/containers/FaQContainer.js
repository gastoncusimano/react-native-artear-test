import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ActivityIndicator, View, FlatList,SafeAreaView } from 'react-native';
import {Fetch} from '../helpers/fetch'
import {MaterialIcons} from 'react-native-vector-icons'

export default function FaQContainer() {
    const [state, setState] = useState({items: [], page: 1, limit: 10, isLoading: true})
    const initializedData = async () => {
        await Fetch.GET(`questions?page=${state.page}&limit=10`, (response) => response)
              .then((response) => {
                if (response) {
                  const items = state.items
                  response.forEach(item => {
                    items.push(item)
                  });
                  setState({ 
                    ...state, 
                    page: state.page += 1,
                    items: items,
                    isLoading: false
                  })
                }
              })
    }
    useEffect(() => {
      initializedData()
    }, [])

    const loadMore = (() => {
      setState((prevState) => {
        return { isLoading: true, page: prevState.page + 1, items: state.items }
      })
      initializedData()
    })

    const RenderItem = (item) => {
        return (
          <View style={styles.item}>
                <Text style={{fontSize: 18}}><MaterialIcons name="question-answer" size={16}/> #{item.item.numero} {item.item.pregunta} </Text>
                <Text>- {item.item.respuesta}</Text>
          </View>
        )
      }
    const renderFooter = () => {
        return(
            state.isLoading ?
                <View style={{paddingVertical: 30, alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#ecf0f1"/>
                </View> : null
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.headerBar}>
        <Text style={styles.headerText}> Preguntas <Text style={{fontSize: 13}}>(Visualizando {state.items.length})</Text></Text>
        </View>
        {state.items &&
            <FlatList
                style={{marginBottom: 5}}
                key="questions"
                keyExtractor={(item,index) => index.toString()}
                renderItem={(item) => <RenderItem item={item.item}/>}
                data={state.items}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                onEndReached={loadMore}
                onEndReachedThreshold={.3}
                ListFooterComponent={renderFooter}
                refreshing={state.isLoading} />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    width: '100%',
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBar: {
      backgroundColor: '#2980b9',
      borderBottomColor: '#111',
      borderBottomWidth: .5,
      alignSelf: 'stretch',
  },
  headerText: {
    color: '#ecf0f1',
    paddingVertical: 5,
    fontSize: 30,
  },
  item: {
    backgroundColor: '#ecf0f1',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    padding: 10
  }
});
