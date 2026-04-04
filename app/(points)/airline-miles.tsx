// Screen 93 — Airline Miles (Static Wireframe)
// Route: /points/airline-miles | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const LINKED = [
  { id: "1", name: "Emirates Skywards", miles: "15,200", rate: "1:1.2" },
  { id: "2", name: "British Airways Avios", miles: "8,400", rate: "1:1" },
];

const ALL_AIRLINES = [
  { id: "3", name: "Lufthansa Miles & More", rate: "1:0.8" },
  { id: "4", name: "Air France Flying Blue", rate: "1:1" },
  { id: "5", name: "Turkish Miles&Smiles", rate: "1:1.1" },
  { id: "6", name: "Singapore KrisFlyer", rate: "1:1.3" },
  { id: "7", name: "Qatar Privilege Club", rate: "1:1" },
  { id: "8", name: "Delta SkyMiles", rate: "1:0.9" },
];

const HISTORY = [
  { id: "1", airline: "Emirates", pts: "5,000", miles: "6,000", date: "Mar 15" },
  { id: "2", airline: "British Airways", pts: "3,000", miles: "3,000", date: "Feb 28" },
];

export default function AirlineMilesScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Airline Miles</Text>
          <View style={{width:24}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <Text style={s.secTitle}>Linked Airlines</Text>
          {LINKED.map(a=>(
            <View key={a.id} style={s.linkedCard}>
              <View style={s.airlineIcon}><Text style={{fontSize:24}}>✈</Text></View>
              <View style={s.airlineInfo}>
                <Text style={s.airlineName}>{a.name}</Text>
                <Text style={s.airlineMiles}>{a.miles} miles</Text>
              </View>
              <View style={s.rateTag}><Text style={s.rateText}>{a.rate}</Text></View>
            </View>
          ))}

          <Text style={s.secTitle}>All Airlines</Text>
          {ALL_AIRLINES.map(a=>(
            <View key={a.id} style={s.airlineRow}>
              <View style={s.airlineIcon}><Text style={{fontSize:20}}>✈</Text></View>
              <Text style={s.airlineRowName}>{a.name}</Text>
              <View style={s.rateTag}><Text style={s.rateText}>{a.rate}</Text></View>
              <Text style={s.linkBtn}>Link</Text>
            </View>
          ))}

          <Text style={s.secTitle}>Transfer History</Text>
          {HISTORY.map(h=>(
            <View key={h.id} style={s.histRow}>
              <View style={s.histInfo}>
                <Text style={s.histAirline}>{h.airline}</Text>
                <Text style={s.histDate}>{h.date}</Text>
              </View>
              <View style={s.histValues}>
                <Text style={s.histPts}>-⬡ {h.pts}</Text>
                <Text style={s.histMiles}>+{h.miles} mi</Text>
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
  back:{fontSize:24,color:W},title:{fontSize:20,fontWeight:"700",color:W},
  scroll:{paddingHorizontal:16},
  secTitle:{fontSize:18,fontWeight:"700",color:W,marginTop:24,marginBottom:12},
  linkedCard:{flexDirection:"row",alignItems:"center",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:16,gap:12,marginBottom:10},
  airlineIcon:{width:44,height:44,borderRadius:12,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  airlineInfo:{flex:1},airlineName:{fontSize:15,fontWeight:"600",color:W},airlineMiles:{fontSize:13,color:G},
  rateTag:{paddingHorizontal:8,paddingVertical:4,borderRadius:8,backgroundColor:N3},
  rateText:{fontSize:12,fontWeight:"600",color:G},
  airlineRow:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:N3,gap:10},
  airlineRowName:{flex:1,fontSize:15,color:W},
  linkBtn:{fontSize:14,fontWeight:"600",color:"#69c"},
  histRow:{flexDirection:"row",alignItems:"center",paddingVertical:14,borderBottomWidth:1,borderBottomColor:N3},
  histInfo:{flex:1},histAirline:{fontSize:15,color:W},histDate:{fontSize:12,color:G},
  histValues:{alignItems:"flex-end"},histPts:{fontSize:13,color:"#a44"},histMiles:{fontSize:13,color:"#4a4"},
});
