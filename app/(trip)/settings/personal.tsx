import { haptic } from '@/lib/haptics';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PressableScale } from '@/components/ui/PressableScale';
import { useRouter } from 'expo-router';
import { colors, fonts, fontSizes, radius, shadows, typography, spacing, gradients} from '@/constants/theme';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+1 555-0123');
  const [dob, setDob] = useState('1990-01-15');
  const [nationality, setNationality] = useState('United States');
  const [passport, setPassport] = useState('AB1234567');

  const Field = ({ label, value, onChange, secure }: { label: string; value: string; onChange: (t: string) => void; secure?: boolean }) => (
    <View className="mb-4">
      <Text className="/60 text-xs uppercase mb-2 ml-1" style={{ color: colors.text.primary }}>{label}</Text>
      <TextInput className="bg-[#120824] rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={value} onChangeText={onChange} secureTextEntry={secure} />
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg.primary }} pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className=" text-lg" style={{ color: colors.text.primary }}>←</Text></TouchableOpacity>
        <Text className=" text-xl font-[Satoshi-Bold] ml-3" style={{ color: colors.text.primary }}>Personal Info</Text>
      </View>
      <View className="px-4">
        <Field label="First Name" value={firstName} onChange={setFirstName} />
        <Field label="Last Name" value={lastName} onChange={setLastName} />
        <Field label="Email" value={email} onChange={setEmail} />
        <Field label="Phone" value={phone} onChange={setPhone} />
        <Field label="Date of Birth" value={dob} onChange={setDob} />
        <Field label="Nationality" value={nationality} onChange={setNationality} />
        <Field label="Passport Number" value={passport} onChange={setPassport} />
      </View>
      <TouchableOpacity onPress={() => {}} className="mx-4 mt-4 mb-8 bg-[#6443F4] py-4 rounded-2xl items-center">
        <Text className=" font-[Satoshi-Bold]" style={{ color: colors.text.primary }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
