// Screen 91 — Points Dashboard (Static Wireframe)
// Route: /points | Mode: Points
// Zones: Header 60px, Hero Balance 200px, Promo Cards scroll, Products Grid 2-col, Recent Transactions

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const PROMOS = [
  { id: "1", title: "Double Points Weekend", desc: "Earn 2x on all bookings this weekend", badge: "Limited" },
  { id: "2", title: "Refer & Earn 500pts", desc: "Invite friends and earn bonus points", badge: "New" },
];

const PRODUCTS = [
  { id: "1", icon: "✈", title: "Airline Miles", desc: "Transfer to 15+ airlines" },
  { id: "2", icon: "🎁", title: "Gift Cards", desc: "100+ brands available" },
  { id: "3", icon: "🏨", title: "Hotel Credits", desc: "Use at partner hotels" },
  { id: "4", icon: "💰", title: "Cash Back", desc: "Convert to wallet balance" },
  { id: "5", icon: "🎫", title: "Experiences", desc: "Tours, shows & more" },
  { id: "6", icon: "⭐", title: "Upgrades", desc: "Flight & hotel upgrades" },
];

const TRANSACTIONS = [
  { id: "1", title: "Barcelona Flight Booking", pts: "+450", type: "earn", date: "Today" },
  { id: "2", title: "Hotel Booking Bonus", pts: "+200", type: "earn", date: "Yesterday" },
  { id: "3", title: "Amazon Gift Card", pts: "-1,000", type: "redeem", date: "Mar 28" },
];

export default function PointsDashboardScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.headerTitle}>TRAVI Points</Text>
          <Text style={s.headerIcon}>🔔</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* Hero Balance */}
          <View style={s.heroCard}>
            <Text style={s.heroLabel}>Your Balance</Text>
            <View style={s.heroBalanceRow}>
              <Text style={s.heroHex}>⬡</Text>
              <Text style={s.heroBalance}>12,450</Text>
            </View>
            <Text style={s.heroSub}>≈ $124.50 value</Text>
            <View style={s.heroTier}>
              <Text style={s.tierName}>Adventurer</Text>
              <Text style={s.tierRate}>2pts / €1 spent</Text>
            </View>
            <View style={s.heroActions}>
              <View style={s.heroBtn}><Text style={s.heroBtnText}>Earn</Text></View>
              <View style={s.heroBtn}><Text style={s.heroBtnText}>Redeem</Text></View>
              <View style={s.heroBtn}><Text style={s.heroBtnText}>History</Text></View>
            </View>
          </View>

          {/* Promo Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.promosRow}>
            {PROMOS.map(p => (
              <View key={p.id} style={s.promoCard}>
                <View style={s.promoBadge}><Text style={s.promoBadgeText}>{p.badge}</Text></View>
                <Text style={s.promoTitle}>{p.title}</Text>
                <Text style={s.promoDesc}>{p.desc}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Products Grid */}
          <Text style={s.sectionTitle}>Redeem Points</Text>
          <View style={s.productsGrid}>
            {PRODUCTS.map(p => (
              <View key={p.id} style={s.productCard}>
                <Text style={s.productIcon}>{p.icon}</Text>
                <Text style={s.productTitle}>{p.title}</Text>
                <Text style={s.productDesc}>{p.desc}</Text>
              </View>
            ))}
          </View>

          {/* Recent Transactions */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Recent Activity</Text>
            <Text style={s.seeAll}>See All</Text>
          </View>
          {TRANSACTIONS.map(t => (
            <View key={t.id} style={s.txRow}>
              <View style={s.txInfo}>
                <Text style={s.txTitle}>{t.title}</Text>
                <Text style={s.txDate}>{t.date}</Text>
              </View>
              <Text style={[s.txPts, t.type === "earn" ? s.txEarn : s.txRedeem]}>{t.pts}</Text>
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
  headerTitle:{fontSize:24,fontWeight:"700",color:W},headerIcon:{fontSize:20},
  scroll:{paddingHorizontal:16},

  heroCard:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,alignItems:"center",gap:8},
  heroLabel:{fontSize:14,color:G},
  heroBalanceRow:{flexDirection:"row",alignItems:"baseline",gap:8},
  heroHex:{fontSize:24,color:G},heroBalance:{fontSize:48,fontWeight:"700",color:W},
  heroSub:{fontSize:14,color:G},
  heroTier:{flexDirection:"row",gap:12,marginTop:8},
  tierName:{fontSize:14,fontWeight:"600",color:W,paddingHorizontal:10,paddingVertical:4,borderRadius:10,backgroundColor:N3},
  tierRate:{fontSize:14,color:G,alignSelf:"center"},
  heroActions:{flexDirection:"row",gap:12,marginTop:12,width:"100%"},
  heroBtn:{flex:1,height:40,borderRadius:12,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  heroBtnText:{fontSize:14,fontWeight:"600",color:W},

  promosRow:{gap:12,paddingVertical:20},
  promoCard:{width:240,backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:16,gap:6},
  promoBadge:{alignSelf:"flex-start",paddingHorizontal:8,paddingVertical:3,borderRadius:8,backgroundColor:"#332"},
  promoBadgeText:{fontSize:11,fontWeight:"600",color:"#aa8"},
  promoTitle:{fontSize:16,fontWeight:"600",color:W},promoDesc:{fontSize:13,color:G},

  sectionTitle:{fontSize:18,fontWeight:"700",color:W,marginBottom:12},
  sectionHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:24,marginBottom:12},
  seeAll:{fontSize:14,color:G},

  productsGrid:{flexDirection:"row",flexWrap:"wrap",gap:12},
  productCard:{width:"47%",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:16,alignItems:"center",gap:8},
  productIcon:{fontSize:32},productTitle:{fontSize:14,fontWeight:"600",color:W},productDesc:{fontSize:12,color:G,textAlign:"center"},

  txRow:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:N3},
  txInfo:{flex:1},txTitle:{fontSize:15,color:W},txDate:{fontSize:12,color:G,marginTop:2},
  txPts:{fontSize:16,fontWeight:"700"},txEarn:{color:"#4a4"},txRedeem:{color:"#a44"},
});
