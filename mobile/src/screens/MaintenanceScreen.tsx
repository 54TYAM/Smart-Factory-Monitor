import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { maintenanceAPI } from '../services/api';
import { MaintenanceRecord } from '../types';
import { COLORS, SIZES } from '../constants/theme';

const priorityColor: any = { high: COLORS.critical, medium: COLORS.warningStatus, low: COLORS.healthy };
const statusIcon: any = { scheduled: 'calendar-outline', 'in-progress': 'reload-outline', completed: 'checkmark-done-outline', urgent: 'warning-outline' };

const MaintenanceScreen = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecords = async () => {
    try { const res = await maintenanceAPI.getAll(); setRecords(res.data); } catch {}
  };

  useEffect(() => { fetchRecords(); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchRecords(); setRefreshing(false); };

  const renderItem = ({ item }: { item: MaintenanceRecord }) => (
    <View style={[styles.card, { borderLeftColor: priorityColor[item.priority] || COLORS.primary }]}>
      <View style={styles.cardHeader}>
        <Ionicons name={statusIcon[item.status] || 'construct-outline'} size={24} color={COLORS.primary} />
        <View style={styles.cardInfo}>
          <Text style={styles.machineName}>{item.machineName}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.metaRow}>
        <View style={[styles.badge, { backgroundColor: priorityColor[item.priority] + '20' }]}>
          <Text style={[styles.badgeText, { color: priorityColor[item.priority] }]}>{item.priority.toUpperCase()}</Text>
        </View>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.date}>ðŸ“… {item.scheduledDate}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
      <Text style={styles.header}>Maintenance</Text>
      <View style={styles.separator} />
      <FlatList data={records} keyExtractor={(item) => item._id} renderItem={renderItem} contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, paddingHorizontal: SIZES.padding },
  separator: { height: 2, backgroundColor: COLORS.primary, marginHorizontal: SIZES.padding, marginTop: 8, marginBottom: 16, borderRadius: 1 },
  list: { paddingHorizontal: SIZES.padding, paddingBottom: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.cardBorder, borderLeftWidth: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  cardInfo: { flex: 1, marginLeft: 12 },
  machineName: { color: COLORS.text, fontSize: SIZES.lg, fontWeight: 'bold' },
  description: { color: COLORS.textSecondary, fontSize: SIZES.md, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: SIZES.xs, fontWeight: 'bold' },
  type: { color: COLORS.textSecondary, fontSize: SIZES.sm, textTransform: 'capitalize' },
  date: { color: COLORS.textMuted, fontSize: SIZES.sm, marginLeft: 'auto' },
});

export default MaintenanceScreen;
