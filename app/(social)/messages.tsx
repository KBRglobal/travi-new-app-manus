// Screen 84 — Messages List (Static Wireframe)
// Route: /social/messages | Mode: Discovery (Social)
// Zones: Header 60px, Search 48px, Online Now row 80px, Conversations list

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const ONLINE = [
  { id: "1", name: "Sarah", initial: "S" },
  { id: "2", name: "Marco", initial: "M" },
  { id: "3", name: "Yuki", initial: "Y" },
  { id: "4", name: "Elena", initial: "E" },
];

const CONVERSATIONS = [
  { id: "1", name: "Sarah Mitchell", lastMsg: "That tapas place was amazing! You have to try it when you visit.", time: "2m ago", unread: 3, online: true },
  { id: "2", name: "Marco Rossi", lastMsg: "I'll send you the hiking trail details tonight.", time: "1h ago", unread: 1, online: false },
  { id: "3", name: "Yuki Tanaka", lastMsg: "The cherry blossoms should be perfect next week!", time: "3h ago", unread: 0, online: true },
  { id: "4", name: "Elena Kowalski", lastMsg: "Thanks for the Santorini recommendations!", time: "1d ago", unread: 0, online: false },
  { id: "5", name: "James Lee", lastMsg: "Let me know when you're in London!", time: "2d ago", unread: 0, online: false },
];

export default function MessagesListScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Messages</Text>
          <Text style={s.compose}>✏</Text>
        </View>

        {/* Search */}
        <View style={s.searchBar}>
          <Text style={s.searchPlaceholder}>🔍  Search conversations...</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Online Now */}
          <View style={s.onlineSection}>
            <Text style={s.onlineLabel}>Active Now</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.onlineRow}>
              {ONLINE.map(u => (
                <View key={u.id} style={s.onlineItem}>
                  <View style={s.onlineAvatar}>
                    <Text style={s.onlineInitial}>{u.initial}</Text>
                    <View style={s.onlineDot} />
                  </View>
                  <Text style={s.onlineName}>{u.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Conversations */}
          {CONVERSATIONS.map(c => (
            <View key={c.id} style={s.convRow}>
              <View style={s.convAvatar}>
                <Text style={s.convInitial}>{c.name[0]}</Text>
                {c.online && <View style={s.convOnline} />}
              </View>
              <View style={s.convInfo}>
                <View style={s.convNameRow}>
                  <Text style={[s.convName, c.unread > 0 && s.convNameBold]}>{c.name}</Text>
                  <Text style={s.convTime}>{c.time}</Text>
                </View>
                <View style={s.convMsgRow}>
                  <Text style={[s.convMsg, c.unread > 0 && s.convMsgBold]} numberOfLines={1}>{c.lastMsg}</Text>
                  {c.unread > 0 && (
                    <View style={s.unreadBadge}><Text style={s.unreadText}>{c.unread}</Text></View>
                  )}
                </View>
              </View>
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
  back:{fontSize:24,color:W},title:{fontSize:20,fontWeight:"700",color:W},compose:{fontSize:20,color:G},
  searchBar:{marginHorizontal:16,height:44,borderRadius:12,backgroundColor:N2,justifyContent:"center",paddingHorizontal:16,marginBottom:12},
  searchPlaceholder:{fontSize:14,color:"#555"},
  onlineSection:{paddingHorizontal:16,marginBottom:16},
  onlineLabel:{fontSize:14,fontWeight:"600",color:G,marginBottom:8},
  onlineRow:{gap:16},
  onlineItem:{alignItems:"center",width:56},
  onlineAvatar:{width:48,height:48,borderRadius:12,backgroundColor:N2,borderWidth:1,borderColor:N3,alignItems:"center",justifyContent:"center"},
  onlineInitial:{fontSize:18,fontWeight:"600",color:W},
  onlineDot:{position:"absolute",bottom:-2,right:-2,width:12,height:12,borderRadius:6,backgroundColor:"#4a4",borderWidth:2,borderColor:N},
  onlineName:{fontSize:11,color:G,marginTop:4},
  convRow:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,paddingVertical:12,gap:12,borderBottomWidth:1,borderBottomColor:N3},
  convAvatar:{width:52,height:52,borderRadius:14,backgroundColor:N2,alignItems:"center",justifyContent:"center"},
  convInitial:{fontSize:20,fontWeight:"600",color:W},
  convOnline:{position:"absolute",bottom:0,right:0,width:12,height:12,borderRadius:6,backgroundColor:"#4a4",borderWidth:2,borderColor:N},
  convInfo:{flex:1},
  convNameRow:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  convName:{fontSize:16,color:W},
  convNameBold:{fontWeight:"700"},
  convTime:{fontSize:12,color:G},
  convMsgRow:{flexDirection:"row",alignItems:"center",gap:8,marginTop:2},
  convMsg:{fontSize:14,color:G,flex:1},
  convMsgBold:{color:"#bbb"},
  unreadBadge:{minWidth:20,height:20,borderRadius:10,backgroundColor:"#555",alignItems:"center",justifyContent:"center",paddingHorizontal:6},
  unreadText:{fontSize:11,fontWeight:"700",color:W},
});
