import { useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radius } from '@/constants/theme';
import { useTripStore, PackingItem } from '@/stores/tripStore';
import * as Haptics from 'expo-haptics';

const CATEGORIES = [
  { id: 'clothes', label: 'Clothes', icon: 'checkroom' as const },
  { id: 'footwear', label: 'Footwear', icon: 'hiking' as const },
  { id: 'toiletries', label: 'Toiletries', icon: 'soap' as const },
  { id: 'documents', label: 'Documents', icon: 'description' as const },
  { id: 'electronics', label: 'Electronics', icon: 'devices' as const },
  { id: 'health', label: 'Health', icon: 'medical-services' as const },
  { id: 'other', label: 'Other', icon: 'more-horiz' as const },
];

const SUGGESTIONS: Record<string, string[]> = {
  clothes: ['T-shirts', 'Pants', 'Underwear', 'Socks', 'Jacket', 'Pajamas'],
  footwear: ['Sneakers', 'Sandals', 'Dress shoes'],
  toiletries: ['Toothbrush', 'Toothpaste', 'Shampoo', 'Sunscreen', 'Deodorant'],
  documents: ['Passport', 'Boarding pass', 'Hotel booking', 'Travel insurance'],
  electronics: ['Phone charger', 'Power bank', 'Headphones', 'Camera'],
  health: ['Medications', 'First aid kit', 'Hand sanitizer', 'Masks'],
  other: ['Snacks', 'Water bottle', 'Umbrella', 'Travel pillow'],
};

export default function PackingListScreen() {
  const router = useRouter();
  const trip = useTripStore((s) => s.currentTrip);
  const { addPackingItem, togglePackingItem, removePackingItem, updatePackingQuantity, markAllInCategory } = useTripStore();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['clothes']);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');

  const packingList = trip?.packingList || [];
  const destination = trip?.destination?.name || 'your destination';

  const totalItems = packingList.length;
  const packedItems = packingList.filter((i) => i.packed).length;
  const progress = totalItems > 0 ? packedItems / totalItems : 0;
  const allPacked = totalItems > 0 && packedItems === totalItems;

  const itemsByCategory = useMemo(() => {
    const map: Record<string, PackingItem[]> = {};
    CATEGORIES.forEach((c) => { map[c.id] = []; });
    packingList.forEach((item) => {
      if (map[item.category]) map[item.category].push(item);
      else map['other'].push(item);
    });
    return map;
  }, [packingList]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddItem = (category: string) => {
    if (!newItemName.trim()) return;
    addPackingItem({ name: newItemName.trim(), category, quantity: 1, packed: false });
    setNewItemName('');
    setAddingTo(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleToggle = (id: string) => {
    togglePackingItem(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleShare = async () => {
    const text = CATEGORIES.map((cat) => {
      const items = itemsByCategory[cat.id];
      if (items.length === 0) return null;
      return `${cat.label}:\n${items.map((i) => `  ${i.packed ? '✓' : '○'} ${i.name} x${i.quantity}`).join('\n')}`;
    }).filter(Boolean).join('\n\n');
    await Share.share({ message: `Packing List for ${destination}\n\n${text}\n\n${packedItems}/${totalItems} packed` });
  };

  const handleAddSuggestions = (category: string) => {
    const existing = new Set(itemsByCategory[category].map((i) => i.name.toLowerCase()));
    const suggestions = SUGGESTIONS[category] || [];
    suggestions.forEach((name) => {
      if (!existing.has(name.toLowerCase())) {
        addPackingItem({ name, category, quantity: 1, packed: false });
      }
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 8, marginRight: 12 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.heading, fontSize: fontSizes.h2, color: colors.text.primary }}>Packing List</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.secondary, marginTop: 2 }}>{destination}</Text>
        </View>
        <Pressable onPress={handleShare} style={{ padding: 8 }}>
          <Ionicons name="share-outline" size={22} color={colors.text.primary} />
        </Pressable>
      </View>

      {/* Progress */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary }}>{packedItems}/{totalItems} items packed</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.muted }}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
          <View style={{ height: 6, width: `${progress * 100}%` as any, backgroundColor: allPacked ? colors.success : colors.primary, borderRadius: 3 }} />
        </View>
      </View>

      {/* All Packed Banner */}
      {allPacked && totalItems > 0 && (
        <View style={{ marginHorizontal: 20, marginBottom: 16, padding: 16, backgroundColor: 'rgba(74,222,128,0.15)', borderRadius: radius.card, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <MaterialIcons name="check-circle" size={24} color={colors.success} />
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.success }}>All packed! You're ready to go!</Text>
        </View>
      )}

      {/* Smart Suggestions Banner */}
      {totalItems === 0 && (
        <View style={{ marginHorizontal: 20, marginBottom: 16, padding: 16, backgroundColor: 'rgba(100,67,244,0.1)', borderRadius: radius.card, borderWidth: 1, borderColor: 'rgba(100,67,244,0.2)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <MaterialIcons name="auto-awesome" size={20} color={colors.primary} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary }}>Suggested for {destination}</Text>
          </View>
          <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.secondary, marginBottom: 12 }}>Based on weather and destination type</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {['Sunscreen', 'Light clothing', 'Power adapter'].map((item) => (
              <View key={item} style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border.default }}>
                <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.text.secondary }}>{item}</Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={() => { ['clothes', 'toiletries', 'electronics'].forEach(handleAddSuggestions); }}
            style={{ marginTop: 12, alignSelf: 'flex-start' }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.primary }}>Add all suggestions →</Text>
          </Pressable>
        </View>
      )}

      {/* Categories */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>
        {CATEGORIES.map((cat) => {
          const items = itemsByCategory[cat.id];
          const isExpanded = expandedCategories.includes(cat.id);
          const catPacked = items.filter((i) => i.packed).length;

          return (
            <View key={cat.id} style={{ marginBottom: 12, backgroundColor: colors.bg.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border.default, overflow: 'hidden' }}>
              {/* Category Header */}
              <Pressable
                onPress={() => toggleCategory(cat.id)}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 }}
              >
                <MaterialIcons name={cat.icon} size={22} color={colors.text.secondary} />
                <Text style={{ flex: 1, fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.primary }}>{cat.label}</Text>
                {items.length > 0 && (
                  <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: catPacked === items.length && items.length > 0 ? colors.success : colors.text.muted }}>{catPacked}/{items.length}</Text>
                )}
                {items.length > 0 && catPacked < items.length && (
                  <Pressable onPress={() => { markAllInCategory(cat.id); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                    <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.caption, color: colors.primary }}>Mark All</Text>
                  </Pressable>
                )}
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.text.muted} />
              </Pressable>

              {/* Items */}
              {isExpanded && (
                <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
                  {items.map((item) => (
                    <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.border.default }}>
                      <Pressable onPress={() => handleToggle(item.id)} style={{ marginRight: 12 }}>
                        <Ionicons name={item.packed ? 'checkbox' : 'square-outline'} size={22} color={item.packed ? colors.success : colors.text.muted} />
                      </Pressable>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: item.packed ? colors.text.muted : colors.text.primary, textDecorationLine: item.packed ? 'line-through' : 'none' }}>{item.name}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Pressable onPress={() => updatePackingQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: colors.text.secondary, fontSize: 16 }}>−</Text>
                        </Pressable>
                        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: colors.text.primary, minWidth: 20, textAlign: 'center' }}>{item.quantity}</Text>
                        <Pressable onPress={() => updatePackingQuantity(item.id, item.quantity + 1)} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: colors.text.secondary, fontSize: 16 }}>+</Text>
                        </Pressable>
                      </View>
                      <Pressable onPress={() => removePackingItem(item.id)} style={{ marginLeft: 8, padding: 4 }}>
                        <Ionicons name="close" size={16} color={colors.text.muted} />
                      </Pressable>
                    </View>
                  ))}

                  {/* Add Item */}
                  {addingTo === cat.id ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }}>
                      <TextInput
                        value={newItemName}
                        onChangeText={setNewItemName}
                        placeholder="Item name..."
                        placeholderTextColor={colors.text.muted}
                        autoFocus
                        onSubmitEditing={() => handleAddItem(cat.id)}
                        style={{ flex: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: radius.button, paddingHorizontal: 12, fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.primary, borderWidth: 1, borderColor: colors.border.default }}
                      />
                      <Pressable onPress={() => handleAddItem(cat.id)} style={{ height: 40, paddingHorizontal: 16, backgroundColor: colors.primary, borderRadius: radius.button, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.bodySm, color: '#FFF' }}>Add</Text>
                      </Pressable>
                      <Pressable onPress={() => { setAddingTo(null); setNewItemName(''); }} style={{ padding: 4 }}>
                        <Ionicons name="close" size={20} color={colors.text.muted} />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => setAddingTo(cat.id)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 }}>
                      <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
                      <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.primary }}>Add Item</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          );
        })}

        {/* Empty State */}
        {totalItems === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <MaterialIcons name="luggage" size={64} color={colors.text.muted} />
            <Text style={{ fontFamily: fonts.bold, fontSize: fontSizes.body, color: colors.text.secondary, marginTop: 16 }}>Add your first item</Text>
            <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.bodySm, color: colors.text.muted, marginTop: 4 }}>Tap a category above to start packing</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
