// Screen 97 — Points Transactions (Static Wireframe)
// Route: /points/transactions | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const FILTERS = ["All", "Earned", "Redeemed", "Expired"];

const TRANSACTIONS = [
  { id: "1", title: "Barcelona Flight Booking", type: "earn", pts: "+450", date: "Apr 2, 2026", desc: "3pts/€1 · €150 booking" },
  { id: "2", title: "Hotel Booking Bonus", type: "earn", pts: "+200", date: "Apr 1, 2026", desc: "2pts/€1 · €100 booking" },
  { id: "3", title: "Amazon $50 Gift Card", type: "redeem", pts: "-5,000", date: "Mar 28, 2026", desc: "Delivered via email" },
  { id: "4", title: "Daily Check-in", type: "earn", pts: "+10", date: "Mar 27, 2026", desc: "7-day streak bonus" },
  { id: "5", title: "Trip Review — Tokyo", type: "earn", pts: "+50", date: "Mar 25, 2026", desc: "Review published" },
  { id: "6", title: "Emirates Miles Transfer", type: "redeem", pts: "-3,000", date: "Mar 20, 2026", desc: "3,600 Skywards miles" },
  { id: "7", title: "Referral Bonus — Marco", type: "earn", pts: "+500", date: "Mar 15, 2026", desc: "Friend joined TRAVI" },
  { id: "8", title: "Promo Points Expired", type: "expired", pts: "-100", date: "Mar 1, 2026", desc: "Welcome bonus expired" },
];

export default function PointsTransactionsScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Points History</Text>
          <View style={{width:24}}/>
        </View>

        {/* Summary */}
        <View style={s.summaryRow}>
          <View style={s.summaryItem}><Text style={s.sumVal}>+1,210</Text><Text style={s.sumLabel}>Earned (30d)</Text></View>
          <View style={s.summaryItem}><Text style={[s.sumVal,{color:"#a44"}]}>-8,000</Text><Text style={s.sumLabel}>Redeemed (30d)</Text></View>
          <View style={s.summaryItem}><Text style={s.sumVal}>12,450</Text><Text style={s.sumLabel}>Balance</Text></View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
          {FILTERS.map((f,i)=>(
            <View key={f} style={[s.filterPill, i===0 && s.filterActive]}>
              <Text style={[s.filterText, i===0 && s.filterTextActive]}>{f}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {TRANSACTIONS.map(t=>(
            <View key={t.id} style={s.txRow}>
              <View style={s.txIcon}>
                <Text style={{fontSize:16}}>{t.type==="earn"?"↑":t.type==="redeem"?"↓":"⚠"}</Text>
              </View>
              <View style={s.txInfo}>
                <Text style={s.txTitle}>{t.title}</Text>
                <Text style={s.txDesc}>{t.desc}</Text>
                <Text style={s.txDate}>{t.date}</Text>
              </View>
              <Text style={[s.txPts, t.type==="earn"?s.txEarn:t.type==="expired"?s.txExpired:s.txRedeem]}>{t.pts}</Text>
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
  summaryRow:{flexDirection:"row",marginHorizontal:16,backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,paddingVertical:16},
  summaryItem:{flex:1,alignItems:"center"},sumVal:{fontSize:18,fontWeight:"700",color:"#4a4"},sumLabel:{fontSize:11,color:G,marginTop:2},
  filterRow:{paddingHorizontal:16,gap:8,paddingVertical:12},
  filterPill:{paddingHorizontal:16,paddingVertical:8,borderRadius:20,backgroundColor:N2,borderWidth:1,borderColor:N3},
  filterActive:{backgroundColor:"#333",borderColor:"#555"},
  filterText:{fontSize:14,color:G},filterTextActive:{color:W,fontWeight:"600"},
  scroll:{paddingHorizontal:16},
  txRow:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:N3,gap:12},
  txIcon:{width:36,height:36,borderRadius:10,backgroundColor:N2,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:N3},
  txInfo:{flex:1},txTitle:{fontSize:15,color:W},txDesc:{fontSize:12,color:G,marginTop:2},txDate:{fontSize:11,color:"#555",marginTop:2},
  txPts:{fontSize:16,fontWeight:"700"},txEarn:{color:"#4a4"},txRedeem:{color:"#a44"},txExpired:{color:"#666"},
});
