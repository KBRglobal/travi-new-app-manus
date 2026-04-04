import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

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
      <Text className="text-white/60 text-xs uppercase mb-2 ml-1">{label}</Text>
      <TextInput className="bg-bg-secondary rounded-xl px-4 py-3 text-white border border-white/[0.08]" value={value} onChangeText={onChange} secureTextEntry={secure} />
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-bg-primary pt-safe">
      <View className="flex-row items-center px-4 py-3 mb-2">
        <TouchableOpacity onPress={() => router.back()}><Text className="text-white text-lg">←</Text></TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-3">Personal Info</Text>
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
      <TouchableOpacity className="mx-4 mt-4 mb-8 bg-primary py-4 rounded-2xl items-center">
        <Text className="text-white font-bold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
