// Screen 94 — Partner Detail (Static Wireframe)
// Route: /points/partner/:id | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const REWARDS = [
  { id: "1", title: "$25 Gift Card", pts: "2,500" },
  { id: "2", title: "$50 Gift Card", pts: "5,000" },
  { id: "3", title: "$100 Gift Card", pts: "9,500", badge: "Best Value" },
];

export default function PartnerDetailScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Amazon</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <View style={s.heroCard}>
            <View style={s.heroLogo}><Text style={{fontSize:40}}>🎁</Text></View>
            <Text style={s.heroName}>Amazon Gift Cards</Text>
            <Text style={s.heroDesc}>Redeem your TRAVI points for Amazon gift cards. Use them for millions of products.</Text>
            <View style={s.heroStats}>
              <View style={s.heroStat}><Text style={s.statVal}>1:0.01</Text><Text style={s.statLabel}>Conversion</Text></View>
              <View style={s.divider}/>
              <View style={s.heroStat}><Text style={s.statVal}>Instant</Text><Text style={s.statLabel}>Delivery</Text></View>
              <View style={s.divider}/>
              <View style={s.heroStat}><Text style={s.statVal}>Digital</Text><Text style={s.statLabel}>Format</Text></View>
            </View>
          </View>

          <Text style={s.secTitle}>Available Rewards</Text>
          {REWARDS.map(r=>(
            <View key={r.id} style={s.rewardCard}>
              <View style={s.rewardInfo}>
                <View style={s.rewardNameRow}>
                  <Text style={s.rewardTitle}>{r.title}</Text>
                  {r.badge && <View style={s.rewardBadge}><Text style={s.rewardBadgeText}>{r.badge}</Text></View>}
                </View>
                <Text style={s.rewardPts}>⬡ {r.pts} pts</Text>
              </View>
              <View style={s.redeemBtn}><Text style={s.redeemText}>Redeem</Text></View>
            </View>
          ))}

          <View style={s.infoSection}>
            <Text style={s.secTitle}>How It Works</Text>
            {["Select your desired gift card amount","Confirm redemption with your points","Receive digital code instantly via email","Apply code at checkout on Amazon"].map((step,i)=>(
              <View key={i} style={s.stepRow}>
                <View style={s.stepNum}><Text style={s.stepNumText}>{i+1}</Text></View>
                <Text style={s.stepText}>{step}</Text>
              </View>
            ))}
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
  back:{fontSize:24,color:W},title:{fontSize:20,fontWeight:"700",color:W},
  scroll:{paddingHorizontal:16},
  heroCard:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,alignItems:"center",gap:10},
  heroLogo:{width:80,height:80,borderRadius:20,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  heroName:{fontSize:22,fontWeight:"700",color:W},heroDesc:{fontSize:14,color:G,textAlign:"center",lineHeight:20},
  heroStats:{flexDirection:"row",alignItems:"center",gap:16,marginTop:8},
  heroStat:{alignItems:"center"},statVal:{fontSize:16,fontWeight:"700",color:W},statLabel:{fontSize:12,color:G,marginTop:2},
  divider:{width:1,height:32,backgroundColor:N3},
  secTitle:{fontSize:18,fontWeight:"700",color:W,marginTop:24,marginBottom:12},
  rewardCard:{flexDirection:"row",alignItems:"center",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:16,marginBottom:10},
  rewardInfo:{flex:1,gap:4},
  rewardNameRow:{flexDirection:"row",alignItems:"center",gap:8},
  rewardTitle:{fontSize:16,fontWeight:"600",color:W},
  rewardBadge:{paddingHorizontal:6,paddingVertical:2,borderRadius:6,backgroundColor:"#1a3a1a"},
  rewardBadgeText:{fontSize:10,fontWeight:"600",color:"#4a4"},
  rewardPts:{fontSize:14,color:G},
  redeemBtn:{paddingHorizontal:16,paddingVertical:10,borderRadius:12,backgroundColor:"#333"},
  redeemText:{fontSize:14,fontWeight:"600",color:W},
  infoSection:{marginTop:8},
  stepRow:{flexDirection:"row",alignItems:"center",gap:12,marginBottom:12},
  stepNum:{width:28,height:28,borderRadius:14,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  stepNumText:{fontSize:14,fontWeight:"700",color:W},
  stepText:{flex:1,fontSize:14,color:"#aaa",lineHeight:20},
});
