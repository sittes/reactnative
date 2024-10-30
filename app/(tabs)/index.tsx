import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

// Componente principal da aplicação
const App: React.FC = () => {
  // Declaração de estados para armazenar informações de entrada do usuário
  const [name, setName] = useState<string>(''); // Estado para armazenar o nome
  const [email, setEmail] = useState<string>(''); // Estado para armazenar o email
  const [password, setPassword] = useState<string>(''); // Estado para armazenar a senha
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Estado para armazenar a confirmação da senha
  const [currentScreen, setCurrentScreen] = useState<'login' | 'signup'>('login'); // Estado para controlar a tela atual (login ou cadastro)
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({}); // Estado para armazenar os erros de validação

  // Função para lidar com o login
  const handleLogin = () => {
    Alert.alert('Login Status', 'Login realizado com sucesso.');
  };

  // Função para login com Google (a funcionalidade real precisaria ser implementada)
  const handleGoogleLogin = () => {
    Alert.alert('Login com Google', 'Tentando autenticar com Google...');
  };

  // Função para login com Apple (a funcionalidade real precisaria ser implementada)
  const handleAppleLogin = () => {
    Alert.alert('Login com Apple', 'Tentando autenticar com Apple...');
  };

  // Função para login anônimo (a funcionalidade real precisaria ser implementada)
  const handleAnonymousLogin = () => {
    Alert.alert('Login Anônimo', 'Você entrou anonimamente.');
  };

  // Função para lidar com o cadastro do usuário
  const handleSignup = () => {
    // Inicializa um objeto para armazenar os erros de validação
    let validationErrors: { [key: string]: boolean } = {};
    
    // Verifica se os campos estão preenchidos
    if (!name) validationErrors.name = true; // Verifica se o campo "nome" está preenchido
    if (!email) validationErrors.email = true; // Verifica se o campo "email" está preenchido
    if (!password) validationErrors.password = true; // Verifica se o campo "senha" está preenchido
    if (!confirmPassword) validationErrors.confirmPassword = true; // Verifica se o campo "confirmação de senha" está preenchido

    // Verifica se as senhas correspondem
    if (password && confirmPassword && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem.'); // Exibe alerta se as senhas não coincidirem
      return; // Interrompe a execução se as senhas não coincidirem
    }

    // Atualiza o estado com os erros de validação
    setErrors(validationErrors);

    // Se houver erros, exibe um alerta e interrompe o fluxo
    if (Object.keys(validationErrors).length > 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Exibe alerta se houver campos obrigatórios vazios
      return; // Interrompe a execução se houver erros de validação
    }

    // Exibe uma mensagem de sucesso e volta para a tela de login
    Alert.alert('Cadastro', 'Cadastro realizado com sucesso!');
    setCurrentScreen('login'); // Muda para a tela de login
    setErrors({}); // Limpa os erros ao voltar para a tela de login
    limparCampos(); // Chama a função para limpar os campos de entrada
  };

  // Função para navegar para a tela de cadastro
  const navigateToSignup = () => {
    setCurrentScreen('signup'); // Muda para a tela de cadastro
  };

  // Função para navegar para a tela de login e limpar os erros
  const navigateToLogin = () => {
    setCurrentScreen('login'); // Muda para a tela de login
    setErrors({}); // Limpa os erros ao retornar para a tela de login
    limparCampos(); // Chama a função para limpar os campos de entrada
  };

  // Função para limpar os campos de entrada
  const limparCampos = () => {
    setName(''); // Limpa o campo "nome"
    setEmail(''); // Limpa o campo "email"
    setPassword(''); // Limpa o campo "senha"
    setConfirmPassword(''); // Limpa o campo "confirmação de senha"
  };

  return (
    // Gradiente de fundo aplicado em toda a tela
    <LinearGradient
      colors={['#141E30', '#243B55']}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Barra de status configurada para estilo claro */}
        <StatusBar style="light" />

        {/* Animação da imagem de logotipo na entrada */}
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          iterationCount={1}
          source={{ uri: "https://s10.aconvert.com/convert/p3r68-cdx67/a9ma0-pbyll.png" }}
          style={styles.logo}
        />

        {/* Tela de login */}
        {currentScreen === 'login' && (
          <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
            {/* Campo de entrada de email */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor='#FFF'
              marginBottom={20}
            />

            {/* Campo de entrada de senha */}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor='#FFF'
            />

            {/* Botão de login */}
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.fullWidthButton}>
              <LinearGradient
                colors={['#FF6347', '#FF4500']}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Texto para navegar para a tela de cadastro */}
            <Text style={styles.text}>
              Não tem uma conta? <Text onPress={navigateToSignup} style={styles.link}>Criar conta</Text>
            </Text>

            {/* Botões de login alternativo (Google, Apple, Anônimo) */}
            <View style={styles.alternativeLoginContainer}>
              <TouchableOpacity onPress={handleGoogleLogin} style={styles.alternativeLoginButton}>
                <Icon name="google" size={20} color="#FFF" />
                <Text style={styles.alternativeLoginText}>Login com Google</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAppleLogin} style={styles.alternativeLoginButton}>
                <Icon name="apple" size={20} color="#FFF" />
                <Text style={styles.alternativeLoginText}>Login com Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAnonymousLogin} style={styles.alternativeLoginButton}>
                <Icon name="user-secret" size={20} color="#FFF" />
                <Text style={styles.alternativeLoginText}>Login Anônimo</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}

        {/* Tela de cadastro */}
        {currentScreen === 'signup' && (
          <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
            {/* Campos de entrada para cadastro */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={(text) => { setName(text); setErrors({ ...errors, name: false }); }}
                placeholderTextColor='#FFF'
              />
              {/* Ícone de erro exibido quando há um erro no campo */}
              {errors.name && <Icon name="times-circle" size={20} color="red" style={styles.errorIcon} />}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => { setEmail(text); setErrors({ ...errors, email: false }); }}
                placeholderTextColor='#FFF'
              />
              {/* Ícone de erro exibido quando há um erro no campo */}
              {errors.email && <Icon name="times-circle" size={20} color="red" style={styles.errorIcon} />}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={(text) => { setPassword(text); setErrors({ ...errors, password: false }); }}
                placeholderTextColor='#FFF'
              />
               <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Senhe"
                secureTextEntry
                value={password}
                onChangeText={(text) => { setPassword(text); setErrors({ ...errors, password: false }); }}
                placeholderTextColor='#FFF'
              />
              {/* Ícone de erro exibido quando há um erro no campo */}
              {errors.password && <Icon name="times-circle" size={20} color="red" style={styles.errorIcon} />}
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => { setConfirmPassword(text); setErrors({ ...errors, confirmPassword: false }); }}
                placeholderTextColor='#FFF'
              />
              {/* Ícone de erro exibido quando há um erro no campo */}
              {errors.confirmPassword && <Icon name="times-circle" size={20} color="red" style={styles.errorIcon} />}
            </View>

            {/* Botão de cadastro */}
            <TouchableOpacity onPress={handleSignup} activeOpacity={0.8} style={styles.fullWidthButton}>
              <LinearGradient
                colors={['#4CAF50', '#388E3C']}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Cadastrar</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Botão para voltar à tela de login */}
            <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.8} style={styles.fullWidthButton}>
              <LinearGradient
                colors={['#FF6347', '#FF4500']}
                style={styles.backToLoginButton}
              >
                <Text style={styles.loginButtonText}>Voltar ao Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </LinearGradient>
  );
};

// Estilos para o aplicativo
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 321,
    height: 120,
    marginBottom: 30,
    borderWidth: 2,
    //borderColor: '#FFF',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
    color: '#FFF',
    fontSize: 16,
  },
  errorIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  fullWidthButton: {
    width: '100%',
    marginTop: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backToLoginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  alternativeLoginContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  alternativeLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  alternativeLoginText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  text: {
    color: '#FFF',
    marginTop: 20,
  },
  link: {
    color: '#FFD700',
    textDecorationLine: 'underline',
  },
});

export default App; // Exporta o componente principal