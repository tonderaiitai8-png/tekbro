import { Tabs } from 'expo-router';
import { Home, TrendingUp, Clock, Trophy, Zap } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    backgroundColor: COLORS.card,
                    borderTopColor: COLORS.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontFamily: FONTS.medium,
                    fontSize: 12,
                },
                tabBarBackground: () => (
                    <View style={{ flex: 1, backgroundColor: COLORS.card }} />
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Portfolio',
                    tabBarIcon: ({ color, focused }) => (
                        <Home
                            size={24}
                            color={color}
                            style={focused ? { shadowColor: COLORS.primary, shadowRadius: 10, shadowOpacity: 0.5 } : {}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="market"
                options={{
                    title: 'Market',
                    tabBarIcon: ({ color, focused }) => (
                        <TrendingUp
                            size={24}
                            color={color}
                            style={focused ? { shadowColor: COLORS.primary, shadowRadius: 10, shadowOpacity: 0.5 } : {}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="crypto"
                options={{
                    title: 'Crypto',
                    tabBarIcon: ({ color, focused }) => (
                        <Zap
                            size={24}
                            color={color}
                            style={focused ? { shadowColor: COLORS.primary, shadowRadius: 10, shadowOpacity: 0.5 } : {}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Leaderboard',
                    tabBarIcon: ({ color, focused }) => (
                        <Trophy
                            size={24}
                            color={color}
                            style={focused ? { shadowColor: COLORS.primary, shadowRadius: 10, shadowOpacity: 0.5 } : {}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, focused }) => (
                        <Clock
                            size={24}
                            color={color}
                            style={focused ? { shadowColor: COLORS.primary, shadowRadius: 10, shadowOpacity: 0.5 } : {}}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
