import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const statusColor: any = { healthy: COLORS.healthy, warning: COLORS.warningStatus, critical: COLORS.critical };

const MachineDetailsScreen = ({ route, navigation }: any) => {
  const { machine } = route.params;

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{machine.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor[machine.status] + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor[machine.status] }]}>{machine.status.toUpperCase()}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Machine Info</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Type</Text><Text style={styles.infoValue}>{machine.type}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Location</Text><Text style={styles.infoValue}>{machine.location}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Last Maintenance</Text><Text style={styles.infoValue}>{machine.lastMaintenance}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Next Maintenance</Text><Text style={styles.infoValue}>{machine.nextMaintenance}</Text></View>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Live Metrics</Text>
          <View style={styles.metricsGrid}>
            {[
              { label: 'Temperature', value: `${machine.temperature.toFixed(1)}Â°C`, icon: 'thermometer-outline' },
              { label: 'Vibration', value: `${machine.vibration.toFixed(2)} mm/s`, icon: 'pulse-outline' },
              { label: 'Power', value: `${machine.powerConsumption.toFixed(1)} kW`, icon: 'flash-outline' },
              { label: 'Uptime', value: `${machine.uptime}%`, icon: 'time-outline' },
              { label: 'Production', value: `${machine.productionRate} u/hr`, icon: 'speedometer-outline' },
              { label: 'Efficiency', value: `${machine.efficiency}%`, icon: 'analytics-outline' },
            ].map((m, i) => (
              <View key={i} style={styles.metricBox}>
                <Ionicons name={m.icon as any} size={22} color={COLORS.primary} />
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.padding, marginBottom: 16, gap: 12 },
  title: { flex: 1, fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: SIZES.xs, fontWeight: 'bold' },
  content: { paddingHorizontal: SIZES.padding, paddingBottom: 30 },
  infoCard: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: COLORS.cardBorder },
  sectionTitle: { color: COLORS.text, fontSize: SIZES.lg, fontWeight: 'bold', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.cardBorder },
  infoLabel: { color: COLORS.textSecondary, fontSize: SIZES.md },
  infoValue: { color: COLORS.text, fontSize: SIZES.md, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricBox: { width: '47%', backgroundColor: COLORS.surfaceLight, borderRadius: SIZES.radius, padding: 14, alignItems: 'center' },
  metricValue: { color: COLORS.text, fontSize: SIZES.xl, fontWeight: 'bold', marginTop: 6 },
  metricLabel: { color: COLORS.textMuted, fontSize: SIZES.xs, marginTop: 2 },
});

export default MachineDetailsScreen;
