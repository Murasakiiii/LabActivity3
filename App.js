import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [hovered, setHovered] = useState(null);

  const addItem = () => {
    if (item.trim() === '') return;
    setList([...list, { id: Date.now().toString(), value: item }]);
    setItem('');
  };

  const removeItem = (id) => {
    setList(list.filter((i) => i.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <Text style={styles.description}>
        LIST or REMOVE items you need to buy anytime.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Item"
          placeholderTextColor='white'
          value={item}
          onChangeText={setItem}
        />

        <TouchableOpacity style={styles.addBtn} onPress={addItem}>
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.value}</Text>

            <Pressable
              style={styles.removeBtn}
              onPress={() => removeItem(item.id)}
              onHoverIn={() => setHovered(item.id)}
              onHoverOut={() => setHovered(null)}>
              <Text
                style={[
                  styles.removeText,
                  hovered === item.id && { color: '#DC143C' }
                ]}>
                REMOVE
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f5f5f5',
    marginTop: 40,
  },
  description: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: 'white',
    borderColor: '#6B4E9C',
    borderWidth: 2
  },
  addBtn: {
    backgroundColor: '#6B4E9C',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#6B4E9C',
    borderWidth: 2
  },
  listText: {
    color: '#fff',
    fontSize: 16,
  },
  removeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
