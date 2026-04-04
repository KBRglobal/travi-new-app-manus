import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper, DS } from '@/components/screen-wrapper';

const RevenueDashboard = () => {
  // Dummy data for demonstration
  const revenueData = [
    { id: '1', month: 'Jan', amount: 12000, change: '+10%' },
    { id: '2', month: 'Feb', amount: 13500, change: '+12%' },
    { id: '3', month: 'Mar', amount: 11800, change: '-5%' },
    { id: '4', month: 'Apr', amount: 14200, change: '+20%' },
    { id: '5', month: 'May', amount: 15000, change: '+5%' },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <ScreenWrapper title="Revenue Dashboard" scrollable={true}>
      <View style={styles.container}>
        {/* Total Revenue Card */}
        <BlurView intensity={20} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Total Revenue</Text>
          <Text style={styles.totalAmount}>${totalRevenue.toLocaleString()}</Text>
          <LinearGradient
            colors={[DS.purple, DS.pink] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>View Details</Text>
            <MaterialIcons name="arrow-forward" size={18} color={DS.white} />
          </LinearGradient>
        </BlurView>

        {/* Monthly Revenue List */}
        <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
        {revenueData.map((item) => (
          <BlurView key={item.id} intensity={20} tint="dark" style={styles.monthlyItem}>
            <Text style={styles.monthText}>{item.month}</Text>
            <Text style={styles.monthlyAmount}>${item.amount.toLocaleString()}</Text>
            <View style={styles.changeContainer}>
              <MaterialIcons
                name={item.change.startsWith('+') ? "arrow-upward" : "arrow-downward"}
                size={16}
                color={item.change.startsWith('+') ? DS.success : DS.error}
              />
              <Text
                style={[
                  styles.changeText,
                  { color: item.change.startsWith('+') ? DS.success : DS.error },
                ]}
              >
                {item.change}
              </Text>
            </View>
          </BlurView>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: DS.bg,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.muted,
    marginBottom: 5,
  },
  totalAmount: {
    fontFamily: 'Chillax-Bold',
    fontSize: 36,
    color: DS.white,
    marginBottom: 15,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  ctaButtonText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginRight: 5,
  },
  sectionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 20,
    color: DS.white,
    marginBottom: 15,
    marginTop: 10,
  },
  monthlyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 10,
  },
  monthText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: DS.white,
    flex: 1,
  },
  monthlyAmount: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: DS.white,
    marginRight: 10,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RevenueDashboard;
