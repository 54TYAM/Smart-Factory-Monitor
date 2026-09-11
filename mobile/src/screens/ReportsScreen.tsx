import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../constants/theme';

const ReportsScreen = () => (
  <LinearGradient colors={['#0a0e1a', '#1a1f2e']} style={styles.container}>
    <Text style={styles.header}>Reports</Text>
    <View style={styles.separator} />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Production Report</Text>
        <Text style={styles.description}>View detailed production metrics and trends across all machines.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Maintenance History</Text>
        <Text style={styles.description}>Track all maintenance activities and their outcomes.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Energy Consumption</Text>
        <Text style={styles.description}>Monitor power usage patterns and identify optimization opportunities.</Text>
      </View>
    </ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, paddingHorizontal: SIZES.padding },
  separator: { height: 2, backgroundColor: COLORS.primary, marginHorizontal: SIZES.padding, marginTop: 8, marginBottom: 16, borderRadius: 1 },
  content: { paddingHorizontal: SIZES.padding, paddingBottom: 30 },
  card: { backgroundColor: COLORS.card, borderRadius: SIZES.radius, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: COLORS.cardBorder },
  title: { color: COLORS.text, fontSize: SIZES.lg, fontWeight: 'bold' },
  description: { color: COLORS.textSecondary, fontSize: SIZES.md, marginTop: 8 },
});

export default ReportsScreen;
