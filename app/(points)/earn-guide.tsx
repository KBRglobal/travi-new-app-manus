// Screen 96 — Earn Guide (Static Wireframe)
// Route: /points/earn | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const WAYS = [
  { id: "1", icon: "✈", title: "Book Flights", desc: "Earn 3pts per €1 spent on flights", pts: "Up to 3,000 pts" },
  { id: "2", icon: "🏨", title: "Book Hotels", desc: "Earn 2pts per €1 spent on hotels", pts: "Up to 2,000 pts" },
  { id: "3", icon: "🎯", title: "Complete DNA", desc: "Complete your Travel DNA profile", pts: "500 pts" },
  { id: "4", icon: "👥", title: "Refer Friends", desc: "Invite friends to join TRAVI", pts: "500 pts each" },
  { id: "5", icon: "⭐", title: "Write Reviews", desc: "Review places you've visited", pts: "50 pts each" },
  { id: "6", icon: "📸", title: "Share Photos", desc: "Upload trip photos to community", pts: "25 pts each" },
  { id: "7", icon: "🎮", title: "Daily Check-in", desc: "Open the app daily for bonus", pts: "10 pts/day" },
  { id: "8", icon: "🏆", title: "Challenges", desc: "Complete weekly travel challenges", pts: "100-500 pts" },
];

const TIERS = [
  { name: "Explorer", min: "0", rate: "1x", color: "#555" },
  { name: "Adventurer", min: "5,000", rate: "1.5x", color: "#666" },
  { name: "Voyager", min: "15,000", rate: "2x", color: "#777" },
  { name: "Legend", min: "50,000", rate: "3x", color: "#888" },
];

export default function EarnGuideScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>How to Earn</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Current Status */}
          <View style={s.statusCard}>
            <Text style={s.statusLabel}>Your Earning Rate</Text>
            <Text style={s.statusRate}>1.5x</Text>
            <Text style={s.statusTier}>Adventurer Tier</Text>
            <View style={s.progressTrack}><View style={[s.progressFill,{width:"60%"}]}/></View>
            <Text style={s.progressText}>7,450 / 15,000 pts to Voyager</Text>
          </View>

          {/* Ways to Earn */}
          <Text style={s.secTitle}>Ways to Earn</Text>
          {WAYS.map(w=>(
            <View key={w.id} style={s.wayCard}>
              <View style={s.wayIcon}><Text style={{fontSize:24}}>{w.icon}</Text></View>
              <View style={s.wayInfo}>
                <Text style={s.wayTitle}>{w.title}</Text>
                <Text style={s.wayDesc}>{w.desc}</Text>
              </View>
              <Text style={s.wayPts}>{w.pts}</Text>
            </View>
          ))}

          {/* Tier Breakdown */}
          <Text style={s.secTitle}>Tier Benefits</Text>
          {TIERS.map(t=>(
            <View key={t.name} style={s.tierRow}>
              <View style={[s.tierDot,{backgroundColor:t.color}]}/>
              <View style={s.tierInfo}>
                <Text style={s.tierName}>{t.name}</Text>
                <Text style={s.tierMin}>Min {t.min} pts</Text>
              </View>
              <Text style={s.tierRate}>{t.rate} earning</Text>
            </View>
          ))}
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
  back:{fontSize:24,color:W},title:{fontSize:20,fontWeight:"700",color:W},
  scroll:{paddingHorizontal:16},
  statusCard:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,alignItems:"center",gap:8},
  statusLabel:{fontSize:14,color:G},statusRate:{fontSize:40,fontWeight:"700",color:W},statusTier:{fontSize:16,fontWeight:"600",color:G},
  progressTrack:{width:"100%",height:6,borderRadius:3,backgroundColor:N3,marginTop:8},
  progressFill:{height:6,borderRadius:3,backgroundColor:"#555"},
  progressText:{fontSize:12,color:G},
  secTitle:{fontSize:18,fontWeight:"700",color:W,marginTop:24,marginBottom:12},
  wayCard:{flexDirection:"row",alignItems:"center",backgroundColor:N2,borderRadius:14,borderWidth:1,borderColor:N3,padding:14,gap:12,marginBottom:8},
  wayIcon:{width:44,height:44,borderRadius:12,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  wayInfo:{flex:1},wayTitle:{fontSize:15,fontWeight:"600",color:W},wayDesc:{fontSize:12,color:G,marginTop:2},
  wayPts:{fontSize:13,fontWeight:"600",color:W},
  tierRow:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:N3,gap:10},
  tierDot:{width:12,height:12,borderRadius:6},tierInfo:{flex:1},
  tierName:{fontSize:15,fontWeight:"600",color:W},tierMin:{fontSize:12,color:G},
  tierRate:{fontSize:14,fontWeight:"600",color:G},
});
