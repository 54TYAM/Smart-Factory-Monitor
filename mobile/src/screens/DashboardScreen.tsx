import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart } from 'react-native-gifted-charts';
import { machineAPI } from '../services/api';
import { Machine } from '../types';
import { COLORS, SIZES } from '../constants/theme';

const DashboardScreen = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMachines = async () => {
    try {
      const response = await machineAPI.getAll();
      setMachines(response.data);
    } catch (err) {
      console.log('Error fetching machines:', err);
    }
  };

  useEffect(() => { fetchMachines(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMachines();
    setRefreshing(false);
  };

  const healthy = machines.filter((m) => m.status === 'healthy').length;
  const warning = machines.filter((m) => m.status === 'warning').length;
  const critical = machines.filter((m) => m.status === 'critical').length;

  const pieData = [
    { value: healthy || 1, color: COLORS.healthy, text: 'Healthy' },
    { value: warning || 1, color: COLORS.warningStatus, text: 'Warning' },
    { value: critical || 1, color: COLORS.critical, text: 'Critical' },
  ];

  const avgEfficiency = machines.length > 0
    ? (machines.reduce((acc, m) => acc + m.efficiency, 0) / machines.length).toFixed(1)
    : '0';

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}>
        <Text style={styles.header}>Dashboard</Text>
        <View style={styles.separator} />

        {/* Summary Cards */}
        <View style={styles.cardRow}>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.primary }]}>
            <Text style={styles.cardLabel}>Total Machines</Text>
            <Text style={styles.cardValue}>{machines.length}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.healthy }]}>
            <Text style={styles.cardLabel}>Healthy</Text>
            <Text style={[styles.cardValue, { color: COLORS.healthy }]}>{healthy}</Text>
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.warningStatus }]}>
            <Text style={styles.cardLabel}>Warning</Text>
            <Text style={[styles.cardValue, { color: COLORS.warningStatus }]}>{warning}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.critical }]}>
            <Text style={styles.cardLabel}>Critical</Text>
            <Text style={[styles.cardValue, { color: COLORS.critical }]}>{critical}</Text>
          </View>
        </View>

        {/* Machine Status Pie Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Machine Status</Text>
          <View style={styles.chartCenter}>
            <PieChart
              data={pieData}
              donut
              radius={100}
              innerRadius={60}
              innerCircleColor={COLORS.card}
              centerLabelComponent={() => (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: COLORS.text, fontSize: 22, fontWeight: 'bold' }}>{machines.length}</Text>
                  <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>Total</Text>
                </View>
              )}
            />
          </View>
        </View>

        {/* Efficiency Card */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Average Efficiency</Text>
          <Text style={styles.efficiencyValue}>{avgEfficiency}%</Text>
          <View style={styles.efficiencyBar}>
            <View style={[styles.efficiencyFill, { width: `${avgEfficiency}%` }]} />
          </View>
        </View>

        {/* Production Summary */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Production Graph</Text>
          {machines.map((m) => (
            <View key={m._id} style={styles.prodRow}>
              <Text style={styles.prodName}>{m.name}</Text>
              <Text style={[styles.prodRate, { color: m.status === 'healthy' ? COLORS.healthy : m.status === 'warning' ? COLORS.warningStatus : COLORS.critical }]}>{m.productionRate} units/hr</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, paddingHorizontal: SIZES.padding },
  separator: { height: 2, backgroundColor: COLORS.primary, marginHorizontal: SIZES.padding, marginTop: 8, marginBottom: 16, borderRadius: 1 },
  cardRow: { flexDirection: 'row', paddingHorizontal: SIZES.padding, gap: 12, marginBottom: 12 },
  summaryCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 16, borderLeftWidth: 4, borderWidth: 1, borderColor: COLORS.cardBorder },
  cardLabel: { color: COLORS.textSecondary, fontSize: SIZES.sm },
  cardValue: { color: COLORS.text, fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  chartCard: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 20, marginHorizontal: SIZES.padding, marginBottom: 16, borderWidth: 1, borderColor: COLORS.cardBorder },
  chartTitle: { color: COLORS.text, fontSize: SIZES.xl, fontWeight: 'bold', marginBottom: 16 },
  chartCenter: { alignItems: 'center', paddingVertical: 10 },
  efficiencyValue: { color: COLORS.primary, fontSize: 36, fontWeight: 'bold', textAlign: 'center' },
  efficiencyBar: { height: 8, backgroundColor: COLORS.surfaceLight, borderRadius: 4, marginTop: 12, overflow: 'hidden' },
  efficiencyFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
  prodRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder },
  prodName: { color: COLORS.text, fontSize: SIZES.md },
  prodRate: { fontSize: SIZES.md, fontWeight: '600' },
});

export default DashboardScreen;
