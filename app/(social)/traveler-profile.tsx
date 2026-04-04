// Screen 82 — Traveler Profile (Static Wireframe)
// Route: /social/profile/:userId | Mode: Discovery (Social)

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const DNA = [
  { name: "Adventure", you: 85, them: 78 },
  { name: "Culture", you: 72, them: 90 },
  { name: "Food", you: 95, them: 88 },
  { name: "Relaxation", you: 60, them: 65 },
];

const HIGHLIGHTS = [
  { dest: "Barcelona", date: "Mar 2026", photos: 24 },
  { dest: "Tokyo", date: "Jan 2026", photos: 48 },
  { dest: "Bali", date: "Nov 2025", photos: 32 },
];

export default function TravelerProfileScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Profile</Text>
          <Text style={s.more}>⋯</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <View style={s.hero}>
            <View style={s.avatar}><Text style={s.avatarText}>S</Text></View>
            <View style={s.heroInfo}>
              <Text style={s.name}>Sarah Mitchell, 28</Text>
              <Text style={s.loc}>Barcelona, Spain</Text>
              <View style={s.badges}>
                <View style={s.badge}><Text style={s.badgeT}>✓ Verified</Text></View>
                <View style={s.badge}><Text style={s.badgeT}>● Online</Text></View>
              </View>
              <Text style={s.bio}>Food lover, culture explorer. 12 countries. Always looking for authentic local experiences.</Text>
            </View>
          </View>
          <View style={s.stats}>
            {[["12","Countries"],["34","Trips"],["156","Photos"],["92%","Match"]].map(([n,l],i)=>(
              <View key={l} style={s.stat}><Text style={s.statN}>{n}</Text><Text style={s.statL}>{l}</Text></View>
            ))}
          </View>
          <View style={s.section}>
            <Text style={s.secTitle}>DNA Comparison</Text>
            {DNA.map(d=>(
              <View key={d.name} style={s.dimRow}>
                <Text style={s.dimName}>{d.name}</Text>
                <View style={s.dimBars}>
                  <View style={s.track}><View style={[s.fill,{width:`${d.you}%`,backgroundColor:"#555"}]}/></View>
                  <View style={s.track}><View style={[s.fill,{width:`${d.them}%`,backgroundColor:"#888"}]}/></View>
                </View>
              </View>
            ))}
          </View>
          <View style={s.section}>
            <Text style={s.secTitle}>Travel Highlights</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:12}}>
              {HIGHLIGHTS.map(h=>(
                <View key={h.dest} style={s.hCard}>
                  <View style={s.hImg}><Text style={{fontSize:28}}>📸</Text></View>
                  <Text style={s.hDest}>{h.dest}</Text>
                  <Text style={s.hDate}>{h.date} · {h.photos} photos</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={s.ctas}>
            <View style={s.cta}><Text style={s.ctaT}>Send Connect Request</Text></View>
            <View style={s.cta2}><Text style={s.cta2T}>Message</Text></View>
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
  back:{fontSize:24,color:W},title:{fontSize:20,fontWeight:"700",color:W},more:{fontSize:20,color:G},
  scroll:{paddingHorizontal:16},
  hero:{flexDirection:"row",gap:16,paddingVertical:16},
  avatar:{width:100,height:100,borderRadius:20,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  avatarText:{fontSize:40,fontWeight:"700",color:"#444"},
  heroInfo:{flex:1,gap:4},name:{fontSize:22,fontWeight:"700",color:W},loc:{fontSize:14,color:G},
  badges:{flexDirection:"row",gap:8,marginTop:4},
  badge:{paddingHorizontal:8,paddingVertical:3,borderRadius:10,backgroundColor:N2,borderWidth:1,borderColor:N3},
  badgeT:{fontSize:11,color:G},bio:{fontSize:13,color:"#aaa",lineHeight:18,marginTop:4},
  stats:{flexDirection:"row",justifyContent:"space-around",paddingVertical:16,backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3},
  stat:{alignItems:"center"},statN:{fontSize:20,fontWeight:"700",color:W},statL:{fontSize:12,color:G,marginTop:2},
  section:{marginTop:24,gap:12},secTitle:{fontSize:18,fontWeight:"700",color:W},
  dimRow:{flexDirection:"row",alignItems:"center",gap:8,height:36},dimName:{width:80,fontSize:13,color:G},
  dimBars:{flex:1,gap:3},track:{height:5,borderRadius:3,backgroundColor:N3},fill:{height:5,borderRadius:3},
  hCard:{width:140,backgroundColor:N2,borderRadius:14,borderWidth:1,borderColor:N3,overflow:"hidden"},
  hImg:{height:100,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  hDest:{fontSize:14,fontWeight:"600",color:W,paddingHorizontal:10,paddingTop:8},
  hDate:{fontSize:11,color:G,paddingHorizontal:10,paddingBottom:10},
  ctas:{marginTop:32,gap:12},
  cta:{height:52,borderRadius:14,backgroundColor:"#333",alignItems:"center",justifyContent:"center"},
  ctaT:{fontSize:16,fontWeight:"600",color:W},
  cta2:{height:52,borderRadius:14,backgroundColor:N2,borderWidth:1,borderColor:N3,alignItems:"center",justifyContent:"center"},
  cta2T:{fontSize:16,fontWeight:"600",color:G},
});
