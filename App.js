import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, Linking   } from 'react-native';

const readFullArticle = (url) => {
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
}

const Item = ({ data }) => {
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: data.urlToImage }} />
      <Text style={styles.itemTitle}>
        {data.title}
      </Text>
      <Text style={styles.itemDescription}>
        {data.description}
      </Text>
      <View style={styles.itemBtn}>
        <Button onPress={() => { readFullArticle(data.url); }} title="Read More..." />
      </View>
    </View>
  )
}

const Home = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text><h1><u><i><b>NEWS APP BY SAURABH</b></i></u></h1></Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
          data={data} 
        renderItem={({ item }) => <Item data={item} />}
      />
      
    </View>
  );
}

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>
        Loading your Native App...
      </Text>
    </View>
  );
}

export default function App() {
  const API_KEY = "PUT_YOUR_API_KEY";
  const apiUrl = `https://newsapi.org/v2/everything?q=comics&sortBy=publishedAt&apiKey=${API_KEY}`;

  const [fetchingData, setFetchingDataState] = React.useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        return data.articles;
      })
      .then(articles => {
        setItems(articles);
        setFetchingDataState(false);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  if (fetchingData) {
    return <Loading />
  } else {
    return <Home data={items} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0FFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    borderWidth: 0,
    width: '100%',
    padding: 5
  },
  itemImage: {
    height: 220
  },
  itemTitle: {
    textAlign: "center",
    padding: 20,
    fontSize: 20,
    color: 'black',
    backgroundColor: 'lightgreen',

  },
  itemDescription: {
    fontSize: 17,
    padding: 10,
    
    color: 'black',
    backgroundColor: 'yellow',
  },
  itemBtn: {
    flexDirection: 'row',
    backgroundColor: 'white',
  }
});
