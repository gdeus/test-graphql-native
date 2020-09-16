import React, { useState } from 'react';
import { Text, View, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Card, Button, Input } from 'react-native-elements';
import { gql, useMutation, useQuery } from '@apollo/client';

const NEW_REPOSITORIE= gql`
    mutation create_repo($clientMutationId: String!, $name: String!, $visibility: String!){
        createRepository(input: {
            clientMutationId: $clientMutationId
            name: $name
            visibility: $visibility
        }){
            clientMutationId
        }
  }
`;

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

export default function FormNewRepo(props){
    const [name, setName] = useState("");
    const [visibility, setVisibility] = useState("");
    const [newRepo, { loading: mutationLoading, error: mutationError },] = useMutation(NEW_REPOSITORIE);
    const { loading, error, data, refetch } = useQuery(GET_REPOSITORES);
    return(
    <View>
        <TextInput
            label="Nome do repositório"
            value={name}
            onChangeText={name => setName(name)}
            type='outlined'
            style={{margin: 4}}
        />
        <TextInput
            label="Visibility"
            placeholder="PUBLIC OR PRIVATE"
            value={visibility}
            onChangeText={visibility => setVisibility(visibility)}
            type='outlined'
            style={{margin: 4}}
        />
        <Button
            buttonStyle={{borderRadius: 2, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 2}}
            onPress={() => {
            newRepo({variables: {clientMutationId: props.id,  name: name, visibility: visibility},
                update: (cache, {data}) => {
                    const data2 = cache.readQuery({query: GET_REPOSITORES});
                    data2.viewer.repositories.nodes = ([...data2.viewer.repositories.nodes, data]);
                    cache.writeQuery({query: GET_REPOSITORES}, data2)
                
                }
            });
            if(!mutationLoading && !mutationError){
                props.setReload(true);
            }}}
            title='Criar Repositorio' 
        />
    </View>
    );
}