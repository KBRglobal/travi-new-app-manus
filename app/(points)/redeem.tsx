// Screen 92 — Redeem Points Hub (Static Wireframe)
// Route: /points/redeem | Mode: Points
// Zones: Header 60px, Balance 80px, Featured Rewards scroll, 6 Categories grid

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const FEATURED = [
  { id: "1", title: "Business Class Upgrade", pts: "25,000", partner: "Emirates" },
  { id: "2", title: "$50 Amazon Gift Card", pts: "5,000", partner: "Amazon" },
  { id: "3", title: "Spa Day Experience", pts: "8,000", partner: "Four Seasons" },
];

const CATEGORIES = [
  { id: "1", icon: "✈", title: "Airline Miles", count: "15 airlines" },
  { id: "2", icon: "🎁", title: "Gift Cards", count: "100+ brands" },
  { id: "3", icon: "🏨", title: "Hotel Credits", count: "50+ hotels" },
  { id: "4", icon: "💰", title: "Cash Back", count: "Instant" },
  { id: "5", icon: "🎫", title: "Experiences", count: "200+ options" },
  { id: "6", icon: "⭐", title: "Upgrades", count: "Flight & Hotel" },
];

export default function RedeemHubScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Redeem Points</Text>
          <View style={{width:24}}/>
        </View>

        {/* Balance */}
        <View style={s.balanceBar}>
          <Text style={s.balanceLabel}>Available: </Text>
          <Text style={s.balanceValue}>⬡ 12,450 pts</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Featured Rewards */}
          <Text style={s.secTitle}>Featured Rewards</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.featuredRow}>
            {FEATURED.map(f => (
              <View key={f.id} style={s.featuredCard}>
                <View style={s.featuredImage}><Text style={{fontSize:32}}>🎁</Text></View>
                <View style={s.featuredInfo}>
                  <Text style={s.featuredTitle}>{f.title}</Text>
                  <Text style={s.featuredPartner}>{f.partner}</Text>
                  <Text style={s.featuredPts}>⬡ {f.pts} pts</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Categories */}
          <Text style={s.secTitle}>Categories</Text>
          <View style={s.catGrid}>
            {CATEGORIES.map(c => (
              <View key={c.id} style={s.catCard}>
                <Text style={s.catIcon}>{c.icon}</Text>
                <Text style={s.catTitle}>{c.title}</Text>
                <Text style={s.catCount}>{c.count}</Text>
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
  balanceBar:{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingVertical:12,backgroundColor:N2,marginHorizontal:16,borderRadius:12,borderWidth:1,borderColor:N3},
  balanceLabel:{fontSize:14,color:G},balanceValue:{fontSize:16,fontWeight:"700",color:W},
  scroll:{paddingHorizontal:16,paddingTop:16},
  secTitle:{fontSize:18,fontWeight:"700",color:W,marginBottom:12,marginTop:8},
  featuredRow:{gap:12,paddingBottom:8},
  featuredCard:{width:200,backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,overflow:"hidden"},
  featuredImage:{height:100,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  featuredInfo:{padding:12,gap:4},
  featuredTitle:{fontSize:14,fontWeight:"600",color:W},featuredPartner:{fontSize:12,color:G},featuredPts:{fontSize:14,fontWeight:"700",color:W,marginTop:4},
  catGrid:{flexDirection:"row",flexWrap:"wrap",gap:12},
  catCard:{width:"47%",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:20,alignItems:"center",gap:8},
  catIcon:{fontSize:32},catTitle:{fontSize:15,fontWeight:"600",color:W},catCount:{fontSize:12,color:G},
});
