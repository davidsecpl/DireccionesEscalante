import { View, Button, Alert, Text } from 'react-native';
import { styles } from './styles';
import { ImageSelector, LocationSelector } from '../../components';
import { useEffect, useState } from 'react';
import { documentDirectory, copyAsync } from 'expo-file-system';
import { URL_GEOCODING } from '../../utils/maps';
import { insertLugar } from '../../db';
import Place from '../../model/place';

const MainScreen = ({ navigation }) => {
  const [image, setImage] = useState('');
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState('');

  const enableButton = image && coords && address;

  const getLocation = (location) => {
    setCoords(location);
  };

  const getImage = (imageUri) => {
    setImage(imageUri);
    getDireccion();
  };

  const getDireccion = async () => {
    const response = await fetch(URL_GEOCODING(coords.lat, coords.lng));

    const data = await response.json();

    if (!data.results) return Alert.alert('No se ha podido encontrar la dirección del lugar');

    const direccion = data.results[0].formatted_address;
    setAddress(direccion);
  };

  const saveImage = async () => {
    const filename = image.split('/').pop();
    const newPath = `${documentDirectory}${filename}`;

    try {
      await copyAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onConfirmar = async () => {
    const result = await insertLugar(image, address, coords);
    saveImage();
    navigation.navigate('PlaceList');
  };

  return (
    <View style={styles.container}>
      <LocationSelector onLocation={getLocation} />
      <ImageSelector onImage={getImage} />
      <Button title="Confirmar" disabled={!enableButton} onPress={onConfirmar} />
      <Text>{address}</Text>
    </View>
  );
};

export default MainScreen;
