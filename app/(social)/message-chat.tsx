// Screen 85 — Chat Screen (Static Wireframe)
// Route: /social/chat/:conversationId | Mode: Discovery (Social)
// Zones: Header 60px, Compatibility Bar 40px, Messages body, Input 56px

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const MESSAGES = [
  { id: "1", from: "them", text: "Hey! I saw you're planning a trip to Barcelona too!", time: "10:32 AM" },
  { id: "2", from: "me", text: "Yes! I'm going in April. Have you been before?", time: "10:33 AM" },
  { id: "3", from: "them", text: "Three times! I know all the best spots. The tapas in El Born are incredible.", time: "10:35 AM" },
  { id: "4", from: "me", text: "That sounds amazing! Any specific places you'd recommend?", time: "10:36 AM" },
  { id: "5", from: "them", text: "Cal Pep is a must! Get there early though, the line gets long. Also try La Boqueria market for breakfast.", time: "10:38 AM" },
  { id: "6", from: "me", text: "Perfect, adding those to my list! 🙏", time: "10:39 AM" },
];

export default function ChatScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <View style={s.headerAvatar}><Text style={s.headerInitial}>S</Text></View>
          <View style={s.headerInfo}>
            <Text style={s.headerName}>Sarah Mitchell</Text>
            <Text style={s.headerStatus}>● Online</Text>
          </View>
          <Text style={s.headerMore}>⋯</Text>
        </View>

        {/* Compatibility Bar — 40px */}
        <View style={s.compatBar}>
          <Text style={s.compatText}>92% DNA Match</Text>
          <View style={s.compatBarTrack}>
            <View style={[s.compatBarFill, { width: "92%" }]} />
          </View>
        </View>

        {/* Messages */}
        <ScrollView style={s.messagesArea} contentContainerStyle={s.messagesContent} showsVerticalScrollIndicator={false}>
          {MESSAGES.map(msg => (
            <View key={msg.id} style={[s.bubble, msg.from === "me" ? s.bubbleMe : s.bubbleThem]}>
              <Text style={[s.bubbleText, msg.from === "me" ? s.bubbleTextMe : s.bubbleTextThem]}>{msg.text}</Text>
              <Text style={s.bubbleTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input — 56px */}
        <View style={s.inputBar}>
          <Text style={s.inputPlus}>+</Text>
          <View style={s.inputField}>
            <Text style={s.inputPlaceholder}>Type a message...</Text>
          </View>
          <View style={s.sendBtn}><Text style={s.sendText}>→</Text></View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const N="#111",N2="#1a1a1a",N3="#222",W="#fff",G="#888";
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:N},
  header:{height:60,flexDirection:"row",alignItems:"center",paddingHorizontal:16,gap:10,borderBottomWidth:1,borderBottomColor:N3},
  back:{fontSize:24,color:W},
  headerAvatar:{width:36,height:36,borderRadius:10,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  headerInitial:{fontSize:16,fontWeight:"600",color:W},
  headerInfo:{flex:1},
  headerName:{fontSize:16,fontWeight:"600",color:W},
  headerStatus:{fontSize:12,color:"#4a4"},
  headerMore:{fontSize:20,color:G},
  compatBar:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,height:40,gap:10,backgroundColor:N2,borderBottomWidth:1,borderBottomColor:N3},
  compatText:{fontSize:12,fontWeight:"600",color:G,width:100},
  compatBarTrack:{flex:1,height:4,borderRadius:2,backgroundColor:N3},
  compatBarFill:{height:4,borderRadius:2,backgroundColor:"#555"},
  messagesArea:{flex:1},
  messagesContent:{padding:16,gap:8},
  bubble:{maxWidth:"80%",padding:12,borderRadius:16,gap:4},
  bubbleMe:{alignSelf:"flex-end",backgroundColor:"#333",borderBottomRightRadius:4},
  bubbleThem:{alignSelf:"flex-start",backgroundColor:N2,borderWidth:1,borderColor:N3,borderBottomLeftRadius:4},
  bubbleText:{fontSize:15,lineHeight:20},
  bubbleTextMe:{color:W},
  bubbleTextThem:{color:"#ccc"},
  bubbleTime:{fontSize:11,color:G,alignSelf:"flex-end"},
  inputBar:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,paddingVertical:8,gap:10,borderTopWidth:1,borderTopColor:N3},
  inputPlus:{fontSize:24,color:G},
  inputField:{flex:1,height:40,borderRadius:20,backgroundColor:N2,justifyContent:"center",paddingHorizontal:16},
  inputPlaceholder:{fontSize:14,color:"#555"},
  sendBtn:{width:40,height:40,borderRadius:20,backgroundColor:"#333",alignItems:"center",justifyContent:"center"},
  sendText:{fontSize:18,color:W},
});
