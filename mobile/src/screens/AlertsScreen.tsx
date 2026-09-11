import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { alertAPI } from '../services/api';
import { Alert } from '../types';
import { COLORS, SIZES } from '../constants/theme';

const typeConfig: any = {
  critical: { icon: 'close-circle', color: COLORS.critical, bg: COLORS.criticalBg },
  warning: { icon: 'alert-circle', color: COLORS.warningStatus, bg: COLORS.warningBg },
  info: { icon: 'information-circle', color: COLORS.info, bg: 'rgba(90, 200, 250, 0.15)' },
};

const AlertsScreen = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
    try { const res = await alertAPI.getAll(); setAlerts(res.data); } catch {}
  };

  useEffect(() => { fetchAlerts(); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchAlerts(); setRefreshing(false); };

  const handleAcknowledge = async (id: string) => {
    try { await alertAPI.acknowledge(id); fetchAlerts(); } catch {}
  };

  const renderItem = ({ item }: { item: Alert }) => {
    const config = typeConfig[item.type] || typeConfig.info;
    return (
      <View style={[styles.card, { borderLeftColor: config.color }]}>
        <View style={styles.cardHeader}>
          <Ionicons name={config.icon} size={24} color={config.color} />
          <View style={styles.cardInfo}>
            <Text style={styles.machineName}>{item.machineName}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        </View>
        {!item.acknowledged && (
          <TouchableOpacity style={styles.ackBtn} onPress={() => handleAcknowledge(item._id)}>
            <Text style={styles.ackText}>Acknowledge</Text>
          </TouchableOpacity>
        )}
        {item.acknowledged && <Text style={styles.acked}>âœ“ Acknowledged</Text>}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
      <Text style={styles.header}>Alerts</Text>
      <View style={styles.separator} />
      <FlatList data={alerts} keyExtractor={(item) => item._id} renderItem={renderItem} contentContainerStyle={styles.list}
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
  message: { color: COLORS.textSecondary, fontSize: SIZES.md, marginTop: 4 },
  time: { color: COLORS.textMuted, fontSize: SIZES.xs, marginTop: 4 },
  ackBtn: { backgroundColor: COLORS.primary + '20', borderRadius: 8, padding: 10, alignItems: 'center', marginTop: 12 },
  ackText: { color: COLORS.primary, fontWeight: 'bold', fontSize: SIZES.sm },
  acked: { color: COLORS.healthy, fontSize: SIZES.sm, marginTop: 10, textAlign: 'right' },
});

export default AlertsScreen;
