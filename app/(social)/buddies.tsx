// Screen 86 — Travel Buddies (Static Wireframe)
// Route: /social/buddies | Mode: Discovery (Social)
// Zones: Header 60px, Tabs (Active/Planning/Past), Buddy cards

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const ACTIVE_BUDDIES = [
  { id: "1", name: "Sarah Mitchell", dest: "Barcelona", dna: 92, status: "Traveling now", since: "Mar 2026" },
  { id: "2", name: "Marco Rossi", dest: "Rome", dna: 78, status: "Traveling now", since: "Jan 2026" },
];

const PLANNING_BUDDIES = [
  { id: "3", name: "Yuki Tanaka", dest: "Kyoto", dna: 85, status: "Planning for Apr", since: "Feb 2026" },
];

const PAST_BUDDIES = [
  { id: "4", name: "Elena Kowalski", dest: "Santorini", dna: 88, status: "Traveled Nov 2025", since: "Oct 2025" },
  { id: "5", name: "James Lee", dest: "London", dna: 71, status: "Traveled Sep 2025", since: "Aug 2025" },
];

function BuddyCard({ buddy }: { buddy: typeof ACTIVE_BUDDIES[0] }) {
  return (
    <View style={s.card}>
      <View style={s.cardAvatar}><Text style={s.cardInitial}>{buddy.name[0]}</Text></View>
      <View style={s.cardInfo}>
        <Text style={s.cardName}>{buddy.name}</Text>
        <Text style={s.cardDest}>{buddy.dest} · {buddy.status}</Text>
        <View style={s.cardBottom}>
          <View style={s.dnaBadge}><Text style={s.dnaText}>{buddy.dna}% Match</Text></View>
          <Text style={s.cardSince}>Since {buddy.since}</Text>
        </View>
      </View>
      <Text style={s.cardArrow}>→</Text>
    </View>
  );
}

export default function TravelBuddiesScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Travel Buddies</Text>
          <Text style={s.headerIcon}>+</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Active */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Active Trips</Text>
              <View style={s.countBadge}><Text style={s.countText}>{ACTIVE_BUDDIES.length}</Text></View>
            </View>
            {ACTIVE_BUDDIES.map(b => <BuddyCard key={b.id} buddy={b} />)}
          </View>

          {/* Planning */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Planning Together</Text>
              <View style={s.countBadge}><Text style={s.countText}>{PLANNING_BUDDIES.length}</Text></View>
            </View>
            {PLANNING_BUDDIES.map(b => <BuddyCard key={b.id} buddy={b} />)}
          </View>

          {/* Past */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Past Travel Buddies</Text>
              <View style={s.countBadge}><Text style={s.countText}>{PAST_BUDDIES.length}</Text></View>
            </View>
            {PAST_BUDDIES.map(b => <BuddyCard key={b.id} buddy={b} />)}
          </View>

          <View style={{height:100}}/>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const N="#111",N2="#1a1a1a",N3="#222",W="#fff",G="#888";
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:N},
  header:{height:60,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:16},
  back:{fontSize:24,color:W},title:{fontSize:20,fontWeight:"700",color:W},headerIcon:{fontSize:24,color:G},
  scroll:{paddingHorizontal:16},
  section:{marginTop:24,gap:12},
  sectionHeader:{flexDirection:"row",alignItems:"center",gap:8},
  sectionTitle:{fontSize:18,fontWeight:"700",color:W},
  countBadge:{minWidth:24,height:24,borderRadius:12,backgroundColor:N3,alignItems:"center",justifyContent:"center",paddingHorizontal:6},
  countText:{fontSize:12,fontWeight:"700",color:G},
  card:{flexDirection:"row",alignItems:"center",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:14,gap:12},
  cardAvatar:{width:48,height:48,borderRadius:12,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  cardInitial:{fontSize:20,fontWeight:"600",color:"#555"},
  cardInfo:{flex:1,gap:4},
  cardName:{fontSize:16,fontWeight:"600",color:W},
  cardDest:{fontSize:13,color:G},
  cardBottom:{flexDirection:"row",alignItems:"center",gap:8,marginTop:2},
  dnaBadge:{paddingHorizontal:6,paddingVertical:2,borderRadius:8,backgroundColor:"#1a3a1a"},
  dnaText:{fontSize:11,fontWeight:"600",color:"#4a4"},
  cardSince:{fontSize:11,color:"#555"},
  cardArrow:{fontSize:18,color:G},
});
