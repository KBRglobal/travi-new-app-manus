// Screen 99 — Referrals (Static Wireframe)
// Route: /points/referrals | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const REFERRED = [
  { id: "1", name: "Marco Rossi", status: "Joined", pts: "+500", date: "Mar 15" },
  { id: "2", name: "Yuki Tanaka", status: "Joined", pts: "+500", date: "Feb 28" },
  { id: "3", name: "Elena K.", status: "Pending", pts: "—", date: "Mar 30" },
];

export default function ReferralsScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Refer & Earn</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Hero */}
          <View style={s.heroCard}>
            <Text style={s.heroEmoji}>🎁</Text>
            <Text style={s.heroTitle}>Give 500, Get 500</Text>
            <Text style={s.heroDesc}>Invite friends to TRAVI. They get 500 bonus points, you earn 500 points when they join.</Text>
          </View>

          {/* Referral Code */}
          <View style={s.codeCard}>
            <Text style={s.codeLabel}>Your Referral Code</Text>
            <View style={s.codeBox}>
              <Text style={s.codeText}>TRAVI-ALEX2026</Text>
              <View style={s.copyBtn}><Text style={s.copyText}>Copy</Text></View>
            </View>
          </View>

          {/* Share Buttons */}
          <View style={s.shareRow}>
            <View style={s.shareBtn}><Text style={s.shareIcon}>💬</Text><Text style={s.shareLabel}>WhatsApp</Text></View>
            <View style={s.shareBtn}><Text style={s.shareIcon}>✉</Text><Text style={s.shareLabel}>Email</Text></View>
            <View style={s.shareBtn}><Text style={s.shareIcon}>📋</Text><Text style={s.shareLabel}>Link</Text></View>
            <View style={s.shareBtn}><Text style={s.shareIcon}>⋯</Text><Text style={s.shareLabel}>More</Text></View>
          </View>

          {/* Stats */}
          <View style={s.statsRow}>
            <View style={s.stat}><Text style={s.statNum}>3</Text><Text style={s.statLabel}>Invited</Text></View>
            <View style={s.stat}><Text style={s.statNum}>2</Text><Text style={s.statLabel}>Joined</Text></View>
            <View style={s.stat}><Text style={s.statNum}>1,000</Text><Text style={s.statLabel}>Earned</Text></View>
          </View>

          {/* Referred List */}
          <Text style={s.secTitle}>Your Referrals</Text>
          {REFERRED.map(r=>(
            <View key={r.id} style={s.refRow}>
              <View style={s.refAvatar}><Text style={s.refInitial}>{r.name[0]}</Text></View>
              <View style={s.refInfo}>
                <Text style={s.refName}>{r.name}</Text>
                <Text style={s.refDate}>{r.date}</Text>
              </View>
              <View style={[s.statusBadge, r.status==="Joined"?s.statusJoined:s.statusPending]}>
                <Text style={[s.statusText, r.status==="Joined"?s.statusJoinedText:s.statusPendingText]}>{r.status}</Text>
              </View>
              <Text style={[s.refPts, r.pts!=="—"&&{color:"#4a4"}]}>{r.pts}</Text>
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
  heroCard:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,alignItems:"center",gap:10},
  heroEmoji:{fontSize:48},heroTitle:{fontSize:24,fontWeight:"700",color:W},heroDesc:{fontSize:14,color:G,textAlign:"center",lineHeight:20},
  codeCard:{backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:16,marginTop:16,gap:8},
  codeLabel:{fontSize:14,color:G},
  codeBox:{flexDirection:"row",alignItems:"center",gap:12},
  codeText:{flex:1,fontSize:18,fontWeight:"700",color:W,letterSpacing:1},
  copyBtn:{paddingHorizontal:16,paddingVertical:8,borderRadius:10,backgroundColor:"#333"},
  copyText:{fontSize:14,fontWeight:"600",color:W},
  shareRow:{flexDirection:"row",justifyContent:"space-around",marginTop:16,paddingVertical:16},
  shareBtn:{alignItems:"center",gap:6},shareIcon:{fontSize:24},shareLabel:{fontSize:12,color:G},
  statsRow:{flexDirection:"row",justifyContent:"space-around",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,paddingVertical:16,marginTop:8},
  stat:{alignItems:"center"},statNum:{fontSize:22,fontWeight:"700",color:W},statLabel:{fontSize:12,color:G,marginTop:2},
  secTitle:{fontSize:18,fontWeight:"700",color:W,marginTop:24,marginBottom:12},
  refRow:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:N3,gap:10},
  refAvatar:{width:40,height:40,borderRadius:10,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  refInitial:{fontSize:16,fontWeight:"600",color:"#555"},
  refInfo:{flex:1},refName:{fontSize:15,color:W},refDate:{fontSize:12,color:G},
  statusBadge:{paddingHorizontal:8,paddingVertical:3,borderRadius:8},
  statusJoined:{backgroundColor:"#1a3a1a"},statusPending:{backgroundColor:"#332"},
  statusText:{fontSize:12,fontWeight:"600"},statusJoinedText:{color:"#4a4"},statusPendingText:{color:"#aa8"},
  refPts:{fontSize:14,fontWeight:"600",color:G},
});
