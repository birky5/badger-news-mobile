import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function BadgerTabs(props) {
    const tabs = createBottomTabNavigator();
    return <>
        <tabs.Navigator screenOptions={{headerStyle: {backgroundColor: "#C41E3A"}}}>
            <tabs.Screen name="News" component={BadgerNewsScreen} options={{
                tabBarIcon: () => {
                    return (<View>
                        <Ionicons name="newspaper-outline" size={32} color="black" />
                    </View>)
                }
            }}></tabs.Screen>
            <tabs.Screen name="Preferences" options={{
                tabBarIcon: () => {
                    return (<View>
                        <Ionicons name="settings-outline" size={32} color="black" />
                    </View>)
                }
            }} component={BadgerPreferencesScreen} ></tabs.Screen>
        </tabs.Navigator>
    </>
}

export default BadgerTabs;