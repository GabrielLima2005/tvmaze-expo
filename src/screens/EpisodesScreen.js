import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function EpisodesScreen({ route }) {
  const { showId, showName } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function loadEpisodes() {
      try {
        setError('');
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
        if (!response.ok) throw new Error(`A API respondeu com status ${response.status}.`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('A resposta da API veio em um formato inesperado.');
        if (active) setEpisodes(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Não foi possível carregar os episódios.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadEpisodes();
    return () => { active = false; };
  }, [showId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#6658d3" /><Text style={styles.muted}>Carregando episódios…</Text></View>;
  if (error) return <View style={styles.center}><Text style={styles.errorTitle}>Não foi possível carregar</Text><Text style={styles.error}>{error}</Text></View>;

  return <FlatList data={episodes} keyExtractor={(item)=>String(item.id)} contentContainerStyle={styles.list} ListHeaderComponent={<View style={styles.intro}><Text style={styles.heading}>{showName}</Text><Text style={styles.muted}>{episodes.length} episódio(s)</Text></View>} ListEmptyComponent={<Text style={styles.empty}>Nenhum episódio encontrado para esta série.</Text>} renderItem={({item})=><View style={styles.card}><View style={styles.badge}><Text style={styles.badgeText}>T{item.season ?? '—'} · E{item.number ?? '—'}</Text></View><View style={styles.details}><Text style={styles.name}>{item.name || 'Episódio sem título'}</Text>{item.airdate ? <Text style={styles.date}>{item.airdate}</Text> : null}</View></View>} />;
}

const styles = StyleSheet.create({list:{padding:16,paddingBottom:28},intro:{marginBottom:16},heading:{fontSize:24,fontWeight:'800',color:'#172033'},muted:{color:'#667085',fontSize:14,marginTop:6},card:{backgroundColor:'#fff',borderRadius:14,padding:15,marginBottom:10,flexDirection:'row',alignItems:'center',elevation:1},badge:{backgroundColor:'#eeecff',borderRadius:10,paddingVertical:8,paddingHorizontal:10},badgeText:{color:'#5145cd',fontWeight:'800',fontSize:12},details:{flex:1,marginLeft:13},name:{fontSize:15,fontWeight:'700',color:'#172033'},date:{fontSize:12,color:'#667085',marginTop:5},empty:{textAlign:'center',padding:24,color:'#667085'},center:{flex:1,alignItems:'center',justifyContent:'center',padding:28},errorTitle:{fontSize:20,fontWeight:'800',color:'#172033',textAlign:'center'},error:{color:'#b42318',textAlign:'center',marginTop:10}});
