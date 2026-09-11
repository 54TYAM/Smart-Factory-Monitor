import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { COLORS, SIZES } from '../constants/theme';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.separator} />
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle" size={80} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        <Text style={styles.role}>{user?.role || 'Operator'}</Text>

        <View style={styles.card}>
          <View style={styles.menuItem}><Ionicons name="settings-outline" size={20} color={COLORS.textSecondary} /><Text style={styles.menuText}>Settings</Text></View>
          <View style={styles.menuItem}><Ionicons name="notifications-outline" size={20} color={COLORS.textSecondary} /><Text style={styles.menuText}>Notifications</Text></View>
          <View style={styles.menuItem}><Ionicons name="help-circle-outline" size={20} color={COLORS.textSecondary} /><Text style={styles.menuText}>Help & Support</Text></View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => dispatch(logout())}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.critical} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, paddingHorizontal: SIZES.padding },
  separator: { height: 2, backgroundColor: COLORS.primary, marginHorizontal: SIZES.padding, marginTop: 8, marginBottom: 16, borderRadius: 1 },
  content: { alignItems: 'center', paddingHorizontal: SIZES.padding },
  avatar: { marginBottom: 12 },
  name: { color: COLORS.text, fontSize: SIZES.xxl, fontWeight: 'bold' },
  email: { color: COLORS.textSecondary, fontSize: SIZES.md, marginTop: 4 },
  role: { color: COLORS.primary, fontSize: SIZES.sm, marginTop: 4, textTransform: 'uppercase', fontWeight: 'bold' },
  card: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 16, width: '100%', marginTop: 30, borderWidth: 1, borderColor: COLORS.cardBorder },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder, gap: 12 },
  menuText: { color: COLORS.text, fontSize: SIZES.lg },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 30, gap: 8, backgroundColor: COLORS.criticalBg, paddingHorizontal: 24, paddingVertical: 12, borderRadius: SIZES.radius },
  logoutText: { color: COLORS.critical, fontSize: SIZES.lg, fontWeight: 'bold' },
});

export default ProfileScreen;
