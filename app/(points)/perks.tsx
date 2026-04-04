// Screen 98 — Membership Perks (Static Wireframe)
// Route: /points/perks | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const CURRENT_PERKS = [
  { id: "1", icon: "⬡", title: "1.5x Points Earning", desc: "Earn 50% more points on all bookings", active: true },
  { id: "2", icon: "🎫", title: "Priority Support", desc: "Skip the queue with dedicated support", active: true },
  { id: "3", icon: "🏷", title: "Exclusive Deals", desc: "Access member-only travel deals", active: true },
];

const NEXT_TIER_PERKS = [
  { id: "4", icon: "✈", title: "Lounge Access", desc: "Airport lounge access on select flights", locked: true },
  { id: "5", icon: "⭐", title: "2x Points Earning", desc: "Double points on all bookings", locked: true },
  { id: "6", icon: "🏨", title: "Room Upgrades", desc: "Complimentary room upgrades when available", locked: true },
  { id: "7", icon: "🎁", title: "Birthday Bonus", desc: "500 bonus points on your birthday", locked: true },
];

export default function PerksScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Membership Perks</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Current Tier */}
          <View style={s.tierCard}>
            <Text style={s.tierLabel}>Current Tier</Text>
            <Text style={s.tierName}>Adventurer</Text>
            <View style={s.progressTrack}><View style={[s.progressFill,{width:"60%"}]}/></View>
            <Text style={s.progressText}>7,450 / 15,000 pts to Voyager</Text>
          </View>

          <Text style={s.secTitle}>Your Perks</Text>
          {CURRENT_PERKS.map(p=>(
            <View key={p.id} style={s.perkCard}>
              <View style={s.perkIcon}><Text style={{fontSize:24}}>{p.icon}</Text></View>
              <View style={s.perkInfo}>
                <Text style={s.perkTitle}>{p.title}</Text>
                <Text style={s.perkDesc}>{p.desc}</Text>
              </View>
              <Text style={s.perkActive}>✓</Text>
            </View>
          ))}

          <Text style={s.secTitle}>Unlock at Voyager</Text>
          {NEXT_TIER_PERKS.map(p=>(
            <View key={p.id} style={[s.perkCard, s.perkLocked]}>
              <View style={s.perkIcon}><Text style={{fontSize:24}}>{p.icon}</Text></View>
              <View style={s.perkInfo}>
                <Text style={[s.perkTitle, s.perkTitleLocked]}>{p.title}</Text>
                <Text style={s.perkDesc}>{p.desc}</Text>
              </View>
              <Text style={s.lockIcon}>🔒</Text>
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
  tierCard:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,alignItems:"center",gap:8},
  tierLabel:{fontSize:14,color:G},tierName:{fontSize:28,fontWeight:"700",color:W},
  progressTrack:{width:"100%",height:6,borderRadius:3,backgroundColor:N3,marginTop:8},
  progressFill:{height:6,borderRadius:3,backgroundColor:"#555"},
  progressText:{fontSize:12,color:G},
  secTitle:{fontSize:18,fontWeight:"700",color:W,marginTop:24,marginBottom:12},
  perkCard:{flexDirection:"row",alignItems:"center",backgroundColor:N2,borderRadius:14,borderWidth:1,borderColor:N3,padding:14,gap:12,marginBottom:8},
  perkLocked:{opacity:0.6},
  perkIcon:{width:44,height:44,borderRadius:12,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  perkInfo:{flex:1},perkTitle:{fontSize:15,fontWeight:"600",color:W},perkTitleLocked:{color:G},
  perkDesc:{fontSize:12,color:G,marginTop:2},
  perkActive:{fontSize:18,color:"#4a4"},lockIcon:{fontSize:16},
});
