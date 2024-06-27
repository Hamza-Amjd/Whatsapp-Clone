import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import ContextWrapper from "@/context/ContextWrapper";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const InitialLayout = () => {
  const [currUser, setCurrUser] = useState<any>({});
  const [expoPushToken, setExpoPushToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }
  // const requestUserPermission=async()=> {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here', test: { test1: 'more data' } },
          },
          trigger: { seconds: 20 },
        });
      }
  useEffect(() => {
      // requestUserPermission()
      // messaging().getToken().then((token) => {console.log(token)});
      registerForPushNotificationsAsync().then((token:any) => {setExpoPushToken(token)});
      
    
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: any) => {
      setLoading(false);
      if (user) {

        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!loaded) {
    return <View/>;
  }

  return (
    <Stack>
      
          <Stack.Screen name="index" options={{ headerShown: false,statusBarColor:"white" }} />
         <Stack.Screen name="SetProfile"  options={{ headerShown: false }} />
         <Stack.Screen  name="(tabs)" options={{ headerShown: false,statusBarColor:Colors.background }} />
         <Stack.Screen
        name="otp"
        options={{
          headerTitle: "Enter your phone number",
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: "Verify your phone number",
          headerBackVisible: true,
          headerTitleAlign: "center",
          statusBarColor:Colors.background
        }}
      />

      <Stack.Screen
        name="(modals)/new-chat"
        options={{
          headerShown: true,
          title: "Select Contact",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { fontSize: 16 },
          presentation: "modal",
          headerBackTitleVisible: false,
          statusBarColor:Colors.background
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ContextWrapper>
      <InitialLayout />
    </ContextWrapper>
  );
};
export default RootLayoutNav;


