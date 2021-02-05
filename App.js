import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView>
          <Text>Hola mundo!</Text>
          <Button icon="menu" mode="contained" onPress={() => console.log('pressed')}>
            press me bro!
          </Button>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );

}

