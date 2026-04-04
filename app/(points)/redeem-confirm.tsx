// Screen 100 — Redeem Confirmation (Static Wireframe)
// Route: /points/redeem/confirm | Mode: Points
// Shows: Review → Processing → Success states

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function RedeemConfirmScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Confirm Redemption</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* State 1: Review */}
          <Text style={s.stateLabel}>State 1 — Review</Text>
          <View style={s.card}>
            <View style={s.itemRow}>
              <View style={s.itemIcon}><Text style={{fontSize:32}}>🎁</Text></View>
              <View style={s.itemInfo}>
                <Text style={s.itemTitle}>Amazon $50 Gift Card</Text>
                <Text style={s.itemPartner}>Amazon · Digital Delivery</Text>
              </View>
            </View>
            <View style={s.divider}/>
            <View style={s.detailRow}><Text style={s.detailLabel}>Points Required</Text><Text style={s.detailValue}>⬡ 5,000</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Current Balance</Text><Text style={s.detailValue}>⬡ 12,450</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>After Redemption</Text><Text style={s.detailValueBold}>⬡ 7,450</Text></View>
            <View style={s.divider}/>
            <View style={s.detailRow}><Text style={s.detailLabel}>Delivery</Text><Text style={s.detailValue}>Instant via email</Text></View>
            <View style={s.confirmBtn}><Text style={s.confirmText}>Confirm Redemption</Text></View>
            <Text style={s.cancelText}>Cancel</Text>
          </View>

          {/* State 2: Processing */}
          <Text style={s.stateLabel}>State 2 — Processing</Text>
          <View style={s.card}>
            <View style={s.processingIcon}><Text style={{fontSize:40}}>⏳</Text></View>
            <Text style={s.processingTitle}>Processing...</Text>
            <Text style={s.processingDesc}>Verifying your redemption. This usually takes a few seconds.</Text>
            <View style={s.progressTrack}><View style={[s.progressFill,{width:"60%"}]}/></View>
          </View>

          {/* State 3: Success */}
          <Text style={s.stateLabel}>State 3 — Success</Text>
          <View style={s.card}>
            <Text style={s.successEmoji}>✅</Text>
            <Text style={s.successTitle}>Redemption Complete!</Text>
            <Text style={s.successDesc}>Your Amazon $50 Gift Card code has been sent to your email.</Text>
            <View style={s.codeBox}>
              <Text style={s.codeLabel}>Gift Card Code</Text>
              <Text style={s.codeValue}>AMZN-XXXX-XXXX-XXXX</Text>
              <View style={s.copyBtn}><Text style={s.copyText}>Copy Code</Text></View>
            </View>
            <View style={s.detailRow}><Text style={s.detailLabel}>Points Used</Text><Text style={[s.detailValue,{color:"#a44"}]}>-5,000</Text></View>
            <View style={s.detailRow}><Text style={s.detailLabel}>New Balance</Text><Text style={s.detailValueBold}>⬡ 7,450</Text></View>
            <View style={s.doneBtn}><Text style={s.doneText}>Done</Text></View>
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
  scroll:{paddingHorizontal:16,gap:24},
  stateLabel:{fontSize:14,fontWeight:"600",color:G,marginTop:8},
  card:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,gap:12,alignItems:"center"},
  itemRow:{flexDirection:"row",gap:14,alignItems:"center",width:"100%"},
  itemIcon:{width:56,height:56,borderRadius:14,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  itemInfo:{flex:1},itemTitle:{fontSize:18,fontWeight:"600",color:W},itemPartner:{fontSize:13,color:G},
  divider:{width:"100%",height:1,backgroundColor:N3},
  detailRow:{flexDirection:"row",justifyContent:"space-between",width:"100%"},
  detailLabel:{fontSize:14,color:G},detailValue:{fontSize:14,color:W},detailValueBold:{fontSize:14,fontWeight:"700",color:W},
  confirmBtn:{width:"100%",height:52,borderRadius:14,backgroundColor:"#333",alignItems:"center",justifyContent:"center",marginTop:8},
  confirmText:{fontSize:16,fontWeight:"600",color:W},
  cancelText:{fontSize:14,color:G},
  processingIcon:{marginBottom:8},processingTitle:{fontSize:20,fontWeight:"700",color:W},
  processingDesc:{fontSize:14,color:G,textAlign:"center"},
  progressTrack:{width:"100%",height:6,borderRadius:3,backgroundColor:N3},
  progressFill:{height:6,borderRadius:3,backgroundColor:"#555"},
  successEmoji:{fontSize:48},successTitle:{fontSize:22,fontWeight:"700",color:W},
  successDesc:{fontSize:14,color:G,textAlign:"center",lineHeight:20},
  codeBox:{width:"100%",backgroundColor:N3,borderRadius:14,padding:16,alignItems:"center",gap:6},
  codeLabel:{fontSize:12,color:G},codeValue:{fontSize:18,fontWeight:"700",color:W,letterSpacing:2},
  copyBtn:{paddingHorizontal:16,paddingVertical:8,borderRadius:10,backgroundColor:N2,marginTop:4},
  copyText:{fontSize:14,fontWeight:"600",color:W},
  doneBtn:{width:"100%",height:52,borderRadius:14,backgroundColor:"#333",alignItems:"center",justifyContent:"center",marginTop:8},
  doneText:{fontSize:16,fontWeight:"600",color:W},
});
