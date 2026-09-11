import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authAPI } from '../services/api';
import { COLORS, SIZES } from '../constants/theme';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!name || !email || !password) { setError('All fields are required'); return; }
    setLoading(true); setError('');
    dispatch(loginStart());
    try {
      const response = await authAPI.register(name, email, password);
      dispatch(loginSuccess(response.data));
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      dispatch(loginFailure(msg));
    } finally { setLoading(false); }
  };

  return (
    <LinearGradient colors={['#0a0e1a', '#1a1f2e', '#0a0e1a']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logo}>âš™ï¸ FactoryPulse</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Register</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={COLORS.textMuted} value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Your email" placeholderTextColor={COLORS.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Create password" placeholderTextColor={COLORS.textMuted} value={password} onChangeText={setPassword} secureTextEntry />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            <LinearGradient colors={['#007AFF', '#5856D6']} style={styles.buttonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? <Text style={styles.linkBold}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: SIZES.padding * 1.5 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 36, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: SIZES.md, color: COLORS.textSecondary, marginTop: 4 },
  form: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLg, padding: SIZES.padding * 1.5, borderWidth: 1, borderColor: COLORS.cardBorder },
  title: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, marginBottom: 20, textAlign: 'center' },
  error: { color: COLORS.danger, textAlign: 'center', marginBottom: 12, fontSize: SIZES.sm },
  inputContainer: { marginBottom: 16 },
  label: { color: COLORS.textSecondary, fontSize: SIZES.sm, marginBottom: 6 },
  input: { backgroundColor: COLORS.surfaceLight, borderRadius: SIZES.radius, padding: 14, color: COLORS.text, fontSize: SIZES.lg, borderWidth: 1, borderColor: COLORS.cardBorder },
  button: { marginTop: 8, borderRadius: SIZES.radius, overflow: 'hidden' },
  buttonGradient: { paddingVertical: 14, alignItems: 'center', borderRadius: SIZES.radius },
  buttonText: { color: '#fff', fontSize: SIZES.lg, fontWeight: 'bold' },
  link: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20, fontSize: SIZES.md },
  linkBold: { color: COLORS.primary, fontWeight: 'bold' },
});

export default RegisterScreen;
