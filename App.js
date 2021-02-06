import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Text, Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper } from "react-native-paper";
import { NavigationContainer, DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import PreferencesContext from "./src/context/PreferencesContext";
import Auth from './src/auth/Auth';
import firebase from './src/utils/firebase';
import 'firebase/auth';


export default function App() {
  const [theme, setTheme] = useState('dark');
  DefaultThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.accent = "#1ae1f2";

  DarkThemeNavigation.colors.background = "#192734";
  DarkThemeNavigation.colors.card = "#15212b";

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      { user ? 
      <PreferencesContext.Provider value={preference}>
        <PaperProvider
          theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
          <NavigationContainer
            theme={
              theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation
            }>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider> 
      : 
      <SafeAreaView style={styles.background}>

     <Auth />
      </SafeAreaView>}
    </>
  );
} 

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});