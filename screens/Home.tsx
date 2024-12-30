import React, { useState, createContext, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';

// Context for managing item click count
const ClickCountContext = createContext({ count: 0, increment: () => {} });

const HomePage = () => {
  const username = 'Udaya Samaranayake'; // Set username directly
  const [items, setItems] = useState([]);
  const { count, increment } = useContext(ClickCountContext);

  // Fetch items from API
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []); // This ensures that the data fetch happens only once when the component is mounted

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={increment} // Increment click count when an item is clicked
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemStatus}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header displaying username */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {username}</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Clicks: {count}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  itemStatus: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomePage;
