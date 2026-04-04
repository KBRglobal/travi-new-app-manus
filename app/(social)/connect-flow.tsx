// Screen 83 — Match/Connect Flow (Static Wireframe)
// Route: modal sequence | Mode: Discovery (Social)
// Shows 3 states: Send Request → Pending → Accepted

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function ConnectFlowScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Connect Flow</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* State 1: Send Request */}
          <Text style={s.stateLabel}>State 1 — Send Request</Text>
          <View style={s.modal}>
            <View style={s.modalAvatar}><Text style={s.modalInitial}>S</Text></View>
            <Text style={s.modalName}>Sarah Mitchell</Text>
            <Text style={s.modalSub}>92% DNA Match</Text>
            <Text style={s.modalDesc}>Send a connect request to travel together?</Text>
            <View style={s.modalInput}>
              <Text style={s.inputPlaceholder}>Add a personal message (optional)...</Text>
            </View>
            <View style={s.modalBtn}><Text style={s.modalBtnText}>Send Connect Request</Text></View>
            <Text style={s.modalCancel}>Cancel</Text>
          </View>

          {/* State 2: Pending */}
          <Text style={s.stateLabel}>State 2 — Pending</Text>
          <View style={s.modal}>
            <View style={s.modalAvatar}><Text style={s.modalInitial}>S</Text></View>
            <Text style={s.modalName}>Sarah Mitchell</Text>
            <View style={s.pendingBadge}><Text style={s.pendingText}>⏳ Request Pending</Text></View>
            <Text style={s.modalDesc}>Your request has been sent. You'll be notified when Sarah responds.</Text>
            <View style={s.modalBtnSecondary}><Text style={s.modalBtnSecondaryText}>Cancel Request</Text></View>
          </View>

          {/* State 3: Accepted */}
          <Text style={s.stateLabel}>State 3 — Accepted</Text>
          <View style={s.modal}>
            <Text style={s.celebEmoji}>🎉</Text>
            <Text style={s.celebTitle}>You're Connected!</Text>
            <View style={s.connectedAvatars}>
              <View style={s.connAvatar}><Text style={s.connInitial}>Y</Text></View>
              <View style={s.connAvatar}><Text style={s.connInitial}>S</Text></View>
            </View>
            <Text style={s.modalDesc}>You and Sarah can now message each other and plan trips together.</Text>
            <View style={s.modalBtn}><Text style={s.modalBtnText}>Start Chatting</Text></View>
            <Text style={s.modalCancel}>View Profile</Text>
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
  modal:{backgroundColor:N2,borderRadius:20,borderWidth:1,borderColor:N3,padding:24,alignItems:"center",gap:12},
  modalAvatar:{width:72,height:72,borderRadius:18,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  modalInitial:{fontSize:28,fontWeight:"700",color:"#555"},
  modalName:{fontSize:20,fontWeight:"700",color:W},
  modalSub:{fontSize:14,color:G},
  modalDesc:{fontSize:14,color:"#aaa",textAlign:"center",lineHeight:20},
  modalInput:{width:"100%",height:48,borderRadius:12,backgroundColor:N3,justifyContent:"center",paddingHorizontal:16},
  inputPlaceholder:{fontSize:14,color:"#555"},
  modalBtn:{width:"100%",height:52,borderRadius:14,backgroundColor:"#333",alignItems:"center",justifyContent:"center"},
  modalBtnText:{fontSize:16,fontWeight:"600",color:W},
  modalBtnSecondary:{width:"100%",height:52,borderRadius:14,backgroundColor:N,borderWidth:1,borderColor:N3,alignItems:"center",justifyContent:"center"},
  modalBtnSecondaryText:{fontSize:16,fontWeight:"600",color:G},
  modalCancel:{fontSize:14,color:G,marginTop:4},
  pendingBadge:{paddingHorizontal:12,paddingVertical:6,borderRadius:12,backgroundColor:"#332"},
  pendingText:{fontSize:14,color:"#aa8"},
  celebEmoji:{fontSize:48},
  celebTitle:{fontSize:24,fontWeight:"700",color:W},
  connectedAvatars:{flexDirection:"row",gap:-12},
  connAvatar:{width:56,height:56,borderRadius:14,backgroundColor:N3,borderWidth:3,borderColor:N,alignItems:"center",justifyContent:"center"},
  connInitial:{fontSize:20,fontWeight:"700",color:"#555"},
});
