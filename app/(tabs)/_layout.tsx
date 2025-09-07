import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootState } from '@/store/RootStore';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {isAuth} = useSelector((state:RootState)=>state.user)
  return (
    <Tabs
       screenOptions={{
    tabBarShowLabel: false, 
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: {
      height: 50, 
    },
    tabBarItemStyle: {
      justifyContent: "center",
      alignItems: "center",
    },
    tabBarIconStyle: {
      marginBottom: 0,
      paddingTop:6
    },
  }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
      name="login"
      options={{
        href: isAuth ? null : "/login", 
        title: "Login",
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="person" color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name="dashboard"
      options={{
        href: isAuth ? "/dashboard" : null, 
        title: "Dashboard",
        tabBarIcon: ({ color }) => (
          <IconSymbol size={28} name="person" color={color} />
        ),
      }}
    />
    </Tabs>
  );
}
