import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Row, FlatList, SafeAreaView } from 'react-native';
import AppBar from '../components/appBar/appBar';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'react-native-elements';
import CustomCard from '../components/card/customCard';
import FormNewRepo from '../components/form/formNewRepo';
import { Divider } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  });
 
  const GET_REPOSITORES= gql`
      query {
        viewer {
          id  
          login
          avatarUrl
          repositories(first: 100){
            nodes{
              id
              name
              createdAt
            }
          }  
       }
      }
    `;


const useForceUpdate = () => useState()[1];

export default function HomePage(){
    const { loading, error, data, refetch } = useQuery(GET_REPOSITORES);
    const [newRepo, setNewRepo] = useState(false);
    const [reload, setReload] = useState(false);
    const [resultInsert, setResultInsert] = useState();
    const forceUpdate = useForceUpdate();
    
    useEffect(() => {
        console.log("Entrei no use effect")
        if(reload){
            setReload(false);
            setNewRepo(false);
            forceUpdate();
            refetch();
        }
        setReload(false);
    }, [reload]);

    if(loading){
        return(
            <View>
                <Text>Carregando</Text>
            </View>
        );
    }

    const buttonCreate = <Button
        buttonStyle={{borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 2}}
        onPress={() => {
            console.log("Do nada to aqui");
            setNewRepo(true);
        }}
        title='Criar novo repositório' 
    />;

    const renderFooter = 
        <View>
            <Text>ABCD</Text>
        </View>
    

    return(
        <View style={styles.container}>
        <AppBar/>
            {newRepo ? <FormNewRepo id={data.viewer.id} setReload={setReload} setResultInsert={setResultInsert} refetch={refetch}/> : buttonCreate}
            <SafeAreaView>
            <FlatList 
                data={data.viewer.repositories.nodes}
                contentContainerStyle={{paddingBottom:200}}
                horizontal={false}
                renderItem={({item}) => (
                    <CustomCard item={item} idUser={data.viewer.id}/>
                )}
            />
            </SafeAreaView>
        </View>
    );
}