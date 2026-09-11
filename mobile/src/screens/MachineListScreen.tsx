import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { machineAPI } from '../services/api';
import { Machine } from '../types';
import { COLORS, SIZES } from '../constants/theme';

const statusIcon: any = { healthy: 'checkmark-circle', warning: 'alert-circle', critical: 'close-circle' };
const statusColor: any = { healthy: COLORS.healthy, warning: COLORS.warningStatus, critical: COLORS.critical };

const MachineListScreen = ({ navigation }: any) => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMachines = async () => {
    try { const res = await machineAPI.getAll(); setMachines(res.data); } catch {}
  };

  useEffect(() => { fetchMachines(); }, []);

  const onRefresh = async () => { setRefreshing(true); await fetchMachines(); setRefreshing(false); };

  const renderItem = ({ item }: { item: Machine }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MachineDetails', { machine: item })}>
      <View style={styles.cardHeader}>
        <Ionicons name={statusIcon[item.status]} size={24} color={statusColor[item.status]} />
        <View style={styles.cardInfo}>
          <Text style={styles.machineName}>{item.name}</Text>
          <Text style={styles.machineType}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor[item.status] + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor[item.status] }]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.metrics}>
        <View style={styles.metric}><Text style={styles.metricLabel}>Temp</Text><Text style={styles.metricValue}>{item.temperature.toFixed(0)}Â°C</Text></View>
        <View style={styles.metric}><Text style={styles.metricLabel}>Efficiency</Text><Text style={styles.metricValue}>{item.efficiency}%</Text></View>
        <View style={styles.metric}><Text style={styles.metricLabel}>Uptime</Text><Text style={styles.metricValue}>{item.uptime}%</Text></View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
      <Text style={styles.header}>Machines</Text>
      <View style={styles.separator} />
      <FlatList
        data={machines}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, paddingHorizontal: SIZES.padding },
  separator: { height: 2, backgroundColor: COLORS.primary, marginHorizontal: SIZES.padding, marginTop: 8, marginBottom: 16, borderRadius: 1 },
  list: { paddingHorizontal: SIZES.padding, paddingBottom: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.cardBorder },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardInfo: { flex: 1, marginLeft: 12 },
  machineName: { color: COLORS.text, fontSize: SIZES.lg, fontWeight: 'bold' },
  machineType: { color: COLORS.textSecondary, fontSize: SIZES.sm, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: SIZES.xs, fontWeight: 'bold' },
  metrics: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: COLORS.cardBorder },
  metric: { alignItems: 'center' },
  metricLabel: { color: COLORS.textMuted, fontSize: SIZES.xs },
  metricValue: { color: COLORS.text, fontSize: SIZES.lg, fontWeight: 'bold', marginTop: 2 },
});

export default MachineListScreen;
