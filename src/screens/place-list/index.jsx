import { FlatList, Alert } from 'react-native';
import { PlaceItem } from '../../components';
import { styles } from './styles';
import { selectLugar } from '../../db';
import { useState } from 'react';

const PlaceListScreen = () => {
  const [places, setPlaces] = useState([]); 

  const getDataBD = async () => {
    const result = await selectLugar();
    setPlaces(result.rows._array);
  };

  getDataBD();
  
  const onHandlerSelect = (id) => {
    Alert.alert('Id de la dirección',id.toString(), [{ text: 'Ok' }]);
  };

  const renderItem = ({ item }) =>{
    return(<PlaceItem {...item} onSelect={onHandlerSelect} />);
  };

  const keyExtractor = (item) => item.id;

  return (
    <FlatList
      data={places}
      style={styles.container}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default PlaceListScreen;
