import React from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ScreenWrapper, DS } from "@/components/screen-wrapper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const PreTripDashboard = () => {
  const router = useRouter();
  const tripData = {
    destination: "Paris, France",
    dates: "Oct 26 - Nov 02",
    budget: "$2,500",
    activities: [
      { id: "1", name: "Eiffel Tower Visit", status: "completed" },
      { id: "2", name: "Louvre Museum Tour", status: "pending" },
      { id: "3", name: "Seine River Cruise", status: "upcoming" },
    ],
    documents: [
      { id: "1", name: "Passport", status: "uploaded" },
      { id: "2", name: "Visa", status: "pending" },
      { id: "3", name: "Flight Tickets", status: "uploaded" },
    ],
  };

  const renderCard = (title: string, content: React.ReactNode) => (
    <BlurView intensity={20} tint="dark" style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {content}
    </BlurView>
  );

  return (
    <ScreenWrapper title="Pre-Trip Dashboard" scrollable={true}>
      <View style={styles.container}>
        {renderCard(
          "Trip Overview",
          <View>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.body}>{tripData.destination}</Text>
            <Text style={styles.label}>Dates:</Text>
            <Text style={styles.body}>{tripData.dates}</Text>
            <Text style={styles.label}>Budget:</Text>
            <Text style={styles.body}>{tripData.budget}</Text>
          </View>
        )}

        {renderCard(
          "Activities",
          <View>
            {tripData.activities.map((activity) => (
              <View key={activity.id} style={styles.listItem}>
                <MaterialIcons
                  name={activity.status === "completed" ? "check-circle" : activity.status === "pending" ? "hourglass-empty" : "event"}
                  size={20}
                  color={activity.status === "completed" ? DS.success : activity.status === "pending" ? DS.warning : DS.purple}
                  style={styles.listIcon}
                />
                <Text style={styles.body}>{activity.name}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(trip)/pre-trip-checklist" as any)}>
              <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.gradientButton}>
                <Text style={styles.ctaText}>View All Activities</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {renderCard(
          "Documents",
          <View>
            {tripData.documents.map((doc) => (
              <View key={doc.id} style={styles.listItem}>
                <MaterialIcons
                  name={doc.status === "uploaded" ? "cloud-done" : "cloud-upload"}
                  size={20}
                  color={doc.status === "uploaded" ? DS.success : DS.warning}
                  style={styles.listIcon}
                />
                <Text style={styles.body}>{doc.name}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(trip)/pre-trip-documents" as any)}>
              <LinearGradient colors={[DS.purple, DS.pink] as const} style={styles.gradientButton}>
                <Text style={styles.ctaText}>Manage Documents</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DS.border,
    backgroundColor: DS.surface,
    overflow: "hidden",
    padding: 15,
  },
  cardTitle: {
    fontFamily: "Chillax-Bold",
    fontSize: 22,
    color: DS.white,
    marginBottom: 15,
  },
  label: {
    fontFamily: "Satoshi-Medium",
    fontSize: 14,
    color: DS.muted,
    marginTop: 5,
  },
  body: {
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
    color: DS.white,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  listIcon: {
    marginRight: 10,
  },
  ctaButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  ctaText: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: DS.white,
  },
});

export default PreTripDashboard;
