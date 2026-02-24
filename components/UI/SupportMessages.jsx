import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

// Lista de mensajes de apoyo
const messages = [
  "No estás sola. Lo que estás viviendo importa.",
  "Nada de lo que pasó es tu culpa.",
  "Tu vida tiene valor y merece respeto.",
  "Eres más fuerte de lo que crees.",
  "Mereces amor sin miedo.",
  "Tu voz merece ser escuchada.",
  "No estás exagerando. Tu dolor es real.",
  "Pedir ayuda es un acto de valentía.",
  "Tu seguridad es lo primero.",
  "Hay un camino hacia una vida tranquila y libre.",
  "Tu historia no define tu futuro.",
  "Dentro de ti hay una fuerza que nadie puede quitarte.",
  "Paso a paso también es avanzar.",
  "Mereces paz, dignidad y respeto.",
  "No tienes que demostrar nada para merecer protección.",
  "Sobrevivir ya demuestra tu valentía.",
  "Puedes reconstruir tu vida a tu ritmo.",
  "No estás rota. Estás sanando.",
  "Tienes derecho a poner límites.",
  "Tu bienestar importa.",
  "El miedo no será eterno.",
  "Hay personas dispuestas a ayudarte.",
  "Tu vida puede volver a sentirse segura.",
  "Mereces relaciones sanas y respetuosas.",
  "Tu futuro no está determinado por la violencia.",
  "Cada día que resistes es una muestra de tu fortaleza.",
  "Tu dignidad nunca depende de nadie más.",
  "Puedes elegir cuidarte.",
  "La ayuda existe y está para ti.",
  "Tu vida vale mucho más que el silencio.",
];

export default function SupportMessages() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages.map((msg, index) => (
        <View key={index} style={styles.messageBox}>
          <Text style={styles.messageText}>{msg}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  messageBox: {
    backgroundColor: "#ffe6f0", // rosa suave
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#4a4a4a",
    lineHeight: 22,
  },
});
