// src/navigators/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import MapScreen from '../screens/mapScreen';
// import ReportScreen from '../screens/reportScreen';
// import ChatsScreen from '../screens/chatsScreen';
// import ProfileScreen from '../screens/profileScreen';
import EarthquakeDetailScreen from '../screens/earthquakeDetailScreen';
import AlertSettingsScreen from '../screens/alertSettingsScreen';
// import SafetySettingsScreen from '../screens/safetySettingsScreen';
// import DisplaySettingsScreen from '../screens/displaySettingsScreen';
// import ThemeSettingsScreen from '../screens/themeSettingsScreen';
// import DataSettingsScreen from '../screens/dataSettingsScreen';
// import LanguageSettingsScreen from '../screens/languageSettingsScreen';
// import PrivacySettingsScreen from '../screens/privacySettingsScreen';
import { HomeScreen } from '../screens/homeScreen';
import { AlertScreen } from '../screens/alertScreen';
import SettingsScreen from '../screens/settingsScreen';

// Import types
import { RootStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Stack navigator for Map tab
const MapStackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="MapMain"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="MapMain" component={MapScreen} />
    <Stack.Screen name="EarthquakeDetail" component={EarthquakeDetailScreen} options={{ headerShown: true, title: 'Earthquake Details' }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AlertSettings" component={AlertSettingsScreen} options={{ headerShown: true, title: 'Alerts' }} />
    {/* Uncomment these as you implement them */}
    {/* <Stack.Screen name="SafetySettings" component={SafetySettingsScreen} options={{ headerShown: true, title: 'Safety' }} /> */}
    {/* <Stack.Screen name="DisplaySettings" component={DisplaySettingsScreen} options={{ headerShown: true, title: 'Display' }} /> */}
    {/* <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} options={{ headerShown: true, title: 'Theme' }} /> */}
    {/* <Stack.Screen name="DataSettings" component={DataSettingsScreen} options={{ headerShown: true, title: 'Data' }} /> */}
    {/* <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} options={{ headerShown: true, title: 'Language' }} /> */}
    {/* <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ headerShown: true, title: 'Privacy & Security' }} /> */}
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Alerts" component={AlertScreen} />
  </Stack.Navigator>
);

// Main tab navigator
const TabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="Map"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = 'help-circle';
        if (route.name === 'Map') iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
        // Uncomment as you add these screens
        // else if (route.name === 'Report') iconName = focused ? 'create' : 'create-outline';
        // else if (route.name === 'Chats') iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
        // else if (route.name === 'Profile') iconName = focused ? 'person-circle' : 'person-circle-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5 },
    })}
  >
    <Tab.Screen name="Map" component={MapStackNavigator} />
    {/* <Tab.Screen name="Report" component={ReportScreen} /> */}
    {/* <Tab.Screen name="Chats" component={ChatsScreen} /> */}
    {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
  </Tab.Navigator>
);

// Root navigator
const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
