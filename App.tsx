import React from 'react';
import axios from 'axios';
import { Camera, useCameraPermissions,CameraView} from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text,View,Button,Alert} from 'react-native';


type Prop = {
  type: string;
  data: string;
};
export default function App() {
  const [permission,requestPermission] = useCameraPermissions();
  const [scanned,setScanned] = useState(false);

  useEffect(()=>{
    (async()=>{
      const {status} = await Camera.requestCameraPermissionsAsync()

      if(status  !== 'granted'){
        alert('Desculpe, precisamos da permissão da câmera para fazer isso funcionar!');
      }

    })()
  },[])

  
  const handleBarCodeScanned = ({ type, data }: Prop) => {
    setScanned(true);

    // Enviar os dados para o servidor
    axios.post('http://10.0.0.149:4000/api/qr-codes', { data })
      .then(response => {
        Alert.alert(
          `Código ${type} escaneado`,
          `Dados: ${data} armazenados com sucesso!`,
          [
            {
              text: 'OK',
              onPress: () => setScanned(false),
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error: any) => {
        Alert.alert(
          'Erro',
          'Não foi possível armazenar os dados no banco de dados. Tente novamente.',
          [{ text: 'OK', onPress: () => setScanned(false) }],
          { cancelable: false }
        );
        console.error('Erro ao salvar no banco de dados:', error);
        if (error.response) {
          console.error('Resposta do servidor:', error.response);
        } else if (error.request) {
          console.error('Erro na requisição:', error.request);
        } else {
          console.error('Erro desconhecido:', error.message);
        }
      });
      
  };

  
  if (!permission?.granted) {
    // Camera permissions are still loading or denied.
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Permissão da câmera não concedida.</Text>
        <Button title="Solicitar Permissão" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
      <View style={styles.layerContainer}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </View>
    </CameraView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  layerContainer: {
    flex: 1,
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
