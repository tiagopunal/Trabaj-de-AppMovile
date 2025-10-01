import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { API_KEY, BASE_URL } from '../config';

const MOVIE_ID = 1234821;

const MainScreen = ({ navigation }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/${MOVIE_ID}?api_key=${API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar la película');
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (error) return <Text style={{ color: 'red', margin: 20 }}>{error}</Text>;
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { movie })} style={styles.card}>
        {posterUrl && (
          <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
        )}
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.desc}>{movie.overview}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 24, borderRadius: 12, elevation: 3, width: '90%', alignItems: 'center' },
  poster: { width: 200, height: 300, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  desc: { fontSize: 16, color: '#333', textAlign: 'center' },
});

export default MainScreen;
