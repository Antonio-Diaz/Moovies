import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, Switch, TouchableRipple, Text } from "react-native-paper";
import usePreference from "../hooks/usePreferences";
import firebase from "../utils/firebase";

export default function DrawerContent(props) {
    // destructuring props to get the methods navigation 
    const { navigation } = props;
    const [active, setActive] = useState("home");
    const { theme, toggleTheme } = usePreference();

    const onChangeScreen = (screen) => {
        setActive(screen);
        navigation.navigate(screen);
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section title="Sections">
                <Drawer.Item
                    label="Home"
                    active={active === "home"}
                    onPress={() => onChangeScreen("home")}
                />
                <Drawer.Item
                    label="News Movies"
                    active={active === "news"}
                    onPress={() => onChangeScreen("news")}
                />
                <Drawer.Item
                    label="Popular Movies"
                    active={active === "popular"}
                    onPress={() => onChangeScreen("popular")}
                />
            </Drawer.Section>
            <Drawer.Section title="Preferences">
                <TouchableRipple>
                    <View style={styles.preference}>
                        <Text>Dark Theme</Text>
                        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
                    </View>
                </TouchableRipple>
                <Drawer.Item 
                    label="Logout"
                    onPress={() => firebase.auth().signOut()    }
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})
