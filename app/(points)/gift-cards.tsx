// Screen 95 — Gift Cards (Static Wireframe)
// Route: /points/gift-cards | Mode: Points

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

const CATEGORIES = ["All", "Shopping", "Food", "Travel", "Entertainment"];

const CARDS = [
  { id: "1", brand: "Amazon", icon: "🛒", from: "2,500", cat: "Shopping" },
  { id: "2", brand: "Uber Eats", icon: "🍔", from: "1,500", cat: "Food" },
  { id: "3", brand: "Netflix", icon: "🎬", from: "1,000", cat: "Entertainment" },
  { id: "4", brand: "Airbnb", icon: "🏠", from: "5,000", cat: "Travel" },
  { id: "5", brand: "Starbucks", icon: "☕", from: "500", cat: "Food" },
  { id: "6", brand: "Apple", icon: "🍎", from: "2,500", cat: "Shopping" },
  { id: "7", brand: "Spotify", icon: "🎵", from: "1,000", cat: "Entertainment" },
  { id: "8", brand: "Nike", icon: "👟", from: "3,000", cat: "Shopping" },
];

export default function GiftCardsScreen() {
  return (
    <ScreenContainer>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.back}>←</Text>
          <Text style={s.title}>Gift Cards</Text>
          <View style={{width:24}}/>
        </View>

        {/* Search */}
        <View style={s.searchBar}><Text style={s.searchPlaceholder}>🔍  Search brands...</Text></View>

        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.catRow}>
          {CATEGORIES.map((c,i)=>(
            <View key={c} style={[s.catPill, i===0 && s.catActive]}>
              <Text style={[s.catText, i===0 && s.catTextActive]}>{c}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <View style={s.grid}>
            {CARDS.map(c=>(
              <View key={c.id} style={s.card}>
                <View style={s.cardIcon}><Text style={{fontSize:32}}>{c.icon}</Text></View>
                <Text style={s.cardBrand}>{c.brand}</Text>
                <Text style={s.cardFrom}>From ⬡ {c.from}</Text>
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
  searchBar:{marginHorizontal:16,height:44,borderRadius:12,backgroundColor:N2,justifyContent:"center",paddingHorizontal:16,marginBottom:12},
  searchPlaceholder:{fontSize:14,color:"#555"},
  catRow:{paddingHorizontal:16,gap:8,marginBottom:12},
  catPill:{paddingHorizontal:16,paddingVertical:8,borderRadius:20,backgroundColor:N2,borderWidth:1,borderColor:N3},
  catActive:{backgroundColor:"#333",borderColor:"#555"},
  catText:{fontSize:14,color:G},catTextActive:{color:W,fontWeight:"600"},
  scroll:{paddingHorizontal:16},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:12},
  card:{width:"47%",backgroundColor:N2,borderRadius:16,borderWidth:1,borderColor:N3,padding:20,alignItems:"center",gap:8},
  cardIcon:{width:56,height:56,borderRadius:14,backgroundColor:N3,alignItems:"center",justifyContent:"center"},
  cardBrand:{fontSize:15,fontWeight:"600",color:W},cardFrom:{fontSize:12,color:G},
});
