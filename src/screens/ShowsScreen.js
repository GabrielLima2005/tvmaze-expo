import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const FALLBACK = 'https://placehold.co/240x340/182236/ffffff?text=Sem+imagem';

export default function ShowsScreen({ navigation }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function loadShows() {
      try {
        setError('');
        const response = await fetch('https://api.tvmaze.com/shows');
        if (!response.ok) throw new Error(`A API respondeu com status ${response.status}.`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('A resposta da API veio em um formato inesperado.');
        if (active) setShows(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Não foi possível carregar as séries.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadShows();
    return () => { active = false; };
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#6658d3" /><Text style={styles.muted}>Carregando séries…</Text></View>;
  if (error) return <View style={styles.center}><Text style={styles.errorTitle}>Não foi possível carregar</Text><Text style={styles.error}>{error}</Text><Text style={styles.hint}>Verifique sua conexão e tente novamente ao reabrir a tela.</Text></View>;

  return <FlatList data={shows} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list} numColumns={2} columnWrapperStyle={styles.row} ListHeaderComponent={<View style={styles.intro}><Text style={styles.heading}>Explore séries</Text><Text style={styles.muted}>Toque em uma série para ver seus episódios.</Text></View>} renderItem={({item}) => <Pressable accessibilityRole="button" accessibilityLabel={`Ver episódios de ${item.name}`} style={({pressed})=>[styles.card, pressed && styles.pressed]} onPress={()=>navigation.navigate('Episodes',{showId:item.id,showName:item.name})}><Image source={{uri:item.image?.medium || item.image?.original || FALLBACK}} style={styles.poster} resizeMode="cover" /><Text numberOfLines={2} style={styles.name}>{item.name || 'Série sem título'}</Text><Text style={styles.genre}>{item.genres?.[0] || 'Série'}</Text></Pressable>} />;
}

const styles = StyleSheet.create({list:{padding:16,paddingBottom:28},row:{justifyContent:'space-between',gap:12},intro:{marginBottom:18},heading:{fontSize:25,fontWeight:'800',color:'#172033',marginBottom:5},muted:{color:'#667085',fontSize:14,marginTop:10},card:{width:'48%',backgroundColor:'#fff',borderRadius:16,marginBottom:14,overflow:'hidden',elevation:2},pressed:{opacity:.8},poster:{width:'100%',height:210,backgroundColor:'#e4e7ec'},name:{fontSize:15,fontWeight:'700',color:'#172033',paddingHorizontal:11,paddingTop:10},genre:{fontSize:12,color:'#667085',paddingHorizontal:11,paddingTop:4,paddingBottom:12},center:{flex:1,alignItems:'center',justifyContent:'center',padding:28},errorTitle:{fontSize:20,fontWeight:'800',color:'#172033',textAlign:'center'},error:{color:'#b42318',textAlign:'center',marginTop:10},hint:{color:'#667085',textAlign:'center',marginTop:8}});
